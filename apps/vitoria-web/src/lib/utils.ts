import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utilitário para mesclar classes Tailwind de forma condicional e limpa.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
