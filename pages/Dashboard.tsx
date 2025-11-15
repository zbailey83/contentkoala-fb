import React from 'react';
import Header from '../components/Header';
import ToolCard from '../components/ToolCard';
import type { Tool } from '../types';

// Non-animated icons
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18M-4.5 12h28.5" /></svg>;
const BlogIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>;
const ServicesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M12 20.904v-5.413m0 0a50.57 50.57 0 0 1-2.658-.813m2.658.813A50.57 50.57 0 0 0 12 13.489c-1.532 0-3.022.203-4.444.6V17.5a2.25 2.25 0 0 0 2.25 2.25h5.332c.33.041.65.09.966.148m-2.932-5.413a50.649 50.649 0 0 0 2.658-.813" /></svg>

// Animated Platform Icons
const AnimatedInstagramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} className={`animated-icon instagram-icon ${props.className || ''}`} viewBox="0 0 32 32">
      <defs>
          <radialGradient id="instagram-gradient" className="instagram-gradient" cx="0.3" cy="1.1" r="1.2">
              <stop className="instagram-gradient-stop-1" offset="0%" stopColor="#fdf497" />
              <stop className="instagram-gradient-stop-2" offset="50%" stopColor="#fd5949" />
              <stop className="instagram-gradient-stop-3" offset="100%" stopColor="#d6249f" />
          </radialGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#instagram-gradient)" />
      <path d="M16 21.5a5.5 5.5 0 100-11 5.5 5.5 0 000 11z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22.5 9.5h.015" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AnimatedLinkedInIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} className={`animated-icon linkedin-icon ${props.className || ''}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 114.75 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.62 1.62 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.38.96 3.38 4.43z"></path>
  </svg>
);

const AnimatedXIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} className={`animated-icon x-icon ${props.className || ''}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

const AnimatedFacebookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} className={`animated-icon facebook-icon ${props.className || ''}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v7.029A9.993 9.993 0 0022 12z"></path>
  </svg>
);

const AnimatedGbpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} className={`animated-icon gbp-icon ${props.className || ''}`} viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56,12.25C22.56,11.47 22.5,10.72 22.38,10H12V14.5H18.28C18.05,16.07 17.22,17.43 16,18.39V21.09H19.92C21.73,19.23 22.56,16.07 22.56,12.25Z"></path>
    <path fill="#34A853" d="M12,23C15.24,23 17.96,21.92 19.92,20.09L16,17.39C14.93,18.1 13.57,18.5 12,18.5C9.11,18.5 6.6,16.57 5.69,14.09H1.77V16.89C3.73,20.57 7.55,23 12,23Z"></path>
    <path fill="#FBBC05" d="M5.69,14.09C5.45,13.38 5.31,12.62 5.31,11.83C5.31,11.05 5.45,10.28 5.69,9.58V6.89H1.77C0.94,8.55 0.5,10.13 0.5,11.83C0.5,13.54 0.94,15.11 1.77,16.7L5.69,14.09Z"></path>
    <path fill="#EA4335" d="M12,5.5C13.84,5.5 15.39,6.21 16.48,7.22L19.92,3.8C17.96,1.92 15.24,1 12,1C7.55,1 3.73,3.43 1.77,7.11L5.69,9.8C6.6,7.23 9.11,5.5 12,5.5Z"></path>
  </svg>
);

interface DashboardProps {
    onNavClick: (tool: Tool) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavClick }) => {

    const dashboardTools = [
      {
        key: 'reels',
        icon: <AnimatedInstagramIcon />,
        title: 'Instagram Reels Video',
        description: 'Generate short, engaging video content for Instagram Reels from a single image.',
        onClick: () => onNavClick('ad-generator'),
        colorScheme: 'purple',
        className: '',
      },
      {
        key: 'calendar',
        icon: <CalendarIcon />,
        title: 'Content Calendar',
        description: 'Plan and visualize your content strategy across all your marketing channels.',
        onClick: () => onNavClick('content-calendar'),
        colorScheme: 'orange',
        className: '',
      },
      {
        key: 'linkedin',
        icon: <AnimatedLinkedInIcon />,
        title: 'LinkedIn Post + Image',
        description: 'Generate engaging LinkedIn posts and accompanying images to boost your professional presence.',
        onClick: () => onNavClick('social-posts'),
        colorScheme: 'blue',
        className: '',
      },
      {
        key: 'x-post',
        icon: <AnimatedXIcon />,
        title: 'X Post + Image',
        description: 'Create concise and impactful posts for X (formerly Twitter) with relevant images.',
        onClick: () => onNavClick('social-posts'),
        colorScheme: 'blue',
        className: '',
      },
      {
        key: 'facebook-post',
        icon: <AnimatedFacebookIcon />,
        title: 'Facebook Post + Image',
        description: 'Design engaging Facebook posts with optimized captions and eye-catching images.',
        onClick: () => onNavClick('social-posts'),
        colorScheme: 'blue',
        className: '',
      },
      {
        key: 'blog-post',
        icon: <BlogIcon />,
        title: 'Blog Post + Image',
        description: 'Write long-form blog content and generate a hero image to capture reader attention.',
        onClick: () => onNavClick('social-posts'),
        colorScheme: 'blue',
        className: '',
      },
      {
        key: 'instagram-post',
        icon: <AnimatedInstagramIcon />,
        title: 'Instagram Post + Image',
        description: 'Create visually stunning Instagram posts with compelling captions and hashtags.',
        onClick: () => onNavClick('ad-generator'),
        colorScheme: 'purple',
        className: '',
      },
      {
        key: 'gbp-services',
        icon: <AnimatedGbpIcon />,
        title: 'GBP Services',
        description: 'Optimize your Google Business Profile by creating detailed descriptions for each of your services.',
        onClick: () => onNavClick('gbp-optimizer'),
        colorScheme: 'green',
        className: '',
      },
      {
        key: 'gbp-description',
        icon: <AnimatedGbpIcon />,
        title: 'GBP Description',
        description: 'Craft a keyword-rich business description to improve your local search ranking.',
        onClick: () => onNavClick('gbp-optimizer'),
        colorScheme: 'green',
        className: '',
      },
    ];

    return (
        <div className="w-full max-w-7xl mx-auto space-y-8 animate-fade-in">
            <Header
                title="Content Koala🐨"
                subtitle="Use an App, or create your own, to achieve your marketing goals."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dashboardTools.map(tool => (
                    <ToolCard
                        key={tool.key}
                        icon={tool.icon}
                        title={tool.title}
                        description={tool.description}
                        onClick={tool.onClick}
                        colorScheme={tool.colorScheme as any}
                        className={tool.className}
                    />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;