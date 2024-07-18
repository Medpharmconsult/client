"use client"
import {useRef, useState} from "react"
import useSocket from "@/app/lib/socket" 
import styles from "@/app/ui/dashboard/messages/messages.module.css"
import RoundImage from "../../general/roundImage/roundImage"

export default function MessagesUI(){
    const socket = useSocket()
    const [contactList, setContactList] = useState<{text: string, sender: {firstName: string, lastName: string, profileImg: string}}[]>([])
    
    socket?.on("message", (data)=>{
        console.log(data)
        setContactList([data, ...contactList])
    })

    return (
        <div>
            <h1 className={styles.header}>Messages</h1>
            <ul className={styles.contactListContainer}>
                {contactList.map((contact, index)=>(
                    <li className={styles.contactList} key={index}>
                        <div className={styles.imgContainer}>
                            <RoundImage src={`${process.env.NEXT_PUBLIC_Host_Name}${contact.sender.profileImg}`} 
                                alt="patient"
                            />
                        </div>
                        
                        <div className={styles.contactContainer}>
                            <h3> {`${contact.sender.firstName} ${contact.sender.lastName}`}</h3> 
                            <p> {contact.text}</p> 
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )

}