import Image from "next/image";
import ContactItem from "./ContactItem";
import { contactType } from "../_lib/types";

export default async function RecentChats({ data }: { data: contactType[] }) {
  return (
    <div>
      {data.length === 0 ? (
        <div className="flex items-center text-center justify-center gap-y-[8px] flex-col">
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
        <div>
          <ul className="flex flex-col overflow-hidden rounded-[2px]">
            {data.map((contact, index) => (
              <ContactItem key={index} contact={contact} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
