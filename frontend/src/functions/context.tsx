import { useState, createContext, ReactNode } from "react";
import { PersonObject } from "react-chat-engine-advanced";

export interface ContextInterface {
  user: PersonObject | null;
  setUser: (u: PersonObject | null) => void;
}

interface ProviderInterface {
  children: ReactNode;
}

export const Context = createContext<ContextInterface>({
  user: null,
  setUser: () => {},
});

export const ContextProvider = (props: ProviderInterface) => {
  const [user, setUser] = useState<PersonObject | null>(null);
  const value = { user, setUser };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
