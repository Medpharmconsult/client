import { getRecentContacts, getSession } from "@/app/_lib/services";
import Image from "next/image";
import ContactItem from "../contacts/ContactItem";

export default async function RecentChats() {
  const recentContacts = await getRecentContacts();
  const session = await getSession();

  return (
    <>
      {recentContacts?.length === 0 ? (
        <div className="flex items-center text-center justify-center gap-y-[8px] flex-col px-[16px] py-[16px]">
          <Image
            src="/no-message.svg"
            alt="no-message-icon"
            sizes="64px"
            width={64}
            height={64}
          />
          <h3 className="text-primary-100 text-[18px]/[24px] font-bold tracking-normal">
            No messages
          </h3>
          <p className=" mt-[4px]">
            No messages. Start chatting with
            {session?.role === "patient" ? " professionals " : " patients "}
            today.
          </p>
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
