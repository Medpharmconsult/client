"use client"
import { useState, useEffect } from 'react';
import {useRouter, usePathname} from "next/navigation"
import { apiFetcher, localStorageHandler } from '@/app/lib/utilities';
import styles from "@/app/dashboard/consult/[professionals]/[professional]/[appointment_days]/appointment_days.module.css"
import { getCurrentMonth, getCurrentYear, getNextMonth } from '@/app/lib/utilities';

interface ApiResponse{
    statusCode: number;
    responseData: {
      msg: string, 
      appointmentDays: [{_id: string, month: string, day: number}]
    };  
  }

export default function AppointmentDays() {

    const [isLoading, setIsLoading] = useState(true);
    const [month, setMonth] = useState("")
    const [apiData, setApiData] = useState({} as ApiResponse);
    const [isCurrentMonth, setIsCurrentMonth] = useState(true)
    const router = useRouter()
    const pathName = usePathname()
    
    const currentYear = getCurrentYear()
    const currentMonth = getCurrentMonth()
    const nextMonth = getNextMonth()

    useEffect(()=>{
        
      async function fetcher() {
        
        const profID = localStorage.getItem("profID")
        
        const appointments = await apiFetcher(`${process.env.NEXT_PUBLIC_Host_Name}/get-schedule?professional=${profID}&month=${currentMonth}&year=${currentYear}`, {method: "GET"}) as ApiResponse
        setApiData(appointments)
        setIsLoading(false)
        setMonth(currentMonth)
      }
    
      fetcher()
        
    
    },[])
  
    const switchMonth = async (month: string)=>{
      const profID = localStorage.getItem("profID")
      if(month == "next"){
        const appointments = await apiFetcher(`${process.env.NEXT_PUBLIC_Host_Name}/get-schedule?professional=${profID}&month=${nextMonth}&year=${currentYear}`, {method: "GET"}) as ApiResponse
        setMonth(nextMonth)
        setIsCurrentMonth(false)
        setApiData(appointments)

      }
      else if(month == "current"){
        const appointments = await apiFetcher(`${process.env.NEXT_PUBLIC_Host_Name}/get-schedule?professional=${profID}&month=${currentMonth}&year=${currentYear}`, {method: "GET"}) as ApiResponse
        setMonth(currentMonth)
        setIsCurrentMonth(true)
        setApiData(appointments)

      }
    }
    const dayHandler = (day: number)=>{
      localStorage.setItem("activeMonth", month)
      localStorage.setItem("activeYear", JSON.stringify(currentYear))
      localStorage.setItem("activeDay", JSON.stringify(day))

      router.push(`${pathName}/appointment_time`)
    }
    
      
    let ui;
    
    if(isLoading){
      ui = <div>LOADING...</div>
    }else{
      ui=(  
        <div className={styles.daysContainer}>
          
          <div className={styles.chartContainer}>
            <div className={styles.chartHeader} >
            { !isCurrentMonth? <div className={styles.arrow} onClick={()=>switchMonth("current")} > &larr;</div>: null}
                <h3 className={styles.chartHeading}>{month}</h3> 
                { isCurrentMonth? <div className={styles.arrow} onClick={()=>switchMonth("next")}> &rarr;</div>: null}
            </div>
            <div >
                {
                  (apiData.responseData.appointmentDays.length < 1) ? 
                  <h2>No appointments this month</h2> :
                  <div className={styles.chartBody}>
                    {
                        apiData.responseData.appointmentDays.map((schedule, index)=>(
                            <div key={schedule._id} onClick={()=>dayHandler(schedule.day)}>{schedule.day}</div>
                        ))
                    }
                  </div>  
                }
            </div>
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