"use client";
import Form from "@/app/_components/Form";
import useSocket from "@/app/_lib/socket";
import ContactItem from "./ContactItem";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { contactType } from "../_lib/types";

export default function ContactList({
  token,
  contacts,
}: {
  token: string;
  contacts: contactType[];
}) {
  // Search state
  const [search, setSearch] = useState("");
  // Contacts state
  const [contactList, setContactList] = useState<contactType[]>(contacts);
  // Get socket
  const socket = useSocket(token);
  // Filter contacts based on search
  const searchedList = contactList.filter((contact) => {
    const name = contact.contactInfo.firstName + contact.contactInfo.lastName;
    return name
      .toLowerCase()
      .includes(search.replace(/\s+/g, "").toLowerCase());
  });

  useEffect(() => {
    socket?.on("message", (data) => {
      setContactList((prevState) => {
        const filteredList = prevState.filter(
          (contact) =>
            contact.contactInfo.primaryID !== data.contactInfo.primaryID
        );
        return [data, ...filteredList];
      });
    });

    return () => {
      socket?.off("message");
    };
  }, [socket]);

  return (
    <div className="bg-white rounded-5 border-grey-300 border-1 py-6 px-4  xs:px-6">
      <div className="relative mb-4 ">
        <BsSearch
          size={16}
          className="text-grey-100 absolute left-3 top-1/2 translate-y-[-50%]"
        />
        <Form.Input
          placeholder="Search"
          styles="pl-[40px] !h-10 w-full"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          disabled={contacts.length === 0}
        />
      </div>
      {searchedList.length === 0 && contactList.length > 0 ? (
        <h3 className="py-4 text-center text-primary-100 text-[18px]/[24px] font-bold tracking-normal">
          No results
        </h3>
      ) : (
        <div>
          {contactList.length > 0 ? (
            <ul className="flex flex-col overflow-hidden rounded-[2px]">
              {searchedList.map((contact, index) => (
                <ContactItem key={index} contact={contact} />
              ))}
            </ul>
          ) : (
            <h3 className=" py-4 text-center text-primary-100 text-[18px]/[24px] font-bold tracking-normal">
              Contact list is empty.
            </h3>
          )}
        </div>
      )}
    </div>
  );
}
