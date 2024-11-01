import dayjs, { Dayjs } from "dayjs";
import MeetupModel from "../../../api/models/MeetupModel";

export const SearchFilters = (
  obj: any,
  inputText: string,
  fromDate: Dayjs | null,
  toDate: Dayjs | null,
  category: string
): MeetupModel[] => {
  return obj.filter((el: any) => {
    const textMatch =
      inputText === "" ||
      el.title.toLowerCase().includes(inputText.toLowerCase()) ||
      el.location.toLowerCase().includes(inputText.toLowerCase());

    const dateObj = dayjs(el.date);

    const isValidBefore = dateObj.isAfter(fromDate, "day") || !fromDate;
    const isValidAfter = dateObj.isBefore(toDate, "day") || !toDate;

    const dateMatch = isValidAfter && isValidBefore;

    const categoryMatch =
      category === "" || el.category.toLowerCase() === category.toLowerCase();

    return textMatch && dateMatch && categoryMatch;
  });
};
