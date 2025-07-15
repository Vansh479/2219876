export const addMinutes = (date, minutes) => {
  return new Date(date.getTime() + minutes * 60000);
};

export const isAfter = (date1, date2) => {
  return date1 > date2;
};
