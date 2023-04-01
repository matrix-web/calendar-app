import moment from "moment";

export const formatDate = (date: string): string => {
  return moment(date).format("YYYY.MM.DD");
}