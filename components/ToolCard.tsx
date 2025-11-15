import React from 'react';

interface ToolCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
    colorScheme?: 'purple' | 'blue' | 'green' | 'orange';
    className?: string;
}

const colorStyles = {
    purple: {
        iconContainer: 'bg-purple-100 dark:bg-accent/20',
        icon: 'text-accent dark:text-purple-400',
        bg: 'bg-purple-50 dark:bg-secondary-accent/40',
        glowStart: 'rgba(139, 92, 246, 0.3)',
        glowEnd: 'rgba(139, 92, 246, 0.6)',
    },
    blue: {
        iconContainer: 'bg-blue-100 dark:bg-accent-blue/20',
        icon: 'text-accent-blue dark:text-blue-400',
        bg: 'bg-blue-50 dark:bg-secondary-accent/40',
        glowStart: 'rgba(59, 130, 246, 0.3)',
        glowEnd: 'rgba(59, 130, 246, 0.6)',
    },
    green: {
        iconContainer: 'bg-emerald-100 dark:bg-accent-green/20',
        icon: 'text-accent-green dark:text-emerald-400',
        bg: 'bg-emerald-50 dark:bg-secondary-accent/40',
        glowStart: 'rgba(16, 185, 129, 0.3)',
        glowEnd: 'rgba(16, 185, 129, 0.6)',
    },
    orange: {
        iconContainer: 'bg-orange-100 dark:bg-orange-500/20',
        icon: 'text-orange-500 dark:text-orange-400',
        bg: 'bg-orange-50 dark:bg-secondary-accent/40',
        glowStart: 'rgba(249, 115, 22, 0.3)',
        glowEnd: 'rgba(249, 115, 22, 0.6)',
    }
};


const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description, onClick, colorScheme = 'purple', className = '' }) => {
    const styles = colorStyles[colorScheme];

    return (
        <button
            onClick={onClick}
            style={{ 
                '--glow-color-start': styles.glowStart,
                '--glow-color-end': styles.glowEnd 
            } as React.CSSProperties}
            className={`tool-card group relative text-left p-6 border border-dashed border-gray-300 dark:border-secondary-accent rounded-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-background focus:ring-accent ${styles.bg} ${className}`}
        >
            <div className={`inline-block p-2 rounded-lg ${styles.iconContainer}`}>
                {/* FIX: Explicitly cast the icon to a ReactElement with a className prop to satisfy TypeScript's strict checking for cloneElement. */}
                {React.cloneElement(icon as React.ReactElement<{ className: string }>, { className: `h-6 w-6 ${styles.icon}` })}
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-primary-text mt-4">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-secondary-text mt-1">
                {description}
            </p>
        </button>
    );
};

export default ToolCard;