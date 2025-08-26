import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import sha512 from "crypto-js/sha512";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractStringFromName = (str: string) =>
  str.replace(/&amp;/g, "&").replace(/<\/?[^>]+(>|$)/g, "") || "";

export const generateHash = (value: string): string => {
  const hash = sha512(value).toString();
  return hash;
};

export const safeParse = <T>(data: string | null): T | null => {
  try {
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};
