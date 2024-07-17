"use client"
import {useRouter} from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { IoMdMenu, IoMdCloseCircle } from "react-icons/io";
import styles from "@/app/ui/dashboard/mobileDashboardMenu/mobileDashboardMenu.module.css"
import DashboardMenuItem from "../dashboardMenuItem/dashboardMenuItem"

export default function MobileDashboardMenu() {
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

    let menu: any[] = [];

  let UI;
  if(token){
        const user = jwtDecode(`${token}`) as {role: string}
    
        if(user.role == "patient") menu = patientMenu
        else if(user.role == "professional") menu = professionalMenu

        UI = (
            <nav className={styles.container}>
            
                <input type="checkbox" id="sidebar-active" className={styles.sidebar_active}/>
                <label htmlFor="sidebar-active" className={styles.open_sidebar_button}>
                    <IoMdMenu />
                </label>
                {/* <label id="overlay" htmlFor="sidebar-active"></label> */}
                <div className={styles.links_container}> 
                    <label htmlFor="sidebar-active" className={styles.close_sidebar_button}>
                        <IoMdCloseCircle />
                    </label>

                    {/* -- NOT IN TUTORIAL: The <a> tags are linked to the subpages -- */}
                    <ul className={styles.menuItems}>
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
                </div>
            </nav>
        )
  
    }
    else{
        UI = <div className={styles.loading}>LOADING...</div>
    }


    return (
  
        UI
    )
    
}

