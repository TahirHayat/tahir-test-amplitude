import React, { createContext, useContext, useState, type ReactNode } from "react";
import { identifyUser, logoutUser } from '../amplitude';

interface AuthContextType {
  isAuthenticated: boolean;
  userName: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  const login = async (email: string, password: string) => {
    console.log("Running mock login...",password);
    identifyUser(email.split("@")[0], {
          email: email,
          name: email.split("@")[0],
          plan_type: 'Enterprise'
        });

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsAuthenticated(true);
        setUserName(email.split("@")[0]);
        console.log("User logged in:", email);
        resolve();
      }, 400);
    });
  };

  const logout = async () => {
    console.log("Running mock logout...");
    logoutUser();
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsAuthenticated(false);
        setUserName("");
        console.log("User logged out");
        resolve();
      }, 200);
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
