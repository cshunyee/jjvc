import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const getLocalDateObj = (utcDate) => {
  if (utcDate) return dayjs(utcDate);
  return dayjs();
};

export const getUTCDateObj = () => {
  if (utcDate) return dayjs(utcDate).utc();
  return dayjs().utc();
};
