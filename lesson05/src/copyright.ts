// Original JS code
/*
const year = document.getElementById("year");
const thisYear = new Date().getFullYear();
year.setAttribute("datetime", thisYear);
year.textContent = thisYear;
*/

const year = document.getElementById("year") as HTMLSpanElement;
const thisYear: number = new Date().getFullYear();
year.setAttribute("datetime", `${thisYear}`);
year.textContent = `${thisYear}`;
