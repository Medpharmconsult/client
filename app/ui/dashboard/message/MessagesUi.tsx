"use client";
import ProfileImg from "@/app/_components/ProfileImage";
import useSocket from "@/app/_lib/socket";
import { SessionData } from "@/app/_lib/session";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { useDashboardContext } from "@/context/DashboardContext";

interface messageProps {
  text: string;
  sender: string;
  receiver: string;
}

export default function MessagesUi({
  session,
  messageData,
}: {
  session: SessionData;
  messageData: messageProps[];
}) {
  const contact = session?.contact;
  const token: any = session?.token;
  const socket = useSocket(token);
  const chatEnd = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLTextAreaElement>(null);
  const { userID } = jwtDecode(`${token}`) as { userID: string };
  const [messages, setMessages] = useState<messageProps[]>(messageData);
  const { nav } = useDashboardContext();

  useEffect(() => {
    text.current?.focus();
    socket?.on(
      "message",
      (data: { text: string; sender: string; receiver: string }) => {
        setMessages((prevMsgs) => [...prevMsgs, data]);
      }
    );

    return () => {
      socket?.off("message");
    };
  }, [socket]);

  useEffect(() => {
    chatEnd.current?.scrollIntoView(false);
  }, [messages]);

  const messageHandler = () => {
    const user = jwtDecode(`${token}`) as { userID: string };
    const contactId = session?.contact?.contactId;
    const sentText = text.current?.value as string;
    if (text.current?.value && user.userID && contactId) {
      const message = {
        text: sentText,
        sender: user.userID,
        receiver: contactId,
      };
      text.current.value = "";
      setMessages([...messages, message]);
      socket?.emit("message", message);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-y-3">
        <ProfileImg
          src={`${process.env.NEXT_PUBLIC_Host_Name}${contact?.profileImg}`}
          hasImg={contact?.profileImg ? true : false}
          size={112}
          alt="contact-img"
          altImg={
            <h1 className="text-[48px]/[1] font-semibold pointer-events-none uppercase">
              {contact?.firstName?.slice(0, 1)}
            </h1>
          }
        />
        <h1 className="font-medium capitalize tracking-none">
          {contact?.lastName} {contact?.firstName}
        </h1>
      </div>
      <div>
        {messages.length === 0 ? (
          <p className="text-grey-100 text-center mt-2 text-[15px]">
            Send a message to start the conversation.
          </p>
        ) : (
          <ul className="gap-y-[12px] flex flex-col  mt-6 xs:mt-8">
            {messages.map((message, index) =>
              message.sender == userID ? (
                <Message text={message.text} key={index} />
              ) : (
                <Message text={message.text} key={index} isLeft={true} />
              )
            )}
            <div ref={chatEnd} className="pb-[60px]" />
          </ul>
        )}
        <div
          className={`flex  border-grey-300 border-1  h-12 fixed w-full bottom-0 right-0  ${
            nav
              ? "md:left-[237px] md:w-[calc(100%-237px)]"
              : "md:left-[79px] md:w-[calc(100%-84px)]"
          }`}
        >
          <textarea
            ref={text}
            className="h-full flex-1 focus:outline-none placeholder:font-light px-4 max-h-12  rounded-none text-base flex items-center  pt-3"
            placeholder="Type a message"
          ></textarea>
          <button
            onClick={messageHandler}
            className="bg-primary-100 hover:bg-primary-200 text-white font-semibold capitalize px-6 h-12"
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
}

function Message({ text, isLeft = false }: { text: string; isLeft?: boolean }) {
  return (
    <li className={`flex items-end  ${!isLeft ? "flex-row-reverse" : ""}`}>
      <div
        className={`border-[6px] border-t-transparent border-r-0 border-b-transparent border-l-[12px] ${
          isLeft ? "rotate-180 border-l-white" : "border-l-secondary-100"
        }  mb-[5px]`}
      ></div>
      <span
        className={`shadow-sm first-letter:capitalize p-2 px-3 rounded-5 ${
          isLeft
            ? "bg-white text-black-100"
            : "bg-secondary-100 text-primary-100"
        }`}
      >
        {text}
      </span>
    </li>
  );
}
