import moment from "moment";

const getStartDay = (date: string, timezone: number): Date => {
  return moment.utc(moment(date).utcOffset(timezone).startOf("day")).toDate();
};

const getEndDay = (date: string, timezone: number): Date => {
  return moment.utc(moment(date).utcOffset(timezone).endOf("day")).toDate();
};

export { getStartDay, getEndDay };
