// LoaderContext.js
"use client"
import { User } from '@prisma/client';
import React, { createContext, useContext, useState } from 'react';

const Context = createContext<any>(undefined);

interface UserData {
  status: 'loading' | 'authenticated' | 'unauthenticated';
  user: User | {}
}
export enum ChatVariantType {
  CHAT = "CHAT",
  COMMUNITY = "COMMUNITY"
};
export const ContextProvider = ({ children }: {children: React.ReactNode}) => {

  const [isleftBar, setIsLeftBar] = useState(false)
  const [isRightBar, setIsRightBar] = useState(false)
  const [chatVariant, setChatVariant] = useState<ChatVariantType>(ChatVariantType.CHAT)
  const [userData, setUserData] = useState<UserData>({ status: 'loading', user: {} })

  return (
    <Context.Provider value={{ chatVariant, setChatVariant, setIsRightBar, isRightBar, isleftBar, setIsLeftBar, setUserData, userData  }}> 
      {children}
    </Context.Provider>
  );
};

export const useCustom = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useCustomHook must be used within a LoaderProvider');
  }
  return context;
};
