
import React from 'react';
import { Plus } from 'lucide-react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Plus className="h-16 w-16 text-green-600 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-green-600 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Healinton Healthcare</h2>
          <p className="text-gray-600 dark:text-gray-300">Please wait...</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
