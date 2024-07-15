import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const getInitials = (fullName) => {
  if (!fullName) return '';

  const nameParts = fullName.split(' ');
  const initials = nameParts.map(part => part.charAt(0)).join('');

  return initials.toUpperCase();
};
