import { parsePhoneNumberFromString } from "libphonenumber-js";

export const normalizePhoneNumber = (phone: string): string | null => {
  const cleaned = phone.replace(/\D/g, "");
  if (/^01[3-9]\d{8}$/.test(cleaned)) {
    return `+880${cleaned.slice(1)}`;
  }
  return null;
};
