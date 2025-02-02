"use client";
import { adminContextType } from "@/app/_lib/types";
import { createContext, useContext, useState } from "react";

// Create admin context
const AdminContext = createContext<adminContextType | undefined>(undefined);

// Use admin context
export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (context === undefined)
    throw new Error("AdminContext was used outside provider");
  return context;
};

// Admin context provider
const AdminContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [nav, setNav] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);
  const toggleNav = () => setNav((s) => !s);
  const toggleMobileNav = () => setMobileNav((s) => !s);

  return (
    <AdminContext.Provider
      value={{
        nav,
        toggleMobileNav,
        toggleNav,
        mobileNav,
        setMobileNav,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
