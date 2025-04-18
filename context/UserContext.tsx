"use client";
import { signOut } from "next-auth/react";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface User {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  org_name: string;
  org_register: string;
  is_active: number;
  password: string;
  code_email: string;
  code_sms: string;
  created_at: string;
  customer_type_id: number;
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Try to restore user data from localStorage on mount
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
    // Store the complete user data in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const logout = () => {
    signOut();
    setUser(null);
    setIsLoggedIn(false);
    // Clear user data from localStorage
    localStorage.removeItem('userData');
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// useUser hook
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
