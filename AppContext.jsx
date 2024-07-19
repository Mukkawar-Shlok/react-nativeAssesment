// AppContext.js
import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [updateMode,setUpdateMode] = useState(false);
  const [profileUpdated,setProfileUpdated] = useState(false);
  const value = {
    token,
    setToken,
    updateMode,
    setUpdateMode,
    profileUpdated,
    setProfileUpdated
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
