import React, { useRef, useState } from 'react';
import {useRouter} from "next/navigation"
import styles from "@/app/ui/auth/signupForm/signupForm.module.css"
import { Button } from "../../general/button/button"
import {apiFetcher, localStorageHandler} from '@/app/lib/utilities'

interface ApiResponse{
  statusCode: number;
  mpcToken: string;
  msg: string;
}



export default function SignupForm() {
  
  const firstNameInput = useRef<HTMLInputElement>(null)
  const lastNameInput = useRef<HTMLInputElement>(null)
  const emailInput = useRef<HTMLInputElement>(null)
  const usernameInput = useRef<HTMLInputElement>(null)
  const passwordInput = useRef<HTMLInputElement>(null)
  const [errMsg, setErrMsg] = useState("");
  const router = useRouter()

    
  const submitForm = async (e:React.MouseEvent)=>{
    e.preventDefault();
    const signupData = {
      firstName: firstNameInput.current?.value,
      lastName: lastNameInput.current?.value,
      email: emailInput.current?.value,
      username: usernameInput.current?.value,
      password: passwordInput.current?.value,

    }
    
    const serverResponse = await apiFetcher(`${process.env.NEXT_PUBLIC_Host_Name}/patient-signup`, {
      method: "POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify(signupData),
    }) as ApiResponse

    if(serverResponse.statusCode == 200){
      
      localStorageHandler("set", {key: `${process.env.NEXT_PUBLIC_Token_Key}`, value: serverResponse.mpcToken})
      
      //redirect to dashboard
      router.push("/dashboard/consult")

    }
    else{
      setErrMsg(serverResponse.msg)
    }
  }

    
  return (
    
    <form className={styles.form}>
      <p className={styles.errorMsg}>{errMsg}</p>
      <div className={styles.inputContainer}>
        <input ref={firstNameInput} type="text" placeholder="First name"/>
        <input ref={lastNameInput} type="text" placeholder="Last name" />
      </div>
      <div className={styles.inputContainer}>
        <input ref={emailInput} type="text" placeholder="Email"/>
        <input ref={usernameInput} type="text" placeholder="Username"/>
      </div>
      <div className={styles.inputContainer}>
        <input ref={passwordInput} type="password" placeholder="Password" />
      </div>
      <div className={styles.inputContainer}>
        <Button onClick={(e)=>submitForm(e)} styleType="big" margin="">Signup</Button>
      </div>
    </form>
  )
      
}