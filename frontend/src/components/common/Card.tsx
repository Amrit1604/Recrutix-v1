import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

/**
 * Professional card component
 */
const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverable = false,
  onClick,
}) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl shadow-card p-6 border border-gray-100',
        'transition-shadow duration-300',
        hoverable && 'hover:shadow-xl cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
