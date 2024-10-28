"use client";
import ProfileImg from "@/app/_components/ProfileImage";
import { setContactId } from "@/app/_lib/actions";
import { jwtDecode } from "jwt-decode";
import { BsChevronRight } from "react-icons/bs";

export interface contactProps {
  text: string;
  contactInfo: {
    primaryID: string;
    firstName: string;
    lastName: string;
    profileImg?: string;
    email: string;
  };
}

export default function ContactItem({ contact }: { contact: contactProps }) {
  return (
    <li
      onClick={() => {
        setContactId({
          email: contact.contactInfo.email,
          firstName: contact.contactInfo.firstName,
          lastName: contact.contactInfo.lastName,
          profileImg: contact.contactInfo?.profileImg
            ? contact.contactInfo.profileImg
            : "",
          contactId: contact.contactInfo.primaryID,
        });
      }}
      className="px-[16px] py-[12px] bg-white hover:bg-[#fafafa] border-grey-300 border-b-[1px] last:border-0  cursor-pointer  flex justify-between items-center"
    >
      <div className="flex gap-[16px] items-center ">
        <div>
          <ProfileImg
            src={`${process.env.NEXT_PUBLIC_Host_Name}${contact.contactInfo?.profileImg}`}
            hasImg={contact.contactInfo?.profileImg ? true : false}
            alt="contact-img"
            size={80}
            altImg={
              <h1 className="text-[34px]/[1] font-semibold pointer-events-none uppercase">
                {contact.contactInfo.firstName.at(0)}
              </h1>
            }
          />
        </div>
        <div className="flex flex-col gap-y-[4px]">
          <h3 className="font-medium tracking-normal">
            {`${contact.contactInfo.lastName} ${contact.contactInfo.firstName}`}
          </h3>
          <p className="text-grey-100 first-letter:capitalize">
            {contact.text}
          </p>
        </div>
      </div>
      <BsChevronRight className="text-grey-100" size={16} />
    </li>
  );
}
