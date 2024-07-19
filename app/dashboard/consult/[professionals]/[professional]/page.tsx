"use client"
import { useState, useEffect } from 'react';
import {useRouter, usePathname} from "next/navigation"
import styles from "@/app/dashboard/consult/[professionals]/[professional]/professional.module.css"
import { apiFetcher, localStorageHandler } from "@/app/lib/utilities"
import RoundImage from '@/app/ui/general/roundImage/roundImage';
import { Button } from '@/app/ui/general/button/button';

interface ApiResponse{
  statusCode: number;
  responseData: {
    msg: string, 
    professional: {_id: string, firstName: string, lastName: string, username:string, profileImg: string,
      profession: "string", yoe: number
    }

  };  
}

export default function Professional({params}: {params: {professional: string}}) {

  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState({} as ApiResponse);
  const router = useRouter()
  const pathName = usePathname()
  useEffect(()=>{
      
    async function fetcher() {
      const professional = await apiFetcher(`${process.env.NEXT_PUBLIC_Host_Name}/get-professional?username=${params.professional}`, {method: "GET"}) as ApiResponse
      setApiData(professional)
      setIsLoading(false)
    }
  
    fetcher()
      
  
  },[])

  const appointmentHandler = ()=>{
    localStorage.setItem("profID", `${apiData.responseData.professional._id}`)
    
    router.push(`${pathName}/appointment_days`)
  }
  const messageHandler = ()=>{
    localStorage.setItem("profID", `${apiData.responseData.professional._id}`)
    localStorage.setItem("msgReceiver", `${apiData.responseData.professional._id}`)
    router.push(`/dashboard/message`)
  }
  
    
  
  let ui;
  
  if(isLoading){
    ui = <div>LOADING...</div>
  }else{
    ui=(  
      <div className={styles.profile}>
        <div className={styles.head}>
          <div className={styles.leftHead}>
            <div className={styles.imgHolder}>
              {
                apiData.responseData.professional.profileImg ?
                <RoundImage src={`${process.env.NEXT_PUBLIC_Host_Name}${apiData.responseData.professional.profileImg}`} alt="image of health professional"/> :
                <h1 className= {styles.imgText}>{apiData.responseData.professional.firstName.at(0)}</h1>
              }
              
            </div>
            <h3 className= {styles.name}>{`${apiData.responseData.professional.firstName} ${apiData.responseData.professional.lastName}`}</h3>

          </div>
          <div className={styles.rightHead}>
            <p>
              Hi My name is {`${apiData.responseData.professional.firstName} ${apiData.responseData.professional.lastName} `} 
              and i am a {apiData.responseData.professional.profession} with {apiData.responseData.professional.yoe} years experience
              I hope to give you the best medical service
            </p>
          </div>

        </div>
        <div className={styles.btnSection}>
          <Button onClick={appointmentHandler} styleType='big' margin='rightMargin'>Book Appointment</Button>
          <Button onClick={messageHandler} styleType='bigWhite' margin=''>Send Message</Button>
        </div>
        
      
      </div>
    ) 
  }
  
  return (
    <div className={styles.container}>
      {ui}
        
    </div>
  )
}