export const getDateAndTime = (data) => {
  const day = new Date(data * 1000).getDate();
  const month = new Date(data * 1000).getMonth();
  const year = new Date(data / 1000).getFullYear();

  const date = `${day}/${month}/${year}`;

  const hour = new Date(data * 1000).getHours();
  const minutes = new Date(data * 1000).getMinutes();

  let amPm = "";

  if (hour < 13) {
    amPm = "am";
  } else {
    amPm = "pm";
  }

  const time = `${hour}:${minutes}${amPm}`;

  const dateTime = `${date} ${time}`;

  return dateTime;
};
