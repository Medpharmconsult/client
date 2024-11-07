"use client";
import { createContext, useContext, useState } from "react";

const DashboardContext = createContext<any>(undefined);
export const DashboardContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [nav, setNav] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);
  const toggleNav = () => setNav((s) => !s);
  const toggleMobileNav = () => setMobileNav((s) => !s);

  return (
    <DashboardContext.Provider
      value={{
        nav,
        toggleMobileNav,
        toggleNav,
        mobileNav,
        setMobileNav,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
