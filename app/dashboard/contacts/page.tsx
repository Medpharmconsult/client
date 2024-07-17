"use client"
import useSocket from "@/app/lib/socket" 
import {useRef, useState, useEffect} from "react"
import { apiFetcher } from "@/app/lib/utilities"
import {useRouter} from "next/navigation"

import styles from "@/app/dashboard/contacts/contacts.module.css"
import RoundImage from    "@/app/ui/general/roundImage/roundImage"


interface ApiResponse{
    statusCode: number;
    responseData: {
      msg: string, 
      contacts: [
        {
            text: string, contactInfo:{primaryID: string, firstName: string, lastName: string, profileImg: string}
        }
      ]
    };  
  }

export default function Messages(){
    const socket = useSocket()
    
    const [contactList, setContactList] = useState<{text: string, contactInfo: {primaryID: string, firstName: string, lastName: string, profileImg: string}}[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    
    useEffect(()=>{
        async function fetcher() {
            const token = localStorage.getItem("mpcToken")
            const data = await apiFetcher(`${process.env.NEXT_PUBLIC_Host_Name}/get-contacts`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`
              }
            }) as ApiResponse
            if(data.statusCode == 200){
                //setContactList((prevMsgs)=>[...data.responseData.contacts, ...prevMsgs])
                setContactList(data.responseData.contacts)
                setIsLoading(false)
            }
             
        }
      
        fetcher()

        socket?.on("message", (data)=>{
            
            setContactList((prevMsgs)=>{
                const filteredList = prevMsgs.filter(contact=> contact.contactInfo.primaryID != data.contactInfo.primaryID)
                return [data, ...filteredList]}
            )
        
        })

        return ()=>{
            socket?.off("message")
           }
        
    }, [socket])
    const switchToMessagePage = (msgReceiver: string)=>{
        localStorage.setItem("msgReceiver", msgReceiver)
        router.push(`/dashboard/message`)
    

    }
    
    let ui;
    if(!isLoading){
        ui = (
            <div>
            <h1 className={styles.header}>Contacts</h1>
            <ul className={styles.contactListContainer}>
            {
                contactList.map((contact, index)=>(
                    <li onClick={e=>switchToMessagePage(contact.contactInfo.primaryID)} className={styles.contactList} key={index}>
                        <div className={styles.imgContainer}>
                            {
                                contact.contactInfo.profileImg ?
                                <RoundImage src={`${process.env.NEXT_PUBLIC_Host_Name}${contact.contactInfo.profileImg}`} 
                                    alt="patient"
                                /> :
                                <h2 className={styles.imgText}>{contact.contactInfo.firstName.at(0)}</h2>
                            }
                            
                        </div>
        
                        <div className={styles.contactContainer}>
                            <h3> {`${contact.contactInfo.firstName} ${contact.contactInfo.lastName}`}</h3> 
                            <p> {contact.text}</p> 
                        </div>
                    </li>
                ))
            }
            </ul>
            
        </div>
        )
    }
    else{
        ui= <div> LOADING... </div>
    }
    
    return (ui)

}