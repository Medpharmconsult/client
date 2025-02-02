"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fetchUser, fetchToken, fetchSession } from "./services";
import { dashboardLink } from "./utilities";
import {
  addProfessionalResType,
  addProfessionalType,
  bookAppointmentResType,
  mailType,
  signInResType,
  signInType,
  signUpResType,
  signUpType,
} from "./types";

/**
 *** SIGN OUT ****
 **/
export async function signOut() {
  const session = await fetchSession();
  session.destroy();
  revalidatePath("/");
  redirect("/");
}

/**
 *** SET SCHEDULE ****
 **/
export async function setSchedule(formData: FormData) {
  // Fetch token
  const token = await fetchToken();
  // Get data from form
  const data = Object.fromEntries(formData);
  if (!token) return;
  return await fetch(`${process.env.NEXT_PUBLIC_Host_Name}/set-schedule`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response: Response) => response.json())
    .then((data: { statusCode: number; responseData: { msg: string } }) => {
      console.log(data.responseData.msg);
      if (data.statusCode === 200) return true;
    })
    .catch((err: Error) => {
      throw new Error(err.message);
    });
}

/**
 *** SIGN IN ****
 **/
export async function signIn(formData: signInType) {
  // Fetch session
  const session = await fetchSession();
  return await fetch(
    `${process.env.NEXT_PUBLIC_Host_Name}/${formData.role}-login`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    }
  )
    .then((response: Response) => response.json())
    .then(async (data: signInResType) => {
      if (data.statusCode === 200) {
        // Fetch user
        const userResponse = await fetchUser(data.responseData.mpcToken);
        if (userResponse.statusCode === 200) {
          // Set new session
          session.user = userResponse.responseData.userData;
          session.user.role = formData.role;
          session.token = session.user.token = data.responseData.mpcToken;
          session.isLoggedIn = true;
          await session.save();
        }
      } else {
        // Return error message
        return data.responseData.msg;
      }
    })
    .catch((err: Error) => {
      throw new Error(err.message);
    })
    .finally(() => {
      // Redirect user
      const redirectURL = dashboardLink(formData.role);
      if (session.isLoggedIn) redirect(redirectURL);
    });
}

/**
 *** SEND MESSAGE ****
 **/
export async function sendMessage(data: mailType) {
  const email = {
    service_id: `${process.env.NEXT_PUBLIC_Email_Service_ID}`,
    template_id: `${process.env.NEXT_PUBLIC_Email_Template_ID}`,
    user_id: `${process.env.NEXT_PUBLIC_Email_User_ID}`,
    template_params: data,
  };
  return await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    body: JSON.stringify(email),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response: Response) => {
      if (response.ok) return true;
    })
    .catch((err: Error) => {
      throw new Error(err.message);
    });
}

/**
 *** SET CONTACT ****
 **/
export async function setContact(contact: {
  username: string;
  id: string;
  profileImg: string;
}) {
  // Fetch session
  const session = await fetchSession();
  // Update session
  session.contact = contact;
  await session.save();
  redirect("/dashboard/message");
}

/**
 *** BOOK APPOINTMENT ****
 **/
export async function bookAppointment(id: string) {
  // Fetch token
  const token = await fetchToken();
  if (!token) return;
  return await fetch(`${process.env.NEXT_PUBLIC_Host_Name}/book-appointment`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ scheduleId: id }),
  })
    .then((response) => response.json())
    .then((data: bookAppointmentResType) => data)
    .catch((err: Error) => {
      throw new Error(err.message);
    });
}

/**
 *** SIGN UP ****
 **/
export async function signUp(data: signUpType) {
  // Fetch session
  const session = await fetchSession();
  return await fetch(`${process.env.NEXT_PUBLIC_Host_Name}/patient-signup`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((response: Response) => response.json())
    .then(async (data: signUpResType) => {
      if (data.statusCode === 200) {
        // Fetch user
        const userResponse = await fetchUser(data.mpcToken);
        if (userResponse.statusCode === 200) {
          // Set new session
          session.user = userResponse.responseData.userData;
          session.user.role = "patient";
          session.token = session.user.token = data.mpcToken;
          session.isLoggedIn = true;
          await session.save();
        }
      } else {
        // Return error message
        return data.msg;
      }
    })
    .catch((err: Error) => {
      throw new Error(err.message);
    })
    .finally(() => {
      // Redirect user
      if (session.isLoggedIn) redirect("/dashboard/consult");
    });
}

/**
 *** ADD PROFESSIONAL ****
 **/

export async function addProfessional(data: addProfessionalType) {
  return fetch(`${process.env.NEXT_PUBLIC_Host_Name}/professional-signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response: Response) => response.json())
    .then((data: addProfessionalResType) => {
      if (data.statusCode === 200) return true;
    })
    .catch((err: Error) => {
      throw new Error(err.message);
    });
}
