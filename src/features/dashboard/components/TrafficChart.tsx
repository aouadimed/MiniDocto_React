import React from 'react';

interface TrafficChartProps {
  data?: {
    labels: string[];
    values: number[];
  };
  loading?: boolean;
}

// Mock data for demo
const defaultData = {
  labels: ['Direct', 'Referral', 'Social'],
  values: [55, 30, 15],
};

const colors = ['#7c3aed', '#a78bfa', '#c4b5fd'];

const TrafficChart: React.FC<TrafficChartProps> = ({ 
  data = defaultData, 
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-xs p-4 dark:bg-gray-800">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 mb-4 w-32"></div>
          <div className="h-64 bg-gray-200 rounded-full dark:bg-gray-700 mx-auto w-64"></div>
        </div>
      </div>
    );
  }

  const total = data.values.reduce((sum, value) => sum + value, 0);

  return (
    <div className="bg-white rounded-lg shadow-xs p-4 dark:bg-gray-800">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Traffic Sources</h3>
      <div className="flex items-center justify-center h-64">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {data.values.map((value, index) => {
              const percentage = (value / total) * 100;
              const offset = data.values.slice(0, index).reduce((sum, v) => sum + (v / total) * 100, 0);
              const strokeDasharray = `${percentage} ${100 - percentage}`;
              const strokeDashoffset = -offset;
              
              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={colors[index]}
                  strokeWidth="8"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {data.labels.map((label, index) => (
          <div key={label} className="flex items-center justify-between">
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: colors[index] }}
              ></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
            </div>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {data.values[index]}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficChart;
