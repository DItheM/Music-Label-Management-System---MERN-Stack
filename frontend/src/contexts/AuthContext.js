import React, { createContext, useState, useContext } from 'react';

// Create Context
const AuthContext = createContext();

// Create a Provider Component
export const AuthProvider = ({ children }) => {
    const [isSignIn, setIsSignIn] = useState(false);


    return (
        <AuthContext.Provider value={{ isSignIn, setIsSignIn }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook to use the Auth Context
export const useAuth = () => useContext(AuthContext);
