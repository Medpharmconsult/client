import { Dispatch, RefObject, SetStateAction } from "react";

export type adminContextType = {
  nav: boolean;
  mobileNav: boolean;
  toggleMobileNav: () => void;
  toggleNav: () => void;
  setMobileNav: Dispatch<SetStateAction<boolean>>;
};

export type cardType = {
  title: string;
  styles?: string;
  children: React.ReactNode;
};

export type adminScreenType = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  styles?: string;
};

export type containerType = {
  children: React.ReactNode;
  styles?: string;
};

export type roundImage = {
  src: string | undefined;
  alt: string;
  size?: number;
  priority?: boolean;
};

export type userType = {
  firstName: string;
  lastName: string;
  role: string;
  profileImg?: string;
  email: string;
  token: string;
};

export type mobileContextType = {
  isVisible: boolean;
  toggleMenu: () => void;
  buttonRef: RefObject<HTMLElement>;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
};

export type sessionType = {
  user?: userType;
  token?: string;
  isLoggedIn: boolean;
  contact:
    | undefined
    | {
        username: string;
        profileImg: string;
        id: string;
      };
};

export type signInType = {
  email: string;
  password: string;
  role: string;
};

export type signUpType = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  username?: string;
};

export type signUpResType = {
  statusCode: number;
  mpcToken: string;
  msg: string;
};

export type headingType = {
  children: React.ReactNode;
  styles?: string;
  type?: "h1" | "h2" | "h3" | "h4";
};

export type signInResType = {
  statusCode: number;
  responseData: { msg: string; mpcToken: string };
};

export type mailType = {
  name: string;
  message: string;
  email: string;
};

export type fetchUserResType = {
  statusCode: number;
  responseData: {
    msg: string;
    userData: userType;
  };
};

export type formGroup = {
  label?: string;
  children: React.ReactNode;
  error?: string;
  styles?: string;
};

export type getProfessionsResType = {
  statusCode: number;
  msg: string;
  responseData: professionType[];
};

export type professionType = {
  _id: string;
  name: string;
  code: string;
  collection: string;
};

export type fetchContactsResType = {
  statusCode: number;
  responseData: {
    msg: string;
    contacts: contactType[];
  };
};

export type contactType = {
  userID: string;
  text: string;
  sender: string;
  contactInfo: {
    primaryID: string;
    firstName: string;
    lastName: string;
    profileImg?: string;
    email: string;
  };
};

export type fetchProfessionalsResType = {
  statusCode: number;
  responseData: {
    msg: string;
    professionals: professionalType[];
  };
};

export type professionalType = {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  yoe: number;
  profileImg: string;
  profession: string;
  email: string;
  phoneNo: string;
};

export type fetchProfessionalResType = {
  statusCode: number;
  responseData: {
    msg: string;
    professional: professionalType;
  };
};

export type appointmentContextType = {
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  date: Date | undefined;
  id: string;
  month: Date;
  changeMonth: () => void;
  appointments: string[];
};

export type fetchAppointmentTimesResType = {
  statusCode: number;
  responseData: {
    msg: string;
    appointmentTimes: appointmentTimeType[];
  };
};

export type appointmentTimeType = {
  _id: string;
  startTime: number;
  endTime: number;
  startMeridian: string;
  endMeridian: string;
};

export type bookAppointmentResType = {
  statusCode: number;
  responseData: {
    msg: string;
  };
};

export type fetchMessagesResType = {
  statusCode: number;
  responseData: {
    msg: string;
    messages: messageType[];
  };
};

export type messageType = {
  text: string;
  sender: string;
  receiver: string;
};

export type fetchAppointmentsResType = {
  statusCode: number;
  responseData: {
    msg: string;
    appointmentDays: { _id: string; month: string; day: number }[];
  };
};

export type addProfessionalType = {
  firstName: string;
  lastName: string;
  username?: string;
  profession: string;
  gender: string;
  yoe?: number;
  phoneNo: string;
  email: string;
  password: string;
  profCode?: string;
};

export type addProfessionalResType = {
  statusCode: number;
  msg: string;
  responseData: { _id: string; name: string; code: string }[];
};

export type addProfessionType = {
  name: string;
  code: string;
  collection: string;
};

export type fetchBookedAppointmentsResType = {
  statusCode: number;
  responseData: {
    msg: string;
    bookedAppintments: bookedAppointmentType[];
  };
};

export type bookedAppointmentType = {
  _id: string;
  startTime: number;
  endTime: number;
  startMeridian: string;
  endMeridian: string;
  day: number;
  month: string;
  year: number;
  patientData: { firstName: string; lastName: string };
};

export interface ITabButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  styles?: string;
}

export interface IProfileImg extends roundImage {
  altImg?: React.ReactElement;
}

export interface IForm extends React.FormHTMLAttributes<HTMLFormElement> {
  styles?: string;
  children: React.ReactNode;
}

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  styles?: string;
  colour?: "primary" | "outline-primary" | "outline-white";
  href?: string;
  size?: "sm" | "md" | "xs";
}

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  styles?: string;
}

export interface IInputNumber extends IInput {
  min?: number;
  max: number;
  defaultValue: number;
  children?: React.ReactElement;
}

export interface ITextarea
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  styles?: string;
}

export interface ISelect extends React.SelectHTMLAttributes<HTMLSelectElement> {
  styles?: string;
  children: React.ReactNode;
}
