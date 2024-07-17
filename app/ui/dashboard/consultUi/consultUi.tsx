"use client"
import { useState, useEffect } from 'react';
import {useRouter, usePathname} from "next/navigation"
import styles from "@/app/ui/dashboard/consultUi/consultUi.module.css"
import { Button } from "../../general/button/button";
import { apiFetcher} from "@/app/lib/utilities";
import {useGlobalContext} from "@/context/store"

interface ApiResponse{
  statusCode: number;
  msg: string;
  responseData: Array<{_id: string, name: string, code: string}>;
}


export default function ConsultUi(){
  
  const [apiData, setApiData] = useState({} as ApiResponse);
  const [isLoading, setIsLoading] = useState(true);
  const store = useGlobalContext()
  const router = useRouter()
  const pathName = usePathname()

  useEffect(()=>{
    async function fetcher() {
      const professions = await apiFetcher(`${process.env.NEXT_PUBLIC_Host_Name}/get-professions`, {method: "GET"}) as ApiResponse
      setApiData(professions)
      setIsLoading(false)
      
    }

    fetcher()
    

  },[])

  let ui;
  

  if(isLoading){
    ui = <div>LOADING...</div>
  }else{
    ui=  <div className={styles.profGrid}>
    {
      apiData.responseData.map((profession, index)=>(
        <Button key={profession._id} styleType="big" margin="" onClick={(e)=>professionHandler(profession)}>{profession.name}</Button>
        
      ))
    }
  </div> 
  }
  
  
  const professionHandler = (prof:{name: string, code: string})=>{
    
    router.push(`${pathName}/${prof.code}`)
  }

  return (
    <div className={styles.container}>
      {ui} 
  
    </div>
  );
}
 