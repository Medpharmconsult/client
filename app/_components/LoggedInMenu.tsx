"use client";
import ProfileImg from "@/app/_components/ProfileImage";
import Link from "next/link";
import MobileMenu from "@/app/_components/MobileMenu";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { FaArrowRightToBracket, FaPalette } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { userType } from "@/app/_lib/types";
import { signOut } from "@/app/_lib/actions";
import { useTransition } from "react";
import { dashboardLink } from "../_lib/utilities";
import { disconnectSocket } from "../_lib/socket";

export default function LoggedInMenu({ user }: { user: userType }) {
  // Get pathname
  const pathName = usePathname();
  const [pending, start] = useTransition();
  // Sign out user
  function handleSignOut() {
    // Disconnect socket
    disconnectSocket(user.token);
    start(async () => {
      await signOut();
    });
  }
  return (
    <MobileMenu>
      <MobileMenu.Button>
        <div className="flex items-center justify-center cursor-pointer gap-4 *:pointer-events-none">
          <ProfileImg
            size={48}
            src={
              user.profileImg &&
              `${process.env.NEXT_PUBLIC_Host_Name}${user.profileImg}`
            }
            alt="user-image"
            altImg={
              <h1 className="text-[24px]/[1] font-semibold pointer-events-none uppercase">
                {user.firstName?.slice(0, 1)}
              </h1>
            }
            priority
          />
          <div className="hidden md:flex items-center justify-center gap-4">
            <div className="flex flex-col items-start gap-[2px]">
              <span className="font-medium text-sm capitalize">{`${user.lastName} ${user.firstName}`}</span>
              <span className="uppercase text-[11px] font-medium text-grey-100">
                {user.role}
              </span>
            </div>
            <MobileMenu.Icon
              altIcon={<BsChevronUp size={16} className="text-grey-100" />}
            >
              <BsChevronDown size={16} className="text-grey-100" />
            </MobileMenu.Icon>
          </div>
        </div>
      </MobileMenu.Button>
      <MobileMenu.List>
        <MobileMenu.Item>
          {pathName.startsWith("/dashboard") ? (
            <Link href="/">
              <FaHome className="text-secondary-100" size={16} />
              Home
            </Link>
          ) : (
            <Link href={`${dashboardLink(user.role)}`}>
              <FaPalette className="text-secondary-100" size={16} /> Dashboard
            </Link>
          )}
        </MobileMenu.Item>
        <MobileMenu.Item>
          <button onClick={handleSignOut} disabled={pending}>
            <FaArrowRightToBracket
              className="text-secondary-100 rotate-180"
              size={16}
            />
            Logout
          </button>
        </MobileMenu.Item>
      </MobileMenu.List>
    </MobileMenu>
  );
}
