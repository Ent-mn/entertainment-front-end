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
  login: (user: User, token: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // client-side дээр хадгалагдсан token-ыг шалгах
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("token");
      if (token) {
        // token байгаа тохиолдолд хэрэглэгчийг автоматаар нэвтрүүлнэ
        const storedUser = JSON.parse(
          window.localStorage.getItem("user") || "{}"
        );
        setUser(storedUser);
        setIsLoggedIn(true);
      }
    }
  }, []);

  const login = (user: User, token: string) => {
    setUser(user);
    setIsLoggedIn(true);
    // token болон хэрэглэгчийн мэдээллийг localStorage-д хадгална
    window.localStorage.setItem("token", `${token}`);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    // localStorage-ээс мэдээллийг устгана
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// useUser хуук
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
