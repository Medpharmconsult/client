"use client";
import ProfileImg from "@/app/_components/ProfileImage";
import Link from "next/link";
import MobileMenu, {
  MobileMenuButton,
  MobileMenuIcon,
  MobileMenuItem,
  MobileMenuList,
} from "@/app/_components/MobileMenu";
import { signOut } from "@/app/_lib/actions";
import { SessionData } from "@/app/_lib/session";
import { disconnectSocket } from "@/app/_lib/socket";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaArrowRightToBracket, FaPalette } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";

export default function LoggedInPlate({ session }: { session: SessionData }) {
  const token: any = session?.token;
  const pathName = usePathname();
  const logout = () => {
    disconnectSocket(token);
    signOut();
  };
  return (
    <MobileMenu>
      <MobileMenuButton>
        <div className="flex items-center justify-center cursor-pointer gap-4 *:pointer-events-none">
          <ProfileImg
            hasImg={session.profileImg ? true : false}
            src={`${process.env.NEXT_PUBLIC_Host_Name}${session.profileImg}`}
            alt="user-image"
            size={56}
            altImg={
              <h1 className="text-[24px]/[1] font-semibold pointer-events-none uppercase">
                {session.firstName?.slice(0, 1)}
              </h1>
            }
          />
          <div className="hidden md:flex items-center justify-center gap-4">
            <div className="flex flex-col items-start gap-[2px]">
              <span className="font-medium text-sm capitalize">{`${session.lastName} ${session.firstName}`}</span>
              <span className="uppercase text-[11px] font-medium text-grey-100">
                {session.role}
              </span>
            </div>
            <MobileMenuIcon
              alternate={<BsChevronUp size={16} className="text-grey-100" />}
            >
              <BsChevronDown size={16} className="text-grey-100" />
            </MobileMenuIcon>
          </div>
        </div>
      </MobileMenuButton>
      <MobileMenuList>
        <MobileMenuItem>
          {pathName.startsWith("/dashboard") ? (
            <Link href="/">
              <FaHome className="text-secondary-100" size={16} />
              Home
            </Link>
          ) : (
            <Link
              href={`${
                session.role === "patient"
                  ? "/dashboard/consult"
                  : session.role === "professional"
                  ? "/dashboard/staff"
                  : session.role === "admin"
                  ? "/dashboard/admin/addProfessional"
                  : ""
              }`}
            >
              <FaPalette className="text-secondary-100" size={16} /> Dashboard
            </Link>
          )}
        </MobileMenuItem>
        <MobileMenuItem>
          <button onClick={logout}>
            <FaArrowRightToBracket
              className="text-secondary-100 rotate-180"
              size={16}
            />
            Logout
          </button>
        </MobileMenuItem>
      </MobileMenuList>
    </MobileMenu>
  );
}
