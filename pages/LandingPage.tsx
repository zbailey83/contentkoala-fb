import React from 'react';
import ThemeToggle from '../components/ThemeToggle';
import PricingCard from '../components/PricingCard';
import { CLIENT_SERVICES } from '../data/clientServicesData';
import type { ClientService } from '../types';

interface LandingPageProps {
  onSignInAsGuest: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="p-6 bg-white dark:bg-secondary-accent/50 rounded-lg border border-gray-200 dark:border-secondary-accent/70 shadow-sm">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-accent/10 text-accent dark:bg-accent/20 dark:text-purple-300">
      {icon}
    </div>
    <h3 className="mt-5 text-lg font-semibold text-gray-900 dark:text-primary-text">{title}</h3>
    <p className="mt-2 text-sm text-gray-600 dark:text-secondary-text">{description}</p>
  </div>
);

const serviceColorStyles = {
    purple: {
        iconContainer: 'bg-purple-100 dark:bg-accent/20',
        icon: 'text-accent dark:text-purple-400',
    },
    blue: {
        iconContainer: 'bg-blue-100 dark:bg-accent-blue/20',
        icon: 'text-accent-blue dark:text-blue-400',
    },
    green: {
        iconContainer: 'bg-emerald-100 dark:bg-accent-green/20',
        icon: 'text-accent-green dark:text-emerald-400',
    },
    orange: {
        iconContainer: 'bg-orange-100 dark:bg-orange-500/20',
        icon: 'text-orange-500 dark:text-orange-400',
    }
};

const ServiceCard: React.FC<{ service: ClientService }> = ({ service }) => {
    const { icon, title, shortDescription, colorScheme } = service;
    const styles = serviceColorStyles[colorScheme];
    return (
        <div className="p-6 bg-white dark:bg-secondary-accent/50 rounded-lg border border-gray-200 dark:border-secondary-accent/70 shadow-sm text-left">
            <div className={`inline-block p-3 rounded-lg ${styles.iconContainer}`}>
                {React.cloneElement(icon as React.ReactElement<{ className: string }>, { className: `h-6 w-6 ${styles.icon}` })}
            </div>
            <h3 className="mt-5 text-lg font-semibold text-gray-900 dark:text-primary-text">{title}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-secondary-text">{shortDescription}</p>
        </div>
    );
};


// Helper components for platform icons
const PlatformIcon: React.FC<{ children: React.ReactNode, delay?: string }> = ({ children, delay }) => (
    <div
        className="glowing-icon bg-white dark:bg-secondary-accent/50 rounded-full p-3 transition-transform hover:scale-110"
        style={{ animationDelay: delay }}
    >
        {children}
    </div>
);

const LinkedInIcon = () => (<svg className="h-6 w-6 text-gray-700 dark:text-gray-300" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 114.75 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.62 1.62 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.38.96 3.38 4.43z"></path></svg>);
const XIcon = () => (<svg className="h-6 w-6 text-gray-700 dark:text-gray-300" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>);
const FacebookIcon = () => (<svg className="h-6 w-6 text-gray-700 dark:text-gray-300" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v7.029A9.993 9.993 0 0022 12z"></path></svg>);
const GoogleIcon = () => (<svg className="h-6 w-6" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56,12.25C22.56,11.47 22.5,10.72 22.38,10H12V14.5H18.28C18.05,16.07 17.22,17.43 16,18.39V21.09H19.92C21.73,19.23 22.56,16.07 22.56,12.25Z"></path><path fill="#34A853" d="M12,23C15.24,23 17.96,21.92 19.92,20.09L16,17.39C14.93,18.1 13.57,18.5 12,18.5C9.11,18.5 6.6,16.57 5.69,14.09H1.77V16.89C3.73,20.57 7.55,23 12,23Z"></path><path fill="#FBBC05" d="M5.69,14.09C5.45,13.38 5.31,12.62 5.31,11.83C5.31,11.05 5.45,10.28 5.69,9.58V6.89H1.77C0.94,8.55 0.5,10.13 0.5,11.83C0.5,13.54 0.94,15.11 1.77,16.7L5.69,14.09Z"></path><path fill="#EA4335" d="M12,5.5C13.84,5.5 15.39,6.21 16.48,7.22L19.92,3.8C17.96,1.92 15.24,1 12,1C7.55,1 3.73,3.43 1.77,7.11L5.69,9.8C6.6,7.23 9.11,5.5 12,5.5Z"></path></svg>);
const InstagramIcon = () => (<svg className="h-6 w-6" viewBox="0 0 32 32"><defs><radialGradient id="landing-ig-grad" cx="0.3" cy="1.1" r="1.2"><stop offset="0%" stopColor="#fdf497" /><stop offset="50%" stopColor="#fd5949" /><stop offset="100%" stopColor="#d6249f" /></radialGradient></defs><rect width="32" height="32" rx="8" fill="url(#landing-ig-grad)" /><path d="M16 21.5a5.5 5.5 0 100-11 5.5 5.5 0 000 11z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M22.5 9.5h.015" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const SubstackIcon = () => (<svg className="h-6 w-6" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24l10.54-7.875L1.46 10.812zm21.08 0L12 16.125 1.46 24V10.812h21.08zM1.46 0v2.836h21.08V0H1.46z" fill="#FF652F"/></svg>);

const LandingPage: React.FC<LandingPageProps> = ({ onSignInAsGuest }) => {
  const logoDataUri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIkSURBVHhe7dMBAQAACMMg+6f+4wAStAQQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBBwY2EBAOJEg90AAAAASUVORK5CYII=";

  const features = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" /></svg>,
      title: 'AI Ad Generation',
      description: 'Create stunning, high-converting image and video ads from a single product photo in seconds.'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>,
      title: 'Social Post Writer',
      description: 'Generate engaging, platform-specific content for LinkedIn, X, Facebook, and blogs.'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>,
      title: 'GBP Optimizer',
      description: 'Craft keyword-rich business and service descriptions to dominate local search results.'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      title: 'Content Calendar',
      description: 'Plan, visualize, and organize your content strategy across all your marketing channels.'
    }
  ];

  const pricingPlans = [
    {
      planName: "Creator",
      price: "$9",
      priceFrequency: "/ month",
      description: "For soloprenuers and creators getting started.",
      features: [
        "100 Credits per month",
        "1 User Seat",
        "Access to All Tools",
        "Standard Support",
      ],
      isPopular: false,
    },
    {
      planName: "Pro",
      price: "$29",
      priceFrequency: "/ month",
      description: "For professionals and small teams.",
      features: [
        "500 Credits per month",
        "3 User Seats",
        "Access to All Tools",
        "Priority Support",
      ],
      isPopular: true,
    },
    {
      planName: "Team",
      price: "$89",
      priceFrequency: "/ month",
      description: "For growing businesses and agencies.",
      features: [
        "2000 Credits per month",
        "5 User Seats",
        "Team Collaboration Features",
        "Dedicated Account Manager",
      ],
      isPopular: false,
    },
  ];

  return (
    <div className="bg-white dark:bg-background text-gray-800 dark:text-gray-200 animate-fade-in">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-background/80 backdrop-blur-sm border-b border-gray-200 dark:border-secondary-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <img src={logoDataUri} alt="Content Koala Logo" className="h-8 w-8" />
              <span className="font-bold text-xl text-gray-800 dark:text-primary-text font-serif tracking-tight">Content Koala🐨</span>
            </div>
            
            <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
                <a
                  href="#client-services"
                  className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-accent/50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-background focus:ring-accent"
                >
                  Local SEO Client Services
                </a>
            </div>
            
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={onSignInAsGuest}
                className="px-4 py-2 text-sm font-semibold text-accent rounded-lg hover:bg-accent/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              >
                Sign in as Guest
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="text-center pt-20 pb-24 sm:pt-28 sm:pb-32 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight text-gray-900 dark:text-primary-text">
            Amplify Your Marketing with <span className="text-accent">Content Koala🐨</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-secondary-text">
            Content Koala🐨 is your all-in-one, AI powered toolkit for creating stunning ad creatives, social media posts, and optimized local SEO content in minutes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="w-full sm:w-auto text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-4 focus:ring-accent/50 hover:shadow-glow bg-accent">
              Start 14-Day Free Trial🐨
            </button>
            <button onClick={onSignInAsGuest} className="w-full sm:w-auto font-semibold py-3 px-6 rounded-lg transition-colors text-accent hover:bg-accent/10">
              Explore as Guest &rarr;
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 sm:py-24 bg-gray-50 dark:bg-secondary-accent/20 border-y border-gray-200 dark:border-secondary-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-black font-serif tracking-tight text-gray-900 dark:text-primary-text">A Powerful Toolkit for Modern Marketers</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-secondary-text">
                From ad creation to content planning, our AI tools are designed to streamline your workflow and boost your results.
              </p>
            </div>
            <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map(feature => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
            <div className="mt-20 flex justify-center items-center gap-4 sm:gap-6 flex-wrap px-4">
                <PlatformIcon delay="0s"><LinkedInIcon /></PlatformIcon>
                <PlatformIcon delay="0.1s"><XIcon /></PlatformIcon>
                <PlatformIcon delay="0.2s"><FacebookIcon /></PlatformIcon>
                <PlatformIcon delay="0.3s"><GoogleIcon /></PlatformIcon>
                <PlatformIcon delay="0.4s"><InstagramIcon /></PlatformIcon>
                <PlatformIcon delay="0.5s"><SubstackIcon /></PlatformIcon>
            </div>
          </div>
        </section>

        {/* Client Services Section */}
        <section id="client-services" className="py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-black font-serif tracking-tight text-gray-900 dark:text-primary-text">Local SEO Client Services</h2>
               <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-secondary-text">
                We offer a range of services designed to boost your local visibility and drive customers to your door.
              </p>
            </div>
            <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {CLIENT_SERVICES.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>


        {/* Pricing Section */}
        <section className="py-20 sm:py-24 bg-gray-50 dark:bg-secondary-accent/20 border-y border-gray-200 dark:border-secondary-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-black font-serif tracking-tight text-gray-900 dark:text-primary-text">Choose Your Plan</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-secondary-text">
                Start with a 14-day free trial.🐨 No credit card required.🐨
              </p>
            </div>
            <div className="mt-16 grid lg:grid-cols-3 gap-8 items-start max-w-5xl mx-auto">
              {pricingPlans.map(plan => (
                <PricingCard key={plan.planName} {...plan} />
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 mt-8">
              *Credits are used for generating content. Ex: 1 image = 3 credit, 1 social post = 1 credit, 1 video = 10 credits.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-secondary-accent">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500 dark:text-secondary-text">&copy; {new Date().getFullYear()} Content Koala 🐨 All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;