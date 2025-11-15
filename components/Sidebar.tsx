import React from 'react';
// FIX: Import the shared 'Tool' type to avoid local definitions.
import type { Tool } from '../types';

interface NavLinkProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  isComingSoon?: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ icon, label, isActive = false, isComingSoon = false, onClick }) => {
  const baseClasses = "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200";
  const activeClasses = "text-accent bg-accent/10 font-semibold";
  const inactiveClasses = "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-secondary-text dark:hover:text-primary-text dark:hover:bg-secondary-accent/50";
  const disabledClasses = "text-gray-400 cursor-not-allowed dark:text-secondary-text/60";

  const classes = `${baseClasses} ${
    isActive ? activeClasses : isComingSoon ? disabledClasses : inactiveClasses
  }`;

  return (
    <a 
        href="#" 
        className={classes} 
        aria-disabled={isComingSoon || !onClick}
        onClick={(e) => {
            e.preventDefault();
            if (!isComingSoon && onClick) {
                onClick();
            }
        }}
    >
      {icon}
      <span className="ml-3">{label}</span>
      {isComingSoon && (
        <span className="ml-auto text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full dark:bg-secondary-accent dark:text-secondary-text">
          Soon
        </span>
      )}
    </a>
  );
};

interface SidebarProps {
    activeTool: Tool;
    onNavClick: (tool: Tool) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTool, onNavClick }) => {
  const logoDataUri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIkSURBVHhe7dMBAQAACMMg+6f+4wAStAQQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBBwY2EBAOJEg90AAAAASUVORK5CYII=";
  return (
    <aside className="w-64 bg-white dark:bg-background border-r border-gray-200 dark:border-secondary-accent flex-shrink-0 flex-col hidden sm:flex">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-secondary-accent flex items-center justify-center gap-2">
        <span className="font-bold text-xl text-gray-800 dark:text-primary-text font-serif tracking-tight">Content Koala🐨</span>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2">
        <NavLink
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
          label="Dashboard"
          isActive={activeTool === 'dashboard'}
          onClick={() => onNavClick('dashboard')}
        />
        <NavLink
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" /></svg>}
          label="Client Services"
          isActive={activeTool === 'client-services'}
          onClick={() => onNavClick('client-services')}
        />
        <NavLink
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>}
          label="Ad Generation"
          isActive={activeTool === 'ad-generator'}
          onClick={() => onNavClick('ad-generator')}
        />
        <NavLink
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>}
          label="Social Posts"
          isActive={activeTool === 'social-posts'}
          onClick={() => onNavClick('social-posts')}
        />
        <NavLink
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>}
          label="GBP Optimizer"
          isActive={activeTool === 'gbp-optimizer'}
          onClick={() => onNavClick('gbp-optimizer')}
        />
        <NavLink
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>}
          label="Content Calendar"
          isActive={activeTool === 'content-calendar'}
          onClick={() => onNavClick('content-calendar')}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;