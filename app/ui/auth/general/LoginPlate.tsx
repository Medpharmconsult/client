import Button from "@/app/_components/Button";
import MobileMenu from "@/app/_components/MobileMenu";
import Link from "next/link";
import {
  MobileMenuButton,
  MobileMenuIcon,
  MobileMenuItem,
  MobileMenuList,
} from "@/app/_components/MobileMenu";
import { BsList, BsXLg } from "react-icons/bs";
import { FaArrowRightToBracket } from "react-icons/fa6";

export default function LoginPlate() {
  return (
    <>
      <Button isLink={true} href="/auth" classname="hidden xs:inline-block">
        Login / Signup
      </Button>
      <div className="xs:hidden flex items-center">
        <MobileMenu>
          <MobileMenuButton>
            <button>
              <MobileMenuIcon
                alternate={
                  <BsXLg
                    size={24}
                    className="text-grey-100 pointer-events-none"
                  />
                }
              >
                <BsList
                  size={24}
                  className="text-grey-100 pointer-events-none"
                />
              </MobileMenuIcon>
            </button>
          </MobileMenuButton>
          <MobileMenuList>
            <MobileMenuItem>
              <Link href="/auth">
                <FaArrowRightToBracket
                  size={16}
                  className="text-secondary-100"
                />
                Login / Signup
              </Link>
            </MobileMenuItem>
          </MobileMenuList>
        </MobileMenu>
      </div>
    </>
  );
}
