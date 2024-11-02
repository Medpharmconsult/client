import { getRecentContacts, getSession } from "@/app/_lib/services";
import Image from "next/image";
import ContactItem from "../contacts/ContactItem";

export default async function RecentChats() {
  const recentContacts = await getRecentContacts();

  return (
    <>
      {recentContacts?.length === 0 ? (
        <div className="flex items-center text-center justify-center gap-y-[8px] flex-col px-4 py-8">
          <Image
            src="/no-message.svg"
            alt="no-message-icon"
            sizes="64px"
            width={64}
            height={64}
            className="mt-1"
          />
          <h3 className="text-primary-100 text-[18px]/[24px] font-bold tracking-normal">
            No messages
          </h3>
          <p>When you receive messages, they'll show up here.</p>
        </div>
      ) : (
        <div className="py-[16px] xs:px-[16px]">
          <ul className="flex flex-col">
            {recentContacts.map((contact, index) => (
              <ContactItem key={index} contact={contact} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
