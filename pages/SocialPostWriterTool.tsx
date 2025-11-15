import React, { useState, useCallback } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import { generateSocialPost, generateBlogHeroImage } from '../services/geminiService';
import { POST_TYPES, TONE_OPTIONS, LENGTH_OPTIONS } from '../constants';

type InputType = 'topic' | 'url';

interface SocialPostWriterToolProps {
    onBackToDashboard: () => void;
}

const OptionButton: React.FC<{
    label: string;
    isSelected: boolean;
    onClick: () => void;
}> = ({ label, isSelected, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2.5 rounded-lg text-sm font-semibold text-center transition-all duration-200 transform focus:outline-none focus:ring-4 focus:ring-accent-blue/50
            ${isSelected
                ? 'bg-accent-blue text-white shadow-md scale-105'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 dark:bg-secondary-accent dark:text-secondary-text dark:hover:bg-[#333]'
            }`}
    >
        {label}
    </button>
);

export const SocialPostWriterTool: React.FC<SocialPostWriterToolProps> = ({ onBackToDashboard }) => {
    const [inputType, setInputType] = useState<InputType>('topic');
    const [inputValue, setInputValue] = useState('');
    const [postType, setPostType] = useState<string>(POST_TYPES.LINKEDIN);
    const [tone, setTone] = useState<string>(TONE_OPTIONS[0]);
    const [length, setLength] = useState<string>(LENGTH_OPTIONS[1]);
    
    const [generatedContent, setGeneratedContent] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [heroImageUrl, setHeroImageUrl] = useState<string | null>(null);
    const [isGeneratingHeroImage, setIsGeneratingHeroImage] = useState(false);
    const [heroImageError, setHeroImageError] = useState<string | null>(null);

    const [copied, setCopied] = useState(false);

    const handleGenerate = useCallback(async () => {
        if (inputValue.trim() === '') {
            setError('Please enter a topic or URL.');
            return;
        }

        setIsGenerating(true);
        setError(null);
        setGeneratedContent('');
        setHeroImageUrl(null);
        setHeroImageError(null);

        try {
            const result = await generateSocialPost({
                inputType,
                inputValue,
                postType,
                tone,
                length
            });
            setGeneratedContent(result);
        } catch (e) {
            console.error(e);
            setError(e instanceof Error ? e.message : 'An unknown error occurred.');
        } finally {
            setIsGenerating(false);
        }
    }, [inputType, inputValue, postType, tone, length]);

    const handleGenerateHeroImage = useCallback(async () => {
        if (!generatedContent) return;
    
        setIsGeneratingHeroImage(true);
        setHeroImageError(null);
        
        try {
            const imageUrl = await generateBlogHeroImage(generatedContent);
            setHeroImageUrl(imageUrl);
        } catch (e) {
            console.error(e);
            setHeroImageError(e instanceof Error ? e.message : 'An unknown error occurred while generating the hero image.');
        } finally {
            setIsGeneratingHeroImage(false);
        }
    }, [generatedContent]);
    
    const handleCopy = () => {
        if(generatedContent) {
            navigator.clipboard.writeText(generatedContent);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const isGenerateDisabled = inputValue.trim() === '' || isGenerating;
    
    const renderOutput = () => {
        if (isGenerating) {
            return (
                <div className="text-center">
                    <Spinner />
                    <p className="mt-4 text-gray-800 dark:text-primary-text">Crafting your social post...</p>
                </div>
            );
        }
        
        if(error) {
            return (
                <div className="text-center text-red-700 dark:text-error bg-red-100 dark:bg-error/20 p-4 rounded-lg">
                    <h3 className="font-bold">Generation Failed</h3>
                    <p className="mt-2 text-sm">{error}</p>
                </div>
            );
        }

        if (generatedContent) {
            return (
                <div className="prose prose-sm max-w-none whitespace-pre-wrap w-full text-gray-700 dark:text-secondary-text prose-headings:text-gray-900 dark:prose-headings:text-primary-text">
                  {generatedContent}
                </div>
            );
        }
        
        // Don't show placeholder if image is being generated or exists
        if (isGeneratingHeroImage || heroImageUrl) return null;

        return (
            <div className="text-center text-gray-500 dark:text-secondary-text">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
                </svg>
                <p className="mt-4">Your generated post will appear here.</p>
            </div>
        );
    };

    return (
        <>
            <div className="w-full max-w-7xl mx-auto pb-24 sm:pb-0 animate-fade-in">
                <Header 
                    title={<>Social Post <span className="text-accent-blue">Writer</span></>}
                    subtitle="Generate engaging content for your social media platforms in seconds."
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Side: Inputs */}
                    <div className="flex flex-col space-y-6 p-6 bg-blue-100/30 dark:bg-accent-blue/20 border border-dashed border-gray-300 dark:border-secondary-accent rounded-lg">
                        {/* Input Type */}
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-primary-text mb-3"><span className="text-accent-blue">1.</span> Provide Context</h2>
                            <div className="flex space-x-2 rounded-lg bg-gray-200 dark:bg-secondary-accent p-1">
                                <button onClick={() => setInputType('topic')} className={`w-full py-2 text-sm font-medium rounded-md transition-colors ${inputType === 'topic' ? 'bg-white text-gray-900 dark:bg-accent-blue/80 dark:text-white' : 'text-gray-600 dark:text-secondary-text hover:bg-gray-300 dark:hover:bg-[#333]'}`}>Subject / Topic</button>
                                <button onClick={() => setInputType('url')} className={`w-full py-2 text-sm font-medium rounded-md transition-colors ${inputType === 'url' ? 'bg-white text-gray-900 dark:bg-accent-blue/80 dark:text-white' : 'text-gray-600 dark:text-secondary-text hover:bg-gray-300 dark:hover:bg-[#333]'}`}>URL (Website/Video)</button>
                            </div>
                            {inputType === 'topic' ? (
                                <textarea
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="e.g., The benefits of using our new productivity app for small teams."
                                    className="mt-3 w-full h-28 p-3 bg-white dark:bg-background border border-gray-300 dark:border-secondary-accent text-gray-900 dark:text-primary-text rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent dark:focus:border-transparent transition-colors"
                                />
                            ) : (
                                <input
                                    type="url"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="e.g., https://my-awesome-product.com/features"
                                    className="mt-3 w-full p-3 bg-white dark:bg-background border border-gray-300 dark:border-secondary-accent text-gray-900 dark:text-primary-text rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent dark:focus:border-transparent transition-colors"
                                />
                            )}
                        </div>
                        {/* Platform */}
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-primary-text mb-3"><span className="text-accent-blue">2.</span> Choose Platform</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {Object.values(POST_TYPES).map(type => (
                                    <OptionButton key={type} label={type} isSelected={postType === type} onClick={() => setPostType(type)} />
                                ))}
                            </div>
                        </div>
                         {/* Attributes */}
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-primary-text mb-3"><span className="text-accent-blue">3.</span> Set Attributes</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-medium text-gray-600 dark:text-secondary-text mb-2 text-sm">Tone of Voice</h3>
                                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                        {TONE_OPTIONS.map(opt => <OptionButton key={opt} label={opt} isSelected={tone === opt} onClick={() => setTone(opt)} />)}
                                    </div>
                                </div>
                                 <div>
                                    <h3 className="font-medium text-gray-600 dark:text-secondary-text mb-2 text-sm">Length</h3>
                                    <div className="grid grid-cols-3 gap-2">
                                        {LENGTH_OPTIONS.map(opt => <OptionButton key={opt} label={opt} isSelected={length === opt} onClick={() => setLength(opt)} />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Generate Button */}
                        <div className="pt-4">
                            <Button onClick={handleGenerate} disabled={isGenerateDisabled}>
                                {isGenerating ? 'Generating...' : '✍️ Generate Post'}
                            </Button>
                        </div>
                    </div>
                    {/* Right Side: Output */}
                    <div className="flex flex-col space-y-4 p-6 bg-blue-100/30 dark:bg-accent-blue/20 border border-dashed border-gray-300 dark:border-secondary-accent rounded-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-primary-text">Generated Content</h2>
                            <div className="flex items-center gap-2">
                                {generatedContent && !isGenerating && (
                                    <Button
                                        onClick={handleGenerateHeroImage}
                                        disabled={isGeneratingHeroImage || isGenerating}
                                        variant="secondary"
                                        className="w-auto py-2 px-3 text-sm"
                                    >
                                        {isGeneratingHeroImage ? 'Generating...' : '🖼️ Generate Hero Image'}
                                    </Button>
                                )}
                                <Button onClick={handleCopy} disabled={!generatedContent || isGenerating} variant="secondary" className="w-auto py-2 px-3 text-sm">
                                    {copied ? 'Copied!' : '📋 Copy Text'}
                                </Button>
                            </div>
                        </div>
                        <div className="flex-grow w-full flex flex-col items-stretch justify-start bg-gray-100 dark:bg-secondary-accent/50 rounded-lg p-4 min-h-[400px] overflow-y-auto space-y-4">
                            {/* Hero Image Section */}
                            {isGeneratingHeroImage && (
                                <div className="text-center">
                                    <Spinner />
                                    <p className="mt-4 text-gray-800 dark:text-primary-text">Generating hero image...</p>
                                </div>
                            )}
                            {heroImageError && (
                                <div className="text-center text-red-700 dark:text-error bg-red-100 dark:bg-error/20 p-4 rounded-lg">
                                    <h3 className="font-bold">Image Generation Failed</h3>
                                    <p className="mt-2 text-sm">{heroImageError}</p>
                                </div>
                            )}
                            {heroImageUrl && (
                                <img src={heroImageUrl} alt="Generated blog hero" className="w-full rounded-lg" />
                            )}
                            
                            {/* Text Section */}
                            <div className={`w-full flex-grow flex items-center justify-center`}>
                                {renderOutput()}
                            </div>
                        </div>
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