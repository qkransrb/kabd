import { clsx, type ClassValue } from "clsx";
import { getMonth, subMonths } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getYearAndMonth() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return String(month).length > 1 ? `${year}-${month}` : `${year}-0${month}`;
}

export function calcMonth(currentDate: Date, range: number) {
  return String(getMonth(subMonths(currentDate, range))).length > 1
    ? `${getMonth(subMonths(currentDate, range))}`
    : `0${getMonth(subMonths(currentDate, range))}`;
}

export function formatBytes(bytes: number, decimals: number = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function getVideoId(videoUrl: string) {
  return videoUrl.split("https://vimeo.com/")[1];
}
