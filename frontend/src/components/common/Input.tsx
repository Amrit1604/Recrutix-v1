import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Professional input field component
 */
const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-dark-800 mb-2">
          {label}
        </label>
      )}
      <input
        className={clsx(
          'w-full px-4 py-3 rounded-lg border-2 outline-none transition-all duration-200',
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
            : 'border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
