import React from 'react';

interface HeaderProps {
    title: React.ReactNode;
    subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="mb-8 animate-fade-in">
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 dark:text-primary-text font-serif">
        {title}
      </h1>
      <p className="mt-2 text-md text-gray-600 dark:text-secondary-text">
        {subtitle}
      </p>
    </header>
  );
};

export default Header;