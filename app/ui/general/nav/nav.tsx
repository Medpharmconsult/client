"use client"
import {useState, useEffect} from "react"
import styles from "@/app/ui/general/nav/nav.module.css"
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import AuthBox from "../authBox/authBox";
import LoginPlate from "../loginPlate/loginPlate";
import { apiFetcher } from "@/app/lib/utilities"
import { useGlobalContext } from "@/context/store";

interface ApiResponse{
  statusCode: number;
  responseData: {msg: string, userData: {firstName: string, profileImg?: string}};
}


export default function Nav() {

  const {isLoggedIn, setIsLoggedIn, user, setUser}= useGlobalContext()
  

  useEffect(()=>{
    const token = localStorage.getItem("mpcToken")
    if(!token) return
    const decodedToken = jwtDecode(`${token}`) as {userID: string}

    async function fetcher() {
        const userData = await apiFetcher(`${process.env.NEXT_PUBLIC_Host_Name}/get-user?userID=${decodedToken.userID}`, {method: "GET"}) as ApiResponse
        if(userData.statusCode == 200){
          setIsLoggedIn(true)
          //delete userData.responseData.userData.profileImg
          setUser(userData.responseData.userData)
        }
       
    }
  
    fetcher()


  }, [])

  let authStatus
  if(isLoggedIn){
    authStatus = <LoginPlate user={user}/>
  }
  else{authStatus = <AuthBox/>}

  return (
    <nav className={styles.nav}>
      <ul className={styles.navContainer}>
        <li><Link className={styles.link} href="/">Home</Link></li>
        
      </ul>
      {
        authStatus
      }
      
        
    </nav>
  );
}


  