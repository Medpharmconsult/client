"use client"
import { useState } from "react";
import { Button } from "../../general/button/button"
import SignupForm from "../signupForm/signupForm";
import LoginForm from "../loginForm/loginForm";
import styles from "@/app/ui/auth/authPage/authPage.module.css"
import Modal from "../../general/modal/modal"


export default function AuthPage() {
  const [modalDisplay, setModalDisplay] = useState({display: false, content: <></>})
  

  const displaySignupForm = ()=>{
    
    setModalDisplay({display: true, content: <SignupForm/> })
  
  }

  const displayLoginForm = (user: string)=>{
    
    setModalDisplay({display: true, content: <LoginForm user={user}/> })
  
  }
  
  const closeModal = ()=>{
    setModalDisplay({display: false, content: <></>})
  
  }
  return (
  
    <section className={styles.container}>
      <Modal hide={modalDisplay.display} closeModal={closeModal}>{modalDisplay.content}</Modal>
      <div>
            
        <div className={styles.buttonDiv + " " + styles.buttonDiv1}>
          <Button onClick={()=>displayLoginForm("patient")} styleType="big" margin="rightMargin">patient login</Button> 
          <span>Don't have an account? <span onClick={displaySignupForm}  className={styles.signupBtn}>Signup</span></span>
        </div>
            
        <div className={styles.buttonDiv}>
          <Button onClick={()=>displayLoginForm("professional")} styleType="bigWhite" margin="rightMargin">staff login</Button>
        </div>
            
      </div>
        
    </section>
  )
    
}