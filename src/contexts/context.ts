import { useContext, createContext } from "react";
import firebase from "firebase/compat/app";

export type PromiseResult = {
  success?: boolean;
  error?: string;
};

export interface Context {
  user: firebase.User | null;
  initialized: boolean;
  isPending: boolean;
  signInWithGoogle: () => Promise<PromiseResult>;
  signout: () => Promise<PromiseResult>;
}

export const initialState: Context = {
  user: null,
  initialized: false,
  isPending: true,
  signInWithGoogle: async () => ({}),
  signout: async () => ({}),
};

export const context = createContext(initialState);

export const useAuth = () => useContext(context);
