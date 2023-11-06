export default function formatDate(inputDate: string): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(inputDate);
  const formattedDate = `${date.getDate().toString().padStart(2, "0")} ${
    months[date.getMonth()]
  }, ${date.getFullYear()}`;

  return formattedDate;
}
