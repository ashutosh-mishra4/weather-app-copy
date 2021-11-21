"use strict";

const api = {
  key: "caadac0b9ec20337ac7610a0db0b2c9f",
  base: "http://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".search");
searchbox.addEventListener("keypress", setQuerry);

function setQuerry(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
    console.log(searchbox.value);
  }
}

function searchRes() {
  getResults(searchbox.value);
  console.log(searchbox.value);
}

function getResults(querry) {
  fetch(`${api.base}weather?q=${querry}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".degree");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weatherEl = document.querySelector(".description");
  weatherEl.innerText = weather.weather[0].main;

  document.querySelector(".lowest").innerText = `${Math.round(
    weather.main.temp_min
  )}°c`;
  document.querySelector(".highest").innerText = `${Math.round(
    weather.main.temp_max
  )}°c`;
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sepetember",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

function showTime() {
  var date = new Date();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  var session = "AM";

  if (h == 0) {
    h = 12;
  }

  if (h > 12) {
    h = h - 12;
    session = "PM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  var time = h + ":" + m + ":" + session;
  var se = session;
  document.getElementById("time").innerText = time;
  document.getElementById("time").textContent = time;

  setTimeout(showTime, 1000);
}

showTime();
