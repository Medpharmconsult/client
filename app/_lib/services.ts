import { getIronSession } from "iron-session";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { sessionOptions } from "./session";
import {
  fetchAppointmentsResType,
  fetchBookedAppointmentsResType,
  fetchContactsResType,
  fetchMessagesResType,
  fetchProfessionalResType,
  fetchProfessionalsResType,
  fetchUserResType,
  getProfessionsResType,
  sessionType,
} from "./types";
import { formatDate, getHour, timeMap } from "./utilities";

/**
 *** FETCH USER ****
 **/
export const fetchUser = async function (token: string) {
  const decodedToken = jwtDecode(`${token}`) as {
    userID: string;
    role: string;
  };
  return await fetch(
    `${process.env.NEXT_PUBLIC_Host_Name}/get-user?userID=${decodedToken.userID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res: Response) => res.json())
    .then((data: fetchUserResType) => data)
    .catch((err: Error) => {
      throw new Error(err.message);
    });
};

/**
 *** FETCH PROFESSIONS ****
 **/
export const fetchProfessions = async () => {
  return await fetch(`${process.env.NEXT_PUBLIC_Host_Name}/get-professions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response: Response) => response.json())
    .then((data: getProfessionsResType) => data)
    .catch((err: Error) => {
      throw new Error(err.message);
    });
};

/**
 *** FETCH PROFESSION ****
 **/
export const fetchProfession = async (code: string) => {
  // Fetch professions
  const data = await fetchProfessions();
  // Get profession
  const profession = data.responseData.find(
    (profession) => profession.code === code
  );
  return profession;
};

/**
 *** FETCH CONTACTS ****
 **/
export const fetchContacts = async (limit?: number) => {
  // Get token
  const token = await fetchToken();
  // Send request
  return await fetch(`${process.env.NEXT_PUBLIC_Host_Name}/get-contacts`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response: Response) => response.json())
    .then((data: fetchContactsResType) => {
      const contacts = data.responseData.contacts;
      return {
        ...data,
        responseData: {
          ...data.responseData,
          contacts: limit ? contacts.slice(0, limit) : contacts,
        },
      };
    });
};

/**
 *** FETCH PROFESSIONALS ****
 **/
export const fetchProfessionals = async (code: string) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_Host_Name}/get-professionals?profCode=${code}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  )
    .then((response: Response) => response.json())
    .then((data: fetchProfessionalsResType) => data)
    .catch((err: Error) => {
      throw new Error(err.message);
    });
};

/**
 *** FETCH PROFESSIONAL ****
 **/
export const fetchProfessional = async (Id: string) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_Host_Name}/get-professional?username=${Id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response: Response) => response.json())
    .then((data: fetchProfessionalResType) => data)
    .catch((err: Error) => {
      throw new Error(err.message);
    });
};

/**
 *** FETCH MESSAGES ****
 **/
export const fetchMessages = async () => {
  // Fetch session
  const session = await fetchSession();
  // Fetch token
  const token = session.token;
  // Get contact id
  const id = session.contact?.id;
  if (!token || !id) return;

  return await fetch(
    `${process.env.NEXT_PUBLIC_Host_Name}/get-messages?contactID=${id}`,
    {
      method: "GET",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response: Response) => response.json())
    .then((data: fetchMessagesResType) => data)
    .catch((err: Error) => {
      throw new Error(err.message);
    });
};

/**
 *** FETCH APPOINTMENT DAYS ****
 **/
export const fetchAppointmentDays = async (
  id: string,
  month: string,
  year: string
) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_Host_Name}/get-schedule?professional=${id}&month=${month}&year=${year}`,
    {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data: fetchAppointmentsResType) => data)
    .catch((err: Error) => {
      throw new Error(err.message);
    });
};

/**
 *** FETCH APPOINTMENTS ****
 **/
export const fetchAppointments = async (id: string, date: Date) => {
  // Get month
  const month = formatDate(date, { month: "long" });
  // Get year
  const year = String(date.getFullYear());
  // Fetch appointments
  const data = await fetchAppointmentDays(id, month, year);
  if (data.statusCode === 200) {
    return data.responseData.appointmentDays.map(
      (app) => `${app.month} ${app.day}`
    );
  }
};

/**
 *** FETCH TOKEN ****
 **/
export const fetchToken = async () => {
  const session = await fetchSession();
  const token = session?.token;
  if (token) return token;
};

/**
 *** FETCH ROLE ****
 **/
export const fetchRole = async () => {
  const session = await fetchSession();
  const role = session.user?.role;
  if (role) return role;
};

/**
 *** FETCH SESSION ****
 **/
export const fetchSession = async () => {
  const session = await getIronSession<sessionType>(cookies(), sessionOptions);
  return session;
};

/**
 *** FETCH BOOKED APPOINTMENTS ****
 **/
export const fetchBookedAppointments = async () => {
  const token = await fetchToken();
  if (!token) return;
  return await fetch(
    `${process.env.NEXT_PUBLIC_Host_Name}/get-booked-appointments`,
    {
      method: "GET",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response: Response) => response.json())
    .then((data: fetchBookedAppointmentsResType) => data)
    .catch((err: Error) => {
      throw new Error(err.message);
    });
};

/**
 *** FETCH UPCOMING APPOINTMENTS ****
 **/
export const fetchUpcomingAppointments = async () => {
  // Fetch booked appointments
  const data = await fetchBookedAppointments();
  if (!data?.responseData.bookedAppintments) return;
  // Get upcoming appointments
  const appointments = data.responseData.bookedAppintments
    .map((app) => {
      const hours = getHour(timeMap[app.startTime]);
      const date = new Date(`${app.month} ${app.day} ${app.year}`);
      if (hours) date.setHours(hours);
      return {
        date: date,
        ...app,
      };
    })
    .filter((app) => app.date.getTime() >= new Date().getTime())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .filter((_app, index) => index <= 4);
  // Return result
  return appointments;
};
