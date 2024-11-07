import { SessionOptions } from "iron-session";

export interface SessionData {
  firstName?: string;
  lastName?: string;
  role?: string;
  profileImg?: string;
  email?: string;
  token?: string;
  isLoggedIn: boolean;
  contact?: {
    firstName: string;
    lastName: string;
    email: string;
    profileImg: string;
    contactId: string;
  };
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
  contact: undefined,
};

export const sessionOptions: SessionOptions = {
  password: process.env.NEXT_PUBLIC_Secret_Key!,
  cookieName: `${process.env.NEXT_PUBLIC_Token_Key}`,
  cookieOptions: {
    httpOnly: true,
    maxAge: 22 * 60 * 60,
    secure: process.env.NODE_ENV === "production",
  },
};
