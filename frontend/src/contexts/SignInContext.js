import React, { createContext, useState, useContext } from 'react';

const SignInContext = createContext();

export const SignInProvider = ({ children }) => {
    const [showSignInModal, setShowSignInModal] = useState(false);

    const handleShow = () => setShowSignInModal(true);
    const handleClose = () => setShowSignInModal(false);

    return (
        <SignInContext.Provider value={{ showSignInModal, handleShow, handleClose }}>
            {children}
        </SignInContext.Provider>
    );
};

export const useSignIn = () => useContext(SignInContext);
