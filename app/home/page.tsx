//import Nav from "@/app/ui/general/nav/nav"
import Welcome from '@/app/ui/home/welcomeSection/welcome' 
import ServicesSection from "../ui/home/servicesSection/services"
import AssuranceSection from "@/app/ui/home/assuranceSection/assurance"
import StaffSection from "../ui/home/staffSection/staff"

export default function Home() {
  return (

    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     
      <section>
        <Welcome/>
      </section>

      <section>
        <ServicesSection/>
      </section>
      <AssuranceSection/>
      <StaffSection/>
      
    </main>
  )
  
}

//<Nav/>