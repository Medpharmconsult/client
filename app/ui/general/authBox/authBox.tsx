import Link from "next/link";
import styles from "@/app/ui/general/authBox/authBox.module.css"

export default function AuthBox() {
    return (
      

        <div className={styles.authBox}>
          <Link href="/auth" className={styles.link}>Login  &nbsp;/&nbsp; Signup</Link>
        </div>
        
      
    );
}
