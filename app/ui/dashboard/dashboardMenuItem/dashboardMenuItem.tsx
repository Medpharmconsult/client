import styles from "@/app/ui/dashboard/dashboardMenuItem/dashboardMenuItem.module.css"

interface LiProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: React.ReactNode;
    
}
export default function DashboardMenuItem({children, ...rest}:LiProps) {
    
    
    return (
        <label htmlFor="sidebar-active" className={styles.item} {...rest}>
            
            {children}
        </label>

    )
}
//LiHTMLAttributes
//HTMLLIElement