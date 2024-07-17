"use client"

import {useRouter} from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import styles from "@/app/ui/dashboard/dashboardMenu/dashboardMenu.module.css";
import DashboardMenuItem from "../dashboardMenuItem/dashboardMenuItem";




export default function DashboardMenu() {
  const [token, setToken] = useState("")
  useEffect(()=>{
    setToken(`${localStorage.getItem("mpcToken")}`)
  }, [])

  const router = useRouter()
  const patientMenu = [
    {name: "Consult", icon: "icon", handler: ()=>router.push(`/dashboard/consult`)}, 
    {name: "Search", icon: "icon", handler: ()=>{console.log("Search world")}},
    {name: "Billing", icon: "icon", handler: ()=>{console.log("billing world")}}, 
    {name: "Setting", icon: "setting", handler: ()=>{console.log("setting world")}}
  ];
  

  const professionalMenu = [
    {name: "View appiontments", icon: "icon", handler: ()=>router.push(`/dashboard/viewAppointments`)}, 
    {name: "Contacts", icon: "icon", handler: ()=>router.push(`/dashboard/contacts`)},
    {name: "set schedule", icon: "icon", handler: ()=>router.push(`/dashboard/setSchedule`)}, 
    {name: "Setting", icon: "setting", handler: ()=>{console.log("setting world")}}
  ];

  const adminMenu = [
    {name: "Add professional", icon: "icon", handler: ()=>router.push(`/dashboard/add-professional`)}, 
    {name: "Add profession", icon: "icon", handler: ()=>router.push(`/dashboard/add-profession`)}
  ];

  let menu: any[] = [];

  let ui;
  if(token){
    const user = jwtDecode(`${token}`) as {role: string}
    
    if(user.role == "patient") menu = patientMenu
    else if(user.role == "professional") menu = professionalMenu
    else if(user.role == "admin") menu = adminMenu

    ui = (<main className={styles.container}>
    <ul>
      {
        menu.map((item, index)=>(
          <DashboardMenuItem key={index} onClick={item.handler}>

            <div>
              {item.name}
            </div>
          </DashboardMenuItem>
        ))
      }
     
    </ul>

  </main>)
  
  }
  else{
    ui = <div className={styles.loading}>LOADING...</div>
  }

  
  
  return (
    ui
  )
}