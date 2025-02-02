"use client";
import Button from "@/app/_components/Button";
import MobileMenu from "@/app/_components/MobileMenu";
import Link from "next/link";
import { BsList, BsXLg } from "react-icons/bs";
import { FaArrowRightToBracket } from "react-icons/fa6";

export default function LoginMenu() {
  return (
    <>
      <Button href="/auth" styles="hidden md:inline-block">
        Login / Signup
      </Button>
      <div className="md:hidden flex items-center">
        <MobileMenu>
          <MobileMenu.Button>
            <button className="flex items-center justify-center h-6 w-6">
              <MobileMenu.Icon
                altIcon={
                  <BsXLg
                    size={18}
                    className="text-grey-100 pointer-events-none"
                  />
                }
              >
                <BsList
                  size={24}
                  className="text-grey-100 pointer-events-none"
                />
              </MobileMenu.Icon>
            </button>
          </MobileMenu.Button>
          <MobileMenu.List>
            <MobileMenu.Item>
              <Link href="/auth">
                <FaArrowRightToBracket
                  size={16}
                  className="text-secondary-100"
                />
                Login / Signup
              </Link>
            </MobileMenu.Item>
          </MobileMenu.List>
        </MobileMenu>
      </div>
    </>
  );
}
