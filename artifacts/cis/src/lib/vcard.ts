import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateVCard = () => {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:ЦИС / CIS
ORG:ЦИС / CIS
TITLE:Центр Интеллектуальной Собственности и Антикризисного Управления
TEL;TYPE=WORK,VOICE:+79895740487
EMAIL:info@ao-cis.ru
URL:https://ao-cis.ru
NOTE:Карта выхода бизнеса из кризиса
END:VCARD`;

  const blob = new Blob([vcard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "cis_contact.vcf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
