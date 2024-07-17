"use client"
import { useState, useEffect } from 'react';
import {useRouter, usePathname} from "next/navigation"
import styles from "@/app/dashboard/consult/[professionals]/professionals.module.css"
import { apiFetcher } from "@/app/lib/utilities"
import RoundImage from '@/app/ui/general/roundImage/roundImage';

interface ApiResponse{
  statusCode: number;
  responseData: {msg: string, professionals: Array<{_id: string, firstName: string, lastName: string, username: string, yoe: number, profileImg: string}>};
}

export default function Professionals({params}: {params: {professionals: string}}) {

  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState({} as ApiResponse);
  const router = useRouter()
  const pathName = usePathname()
  useEffect(()=>{
    
    async function fetcher() {
      const professions = await apiFetcher(`${process.env.NEXT_PUBLIC_Host_Name}/get-professionals?profCode=${params.professionals}`, {method: "GET"}) as ApiResponse
      setApiData(professions)
      setIsLoading(false)
    }

    fetcher()
    

  },[])

  const profPageHandler = (professional: {_id: string, username: string})=>{
    
    router.push(`${pathName}/${professional.username}`)
  }

  let ui;

  if(isLoading){
    ui = <div>LOADING...</div>
  }else{
    ui=  <div className={styles.profGrid}>
    {
      apiData.responseData.professionals.map((professional, index)=>(
        <div className={styles.profData} key={professional._id} onClick={()=>profPageHandler(professional)}>
          <div key={professional._id} className= {styles.imageHolder}>
            {
              professional.profileImg ?
              <RoundImage src={`${process.env.NEXT_PUBLIC_Host_Name}${professional.profileImg}`}  
                alt={"medical professional"}
              /> :

              <h1 className= {styles.imgText}>{professional.firstName.at(0)}</h1>
            }
            
          </div>
          <p>{`${professional.firstName} ${professional.lastName}`}</p>
          <p className={styles.lastInfo}>{`YOE: ${professional.yoe}`}</p>
        </div>
      ))
    }
  </div> 
  }

  return (
    <div className={styles.container}>
      {ui}
    </div>
  )
}