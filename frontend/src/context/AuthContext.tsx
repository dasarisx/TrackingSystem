"use client";
import { createContext, useState, useEffect } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;
}

interface AuthContextInterface {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextInterface>({
  token: null,
  user: null,
  setToken: () => {},
  setUser: () => {},
  logout: () => {}
});

interface AuthProviderProps {
  children: React.ReactNode; // important: ReactNode, not JSX.Element or string
}

export function AuthProvider({ children }: AuthProviderProps ) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState< User | null>(null);

  // Restore token + user on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(JSON.parse(savedUser));  // stored as string, convert back to JSON
  }, []);

  // logout function
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, setToken, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
