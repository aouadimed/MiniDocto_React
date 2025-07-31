import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button, SocialButton } from '../../../shared/components';
import toast from 'react-hot-toast';

const GithubIcon = (
  <svg className="w-4 h-4 mr-2" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const TwitterIcon = (
  <svg className="w-4 h-4 mr-2" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
  </svg>
);

const LoginForm: React.FC = () => {
  const { user, loading, error, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.token) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      let errorMessage = 'Login failed';
      
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (typeof error === 'object') {
        if (error.message) {
          errorMessage = error.message;
        } else if (error.password) {
          errorMessage = error.password;
        } else if (error.email) {
          errorMessage = error.email;
        } else if (error.error) {
          errorMessage = error.error;
        } else if (error.errors) {
          errorMessage = Object.values(error.errors)[0] as string;
        }
      }
      
      toast.error(errorMessage);
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    login(email, password);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
      <label className="block text-sm">
        <span className="text-gray-700 dark:text-gray-400">Email</span>
        <input
          className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
          placeholder="Jane Doe"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <label className="block mt-4 text-sm">
        <span className="text-gray-700 dark:text-gray-400">Password</span>
        <input
          className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
          placeholder="***************"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </label>
      <Button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Log in'}
      </Button>
      <hr className="my-8" />
      <SocialButton icon={GithubIcon}>Github</SocialButton>
      <SocialButton icon={TwitterIcon} className="mt-4">Twitter</SocialButton>
      <p className="mt-4">
        <a className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline" href="#">
          Forgot your password?
        </a>
      </p>
      <p className="mt-1">
        <a 
          className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline cursor-pointer" 
          onClick={() => navigate('/signup')}
        >
          Create account
        </a>
      </p>
    </form>
  );
};

export default LoginForm; 