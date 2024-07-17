import styles from "@/app/ui/home//welcomeSection/welcome.module.css"
import Image from 'next/image';
import { Button } from "../../general/button/button";

export default function Welcome() {
    return (
        <div>

            <h1 className={styles.welcomeHeader}>WELCOME TO MEDPHARM-CONSULT</h1>
            <div className={styles.wecomeBox}>
                <div className={styles.leftDiv}>
                    <h1 className={styles.leftDivHeader}>Consult top medical professionals effortlessly</h1>
                    <p className={styles.leftDivPara1}>Get 24/7 online consultations with the best doctors
                        without breaking a sweat and your bank
                    </p>
                    
                    <div className={styles.leftDivBtnContainer}>
                        <Button styleType="big" margin="rightMargin">Start a consult now</Button>
                        <Button styleType="bigWhite" margin="">Ulimited chat</Button>
                    </div>
                    <p className={styles.leftDivPara2}><span>Your first query consult is free</span></p>
                </div>
                <div className={styles.rightDiv}>
                <Image
                        src="/welcome-d.jpg"
                        fill={true}
                        alt="Image of a doctor"
                        priority
                        sizes="50vw"
                        className={styles.img}                        
                    />
                </div>
            </div>

        </div>
    )
}
