
"use client"
import { useEffect } from "react";
import io, {Socket} from "socket.io-client"
import { jwtDecode } from "jwt-decode";

let socket: Socket | null=null;

export default function useSocket(){
    //if(!socket) socket = io(`${process.env.NEXT_PUBLIC_Host_Name}`)
    useEffect(()=>{
        if(!socket){
            socket = io(`${process.env.NEXT_PUBLIC_Host_Name}`)
            
            socket?.on('connect', () => {
                console.log("connected")
        
                const token = localStorage.getItem("mpcToken")
                const user = jwtDecode(`${token}`) as {userID: string}
                socket?.emit("addActiveUser", user.userID)
            
            });

        }
        
    }, [])

    return socket
}


export const disconnectSocket = (/*socketIn: Socket*/ ) => {
    if (socket && typeof window !== 'undefined') {

        const token = localStorage.getItem("mpcToken")
        const user = jwtDecode(`${token}`) as {userID: string}
        socket.emit("removeActiveUser", user.userID, ()=>{
            socket?.disconnect();
            socket = null;
        })
    }
};