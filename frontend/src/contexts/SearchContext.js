import React, { createContext, useState, useContext } from 'react';

// Create Context
const SearchContext = createContext();

// Create a provider component
export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const updateSearchTerm = (term) => {
        setSearchTerm(term);
    };

    return (
        <SearchContext.Provider value={{ searchTerm, updateSearchTerm }}>
            {children}
        </SearchContext.Provider>
    );
};

// Custom hook to use the search context
export const useSearch = () => useContext(SearchContext);
