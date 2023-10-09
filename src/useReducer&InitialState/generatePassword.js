export const generatePassword = (lastname, date) => {
  const dateObject = new Date(date);
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  const year = dateObject.getFullYear();
  return `${lastname}${month}${day}${year}`;
};
