"use client";
import Form from "@/app/_components/Form";
import useSocket from "@/app/_lib/socket";
import NoResults from "../general/NoResults";
import ContactItem from "./ContactItem";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

interface contactListProps {
  text: string;
  contactInfo: {
    primaryID: string;
    firstName: string;
    lastName: string;
    profileImg?: string;
    email: string;
  };
}
export default function ContactsUi({
  token,
  contacts,
}: {
  token: any;
  contacts: contactListProps[];
}) {
  const [search, setSearch] = useState("");
  const [contactList, setContactList] = useState<contactListProps[]>(contacts);
  const socket = useSocket(token);
  const searchedList = contactList.filter(
    (contact) =>
      (contact.contactInfo.firstName + contact.contactInfo.lastName)
        .toLowerCase()
        .includes(search.replace(/\s+/g, "").toLowerCase()) ||
      (contact.contactInfo.lastName + contact.contactInfo.firstName)
        .toLowerCase()
        .includes(search.replace(/\s+/g, "").toLowerCase())
  );

  useEffect(() => {
    socket?.on("message", (data) => {
      setContactList((prevMsgs) => {
        const filteredList = prevMsgs.filter(
          (contact) =>
            contact.contactInfo.primaryID != data.contactInfo.primaryID
        );
        return [data, ...filteredList];
      });
    });

    return () => {
      socket?.off("message");
    };
  }, [socket]);

  return (
    <>
      {contactList?.length === 0 ? (
        <NoResults title="No contacts" text="Your contact list is empty." />
      ) : (
        <div className="bg-white rounded-[5px] border-grey-300 border-[1px] py-[16px] px-0 xs:px-[16px]">
          {contactList.length >= 5 && (
            <div className="mb-[16px] relative px-[16px] xs:px-0">
              <BsSearch
                size={18}
                className="text-grey-100 absolute left-[32px] xs:left-[16px] top-[50%] translate-y-[-50%]"
              />

              <Form.Input
                placeholder="Search"
                classname="pl-[42px] w-full"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
          )}
          {searchedList.length === 0 && contactList.length > 0 ? (
            <h3 className=" py-[16px] text-center text-primary-100 text-[18px]/[24px] font-bold tracking-normal">
              No results
            </h3>
          ) : (
            <ul className="flex flex-col">
              {searchedList.map((contact, index) => (
                <ContactItem key={index} contact={contact} />
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}
