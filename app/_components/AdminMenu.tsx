"use client";
import AdminLogo from "./AdminLogo";
import { useAdminContext } from "@/context/AdminContext";
import { usePathname, useRouter } from "next/navigation";
import { cloneElement } from "react";
import { fetchMenu } from "../_lib/utilities";

export default function DashboardMenu({ role }: { role: string }) {
  // Get pathname
  const pathname = usePathname();
  // Get router
  const router = useRouter();
  // Get menu
  const menu = fetchMenu(role);
  const { nav, setMobileNav, mobileNav } = useAdminContext();
  // Handle navigate
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
        <div className="py-8 flex items-center border-b-1 border-secondary-200 px-[15px]">
          <AdminLogo isNavOpen={nav} />
        </div>
        <div className="pt-6 px-[15px] ">
          {menu && (
            <ul>
              {menu.map((item, index) => (
                <li className="border-b-1  border-secondary-200" key={index}>
                  <button
                    onClick={() => handleRoute(item.link)}
                    className={`text-white transition-none flex items-center w-full gap-x-3 px-3 py-3 hover:bg-primary-200 ${
                      pathname === item.link ? "bg-primary-200" : ""
                    } `}
                  >
                    <span>
                      {cloneElement(<item.icon />, {
                        size: 24,
                        className: "text-secondary-100",
                      })}
                    </span>
                    <span
                      className={`${nav ? "md:inline-block" : "md:hidden"}`}
                    >
                      {item.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
