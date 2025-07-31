import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  fullWidth = true,
  className = '', 
  ...props 
}) => {
  const baseClasses = 'font-medium leading-5 text-center transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-purple';
  
  const variantClasses = {
    primary: 'text-white bg-purple-600 active:bg-purple-600 hover:bg-purple-700',
    secondary: 'text-purple-600 bg-white border-purple-600 hover:bg-purple-50',
    danger: 'text-white bg-red-600 active:bg-red-600 hover:bg-red-700'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  const widthClass = fullWidth ? 'block w-full' : 'inline-block';
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} mt-4 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
