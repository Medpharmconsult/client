import DashboardMenu from "../ui/dashboard/dashboardMenu/dashboardMenu"
import DashboardScreen from "../ui/dashboard/dashboardScreen/dashboardScreen"
import MobileDashboardMenu from "../ui/dashboard/mobileDashboardMenu/mobileDashboardMenu"
import styles from "./dashboard.module.css"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  
    return (
  
      <main className={styles.page}>
        <MobileDashboardMenu/>
        <DashboardMenu/>
        <DashboardScreen>
          {children}
        </DashboardScreen>
        
      </main>
    )
    
  }