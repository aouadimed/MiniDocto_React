import React from 'react';
import { ImageSection, SignupForm } from '../components';
import { Toaster } from 'react-hot-toast';

const SignupPage: React.FC = () => (
  <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
    <Toaster position="top-right" toastOptions={{ className: 'text-sm' }} />
    <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
      <div className="flex flex-col overflow-y-auto md:flex-row">
        <ImageSection />
        <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
          <SignupForm />
        </div>
      </div>
    </div>
  </div>
);

export default SignupPage;
