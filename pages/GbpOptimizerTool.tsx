import React, { useState, useCallback } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import { generateGbpDescription, generateGbpServiceDescription } from '../services/geminiService';
import { GBP_TONE_OPTIONS } from '../constants';

interface GbpOptimizerToolProps {
    onBackToDashboard: () => void;
}

const OptionButton: React.FC<{ label: string; isSelected: boolean; onClick: () => void; }> = ({ label, isSelected, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2.5 rounded-lg text-sm font-semibold text-center transition-all duration-200 transform focus:outline-none focus:ring-4 focus:ring-accent-green/50
            ${isSelected
                ? 'bg-accent-green text-white shadow-md scale-105'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 dark:bg-secondary-accent dark:text-secondary-text dark:hover:bg-[#333]'
            }`}
    >
        {label}
    </button>
);

const LabeledInput: React.FC<{ label: string; children: React.ReactNode; }> = ({ label, children }) => (
    <div>
        <label className="block text-sm font-bold text-gray-900 dark:text-primary-text mb-2">{label}</label>
        {children}
    </div>
);

type ServiceDescriptionStatus = 'idle' | 'loading' | 'success' | 'error';
interface ServiceDescriptionState {
    status: ServiceDescriptionStatus;
    content: string;
    error?: string | null;
}

const GbpOptimizerTool: React.FC<GbpOptimizerToolProps> = ({ onBackToDashboard }) => {
    // Input state
    const [businessName, setBusinessName] = useState('');
    const [address, setAddress] = useState('');
    const [categories, setCategories] = useState('');
    const [services, setServices] = useState('');
    const [usp, setUsp] = useState('');
    const [tone, setTone] = useState(GBP_TONE_OPTIONS[0]);

    // Business Description state
    const [gbpDescription, setGbpDescription] = useState('');
    const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
    const [descriptionError, setDescriptionError] = useState<string | null>(null);

    // Service Descriptions state
    const [serviceDescriptions, setServiceDescriptions] = useState<Record<string, ServiceDescriptionState>>({});
    const [isGeneratingServices, setIsGeneratingServices] = useState(false);

    const handleGenerateDescription = useCallback(async () => {
        setIsGeneratingDescription(true);
        setDescriptionError(null);
        try {
            const serviceList = services.split('\n').filter(s => s.trim() !== '');
            const result = await generateGbpDescription({
                name: businessName,
                address,
                categories,
                services: serviceList,
                usp,
                tone
            });
            setGbpDescription(result);
        } catch (e) {
            setDescriptionError(e instanceof Error ? e.message : 'An unknown error occurred.');
        } finally {
            setIsGeneratingDescription(false);
        }
    }, [businessName, address, categories, services, usp, tone]);

    const handleGenerateServices = useCallback(async () => {
        const serviceList = services.split('\n').filter(s => s.trim() !== '');
        if (serviceList.length === 0 || isGeneratingServices) return;

        setIsGeneratingServices(true);
        const initialStates = serviceList.reduce((acc, service) => {
            acc[service] = { status: 'loading', content: '' };
            return acc;
        }, {} as Record<string, ServiceDescriptionState>);
        setServiceDescriptions(initialStates);

        const city = address.split(',').pop()?.trim() || address;
        const primaryCategory = categories.split(',')[0]?.trim() || 'business';

        for (const service of serviceList) {
            try {
                const description = await generateGbpServiceDescription({
                    serviceName: service,
                    businessName: businessName,
                    city: city,
                    primaryCategory: primaryCategory,
                    tone: tone
                });
                setServiceDescriptions(prev => ({
                    ...prev,
                    [service]: { status: 'success', content: description, error: null }
                }));
            } catch (e) {
                setServiceDescriptions(prev => ({
                    ...prev,
                    [service]: { status: 'error', content: '', error: e instanceof Error ? e.message : 'Failed to generate' }
                }));
            }
        }
        setIsGeneratingServices(false);
    }, [services, businessName, address, categories, tone, isGeneratingServices]);

    const handleCopyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const charCount = gbpDescription.length;
    const isDescriptionFormValid = businessName && address && categories && services && usp;

    return (
        <>
            <div className="w-full max-w-7xl mx-auto pb-24 sm:pb-0 animate-fade-in">
                <Header
                    title={<>Google Business Profile <span className="text-accent-green">Optimizer</span></>}
                    subtitle="Generate compelling, SEO-friendly descriptions for your business and services."
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* LEFT: INPUTS */}
                    <div className="flex flex-col space-y-6 p-6 bg-emerald-100/30 dark:bg-accent-green/20 border border-dashed border-gray-300 dark:border-secondary-accent rounded-lg">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-primary-text"><span className="text-accent-green">1.</span> Enter Business Details</h2>
                        <LabeledInput label="Business Name">
                            <input type="text" value={businessName} onChange={e => setBusinessName(e.target.value)} placeholder="e.g., Sarah's Sunny Cafe" className="w-full p-3 bg-white dark:bg-background border border-gray-300 dark:border-secondary-accent text-gray-900 dark:text-primary-text rounded-lg focus:ring-2 focus:ring-accent-green focus:border-transparent dark:focus:border-transparent" />
                        </LabeledInput>
                        <LabeledInput label="Address / City">
                            <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="e.g., San Francisco, CA" className="w-full p-3 bg-white dark:bg-background border border-gray-300 dark:border-secondary-accent text-gray-900 dark:text-primary-text rounded-lg focus:ring-2 focus:ring-accent-green focus:border-transparent dark:focus:border-transparent" />
                        </LabeledInput>
                        <LabeledInput label="Primary & Secondary Categories">
                            <input type="text" value={categories} onChange={e => setCategories(e.target.value)} placeholder="e.g., Coffee Shop, Breakfast Restaurant" className="w-full p-3 bg-white dark:bg-background border border-gray-300 dark:border-secondary-accent text-gray-900 dark:text-primary-text rounded-lg focus:ring-2 focus:ring-accent-green focus:border-transparent dark:focus:border-transparent" />
                        </LabeledInput>
                        <LabeledInput label="Services (one per line)">
                            <textarea value={services} onChange={e => setServices(e.target.value)} placeholder={"e.g.,\nEspresso Drinks\nPastries\nSandwiches"} rows={5} className="w-full p-3 bg-white dark:bg-background border border-gray-300 dark:border-secondary-accent text-gray-900 dark:text-primary-text rounded-lg focus:ring-2 focus:ring-accent-green focus:border-transparent dark:focus:border-transparent" />
                        </LabeledInput>
                        <LabeledInput label="Unique Selling Proposition (USP)">
                             <textarea value={usp} onChange={e => setUsp(e.target.value)} placeholder="e.g., We use locally-sourced, organic beans." rows={3} className="w-full p-3 bg-white dark:bg-background border border-gray-300 dark:border-secondary-accent text-gray-900 dark:text-primary-text rounded-lg focus:ring-2 focus:ring-accent-green focus:border-transparent dark:focus:border-transparent" />
                        </LabeledInput>
                        <LabeledInput label="Tone of Voice">
                             <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                {GBP_TONE_OPTIONS.map(opt => <OptionButton key={opt} label={opt} isSelected={tone === opt} onClick={() => setTone(opt)} />)}
                            </div>
                        </LabeledInput>
                    </div>

                    {/* RIGHT: OUTPUTS */}
                    <div className="flex flex-col space-y-8">
                        {/* Business Description */}
                        <div className="flex flex-col space-y-4 p-6 bg-emerald-100/30 dark:bg-accent-green/20 border border-dashed border-gray-300 dark:border-secondary-accent rounded-lg">
                             <h2 className="text-xl font-bold text-gray-900 dark:text-primary-text"><span className="text-accent-green">2.</span> Generate Business Description</h2>
                             <Button onClick={handleGenerateDescription} disabled={!isDescriptionFormValid || isGeneratingDescription}>
                                {isGeneratingDescription ? 'Generating...' : 'Generate Description'}
                             </Button>
                            <div className="flex gap-4">
                                <div className="flex-grow">
                                    <textarea value={gbpDescription} onChange={e => setGbpDescription(e.target.value)} rows={10} className="w-full p-3 bg-gray-100 dark:bg-secondary-accent/50 border border-gray-300 dark:border-secondary-accent text-gray-900 dark:text-primary-text rounded-lg focus:ring-2 focus:ring-accent-green focus:border-transparent dark:focus:border-transparent" placeholder="Your generated business description will appear here." />
                                    <div className="mt-2">
                                        <div className="relative w-full bg-gray-200 dark:bg-secondary-accent rounded-full h-2">
                                            <div className="bg-accent-green h-2 rounded-full" style={{ width: `${Math.min(charCount / 750 * 100, 100)}%` }}></div>
                                            {/* 250 character marker */}
                                            <div className="absolute top-0 h-2 w-0.5 bg-red-500" style={{ left: `${250 / 750 * 100}%` }} title="250 character mark"></div>
                                        </div>
                                        <p className={`text-right text-sm mt-1 ${charCount > 750 ? 'text-red-500' : 'text-gray-600 dark:text-secondary-text'}`}>{charCount} / 750</p>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <Button onClick={() => handleCopyToClipboard(gbpDescription)} variant="secondary" className="w-auto py-2 px-3 text-sm" disabled={!gbpDescription}>Copy</Button>
                                        <Button onClick={handleGenerateDescription} variant="secondary" className="w-auto py-2 px-3 text-sm" disabled={!isDescriptionFormValid || isGeneratingDescription}>Regenerate</Button>
                                    </div>
                                </div>
                                <ul className="text-xs space-y-2 p-3 bg-gray-100 dark:bg-secondary-accent/50 rounded-lg w-48 text-gray-600 dark:text-secondary-text">
                                    <li className="font-bold">Google Guidelines</li>
                                    <li>✓ No links or URLs</li>
                                    <li>✓ No phone numbers</li>
                                    <li>✓ No promotional language (e.g., "50% off")</li>
                                </ul>
                            </div>
                            {descriptionError && <p className="text-red-500 text-sm">{descriptionError}</p>}
                        </div>

                        {/* Service Descriptions */}
                        <div className="flex flex-col space-y-4 p-6 bg-emerald-100/30 dark:bg-accent-green/20 border border-dashed border-gray-300 dark:border-secondary-accent rounded-lg">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-primary-text"><span className="text-accent-green">3.</span> Generate Service Descriptions</h2>
                            <Button onClick={handleGenerateServices} disabled={!isDescriptionFormValid || isGeneratingServices || services.trim() === ''}>
                                {isGeneratingServices ? 'Generating...' : 'Generate All Service Descriptions'}
                            </Button>
                            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                                {services.split('\n').filter(s => s.trim() !== '').map(service => {
                                    const state = serviceDescriptions[service];
                                    return (
                                        <div key={service}>
                                            <h4 className="font-bold text-gray-900 dark:text-primary-text">{service}</h4>
                                            <div className="mt-1 p-3 bg-gray-100 dark:bg-secondary-accent/50 rounded-lg text-sm text-gray-700 dark:text-secondary-text min-h-[60px] relative">
                                                {state?.status === 'loading' && <div className="absolute inset-0 flex items-center justify-center"><Spinner /></div>}
                                                {state?.status === 'error' && <p className="text-red-500">{state.error}</p>}
                                                {state?.status === 'success' && <p>{state.content}</p>}
                                                {state?.status === 'success' && <button onClick={() => handleCopyToClipboard(state.content)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white p-1" aria-label="Copy service description"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" /><path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h6a2 2 0 00-2-2H5z" /></svg></button>}
                                            </div>
                                        </div>
                                    );
                                })}
                                {Object.keys(serviceDescriptions).length === 0 && <p className="text-sm text-gray-500 dark:text-secondary-text text-center py-4">Generated service descriptions will appear here.</p>}
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

export default GbpOptimizerTool;