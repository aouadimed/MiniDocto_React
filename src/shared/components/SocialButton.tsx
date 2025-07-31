import React from 'react';

interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon, children, className = '', ...props }) => (
  <button
    className={`flex items-center justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-white text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray ${className}`}
    {...props}
  >
    {icon}
    {children}
  </button>
);

export default SocialButton;
