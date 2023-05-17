const currDate = document.getElementById("date");

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUNE",
  "JULY",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
const weekdays = new Array("SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT");
var currTime = new Date();
const getCurrentDay = () => {
  var month = months[currTime.getMonth()];
  var day = weekdays[currTime.getDay()];
  var year = currTime.getFullYear();
  return `${day} | ${month} ${year}`;
};

const getCurrentTime = () => {
  let hours = currTime.getHours();
  let mins = currTime.getMinutes();
  let perios = "AM";
  if (hours > 11) {
    perios = "PM";
    if (hours > 12) hours -= 12;
  }
  if (mins < 10) mins = "0" + mins;
  return `${hours}:${mins}${perios}`;
};
currDate.innerHTML = `<p>${getCurrentDay()} | ${getCurrentTime()}</p>`;
