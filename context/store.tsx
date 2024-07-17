'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

type DataType = {
    firstName: string
}



const GlobalContext = createContext<any>(undefined)

export const GlobalContextProvider = ({ children }:{children: React.ReactNode}) => {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState({firstName: ""})
    
    return (
        <GlobalContext.Provider value={
            { 
                isLoggedIn, setIsLoggedIn,
                user, setUser
            }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);



