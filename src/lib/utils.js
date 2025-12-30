import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount, currency = "$") {
  if (typeof amount !== "number") return amount;
  return currency + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

export function calculateTotals(items, taxRate = 0) {
  const subtotal = items.reduce(
    (acc, item) => acc + Number(item.quantity) * Number(item.rate),
    0
  );
  const taxAmount = (subtotal * Number(taxRate)) / 100;
  const total = subtotal + taxAmount;

  return { subtotal, taxAmount, total };
}
