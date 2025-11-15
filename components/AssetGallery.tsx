import React from 'react';
import type { SavedAsset, UploadedFile } from '../types';
import Button from './Button';

interface AssetGalleryProps {
  assets: SavedAsset[];
  onDelete: (id: number) => void;
  onClearAll: () => void;
  onUseImage: (file: UploadedFile) => void;
}

const AssetCard: React.FC<{
    asset: SavedAsset;
    onDelete: (id: number) => void;
    onUseImage: (file: UploadedFile) => void;
}> = ({ asset, onDelete, onUseImage }) => {

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = asset.dataUrl;
        const extension = asset.type === 'image' ? asset.mimeType.split('/')[1] || 'png' : 'mp4';
        link.download = `content-koala-${asset.type}-${asset.id}.${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleUseForVideo = () => {
        if (asset.type !== 'image') return;
        const match = asset.dataUrl.match(/^data:(image\/[a-zA-Z]+);base64,(.*)$/);
        if (match && match[1] && match[2]) {
            const mimeType = match[1];
            const base64 = match[2];
            onUseImage({ base64, mimeType });
        }
    };

    return (
        <div className="relative group aspect-square bg-gray-200 dark:bg-secondary-accent rounded-lg overflow-hidden flex items-center justify-center">
            {asset.type === 'image' ? (
                <img src={asset.dataUrl} alt={asset.prompt} className="w-full h-full object-cover" />
            ) : (
                <video src={asset.dataUrl} className="w-full h-full object-cover" controls muted loop />
            )}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-white text-center">
                <p className="text-xs font-semibold line-clamp-3 mb-2">{asset.prompt}</p>
                <div className="flex flex-col gap-1 w-full max-w-[90%]">
                    <button onClick={handleDownload} className="text-xs bg-white/20 hover:bg-white/40 rounded px-2 py-1 backdrop-blur-sm w-full">Download</button>
                    {asset.type === 'image' && (
                        <button onClick={handleUseForVideo} className="text-xs bg-white/20 hover:bg-white/40 rounded px-2 py-1 backdrop-blur-sm w-full">Use for Video</button>
                    )}
                </div>
                <button 
                    onClick={() => onDelete(asset.id)}
                    className="absolute top-1 right-1 bg-black/50 hover:bg-red-600 rounded-full h-5 w-5 flex items-center justify-center text-white text-xs"
                    aria-label="Delete asset"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

const AssetGallery: React.FC<AssetGalleryProps> = ({ assets, onDelete, onClearAll, onUseImage }) => {
    if (assets.length === 0) {
        return null; // Don't render anything if there's no history
    }

  return (
    <div className="flex flex-col space-y-4 p-6 bg-gray-100 dark:bg-secondary-accent/30 border border-dashed border-gray-300 dark:border-secondary-accent rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-primary-text">Generated Asset History</h2>
        <Button onClick={onClearAll} variant="secondary" className="w-auto py-2 px-4 text-sm">
            Clear All
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {assets.map(asset => (
          <AssetCard key={asset.id} asset={asset} onDelete={onDelete} onUseImage={onUseImage} />
        ))}
      </div>
      <p className="text-xs text-center text-gray-500 dark:text-secondary-text">
          Assets are stored in your browser's local storage and may be cleared if you clear your browser data.
      </p>
    </div>
  );
};

export default AssetGallery;
