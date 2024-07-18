// AppContext.js
import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState('');
    // const [lastName,setLastName] = useState('');
    // const [email, setEmail] = useState('');
    // const [day, setDay] = useState('');
    
    const value = {
        user,
        setUser  
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};