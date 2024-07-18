// AppWrapper.jsx
import React from 'react';
import App from './App';
import { AppProvider } from './AppContext';

const AppWrapper = () => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};

export default AppWrapper;
