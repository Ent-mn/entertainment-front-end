"use client";
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
    if (typeof window !== "undefined") {
      const userId = window.localStorage.getItem("user_id");
      if (userId) {
        // Restore user from localStorage if an ID is found
        const storedUser = JSON.parse(
          window.localStorage.getItem("user") || "{}"
        );
        setUser(storedUser);
        setIsLoggedIn(true);
      }
    }
  }, []);

  const login = (user: User) => {
    setUser(user);
    setIsLoggedIn(true);
    // Store the user's ID instead of a token
    window.localStorage.setItem("user_id", user.id);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    // Remove user data from localStorage
    window.localStorage.removeItem("user_id");
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
