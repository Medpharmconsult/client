import styles from "@/app/ui/home/servicesSection/services.module.css"
import Image from 'next/image';

const specialtiesData = [
    {name: "Doctors", icon: "/service-doctor.jpg"}, {name: "Pharmacist", icon: "/service-pharmacist.jpg"}, {name: "Psychologist", icon: "/service-psychologist.jpg"},
    {name: "Mental ", icon: "/service-therapist.jpg"}
];

const medicalConditions = [
    "Anxiety", "Depression", "Pregnancy", "Delayed period", "Headache", 
    "Acne", "Chest pain", "Erectile dysfunction", "Unprotected sex", "Backpain",
    "Diabetes", "Stress", "Fever", "HIV", "Fungal Infection", 
    "Constipation", "Masturbation", "Diarrhea", "Premature Ejaculation", "Sore Throat"

]
//const medicalConditions2 = ["Diabetes", "Stress", "Fever", "HIV", "Fungal Infection", "Constipation", "Masturbation", "Diarrhea", "Premature Ejaculation", "Sore Throat"]

export default function ServicesSection() {
    return (

        <div className={styles.container}>
            <h1 className={styles.title}>From <span className={styles.lightBlue}>little</span> to <span className={styles.lightBlue}>life-altering</span> issues,</h1>
            <h2 className={styles.subtitle}>Get answers for anything and everything.</h2>
            <div className={styles.specialties}>
                {specialtiesData.map((specialty, index) => (
                    <div key={index} className={styles.specialty}>
                    
                    <div className={styles.specialtyIcon}>
                    <Image
                        src={specialty.icon}
                        fill={true}
                        alt="Image of a doctor"
                        sizes="192px"
                        className={styles.img}
                    />
                    </div>
                    <p className={styles.specialtyName}><strong>{specialty.name}</strong></p>
                    </div>
                ))}
            </div>

            <p className={styles.para1}>
                With 80+ specialties covered, get medical advice and medical<br/>
                second opinion to any of your health concerns under one roof.
            </p>

            <h1 className={styles.heading2}>Most searched medical conditions</h1>
            <div className={styles.illnessBox}>
                <div className={styles.illnessContainer}>
                    {medicalConditions.map((condition, index) => (
                        <div className={styles.illness} key={index}><strong>{condition}</strong></div>
                    ))}
                </div>
                {/* <div className={styles.illnessContainer + " " + styles.illnessContainerBottom}>
                    {medicalConditions2.map((condition, index) => (
                        <div className={styles.illness} key={index}><strong>{condition}</strong></div>
                    ))}
                </div> */}
            </div>
        </div>
    )
}