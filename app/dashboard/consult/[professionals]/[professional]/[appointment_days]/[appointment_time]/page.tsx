"use client"
import { useState, useEffect } from 'react';
import {useRouter, usePathname} from "next/navigation"
import { apiFetcher } from '@/app/lib/utilities';
import styles from "@/app/dashboard/consult/[professionals]/[professional]/[appointment_days]/[appointment_time]/appointment_time.module.css"

interface ApiResponse{
    statusCode: number;
    responseData: {
      msg: string, 
      appointmentTimes: [{_id: string, startTime: number, endTime: number, startMeridian: string, endMeridian: string}]
    };  
}

export default function AppointmentDays() {

    const [isLoading, setIsLoading] = useState(true); 
    const [apiData, setApiData] = useState({} as ApiResponse);
    const [activeMonth, setActiveMonth] = useState("")
    const [activeDay, setActiveDay] = useState("")
    const [activeYear, setActiveYear] = useState("")


    useEffect(()=>{
        
      async function fetcher() {
        
        const profID = localStorage.getItem("profID")
        const activeDay = JSON.parse(localStorage.getItem("activeDay") as string )
        const activeMonth = localStorage.getItem("activeMonth") as string
        const activeYear = localStorage.getItem("activeYear") as string
        const times = await apiFetcher(`${process.env.NEXT_PUBLIC_Host_Name}/get-schedule-time?professional=${profID}&month=${activeMonth}&year=${activeYear}&day=${activeDay}`, {method: "GET"}) as ApiResponse
        setApiData(times)
        setIsLoading(false)
        setActiveMonth(activeMonth)
        setActiveDay(activeDay)
        setActiveYear(activeYear)
      }
    
      fetcher()
        
    
    },[])



    const timeMap = [
        "12AM", "1AM", "2AM", "3AM" , "4AM", "5AM", "6AM",
        "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM",
        "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM",
        "9PM", "10PM", "11PM"
    ]
  
    
    const bookHandler = async (id: string)=>{
        const token = localStorage.getItem(`${process.env.NEXT_PUBLIC_Token_Key}`)
        
        const times = await apiFetcher(`${process.env.NEXT_PUBLIC_Host_Name}/book-appointment`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({scheduleId: id})
        }) as ApiResponse
        
        if(times.statusCode === 200){
            const profID = localStorage.getItem("profID")
            const updatedTimes = await apiFetcher(`${process.env.NEXT_PUBLIC_Host_Name}/get-schedule-time?professional=${profID}&month=${activeMonth}&year=${activeYear}&day=${activeDay}`, {method: "GET"}) as ApiResponse
            alert("appointment booked successfully")
            setApiData(updatedTimes)

        }
    }
    
      
    let ui;
    
    if(isLoading){
      ui = <div>LOADING...</div>
    }else{
      ui=(  
        <div className={styles.daysContainer}>
          
          <div className={styles.chartContainer}>
            <div className={styles.chartHeader} >
                <h3 className={styles.chartHeading}>{`${activeDay}/${activeMonth}/${activeYear}`}</h3> 
            </div>
            <div >
                {
                  (apiData.responseData.appointmentTimes.length < 1) ? 
                  <h2>No appointments this month</h2> :
                  <div className={styles.chartBody}>
                    {

                        apiData.responseData.appointmentTimes.map((time, index)=>(
                            
                            <div key={time._id} >
                                <div>{`${timeMap[time.startTime]} - ${timeMap[time.endTime]}`} </div>
                                <button onClick={()=>bookHandler(time._id)}>BOOK</button>
                            </div>
                            
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