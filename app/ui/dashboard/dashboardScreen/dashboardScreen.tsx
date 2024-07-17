import styles from "@/app/ui/dashboard/dashboardScreen/dashboardScreen.module.css"


export default function DashboardScreen({ children }: { children: React.ReactNode }) {
    return (
  
      <div className={styles.screen}>
        {children}
      </div>
    )
    
  }