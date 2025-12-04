"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  user: any;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulation de vérification de session
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const login = () => setUser({ name: "Jean Dupont", email: "jean@test.com" });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);