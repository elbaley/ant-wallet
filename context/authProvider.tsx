"use client";
import { getUserFromCookie } from "@/lib/auth";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthUser = Omit<User, "password">;
type UserContextValues = {
  user: AuthUser | null;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
};

const UserContext = createContext({} as UserContextValues);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  console.log("user context running...");
  const [user, setUser] = useState<AuthUser | null>(() => {
    // Try to load the user from localStorage
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    // Save the user to localStorage whenever it changes
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};
