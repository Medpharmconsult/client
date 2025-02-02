"use client";
import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { mobileContextType } from "../_lib/types";

const MobileMenuContext = createContext<mobileContextType | undefined>(
  undefined
);

const useMobileContext = () => {
  const context = useContext(MobileMenuContext);
  if (context === undefined)
    throw new Error("MobileMenuContext was used outside provider");
  return context;
};

function MobileMenu({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLElement>(null);
  const toggleMenu = () => setIsVisible((v) => !v);
  return (
    <MobileMenuContext.Provider
      value={{ isVisible, toggleMenu, buttonRef, setIsVisible }}
    >
      {children}
    </MobileMenuContext.Provider>
  );
}

function Button({ children }: { children: React.ReactElement }) {
  const { toggleMenu, buttonRef } = useMobileContext();
  return cloneElement(children, {
    onClick: toggleMenu,
    ref: buttonRef,
  });
}

function Icon({
  children,
  altIcon,
}: {
  children: React.ReactElement;
  altIcon: React.ReactElement;
}) {
  const { isVisible } = useMobileContext();
  return <>{isVisible ? altIcon : children}</>;
}

function List({ children }: { children: React.ReactNode }) {
  const { isVisible, setIsVisible, buttonRef } = useMobileContext();
  const listRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (
        !listRef.current?.contains(e.target as HTMLElement) &&
        (e.target as HTMLElement) !== buttonRef.current
      )
        setIsVisible(false);
    };
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);
  return (
    <>
      {isVisible && (
        <ul
          ref={listRef}
          className="absolute right-0 top-full bg-primary-100 rounded-b-5 overflow-hidden text-white z-10 min-w-[150px] shadow-lg "
        >
          {children}
        </ul>
      )}
    </>
  );
}

function Item({ children }: { children: React.ReactElement }) {
  return (
    <li className="flex items-center text-sm border-b-1 border-b-secondary-200 last:border-b-0">
      {cloneElement(children, {
        className:
          "py-3 w-full px-[15px] inline-block text-left hover:bg-primary-200 transition-none flex items-center gap-3",
      })}
    </li>
  );
}

MobileMenu.Button = Button;
MobileMenu.Icon = Icon;
MobileMenu.List = List;
MobileMenu.Item = Item;

export default MobileMenu;
