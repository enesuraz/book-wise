export function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export function formatDate(dateStr) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

export function calcDaysLeft(dateStr) {
  const d1 = new Date();
  const d2 = new Date(dateStr);
  return Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
}
