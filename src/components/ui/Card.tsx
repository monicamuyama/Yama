import React from 'react';
import { cn } from '../../utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = 'md',
  shadow = 'md',
}) => {
  const paddingClasses = {
    none: '',
    xs: 'p-2',
    sm: 'p-3',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-gray-200',
        paddingClasses[padding],
        shadowClasses[shadow],
        className
      )}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => (
  <div className={cn('border-b border-gray-200 pb-3 sm:pb-4 mb-3 sm:mb-4', className)}>
    {children}
  </div>
);

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => (
  <div className={cn('', className)}>
    {children}
  </div>
);

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => (
  <div className={cn('border-t border-gray-200 pt-3 sm:pt-4 mt-3 sm:mt-4', className)}>
    {children}
  </div>
);

export default Card;
