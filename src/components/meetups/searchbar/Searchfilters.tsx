import dayjs, { Dayjs } from "dayjs";
import MeetupModel from "../../../api/models/MeetupModel";

export const SearchFilters = (
  obj: any,
  inputText: string,
  dateBefore: Dayjs | null,
  dateAfter: Dayjs | null,
  category: string
): MeetupModel[] => {
 return obj
    .map((el: any) => ({
      ...el,
      dateObj: dayjs(el.date),
    }))
    .filter((el: any) => {
      const textMatch =
        inputText === "" ||
        el.title.toLowerCase().includes(inputText.toLowerCase()) ||
        el.location.toLowerCase().includes(inputText.toLowerCase());

      const dateMatch =
        (!dateBefore && !dateAfter) ||
        (dateBefore &&
          dateAfter &&
          el.dateObj.isAfter(dateBefore, "day") &&
          el.dateObj.isBefore(dateAfter, "day"));

      const categoryMatch =
        category === "" || el.category.toLowerCase() === category.toLowerCase();

      return textMatch && dateMatch && categoryMatch;
    });
};
