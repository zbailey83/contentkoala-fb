import React from 'react';
import type { ClientService, PricingPackage, CustomSolutions, ServiceModalData } from '../types';

// Type guards to help TypeScript differentiate between the data types
const isService = (data: ServiceModalData): data is ClientService => 'sections' in data && 'fullDescription' in data;
const isPackage = (data: ServiceModalData): data is PricingPackage => 'investment' in data;
const isCustom = (data: ServiceModalData): data is CustomSolutions => 'items' in data && !('sections' in data);

const ServiceRenderer: React.FC<{ data: ClientService }> = ({ data }) => (
    <div className="space-y-4">
        <p className="text-gray-700 dark:text-secondary-text">{data.fullDescription}</p>
        {data.sections.map((section, index) => (
            <div key={index}>
                <h4 className="font-bold text-md text-gray-900 dark:text-primary-text mb-2">{section.title}</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-secondary-text">
                    {section.items.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}
                </ul>
            </div>
        ))}
        {data.perfectFor && (
            <div>
                <h4 className="font-bold text-md text-gray-900 dark:text-primary-text mb-2">Perfect For:</h4>
                <p className="text-gray-700 dark:text-secondary-text">{data.perfectFor}</p>
            </div>
        )}
    </div>
);

const PackageRenderer: React.FC<{ data: PricingPackage }> = ({ data }) => (
    <div className="space-y-4">
        <p className="font-semibold text-gray-800 dark:text-primary-text">{data.subtitle}</p>
        <div>
            <h4 className="font-bold text-md text-gray-900 dark:text-primary-text mb-2">What's Included:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-secondary-text">
                {data.whatsIncluded.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}
            </ul>
        </div>
        <div>
            <h4 className="font-bold text-md text-gray-900 dark:text-primary-text mb-2">Investment:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-secondary-text">
                {data.investment.setup && <li><strong>Setup:</strong> {data.investment.setup}</li>}
                {data.investment.monthly && <li><strong>Monthly:</strong> {data.investment.monthly}</li>}
                <li><strong>Total First Month:</strong> {data.investment.total}</li>
            </ul>
        </div>
        <div>
            <h4 className="font-bold text-md text-gray-900 dark:text-primary-text mb-2">Best For:</h4>
            <p className="text-gray-700 dark:text-secondary-text">{data.bestFor}</p>
        </div>
    </div>
);

const CustomRenderer: React.FC<{ data: CustomSolutions }> = ({ data }) => (
     <div className="space-y-4">
        <p className="text-gray-700 dark:text-secondary-text">{data.description}</p>
        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-secondary-text">
            {data.items.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}
        </ul>
    </div>
);


const ServiceDetail: React.FC<{ data: ServiceModalData }> = ({ data }) => {
    if (isService(data)) {
        return <ServiceRenderer data={data} />;
    }
    if (isPackage(data)) {
        return <PackageRenderer data={data} />;
    }
    if (isCustom(data)) {
        return <CustomRenderer data={data} />;
    }
    return <p>Invalid service data provided.</p>;
};

export default ServiceDetail;
