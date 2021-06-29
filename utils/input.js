export const sanitizeNumber = (number) =>
  `${number}`
    .replace(/[^0-9.]/g, "")
    // .replace(/\b0+/g, "")
    .split(".")
    .slice(0, 2)
    .join(".");
