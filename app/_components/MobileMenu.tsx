"use client";
import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const MobileMenuContext = createContext<any>(undefined);

export default function MobileMenu({
  children,
}: {
  children: React.ReactNode;
}) {
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

function MobileMenuButton({ children }: { children: React.ReactElement }) {
  const { toggleMenu, buttonRef } = useContext(MobileMenuContext);

  return cloneElement(children, {
    onClick: toggleMenu,
    ref: buttonRef,
  });
}

function MobileMenuIcon({
  children,
  alternate,
}: {
  children: React.ReactElement;
  alternate: React.ReactElement;
}) {
  const { isVisible } = useContext(MobileMenuContext);
  return <>{isVisible ? alternate : children}</>;
}

function MobileMenuList({ children }: { children: React.ReactNode }) {
  const { isVisible, setIsVisible, buttonRef } = useContext(MobileMenuContext);
  const listRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const closeMenu = (e: Event) => {
      if (
        e.target !== listRef.current &&
        !listRef.current?.contains(e.target as Node) &&
        e.target !== buttonRef.current
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
          className="absolute right-0 top-full  bg-primary-100 text-white z-10  min-w-[150px] shadow-lg "
        >
          {children}
        </ul>
      )}
    </>
  );
}

function MobileMenuItem({ children }: { children: React.ReactElement }) {
  const ListLink = cloneElement(children, {
    className:
      "py-3 w-full px-[15px] inline-block text-left hover:bg-primary-200 transition-none flex items-center gap-3",
  });
  return (
    <li className="flex items-center text-sm border-b-1 border-b-secondary-200 last:border-b-0">
      {ListLink}
    </li>
  );
}

export { MobileMenuButton, MobileMenuIcon, MobileMenuItem, MobileMenuList };
