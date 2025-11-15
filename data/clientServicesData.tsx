import React from 'react';
import type { ClientService, PricingPackage, CustomSolutions } from '../types';

// Icons for the cards
const GbpDataIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>;
const WebsiteSeoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg>;
const SocialMediaIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.57-1.03-.094-2.342-1.274-2.822M11.996 12c-1.855 0-3.35-1.5-3.35-3.35S10.14 5.3 11.996 5.3s3.35 1.5 3.35 3.35-1.5 3.35-3.35 3.35z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12.996 12c0 .926-.38 1.75-.98 2.35m-5.42 2.852a9.093 9.093 0 003.44 1.282M12 21a9.094 9.094 0 003.741-.479m-11.135-4.511a9.094 9.094 0 013.44 1.282" /></svg>;
const CitationsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>;
const PricingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" /></svg>;
const CustomIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.25 21l-.648-.428a2.25 2.25 0 01-1.47-2.135L14.25 15l.428-.648a2.25 2.25 0 012.134-1.47L18 12.75l.648.428a2.25 2.25 0 011.47 2.135L20.75 18l-.428.648a2.25 2.25 0 01-2.135 1.47z" /></svg>;


export const CLIENT_SERVICES: ClientService[] = [
    {
        id: 'gbp',
        icon: <GbpDataIcon />,
        colorScheme: 'green',
        title: 'Google Business Profile Optimization',
        shortDescription: 'Transform your Google presence into a magnet for calls, visits, and bookings.',
        fullDescription: 'Transform your Google presence into a customer magnet that drives calls, visits, and bookings.',
        sections: [
            {
                title: "What's Included:",
                items: [
                    'Complete profile setup and optimization',
                    'Professional photo uploads and management',
                    'Strategic keyword optimization for maximum visibility',
                    'Review management and response strategy',
                    'Google Posts creation and scheduling',
                    'Competitor analysis and positioning',
                    'Monthly performance reporting and optimization'
                ]
            }
        ],
        perfectFor: 'Any local business wanting to dominate "near me" searches'
    },
    {
        id: 'website-seo',
        icon: <WebsiteSeoIcon />,
        colorScheme: 'blue',
        title: 'Website SEO & Optimization',
        shortDescription: 'Build a high-converting website that ranks at the top of Google searches.',
        fullDescription: 'Build a high-converting website that ranks at the top of Google and turns visitors into customers.',
        sections: [
            {
                title: 'Technical SEO Foundation:',
                items: [
                    'Comprehensive SEO audit and issue resolution',
                    'Site speed optimization and Core Web Vitals improvement',
                    'Mobile-first responsive design implementation',
                    'XML sitemap creation and submission',
                    'Schema markup for enhanced search visibility'
                ]
            },
            {
                title: 'Content & Structure:',
                items: [
                    'Keyword research and content strategy development',
                    'Service page optimization (800-1,200 words per page)',
                    'Location-specific landing pages for multi-area businesses',
                    'Blog content creation targeting customer questions',
                    'Internal linking strategy for maximum authority distribution'
                ]
            },
            {
                title: 'Performance & Conversion:',
                items: [
                    'Emergency landing pages for urgent service needs',
                    'Lead capture form optimization',
                    'Call tracking and conversion measurement',
                    'A/B testing for continuous improvement'
                ]
            }
        ],
        perfectFor: 'Businesses ready to invest in long-term organic growth'
    },
    {
        id: 'social-media',
        icon: <SocialMediaIcon />,
        colorScheme: 'purple',
        title: 'Social Media & Online Marketing',
        shortDescription: 'Build authority across every platform your customers use with strategic content.',
        fullDescription: 'Build authority across every platform your customers use with strategic content and engagement.',
        sections: [
            {
                title: 'Platform Management:',
                items: [
                    'Facebook and Instagram business page setup and optimization',
                    'Content calendar creation and post scheduling',
                    'Community engagement and follower growth strategies',
                    'Social media advertising campaign management (optional)',
                    'Review generation and reputation management across platforms'
                ]
            },
            {
                title: 'Content Creation:',
                items: [
                    'Custom graphics and visual content design',
                    'Educational posts that establish your expertise',
                    'Behind-the-scenes content that builds trust',
                    'Customer testimonial and success story features',
                    'Seasonal promotions and special offer campaigns'
                ]
            },
            {
                title: 'Marketing Integration:',
                items: [
                    'Email marketing setup and automation',
                    'Customer retention campaigns',
                    'Referral program development',
                    'Cross-platform promotional strategies'
                ]
            }
        ],
        perfectFor: 'Businesses wanting comprehensive digital marketing beyond just SEO'
    },
    {
        id: 'citations',
        icon: <CitationsIcon />,
        colorScheme: 'orange',
        title: 'Local Citations & Directory Management',
        shortDescription: 'Ensure consistent business information across 50+ online directories.',
        fullDescription: 'Ensure consistent business information across 50+ online directories and platforms.',
        sections: [
            {
                title: 'Citation Building:',
                items: [
                    'Major platform optimization (Google, Yelp, Facebook, Apple Maps)',
                    'Industry-specific directory submissions',
                    'Local chamber and community organization listings',
                    'Voice search optimization for Alexa, Siri, and Google Assistant',
                    'Navigation system integration (BMW, Mercedes, etc.)'
                ]
            },
            {
                title: 'Ongoing Management:',
                items: [
                    'Monthly citation audits and consistency checks',
                    'New citation opportunities identification and submission',
                    'Duplicate listing cleanup and correction',
                    'Review monitoring across all platforms',
                    'Quarterly citation health reports'
                ]
            }
        ],
        perfectFor: 'Established businesses wanting to strengthen their local authority'
    }
];

export const PRICING_PACKAGES: PricingPackage[] = [
    {
        id: 'starter',
        icon: <PricingIcon />,
        colorScheme: 'green',
        title: 'Starter Package',
        packageTitle: 'Starter Package - "Get Found Fast"',
        shortDescription: 'Perfect for new businesses or those just getting started with local SEO.',
        subtitle: 'Perfect for new businesses or those just getting started with local SEO',
        whatsIncluded: [
            'Google Business Profile complete optimization',
            'Basic website SEO audit and fixes',
            '5 high-priority local citations',
            'Monthly Google Posts (4 posts)',
            'Monthly social media (Facebook, Instagram, Linkedin) content creation (12 social posts)',
            'Review management and responses'
        ],
        investment: {
            setup: '$695',
            monthly: '$195',
            total: '$890'
        },
        bestFor: 'Service businesses, retail stores, restaurants getting started online'
    },
    {
        id: 'professional',
        icon: <PricingIcon />,
        colorScheme: 'blue',
        title: 'Professional Package',
        packageTitle: 'Professional Package - "Market Leader"',
        shortDescription: 'Everything you need to dominate your local market. Most Popular.',
        subtitle: 'Most Popular - Everything you need to dominate your local market',
        whatsIncluded: [
            'Complete Google Business Profile optimization',
            'Full website SEO overhaul',
            '10+ strategic local citations',
            'Social media setup (Facebook, Instagram, Linkedin)',
            'Monthly content creation (8 Google Posts, 24 social posts)',
            'Blog article creation (2 per month)',
            'Monthly performance reports'
        ],
        investment: {
            setup: '$1,495',
            monthly: '$395',
            total: '$1,890'
        },
        bestFor: 'Established businesses ready for serious growth'
    },
    {
        id: 'enterprise',
        icon: <PricingIcon />,
        colorScheme: 'purple',
        title: 'Enterprise Package',
        packageTitle: 'Enterprise Package - "Total Market Domination"',
        shortDescription: 'For businesses serious about crushing their competition.',
        subtitle: 'For businesses serious about crushing their competition',
        whatsIncluded: [
            'Everything in Professional Package PLUS:',
            'Advanced website development (unlimited pages)',
            '20+ premium local citations',
            'Full social media management with advertising',
            'Weekly blog content and SEO articles',
            'Competitor monitoring and analysis',
            'Priority support and monthly strategy calls',
            'Custom landing pages for special campaigns'
        ],
        investment: {
            setup: '$2,950',
            monthly: '$995',
            total: '$3,945'
        },
        bestFor: 'Multi-location businesses, established companies, competitive markets'
    }
];

export const CUSTOM_SOLUTIONS: CustomSolutions = {
    id: 'custom',
    icon: <CustomIcon />,
    colorScheme: 'orange',
    title: 'Custom Solutions',
    shortDescription: 'Have unique needs? We create custom packages tailored to your specific goals.',
    description: 'Have unique needs? We create custom packages tailored to your specific goals.',
    items: [
        'E-commerce SEO integration',
        'Multi-location business management',
        'Franchise SEO coordination',
        'Industry-specific compliance (medical, legal, financial)',
        'Large-scale content creation projects'
    ]
};
