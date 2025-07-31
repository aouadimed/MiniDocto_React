import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './app/router';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme'; // Adjust this path if your theme is in another folder
import TokenManager from './shared/services/tokenManager';

// Initialize TokenManager
TokenManager.initialize();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
