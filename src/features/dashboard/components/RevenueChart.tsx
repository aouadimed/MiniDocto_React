import React from 'react';

interface RevenueChartProps {
  data?: {
    labels: string[];
    revenue: number[];
  };
  loading?: boolean;
}

// Mock data for demo
const defaultData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  revenue: [12000, 15000, 14000, 17000, 16000, 18000, 20000],
};

const RevenueChart: React.FC<RevenueChartProps> = ({ 
  data = defaultData, 
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-xs p-4 dark:bg-gray-800">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 mb-4 w-20"></div>
          <div className="h-64 bg-gray-200 rounded dark:bg-gray-700"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-xs p-4 dark:bg-gray-800">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Revenue</h3>
      <div className="h-64 flex items-end justify-between">
        {data.labels.map((label, index) => (
          <div key={label} className="flex flex-col items-center">
            <div 
              className="bg-purple-500 w-8 rounded-t"
              style={{ 
                height: `${(data.revenue[index] / Math.max(...data.revenue)) * 200}px`,
                minHeight: '4px'
              }}
            ></div>
            <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueChart;
