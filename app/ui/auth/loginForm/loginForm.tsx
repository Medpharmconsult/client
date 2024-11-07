import React, { useRef, useState } from "react";
import {useRouter} from "next/navigation"
import styles from "@/app/ui/auth/loginForm/loginForm.module.css"
import { Button } from "../../general/button/button"
import {apiFetcher, localStorageHandler} from "@/app/lib/utilities"
import { useGlobalContext } from "@/context/store";


interface FormProps extends React.FormHTMLAttributes<HTMLFormElement>  {
  //children: React.ReactNode;
  user: string
  
}

interface ApiResponse{
  statusCode: number;
  responseData: {msg: string, mpcToken: string, user: {firstName: string}}
}

export default function LoginForm({user, ...rest}: FormProps) {
  const emailInput = useRef<HTMLInputElement>(null)
  const passwordInput = useRef<HTMLInputElement>(null)
  const [errMsg, setErrMsg] = useState("");
  const {setIsLoggedIn, setUser} = useGlobalContext()
  const router = useRouter()
    
  const submitLogin= async (e:React.MouseEvent)=>{
    e.preventDefault()
    const loginData = {
      email: emailInput.current?.value,
      password: passwordInput.current?.value
    }
    
    if(user == "patient"){
      const serverResponse = await apiFetcher(`${process.env.NEXT_PUBLIC_Host_Name}/patient-login`, {
        method: "PUT",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(loginData),
      }) as ApiResponse

      if(serverResponse.statusCode == 200){
        
        localStorageHandler("set", {key: `${process.env.NEXT_PUBLIC_Token_Key}`, value: serverResponse.responseData.mpcToken})
        setIsLoggedIn(true)
        setUser(serverResponse.responseData.user)
        //redirect to dashboard
        router.push("/dashboard/consult")
  
      }
      else{
        setErrMsg(serverResponse.responseData.msg)
      }
    }
    else if(user == "professional"){
      const serverResponse = await apiFetcher(`${process.env.NEXT_PUBLIC_Host_Name}/professional-login`, {
        method: "PUT",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(loginData),
      }) as ApiResponse

      if(serverResponse.statusCode == 200){
        
        localStorageHandler("set", {key: `${process.env.NEXT_PUBLIC_Token_Key}`, value: serverResponse.responseData.mpcToken})
        
        setIsLoggedIn(true)
        setUser(serverResponse.responseData.user)
        //redirect to dashboard
        router.push("/dashboard/viewAppointments")
  
      }
      else{
        setErrMsg(serverResponse.responseData.msg)
      }
    }
    else if(user == "admin"){
      const serverResponse = await apiFetcher(`${process.env.NEXT_PUBLIC_Host_Name}/admin-login`, {
        method: "PUT",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(loginData),
      }) as ApiResponse

      if(serverResponse.statusCode == 200){
        localStorage.setItem(`${process.env.NEXT_PUBLIC_Token_Key}`, serverResponse.responseData.mpcToken)
        
        setIsLoggedIn(true)
        setUser(serverResponse.responseData.user)
        //redirect to dashboard
        router.push("/dashboard/addProfessional")
  
      }
      else{
        setErrMsg(serverResponse.responseData.msg)
      }

    }
    else{
      setErrMsg("invalid form parameter")
    }
    
  }
    
  return (
    
    <form className={styles.form} {...rest}>
      <p className={styles.errorMsg}>{errMsg}</p>
        
      <div className={styles.inputContainer}>
        <input ref={emailInput} type="text" placeholder="Email"/>
        
      </div>
      <div className={styles.inputContainer}>
        <input ref={passwordInput} type="password" placeholder="Password" />
      </div>
      <div className={styles.inputContainer}>
        <Button styleType="big" margin="" onClick={(e)=>submitLogin(e)}>Login</Button>
      </div>
    </form>
  )
      
}


//React.ButtonHTMLAttributes<HTMLButtonElement>
