"use client"
import {useRef, useState, useEffect} from "react"
import styles from "@/app/dashboard/message/message.module.css"
import useSocket from "@/app/lib/socket"
import { jwtDecode } from "jwt-decode";
import { apiFetcher } from "@/app/lib/utilities"

interface ApiResponse{
  statusCode: number;
  responseData: {
    msg: string, 
    messages: [
      {
          text: string, sender: string, receiver: string
      }
    ]
  };  
}

export default function Message(){
  const socket = useSocket()
  const chatEndRef = useRef<HTMLLIElement>(null);
  const text = useRef<HTMLTextAreaElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userID, setUserID] = useState("")
  const [messages, setMessages] = useState<{text: string, sender: string, receiver: string}[]>([])

  useEffect(()=>{
    
    async function fetcher() {
      const token = localStorage.getItem("mpcToken")
      const user = jwtDecode(`${token}`) as {userID: string}
      const contact = localStorage.getItem("msgReceiver")
      const data = await apiFetcher(`${process.env.NEXT_PUBLIC_Host_Name}/get-messages?contactID=${contact}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }) as ApiResponse
      if(data.statusCode == 200){
        
        setMessages(data.responseData.messages)
        setIsLoading(false)
        setUserID(user.userID)
        scrollToBottom()
      }
       
  }

  fetcher()
    socket?.on("message", (data: {text: string, sender: string, receiver: string})=>{
      
      setMessages((prevMsgs)=>[...prevMsgs, data])
      
    })

   return ()=>{
    socket?.off("message")
   }

    
  }, [socket])

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = ()=>{
    chatEndRef.current?.scrollIntoView(false);

  }
  
  const messageHandler = ()=>{
    const token = localStorage.getItem("mpcToken")
    const user = jwtDecode(`${token}`) as {userID: string}
    const receiver = localStorage.getItem("msgReceiver")
    const sentText = text.current?.value as string
    if(text.current?.value && user.userID && receiver){
      const message = {text: sentText, sender: user.userID, receiver: receiver }
      text.current.value = ""
      setMessages([...messages, message])
      socket?.emit("message", message)
    }
    
  }

  let ui;
  if(isLoading){
    ui = <div className={styles.loadingBox}>Loading</div>
  }
  else{
    ui = <div className={styles.container}>
      <h1 className={styles.header}>Messages</h1>
      <div className={styles.chatContainer}>
        <ul>
        {messages.map((message, index) => (
          message.sender == userID?
          <li className={styles.senderMsg} key={index}>{message.text}</li>
          :
          <li className={styles.receiverMsg} key={index}>{message.text}</li>
           // Display each item as an li element
        ))}
        <li ref={chatEndRef} />
        </ul>
        <div className={styles.textnBtn}>
          <textarea ref={text} className={styles.text} name="" id=""></textarea> 
          <button className={styles.sendBtn} onClick={messageHandler}>send</button>
        </div>
        
      </div>
        
            
    </div>

  }
  
  
  return (ui);
}
   