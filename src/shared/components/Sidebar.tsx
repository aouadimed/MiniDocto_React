import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLink {
  to: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  navLinks?: NavLink[];
  title?: string;
}

const defaultNavLinks: NavLink[] = [
  { to: '/dashboard', label: 'Dashboard', icon: (
    <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ) },
  { to: '/availability', label: 'Availability', icon: (
    <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ) },
  { to: '/appointments', label: 'Appointments', icon: (
    <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ) },
];

const Sidebar: React.FC<SidebarProps> = ({ 
  navLinks = defaultNavLinks, 
  title = "Mini Docto+" 
}) => {
  const location = useLocation();

  return (
    <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
      <div className="py-4 text-gray-500 dark:text-gray-400">
        <Link className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" to="/dashboard">
          {title}
        </Link>
        <ul className="mt-6">
          {navLinks.map(link => (
            <li key={link.to} className="relative px-6 py-3">
              {location.pathname === link.to && (
                <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>
              )}
              <Link
                className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${location.pathname === link.to ? 'text-gray-800 dark:text-gray-100' : ''}`}
                to={link.to}
              >
                {link.icon}
                <span className="ml-4">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
