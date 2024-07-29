import React, { createContext, useState, useContext, ReactNode } from 'react';

interface TokenContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

const defaultContextValue: TokenContextType = {
  token: null,
  setToken: () => {},
};

const TokenContext = createContext<TokenContextType>(defaultContextValue);

interface TokenProviderProps {
  children: ReactNode;
}

export const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

// Custom hook to use the TokenContext
export const useToken = () => useContext(TokenContext);