import styles from "@/app/ui/home/staffSection/staff.module.css"
import { Button } from "../../general/button/button"

export default function StaffSection() {
    return (

        <section>
            <div className={styles.container}>
                <div className={styles.left}>
                    <h2 className={styles.text}>Are you a doctor?</h2>
                    <h1 className={styles.text + " " + styles.marginTop}>Well, Hi doc. <br /> Your patients are here.</h1>
                    <p className={styles.text + " " + styles.marginTop}>
                        Join our medical panel of 4500+ doctors and be a part <br />
                        of the already big thing in healthcare.
                    </p>
                    <div className={styles.btnContainer}>
                    
                        <Button styleType="bigWhite" margin="rightMargin">Join for free</Button>
                        <Button styleType="blueWhiteBorder" margin="">Medpham for doctors</Button>
                    </div>
                </div>
                <div className={styles.right}>
                    <p className={styles.para}>Why Medpharm consult?</p>
                    <ul>
                        <li>Meet and treat patients from 196+ countries</li>
                        <li>Monetize your free time by answering patient queries</li>
                        <li>Build your online brand presence</li>
                        <li>Publish medical articles for 1M+ Medpharm users</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}