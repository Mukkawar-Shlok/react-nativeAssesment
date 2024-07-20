// AppContext.js
import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  //auth token
  const [token, setToken] = useState('');
  //update mode for setting profile in update mode
  const [updateMode,setUpdateMode] = useState(false);
  //for components fetch updated profile so that child components can get updated data.
  const [profileUpdated,setProfileUpdated] = useState(false);

  //exporting values
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
