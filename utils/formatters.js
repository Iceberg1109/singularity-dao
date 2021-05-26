


export const getFormattedPrice = (price) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(price);
};

function getDateSuffix(x) {
  if (x > 3 && x < 21) return "th";
  switch (x % 10) {
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

export const getFormattedDate = (date, includeTime = false) => {
  if (typeof date === "string") date = new Date(date);

  const dateTimeOptions = {
    month: "short",
    day: "numeric",
  };

  if (includeTime) {
    dateTimeOptions.year = "numeric";
    dateTimeOptions.hour = "numeric";
    dateTimeOptions.minute = "numeric";

    return new Intl.DateTimeFormat("en-US", dateTimeOptions).format(date);
  }

  const formatter = new Intl.DateTimeFormat("en-US", dateTimeOptions);
  const formatted = formatter.formatToParts(date);

  const day = formatted[2].value;

  return formatted[0].value + " " + formatted[2].value + getDateSuffix(day);
};
