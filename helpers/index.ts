export const capitalizeString = (str: string) => {
  // Convert the first character to uppercase and concatenate it with the rest of the string
  return str.charAt(0).toUpperCase() + str.slice(1);
};
