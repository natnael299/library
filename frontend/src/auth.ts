import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { User } from "./types/types";

type AuthContextProp = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  authenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextProp | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("no auth context found!!");
  }
  return context;
};
