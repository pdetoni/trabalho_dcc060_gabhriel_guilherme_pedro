const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
});
const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
});

function formatDateToInput(value: Date | null): string {
  if (!value) return "";
  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = value.getFullYear();
  const month = pad(value.getMonth() + 1);
  const day = pad(value.getDate());
  const hours = pad(value.getHours());
  const minutes = pad(value.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export { dateFormatter, timeFormatter, formatDateToInput };
