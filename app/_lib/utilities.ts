export const apiFetcher = async (url: string, options: object) => {
  try {
    if (url) {
      const data = await fetch(url, options);
      const res = await data.json();
      return res;
    }
  } catch (err: unknown) {
    if (err instanceof Error) console.error("Failed to fetch", err.message);
  }
};

export const getCurrentMonth = () => {
  const date = new Date();
  return date;
};
export const getNextMonth = () => {
  const date = new Date();
  const month = date.getMonth();
  date.setDate(1);
  date.setMonth(month + 1);
  return date;
};

export const getMonthDays = (date: Date) => {
  date.setDate(1);
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + 1);
  newDate.setDate(0);
  return newDate.getDate();
};

export const formatDate = (date: Date, options: object) => {
  return new Intl.DateTimeFormat("en", options).format(date);
};

export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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

export const capitalizeFirstLetter = (message: string) => {
  return message.charAt(0).toUpperCase() + message.slice(1);
};
