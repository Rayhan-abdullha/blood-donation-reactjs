export function formatDateShort(isoDate: string) {
  const date = new Date(isoDate);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${day} ${month}`;
}