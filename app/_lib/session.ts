import { SessionOptions } from "iron-session";
import { sessionType } from "./types";

// Default session
export const defaultSession: sessionType = {
  isLoggedIn: false,
  contact: undefined,
};

// Session options
export const sessionOptions: SessionOptions = {
  password: process.env.NEXT_PUBLIC_Secret_Key!,
  cookieName: `${process.env.NEXT_PUBLIC_Token_Key}`,
  cookieOptions: {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    secure: process.env.NODE_ENV === "production",
  },
};
