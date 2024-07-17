import {useRouter} from "next/navigation"
import styles from "@/app/ui/general/loginPlate/loginPlate.module.css"
import RoundImage from "../roundImage/roundImage";
import { useState } from "react";
import { useGlobalContext } from "@/context/store";
import { disconnectSocket } from "@/app/lib/socket";
//import useSocket from "@/app/lib/socket";

interface LoginPlateProps extends React.HTMLAttributes<HTMLDivElement>{

    user: {firstName:string, profileImg: string, role: string, collection: string}
    
}


export default function LoginPlate({user, ...rest}: LoginPlateProps) {
    const router = useRouter()
    const [isVisible, setIsVisible] = useState(false)
    const {setIsLoggedIn, setUser} = useGlobalContext()
    //const socket = useSocket()
    
    const className = isVisible ? styles.showProfileMenu : styles.hideProfileMenu;
    
    const profileMenuHandler = (e:React.MouseEvent, isOpen: boolean)=>{
        e.stopPropagation()
        setIsVisible(isOpen)  
    }
    const goToDashboard = (e:React.MouseEvent)=>{
        e.stopPropagation()
        if(user.collection == "patients"){
            //redirect to dashboard
            setIsVisible(false)
            router.push("/dashboard/consult")
        }
        else if(user.collection == "professionals"){
            //redirect to dashboard
            setIsVisible(false)
            router.push("/dashboard/viewAppointments")

        }
    }
    const logout = (e:React.MouseEvent)=>{
        e.stopPropagation()
        disconnectSocket()
        localStorage.clear()
        setIsVisible(false)
        setIsLoggedIn(false)
        setUser(false)
        router.push("/auth")
        
    }
    return (
        <div onClick={e=>profileMenuHandler(e, true)} className={styles.loginPlate}>
          {
            user.profileImg?<RoundImage src={`${process.env.NEXT_PUBLIC_Host_Name}${user.profileImg}`} alt="user image"/>:
            <h1 className={styles.letter}>{user.firstName.slice(0, 1)}</h1>
          }

          <ul className={className}>
            <li className={styles.closeMenu}><span onClick={(e) => {profileMenuHandler(e, false)}}>X</span></li>
            <li onClick={goToDashboard}>Dashboard</li>
            <li onClick={logout}>Logout</li>
          </ul>
        </div>
        
      
    );
}