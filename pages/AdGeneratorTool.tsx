import React, { useState, useCallback, useEffect } from 'react';
import Header from '../components/Header';
import ImageUploader from '../components/ImageUploader';
import StyleSelector from '../components/StyleSelector';
import Button from '../components/Button';
import GeneratedImage from '../components/GeneratedImage';
import VideoGenerator from '../components/VideoGenerator';
import { generateStyledImage, generateVideoAd } from '../services/geminiService';
import { IMAGE_STYLE_OPTIONS } from '../constants';
import type { UploadedFile, SavedAsset } from '../types';
import AssetGallery from '../components/AssetGallery';

interface AdGeneratorToolProps {
  onBackToDashboard: () => void;
}

const ASSET_HISTORY_KEY = 'contentkoala-asset-history';

const AdGeneratorTool: React.FC<AdGeneratorToolProps> = ({ onBackToDashboard }) => {
  // Input State
  const [primaryImage, setPrimaryImage] = useState<UploadedFile | null>(null);
  const [secondaryImage, setSecondaryImage] = useState<UploadedFile | null>(null);
  const [description, setDescription] = useState<string>('');
  
  // Image Generation State
  const [selectedImageStyles, setSelectedImageStyles] = useState<string[]>([]);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedText, setGeneratedText] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const [imageError, setImageError] = useState<string | null>(null);

  // Video Generation State
  const [videoSourceImage, setVideoSourceImage] = useState<UploadedFile | null>(null);
  const [videoDescription, setVideoDescription] = useState<string>('');
  const [selectedVideoStyles, setSelectedVideoStyles] = useState<string[]>([]);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  // History State
  const [assetHistory, setAssetHistory] = useState<SavedAsset[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(ASSET_HISTORY_KEY);
      if (savedHistory) {
        setAssetHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error("Failed to load asset history from localStorage", error);
      setAssetHistory([]);
    }
  }, []);

  // Clean up blob URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (generatedVideoUrl && generatedVideoUrl.startsWith('blob:')) {
        URL.revokeObjectURL(generatedVideoUrl);
      }
    };
  }, [generatedVideoUrl]);


  const resetImageOutput = () => {
    setGeneratedImage(null);
    setGeneratedText(null);
    setImageError(null);
  };
  
  const resetVideoOutput = () => {
    if (generatedVideoUrl && generatedVideoUrl.startsWith('blob:')) {
      URL.revokeObjectURL(generatedVideoUrl);
    }
    setGeneratedVideoUrl(null);
    setVideoError(null);
  }

  const handleImageUpload = (file: UploadedFile, type: 'primary' | 'secondary') => {
    resetImageOutput();
    resetVideoOutput();
    if (type === 'primary') {
      setPrimaryImage(file);
      setVideoSourceImage(null); // Reset video source if primary image changes
    } else {
      setSecondaryImage(file);
    }
  };
  
  const handleClearImage = (type: 'primary' | 'secondary') => {
    if (type === 'primary') {
      setPrimaryImage(null);
      setVideoSourceImage(null);
    } else {
      setSecondaryImage(null);
    }
  };

  const handleImageStyleToggle = (style: string) => {
    setSelectedImageStyles(prev => {
      if (prev.includes(style)) return prev.filter(s => s !== style);
      if (prev.length < 3) return [...prev, style];
      return prev;
    });
  };
  
  const handleVideoStyleToggle = (style: string) => {
    setSelectedVideoStyles(prev => {
      if (prev.includes(style)) return prev.filter(s => s !== style);
      if (prev.length < 3) return [...prev, style];
      return prev;
    });
  };

  const updateAssetHistory = (newHistory: SavedAsset[]) => {
    const sortedHistory = newHistory.sort((a, b) => b.timestamp - a.timestamp);
    setAssetHistory(sortedHistory);
    try {
        localStorage.setItem(ASSET_HISTORY_KEY, JSON.stringify(sortedHistory));
    } catch (error) {
        console.error("Failed to save asset history to localStorage", error);
        // Here you might want to alert the user that storage is full
    }
  };

  const handleSaveAsset = (assetData: Omit<SavedAsset, 'id' | 'timestamp'>) => {
      const newAsset: SavedAsset = {
          ...assetData,
          id: Date.now(),
          timestamp: Date.now(),
      };
      updateAssetHistory([newAsset, ...assetHistory]);
  };

  const handleDeleteAsset = (id: number) => {
      updateAssetHistory(assetHistory.filter(asset => asset.id !== id));
  };

  const handleClearAllAssets = () => {
      updateAssetHistory([]);
  };

  const handleGenerateImage = useCallback(async () => {
    if (!primaryImage || description.trim().length === 0 || selectedImageStyles.length === 0) {
      setImageError("Please upload a primary image, provide a description, and select at least one style.");
      return;
    }

    setIsGeneratingImage(true);
    resetImageOutput();
    resetVideoOutput();
    setVideoSourceImage(null);

    try {
      const result = await generateStyledImage(primaryImage, secondaryImage, description, selectedImageStyles);
      setGeneratedImage(result.imageUrl);
      setGeneratedText(result.text);

      if (result.imageUrl) {
        const match = result.imageUrl.match(/^data:(image\/[a-zA-Z]+);base64,(.*)$/);
        if (match && match[1]) {
            handleSaveAsset({
                type: 'image',
                dataUrl: result.imageUrl,
                mimeType: match[1],
                prompt: description,
            });
        }
      }

    } catch (e) {
      console.error(e);
      setImageError(e instanceof Error ? e.message : "An unknown error occurred. Please check the console.");
    } finally {
      setIsGeneratingImage(false);
    }
  }, [primaryImage, secondaryImage, description, selectedImageStyles, assetHistory]);
  
  const handleSetVideoSource = useCallback((file: UploadedFile) => {
    setVideoSourceImage(file);
    resetVideoOutput();
    document.getElementById('video-generator-section')?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  
  const handleClearVideoSource = () => {
    setVideoSourceImage(null);
  }

  const handleGenerateVideo = useCallback(async () => {
    const sourceImage = videoSourceImage || primaryImage;
    if (!sourceImage || videoDescription.trim().length === 0) {
      setVideoError("A source image and a video description are required to generate a video.");
      return;
    }
    
    setIsGeneratingVideo(true);
    resetVideoOutput();
    
    try {
      const videoBlob = await generateVideoAd(sourceImage, videoDescription, selectedVideoStyles);
      const url = URL.createObjectURL(videoBlob);
      setGeneratedVideoUrl(url);

      // Convert blob to base64 to save in history
      const reader = new FileReader();
      reader.readAsDataURL(videoBlob);
      reader.onloadend = () => {
          const base64data = reader.result as string;
          handleSaveAsset({
              type: 'video',
              dataUrl: base64data,
              mimeType: videoBlob.type,
              prompt: videoDescription,
          });
      };

    } catch (e) {
      console.error(e);
      setVideoError(e instanceof Error ? e.message : "An unknown error occurred during video generation.");
    } finally {
      setIsGeneratingVideo(false);
    }
  }, [primaryImage, videoSourceImage, videoDescription, selectedVideoStyles, assetHistory]);

  const canGenerateImage = primaryImage !== null && description.trim() !== '' && selectedImageStyles.length > 0 && !isGeneratingImage && !isGeneratingVideo;
  const canGenerateVideo = (primaryImage !== null || videoSourceImage !== null) && videoDescription.trim() !== '' && !isGeneratingImage && !isGeneratingVideo;
  const currentVideoSource = videoSourceImage || primaryImage;

  return (
    <>
      <div className="w-full max-w-7xl mx-auto pb-24 sm:pb-0 animate-fade-in">
        <Header 
          title={<>AI Ad <span className="text-accent">Creative</span> Generator</>}
          subtitle="Transform your product photos into stunning image and video ads with Gemini."
        />
        <div className="flex flex-col gap-8">
          {/* Top Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Inputs Card */}
            <div className="flex flex-col space-y-6 p-6 bg-purple-100/30 dark:bg-accent/20 border border-dashed border-gray-300 dark:border-secondary-accent rounded-lg">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-primary-text mb-3"><span className="text-accent">1.</span> Upload Photos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ImageUploader
                    value={primaryImage}
                    onImageUpload={(file) => handleImageUpload(file, 'primary')}
                    onClear={() => handleClearImage('primary')}
                    label="Primary Product Photo*"
                  />
                  <ImageUploader
                    value={secondaryImage}
                    onImageUpload={(file) => handleImageUpload(file, 'secondary')}
                    onClear={() => handleClearImage('secondary')}
                    label="Context Image (Optional)"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-primary-text mb-3"><span className="text-accent">2.</span> Describe Your Ad*</h2>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., A refreshing drink for a hot summer day, highlighting its natural ingredients."
                  className="w-full h-24 p-3 bg-white dark:bg-background border border-gray-300 dark:border-secondary-accent text-gray-900 dark:text-primary-text rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent dark:focus:border-transparent transition-colors"
                  maxLength={200}
                  aria-required="true"
                />
                <p className="text-right text-xs text-gray-500 dark:text-secondary-text mt-1">{description.length} / 200</p>
              </div>
            </div>
            {/* Image Generation Card */}
            <div className="flex flex-col space-y-4 p-6 bg-purple-100/30 dark:bg-accent/20 border border-dashed border-gray-300 dark:border-secondary-accent rounded-lg">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-primary-text mb-3"><span className="text-accent">3.</span> Generate Ad Image</h2>
                <p className="text-sm text-gray-600 dark:text-secondary-text mb-4">Choose up to 3 styles to apply to your ad image.</p>
                <StyleSelector
                  styles={IMAGE_STYLE_OPTIONS}
                  selectedStyles={selectedImageStyles}
                  onStyleToggle={handleImageStyleToggle}
                />
              </div>
              <div className="pt-2">
                <Button onClick={handleGenerateImage} disabled={!canGenerateImage}>
                  {isGeneratingImage ? 'Generating...' : '✨ Generate Ad Image'}
                </Button>
              </div>
              <div className="flex-grow flex flex-col">
                <GeneratedImage
                  isGenerating={isGeneratingImage}
                  imageUrl={generatedImage}
                  text={generatedText}
                  error={imageError}
                  onUseForVideo={handleSetVideoSource}
                />
              </div>
            </div>
          </div>
          
          {/* Bottom Row: Video Card */}
          <div id="video-generator-section">
            <VideoGenerator
                isGenerating={isGeneratingVideo}
                videoUrl={generatedVideoUrl}
                error={videoError}
                videoDescription={videoDescription}
                onVideoDescriptionChange={setVideoDescription}
                selectedStyles={selectedVideoStyles}
                onStyleToggle={handleVideoStyleToggle}
                onGenerate={handleGenerateVideo}
                disabled={!canGenerateVideo}
                sourceImage={currentVideoSource}
                isCustomSource={!!videoSourceImage}
                onClearCustomSource={handleClearVideoSource}
              />
          </div>

          {/* Asset History */}
          <div className="mt-8">
            <AssetGallery
              assets={assetHistory}
              onDelete={handleDeleteAsset}
              onClearAll={handleClearAllAssets}
              onUseImage={handleSetVideoSource}
            />
          </div>
        </div>
      </div>
      {/* Mobile-only back button */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-background/80 border-t border-gray-200 dark:border-secondary-accent z-10 backdrop-blur-sm">
          <Button onClick={onBackToDashboard} variant="secondary">
              &larr; Back to Dashboard
          </Button>
      </div>
    </>
  );
};

export default AdGeneratorTool;
