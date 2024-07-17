import styles from "@/app/ui/general/modal/modal.module.css"


interface ModalProps {
  children: React.ReactNode,
  hide: boolean,
  closeModal: Function
  
}


export default function Modal({children, hide, closeModal}: ModalProps) {

  const hideModal= ()=>{
    closeModal()
  }
  
    return (
  
      <div id="modal" className={hide ?  styles.container : styles.hide}>
        <div className={styles.closeContainer}><span onClick={hideModal} className={styles.close}>X</span></div>
        <div className={styles.contentContainer}>
          {children}
        </div>
        
      </div>
    )
    
}