"use client";
import ProfileImg from "@/app/_components/ProfileImage";
import { contactType } from "@/app/_lib/types";
import { BsChevronRight } from "react-icons/bs";
import { setContact } from "../_lib/actions";

export default function ContactItem({ contact }: { contact: contactType }) {
  // Contact info
  const contactInfo = {
    username: `${contact.contactInfo.lastName} ${contact.contactInfo.firstName}`,
    id: contact.contactInfo.primaryID,
    profileImg: contact.contactInfo.profileImg ?? "",
  };
  return (
    <li
      onClick={() => {
        setContact(contactInfo);
      }}
      className="p-3 bg-white hover:bg-[#fafafa] border-grey-300 border-b-1 last:border-0  cursor-pointer  flex justify-between items-center"
    >
      <div className="flex gap-4 items-center ">
        <div>
          <ProfileImg
            src={
              contact.contactInfo.profileImg &&
              `${process.env.NEXT_PUBLIC_Host_Name}${contact.contactInfo?.profileImg}`
            }
            alt="contact-img"
            size={56}
            altImg={
              <h1 className="text-[34px]/[1] font-semibold pointer-events-none uppercase">
                {contact.contactInfo.firstName.at(0)}
              </h1>
            }
          />
        </div>
        <div className="flex flex-col">
          <h3 className="font-medium tracking-normal">
            {`${contact.contactInfo.lastName} ${contact.contactInfo.firstName}`}
          </h3>
          <div className="flex items-center gap-[2px]">
            {contact.sender !== contact.contactInfo.primaryID && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 mt-[2px]"
                viewBox="0 0 24 24"
                fill="#757575"
              >
                <path d="m2.394 13.742 4.743 3.62 7.616-8.704-1.506-1.316-6.384 7.296-3.257-2.486zm19.359-5.084-1.506-1.316-6.369 7.279-.753-.602-1.25 1.562 2.247 1.798z"></path>
              </svg>
            )}
            <p className="text-grey-100 tracking-normal text-sm first-letter:capitalize">
              {contact.text}
            </p>
          </div>
        </div>
      </div>
      <BsChevronRight className="text-grey-100" size={16} />
    </li>
  );
}
