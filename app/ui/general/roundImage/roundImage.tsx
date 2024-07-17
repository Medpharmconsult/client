import Image from 'next/image';
import styles from "@/app/ui/general/roundImage/roundImage.module.css"


interface RoundImageProps {
    src: string,
    alt: string
}

export default function RoundImage ({src, alt}: RoundImageProps){

    return (
      //<div className={styles.container}>
      <img className={styles.img} src={src} alt={alt} />
        
    
      //</div>
    )
}
