"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fetchUser, getSession, getToken } from "./services";
import { apiFetcher } from "./utilities";
interface signUpProps {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  username: string;
}

interface SignInProps {
  email: string;
  password: string;
}

interface SignUpResponse {
  statusCode: number;
  mpcToken: string;
  msg: string;
}

interface SignInResponse {
  statusCode: number;
  responseData: { msg: string; mpcToken: string };
}

interface MailData {
  name: string;
  message: string;
  email: string;
}

export interface SetScheduleRangeProps {
  month: string;
  scheduleType: string;
  startDay?: string;
  endDay?: string;
  startTime?: string;
  startMeridian?: string;
  endTime?: string;
  endMeridian?: string;
}

export async function signOut() {
  const session = await getSession();
  session.destroy();
  revalidatePath("/");
  redirect("/");
}

export async function setScheduleRange(data: SetScheduleRangeProps) {
  const token = await getToken();
  const res = (await apiFetcher(
    `${process.env.NEXT_PUBLIC_Host_Name}/set-schedule`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  )) as {
    statusCode: number;
    responseData: { msg: string };
  };
  if (res.statusCode === 200) return true;
  else return false;
}

export async function signIn(signInData: SignInProps, userRole: string) {
  const res = (await apiFetcher(
    `${process.env.NEXT_PUBLIC_Host_Name}/${userRole}-login`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signInData),
    }
  )) as SignInResponse;
  if (res.statusCode == 200) {
    const session = await getSession();
    const user = await fetchUser(res.responseData.mpcToken);
    if (user) {
      session.email = user.email;
      session.firstName = user.firstName;
      session.lastName = user.lastName;
      session.role = user.role;
      session.token = user.token;
      session.profileImg = user.profileImg;
      session.isLoggedIn = true;
      await session.save();
    }
  } else {
    return res.responseData.msg;
  }

  switch (userRole) {
    case "patient":
      redirect("/dashboard/consult");
    case "professional":
      redirect("/dashboard/staff");
    case "admin":
      redirect("/dashboard/admin");
    default:
  }
}

export async function sendMail(data: MailData) {
  const email = {
    service_id: `${process.env.NEXT_PUBLIC_Email_Service_ID}`,
    template_id: `${process.env.NEXT_PUBLIC_Email_Template_ID}`,
    user_id: `${process.env.NEXT_PUBLIC_Email_User_ID}`,
    template_params: data,
  };
  try {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      body: JSON.stringify(email),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) return true;
    else return false;
  } catch (err) {
    console.log(err);
  }
}

export async function setContactId(contact: {
  firstName: string;
  lastName: string;
  email: string;
  contactId: string;
  profileImg: string;
}) {
  const session = await getSession();
  if (contact?.contactId) {
    session.contact = contact;
    await session.save();
    redirect("/dashboard/message");
  }
}

export async function bookAppointment(bookingId: string) {
  const token = await getToken();
  const res = (await apiFetcher(
    `${process.env.NEXT_PUBLIC_Host_Name}/book-appointment`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ scheduleId: bookingId }),
    }
  )) as { statusCode: number; responseData: { msg: string } };
  if (res.statusCode === 200) return true;
  else return false;
}

export async function signUp(signUpData: signUpProps) {
  const res = (await apiFetcher(
    `${process.env.NEXT_PUBLIC_Host_Name}/patient-signup`,
    {
      method: "POST",
      body: JSON.stringify(signUpData),
      headers: { "Content-Type": "application/json" },
    }
  )) as SignUpResponse;
  if (res.statusCode === 200) {
    const session = await getSession();
    const user = await fetchUser(res.mpcToken);
    if (user) {
      session.email = user.email;
      session.firstName = user.firstName;
      session.lastName = user.lastName;
      session.role = user.role;
      session.token = user.token;
      session.isLoggedIn = true;
      session.profileImg = user.profileImg;
      await session.save();
    }
  } else {
    return res.msg;
  }
  redirect("/dashboard/consult");
}
