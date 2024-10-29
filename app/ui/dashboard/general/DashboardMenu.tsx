"use client";
import { useDashboardContext } from "@/context/DashboardContext";
import { usePathname, useRouter } from "next/navigation";
import { cloneElement } from "react";
import { FaCog } from "react-icons/fa";
import {
  FaCalendarCheck,
  FaCalendarDays,
  FaHospitalUser,
  FaMoneyBill,
  FaPalette,
  FaUserDoctor,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa6";
import DashboardLogo from "./DashboardLogo";
const patientMenu = [
  {
    name: "Dashboard",
    link: `/dashboard/consult`,
    icon: <FaPalette />,
  },
  {
    name: "Contacts",
    link: "/dashboard/contacts",
    icon: <FaUsers />,
  },
  {
    name: "Billing",
    link: "",
    icon: <FaMoneyBill />,
  },
  {
    name: "Settings",
    link: "",
    icon: <FaCog />,
  },
];

const professionalMenu = [
  {
    name: "Dashboard",
    link: "/dashboard/staff",
    icon: <FaPalette />,
  },
  {
    name: "Contacts",
    link: "/dashboard/contacts",
    icon: <FaUsers />,
  },
  {
    name: "Appointments",
    link: "/dashboard/staff/viewAppointments",
    icon: <FaCalendarCheck />,
  },

  {
    name: "Set schedule",
    link: "/dashboard/staff/setSchedule",
    icon: <FaCalendarDays />,
  },
  {
    name: "Settings",
    link: "",
    icon: <FaCog />,
  },
];
const adminMenu = [
  {
    name: "Dashboard",
    link: "/dashboard/admin",
    icon: <FaPalette />,
  },
  {
    name: "Add profession",
    link: "/dashboard/admin/addProfession",
    icon: <FaHospitalUser />,
  },
  {
    name: "Add professional",
    link: "/dashboard/admin/addProfessional",
    icon: <FaUserPlus />,
  },
];
export default function DashboardMenu({ userRole }: { userRole?: string }) {
  const menu =
    userRole === "patient"
      ? patientMenu
      : userRole === "professional"
      ? professionalMenu
      : userRole === "admin"
      ? adminMenu
      : [];

  const pathname = usePathname();
  const router = useRouter();
  const { nav, setMobileNav, mobileNav } = useDashboardContext();

  const handleRoute = (link: string) => {
    router.push(link);
    setMobileNav(false);
  };

  return (
    <>
      <div
        onClick={() => setMobileNav(false)}
        className={`bg-[#000]  ${
          mobileNav ? "opacity-45" : "opacity-0 hidden "
        } md:bg-transparent md:relative md:hidden fixed z-[29] top-0 left-0 w-full h-full`}
      ></div>
      <div
        className={`bg-primary-100 md:left-0 fixed h-full top-0 z-30 opacity-100 ${
          mobileNav ? "left-0" : "left-[-237px]"
        }  `}
      >
        <div className="py-[32px] flex items-center border-b-[1px] border-secondary-200 px-[15px]">
          <DashboardLogo isNavOpen={nav} />
        </div>
        <div className="pt-[32px] px-[15px] ">
          <ul>
            {menu.map((item, index) => (
              <MenuItem
                isNavOpen={nav}
                icon={item.icon}
                href={item.link}
                text={item.name}
                key={index}
                handleRoute={handleRoute}
                isActive={pathname === item.link}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

function MenuItem({
  icon,
  href,
  text,
  isActive,
  isNavOpen,
  handleRoute,
}: {
  icon: React.ReactElement;
  href: string;
  text: string;
  isActive: boolean;
  isNavOpen: boolean;
  handleRoute: Function;
}) {
  return (
    <li className="border-b-[1px] border-secondary-200 ">
      <button
        onClick={() => handleRoute(href)}
        className={`text-white transition-none flex items-center w-full gap-x-[12px] px-[12px] py-[12px] hover:bg-primary-200 ${
          isActive ? "bg-primary-200" : ""
        } `}
      >
        <span>
          {cloneElement(icon, {
            size: 24,
            className: "text-secondary-100",
          })}
        </span>
        <span className={`${isNavOpen ? "md:inline-block" : "md:hidden"}`}>
          {text}
        </span>
      </button>
    </li>
  );
}
