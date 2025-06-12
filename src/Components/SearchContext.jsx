
import { createContext, useContext, useState } from 'react';

const Searchcontext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Searchcontext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </Searchcontext.Provider>
  );
};

export const useSearch = () => useContext(Searchcontext);
