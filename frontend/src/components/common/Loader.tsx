import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

/**
 * Professional loading spinner
 */
const Loader: React.FC<LoaderProps> = ({ size = 'md', text }) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizes[size]} relative`}>
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
      </div>
      {text && (
        <p className="mt-4 text-sm text-gray-600 font-medium">{text}</p>
      )}
    </div>
  );
};

export default Loader;
