
import styles from "@/app/ui/general/button/button.module.css"//import { propagateServerField } from "next/dist/server/lib/render-server";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    styleType: string,
    margin: string
}


export function Button({ children, margin,  styleType, ...rest }: ButtonProps) {
    return (
      <button
        {...rest}
        className={styles[styleType] + ' ' +styles[margin]}
        
      >
        {children}
      </button>
    );
}
  