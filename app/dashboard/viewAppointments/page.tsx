"use client"
import { useState, useEffect } from "react";
import { apiFetcher } from "@/app/lib/utilities"
import styles from "@/app/dashboard/viewAppointments/viewAppointments.module.css"

interface ApiResponse{
  statusCode: number;
  responseData: {
    msg: string, 
    bookedAppintments: [
      {
        _id: string, startTime: number, endTime: number, startMeridian: string, 
        endMeridian: string, day: number, month: string, year: number, patientData: {firstName: string, lastName: string}
      }
    ]
  };  
}

export default function ViewAppointments(){
  
    const [apiData, setApiData] = useState({} as ApiResponse);
    const [isLoading, setIsLoading] = useState(true);
    
  
    useEffect(()=>{
      async function fetcher() {
        const token = localStorage.getItem("mpcToken")
        const data = await apiFetcher(`${process.env.NEXT_PUBLIC_Host_Name}/get-booked-appointments`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }) as ApiResponse
        setApiData(data)
        setIsLoading(false)
        
      }
  
      fetcher()
      
  
    },[])

    const timeMap = [
      "12AM", "1AM", "2AM", "3AM" , "4AM", "5AM", "6AM",
      "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM",
      "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM",
      "9PM", "10PM", "11PM"
    ]
  
     let ui;
    
  
    if(isLoading){
      ui = <div>LOADING...</div>
    }else{
      
      ui=  <>
      {
        apiData.responseData.bookedAppintments.length < 1 ?
        <div className={styles.empty}><h2>No Appointments yet</h2></div>:
        <div className={styles.appointmentGrid}>{
          apiData.responseData.bookedAppintments.map((appointment, index)=>(
            <div className={styles.tile} key={appointment._id}>
              <div>{`${appointment.patientData.firstName} ${appointment.patientData.lastName}`}</div>
              <div>
                {`duration: ${timeMap[appointment.startTime]} - ${timeMap[appointment.endTime]} `}
              </div>
              <div>
                {`${appointment.day}/${appointment.month}/ ${appointment.year}`}
              </div>
            </div>
          
          ))
        }</div>
      }</>
    
    }
    
    return (
      <div className={styles.container}>
        {ui}
    
      </div>
    );
  }
   

  //<div className={styles.appointmentGrid}>