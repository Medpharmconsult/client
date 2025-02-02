import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FaCog, FaMoneyBill, FaPalette, FaPlusCircle } from "react-icons/fa";
import {
  FaCalendarCheck,
  FaCalendarDays,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa6";

/**
 *** FETCH MONTH ****
 **/
export const fetchMonth = (value?: number) => {
  const date = new Date();
  if (value) {
    const month = date.getMonth();
    date.setDate(1);
    date.setMonth(month + value);
  }
  return date;
};

/**
 *** FORMAT DATE ****
 **/
export const formatDate = (date: Date, options: object) => {
  return new Intl.DateTimeFormat("en", options).format(date);
};

/**
 *** GET MONTH DAYS ****
 **/
export const getMonthDays = (date: Date) => {
  date.setDate(1);
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + 1);
  newDate.setDate(0);
  return newDate.getDate();
};

/**
 *** GET HOUR ****
 **/
export const getHour = (value: string) => {
  switch (value.length === 4) {
    case false:
      if (value.endsWith("AM")) return Number(value.slice(0, 1));
      else return Number(value.slice(0, 1)) + 12;

    case true:
      if (value.endsWith("AM")) {
        if (Number(value.slice(0, 2)) === 12) return 0;
        return Number(value.slice(0, 2));
      } else {
        if (Number(value.slice(0, 2)) === 12) return 12;
        return Number(value.slice(0, 2)) + 12;
      }
    default:
  }
};

/**
 *** TIME MAP ****
 **/
export const timeMap = [
  "12AM",
  "1AM",
  "2AM",
  "3AM",
  "4AM",
  "5AM",
  "6AM",
  "7AM",
  "8AM",
  "9AM",
  "10AM",
  "11AM",
  "12PM",
  "1PM",
  "2PM",
  "3PM",
  "4PM",
  "5PM",
  "6PM",
  "7PM",
  "8PM",
  "9PM",
  "10PM",
  "11PM",
];

/**
 *** RETURN DASHBOARD LINK ****
 **/
export function dashboardLink(role?: string) {
  switch (role) {
    case "patient":
      return "/dashboard/consult";
    case "professional":
      return "/dashboard/staff";
    case "admin":
      return "/dashboard/admin/addProfessional";
  }
  return "/";
}

/**
 *** VALIDATE FORM ****
 **/
export const formValidate = {
  default: {
    required: "This field is required",
  },
  email: {
    required: "This field is required",
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: "Invalid email",
    },
  },
  password: {
    required: "This field is required",
    validate: {
      minLength: (value: string) =>
        /(.{8,})/.test(value) || "Minimum of 8 characters",
      hasUpcase: (value: string) =>
        /(?=.*[A-Z])/.test(value) || "At least one uppercase letter",
      hasLocase: (value: string) =>
        /(?=.*[a-z])/.test(value) || "At least one lowercase letter",
      hasDigit: (value: string) =>
        /(?=.*\d)/.test(value) || "At least one digit",
      hasChar: (value: string) =>
        /(?=.*?[#?!@$%^&*-])/.test(value) || "At least one special character",
    },
  },
};
/**
 *** RANDOM NUMBER ****
 **/
export const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 *** USER MENUS ****
 **/

export function fetchMenu(role: string) {
  switch (role) {
    case "patient":
      return [
        {
          name: "Dashboard",
          link: `/dashboard/consult`,
          icon: FaPalette,
        },
        {
          name: "Contacts",
          link: "/dashboard/contacts",
          icon: FaUsers,
        },
        {
          name: "Billing",
          link: "",
          icon: FaMoneyBill,
        },
        {
          name: "Settings",
          link: "",
          icon: FaCog,
        },
      ];
    case "professional":
      return [
        {
          name: "Dashboard",
          link: "/dashboard/staff",
          icon: FaPalette,
        },
        {
          name: "Contacts",
          link: "/dashboard/contacts",
          icon: FaUsers,
        },
        {
          name: "Appointments",
          link: "/dashboard/staff/appointments",
          icon: FaCalendarCheck,
        },

        {
          name: "Set schedule",
          link: "/dashboard/staff/setSchedule",
          icon: FaCalendarDays,
        },
        {
          name: "Settings",
          link: "",
          icon: FaCog,
        },
      ];
    case "admin":
      return [
        {
          name: "Add professional",
          link: "/dashboard/admin/addProfessional",
          icon: FaUserPlus,
        },
        {
          name: "Add profession",
          link: "/dashboard/admin/addProfession",
          icon: FaPlusCircle,
        },
        {
          name: "Settings",
          link: "",
          icon: FaCog,
        },
      ];
  }
}

/**
 *** SET PARAMS ****
 **/
export function setParams(
  params: {
    name: string;
    value: string;
  }[],
  searchParams: URLSearchParams,
  router: AppRouterInstance,
  path: string
) {
  const URLparams = new URLSearchParams(searchParams);
  params.forEach((param) => URLparams.set(param.name, param.value));
  router.replace(`${path}?${URLparams.toString()}`, {
    scroll: true,
  });
}
