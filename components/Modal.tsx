import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 animate-fade-in" 
            style={{ animationDuration: '0.3s' }}
            aria-modal="true"
            role="dialog"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-background border-2 border-gray-900/80 dark:border-primary-accent/80 rounded-lg w-full max-w-3xl m-4 flex flex-col max-h-[90vh]"
                onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-secondary-accent flex-shrink-0">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-primary-text">{title}</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 dark:text-secondary-text hover:text-gray-800 dark:hover:text-primary-text transition-colors"
                        aria-label="Close modal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-6 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
