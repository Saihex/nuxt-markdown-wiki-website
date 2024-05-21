function getOrdinalSuffix(day: number): string {
  if (11 <= day && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export const date_formatter = function (timestamp: number): string {
  let date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds

  // Extract day, month, and year
  let day = date.getUTCDate();
  let month = date.toLocaleString("default", { month: "long" }); // Full month name
  let year = date.getUTCFullYear();

  // Get the ordinal suffix for the day
  let suffix = getOrdinalSuffix(day);

  // Format the date to DDth Month YYYY
  return `${day}${suffix} ${month} ${year}`;
};

export const add_description_mark = function (
  url: string,
  last_modified: number | undefined
): string {
  if (typeof last_modified == "undefined")
    return url + `\n\n[Saihex Studios Official Wiki | Saihex Wiki]`;

  return (
    url +
    `\n[Last database change: ${date_formatter(
      last_modified
    )}]\n[Saihex Studios Official Wiki | Saihex Wiki]`
  );
};
