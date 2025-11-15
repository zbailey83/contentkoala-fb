import React from 'react';

interface PricingCardProps {
  planName: string;
  price: string;
  priceFrequency: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ planName, price, priceFrequency, description, features, isPopular = false }) => {
  const popularClasses = isPopular ? 'border-accent dark:border-purple-400 scale-105 border-2 shadow-glow' : 'border-gray-200 dark:border-secondary-accent';
  const buttonClasses = isPopular
    ? 'bg-accent text-white hover:bg-purple-700'
    : 'bg-accent/10 text-accent hover:bg-accent/20 dark:bg-secondary-accent dark:text-primary-text dark:hover:bg-[#333]';

  return (
    <div className={`p-8 rounded-xl border flex flex-col h-full transition-all duration-300 ${popularClasses} ${isPopular ? 'bg-white dark:bg-background' : 'bg-gray-50 dark:bg-secondary-accent/20'}`}>
      {isPopular && (
        <div className="text-center mb-4">
          <span className="px-3 py-1 text-xs font-semibold tracking-wider text-purple-700 bg-purple-200 rounded-full dark:bg-purple-400/30 dark:text-purple-300">
            MOST POPULAR
          </span>
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-primary-text text-center">{planName}</h3>
      <p className="mt-4 text-center text-gray-600 dark:text-secondary-text">{description}</p>
      <div className="mt-6 flex items-baseline justify-center gap-x-1">
        <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-primary-text">{price}</span>
        <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600 dark:text-secondary-text">{priceFrequency}</span>
      </div>
      <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-secondary-text">
        {features.map(feature => (
          <li key={feature} className="flex gap-x-3">
            <svg className="h-6 w-5 flex-none text-accent" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button
        className={`w-full font-bold py-3 px-6 rounded-lg transition-colors duration-300 mt-8 focus:outline-none focus:ring-4 focus:ring-accent/50 ${buttonClasses}`}
      >
        Start Free Trial
      </button>
    </div>
  );
};

export default PricingCard;
