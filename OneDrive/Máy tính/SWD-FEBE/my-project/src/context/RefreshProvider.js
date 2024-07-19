import React, { createContext, useState, useContext, useCallback } from 'react';

const RefreshContext = createContext();

export const RefreshProvider = ({ children }) => {
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const refresh = useCallback(() => {
    setShouldRefresh(prev => !prev);
  }, []);

  return (
    <RefreshContext.Provider value={{ shouldRefresh, refresh }}>
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefresh = () => useContext(RefreshContext);