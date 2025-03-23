import { createContext, useContext } from "react";

export interface Props {
  user: User | null;
  initialized: boolean;
  signin: (
    email: string,
    password: string
  ) => Promise<{ success?: boolean; message?: string }>;
  signup: (
    newUser: User,
    password: string
  ) => Promise<{ success?: boolean; message?: string }>;
}

export const initialState: Props = {
  user: null,
  initialized: false,
  signup: async () => ({}),
  signin: async () => ({}),
};

export const Context = createContext(initialState);

export const use = () => useContext(Context);
