import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  growth?: string;
  growthPositive?: boolean;
  loading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon, 
  label, 
  value, 
  growth, 
  growthPositive,
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 animate-pulse">
        <div className="p-3 mr-4 bg-gray-200 rounded-full dark:bg-gray-700 w-12 h-12"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-16"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      <div className="p-3 mr-4 text-purple-500 bg-purple-100 rounded-full dark:text-purple-100 dark:bg-purple-500">
        {icon}
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">{label}</p>
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{value}</p>
        {growth && (
          <span className={`text-xs font-semibold ${growthPositive ? 'text-green-600' : 'text-red-600'}`}>
            {growth}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
