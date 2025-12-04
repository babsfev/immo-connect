"use client";

import React, { createContext, useContext } from "react";

// Type partagé pour l'utilisateur connecté
export interface UserProfile {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  role: string;
  phone?: string | null;
  isVerified?: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
});

export function AuthProvider({ 
  children, 
  user // <-- On reçoit l'utilisateur injecté par le Serveur (layout.tsx)
}: { 
  children: React.ReactNode, 
  user: UserProfile | null 
}) {
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);