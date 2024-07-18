// AppContext.js
import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState('');

  const value = {
    token,
    setToken,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
