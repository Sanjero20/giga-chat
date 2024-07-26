import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function getTimeFromNow(date: string) {
  try {
    const timePast = dayjs(date).fromNow();
    return timePast;
  } catch (error) {
    return "Invalid format";
  }
}
