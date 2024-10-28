"use client";
import { useState } from "react";
import { cloneElement } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { createPortal } from "react-dom";
import { BsXLg } from "react-icons/bs";

const ModalContext = createContext<any>(null);

function Modal({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(null);
  const close = () => setActive(null);
  const open = setActive;
  return (
    <ModalContext.Provider value={{ active, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function ModalOpen({
  opens,
  children,
}: {
  opens: string;
  children: React.ReactElement;
}) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opens) });
}

function ModalWindow({
  name,
  children,
}: {
  name: string;
  children: React.ReactElement;
}) {
  const { active, close } = useContext(ModalContext);
  if (name !== active) return null;
  return createPortal(
    <>
      <div
        className="fixed top-0 left-0 w-full h-full z-50 bg-[#000] opacity-45"
        onClick={close}
      />
      <div className="fixed w-full max-w-[650px] bg-white top-[50%] left-[50%] rounded-[5px] translate-x-[-50%] translate-y-[-50%] z-[51]">
        <div className="border-b-[1px] px-[16px] py-[24px] border-grey-300 flex justify-end items-center">
          <button onClick={close}>
            <BsXLg className="text-grey-100" size={18} />
          </button>
        </div>
        <div className="px-[16px] py-[24px]">{children}</div>
      </div>
    </>,
    document.body
  );
}

export { Modal, ModalWindow, ModalOpen };
