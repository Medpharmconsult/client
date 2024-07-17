"use client"

import {useRouter} from "next/navigation";
import { useEffect } from "react";
import LoginForm from "@/app/ui/auth/loginForm/loginForm";
import styles from "@/app/auth/adminAuth/adminAuth.module.css";




export default function DashboardMenu() {
  
  useEffect(()=>{
  
  }, [])

  const router = useRouter()
 
  
  
  return (
    <div className={styles.loginContainer}>
        <LoginForm user="admin"/>
    </div>
  )
}