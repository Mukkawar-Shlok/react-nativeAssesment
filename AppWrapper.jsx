// AppWrapper.jsx
import React from 'react';
import App from './App';
import { AppProvider } from './AppContext';

//this is a app wrapper for wrapping app inside context provider.
const AppWrapper = () => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};

export default AppWrapper;
