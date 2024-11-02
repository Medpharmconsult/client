import { getIronSession } from "iron-session";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { defaultSession, SessionData, sessionOptions } from "./session";
import { apiFetcher, formatDate, getHour, timeMap } from "./utilities";

interface FetchUserResponse {
  statusCode: number;
  responseData: {
    msg: string;
    userData: {
      firstName: string;
      lastName: string;
      email: string;
      profileImg?: string;
    };
  };
}

interface FetchContactsListResponse {
  statusCode: number;
  responseData: {
    msg: string;
    contacts: {
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
    }[];
  };
}

interface GetProfessionsResponse {
  statusCode: number;
  msg: string;
  responseData: Array<{
    _id: string;
    name: string;
    code: string;
    collection: string;
  }>;
}

interface GetMessagesResponse {
  statusCode: number;
  responseData: {
    msg: string;
    messages: [
      {
        text: string;
        sender: string;
        receiver: string;
      }
    ];
  };
}

interface GetProfessionalResponse {
  statusCode: number;
  responseData: {
    msg: string;
    professional: {
      _id: string;
      firstName: string;
      lastName: string;
      username: string;
      phoneNo: string;
      profileImg: string;
      profession: string;
      yoe: number;
      email: string;
    };
  };
}

interface GetProfessionalsResponse {
  statusCode: number;
  responseData: {
    msg: string;
    professionals: Array<{
      _id: string;
      firstName: string;
      lastName: string;
      username: string;
      yoe: number;
      profileImg: string;
      profession: string;
      email: string;
    }>;
  };
}

interface GetAppointmentsResponse {
  statusCode: number;
  responseData: {
    msg: string;
    appointmentDays: [{ _id: string; month: string; day: number }];
  };
}

export interface GetAppointmentTimesResponse {
  statusCode: number;
  responseData: {
    msg: string;
    appointmentTimes: [
      {
        _id: string;
        startTime: number;
        endTime: number;
        startMeridian: string;
        endMeridian: string;
      }
    ];
  };
}

interface GetBookedAppointmentsResponse {
  statusCode: number;
  responseData: {
    msg: string;
    bookedAppintments: [
      {
        _id: string;
        startTime: number;
        endTime: number;
        startMeridian: string;
        endMeridian: string;
        day: number;
        month: string;
        year: number;
        patientData: { firstName: string; lastName: string };
      }
    ];
  };
}

export const fetchUser = async function (token: string) {
  const user: {
    role?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    profileImg?: string;
    token?: string;
  } = {};
  const decodedToken = jwtDecode(`${token}`) as {
    userID: string;
    role: string;
  };
  const res = (await apiFetcher(
    `${process.env.NEXT_PUBLIC_Host_Name}/get-user?userID=${decodedToken.userID}`,
    {
      method: "GET",
    }
  )) as FetchUserResponse;
  if (res.statusCode === 200) {
    const data = res.responseData.userData;
    user.role = decodedToken.role;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;
    user.profileImg = data?.profileImg ?? "";
    user.token = token;
  }
  return user;
};

export const getProfessions = async () => {
  const res = (await apiFetcher(
    `${process.env.NEXT_PUBLIC_Host_Name}/get-professions`,
    { method: "GET" }
  )) as GetProfessionsResponse;
  return res;
};

export const getProfession = async (profCode: string) => {
  const res = await getProfessions();
  return res?.responseData
    .filter((profession) => profession.code === profCode)
    .at(0);
};

export const getContactsList = async () => {
  const token = await getToken();
  const { userID } = jwtDecode(`${token}`) as { userID: string };
  const res = (await apiFetcher(
    `${process.env.NEXT_PUBLIC_Host_Name}/get-contacts`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )) as FetchContactsListResponse;
  if (res.statusCode === 200) {
    const contacts = res.responseData?.contacts?.map((contact) => {
      return { ...contact, userID };
    });
    res.responseData.contacts = contacts;
  }
  return res;
};

export const getRecentContacts = async () => {
  const res = await getContactsList();
  const contacts = res?.responseData.contacts;
  return contacts?.filter((contact) => contacts.indexOf(contact) < 3);
};

export const getProfessionals = async (profCode: string) => {
  const res = (await apiFetcher(
    `${process.env.NEXT_PUBLIC_Host_Name}/get-professionals?profCode=${profCode}`,
    { method: "GET" }
  )) as GetProfessionalsResponse;
  return res;
};

export const getProfessional = async (profId: string) => {
  const res = (await apiFetcher(
    `${process.env.NEXT_PUBLIC_Host_Name}/get-professional?username=${profId}`,
    { method: "GET" }
  )) as GetProfessionalResponse;
  return res;
};

export const getMessages = async () => {
  const session = await getSession();
  const token = session?.token;
  const contactId = session?.contact?.contactId;
  const res = (await apiFetcher(
    `${process.env.NEXT_PUBLIC_Host_Name}/get-messages?contactID=${contactId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )) as GetMessagesResponse;
  return res;
};

export const getAppointmentDays = async (
  profID: string,
  month: string,
  year: string
) => {
  const res = (await apiFetcher(
    `${process.env.NEXT_PUBLIC_Host_Name}/get-schedule?professional=${profID}&month=${month}&year=${year}`,
    { method: "GET" }
  )) as GetAppointmentsResponse;
  return res;
};

export const getMonthAppointments = async (profID: string, date: Date) => {
  const month = formatDate(date, { month: "long" });
  const year = String(date.getFullYear());
  const res = await getAppointmentDays(profID, month, year);
  const appointments = res?.responseData.appointmentDays;
  return appointments?.map((app) => `${app.month} ${app.day}`);
};

export const getToken = async () => {
  const session = await getSession();
  const token = session?.token;
  return token;
};

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (!session.isLoggedIn) session.isLoggedIn = defaultSession.isLoggedIn;
  return session;
};

export const getBookedAppointments = async () => {
  const token = await getToken();
  const res = (await apiFetcher(
    `${process.env.NEXT_PUBLIC_Host_Name}/get-booked-appointments`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )) as GetBookedAppointmentsResponse;
  return res;
};

export const getUpcomingBookedAppointments = async () => {
  const res = await getBookedAppointments();
  const appointments = res?.responseData?.bookedAppintments
    ?.map((app) => {
      const hours = getHour(timeMap[app.startTime]);
      const date = new Date(`${app.month} ${app.day} ${app.year}`);
      if (hours) date.setHours(hours);
      return {
        date: date,
        ...app,
      };
    })
    ?.filter((app) => app.date.getTime() >= new Date().getTime())
    ?.sort((a, b) => a.date.getTime() - b.date.getTime())
    ?.filter((_app, index) => index <= 3);
  return appointments;
};
