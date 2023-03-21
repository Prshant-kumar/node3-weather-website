console.log("Client side JS file is loaded");
const mapboxUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const accessKey =
  "pk.eyJ1IjoicHJhc2hhbnQxMiIsImEiOiJjbGZhbW80eWcweGx1M3JwZW04NjEzZzlqIn0.hv3W69TeSa9Tdy7c_Qwxew";

const coordURL =
  mapboxUrl +
  encodeURIComponent("ranikhet") +
  ".json?access_token=" +
  accessKey +
  "&limit=1";

const weatherUrl =
  "http://api.weatherstack.com/current?access_key=4a148c877b10988c0b5ed5bdf34b1dd0&query=" +
  79.428121 +
  "," +
  -29.64374 +
  "&units=f";

const localAPIWeather = "/weather?address=ranikhet";

const weatherForm = document.querySelector("form");
const inputField = document.querySelector("input");
const message1 = document.querySelector("#p1");
const message2 = document.querySelector("#p2");

weatherForm.addEventListener("submit", submitLocation);

function submitLocation(e) {
  e.preventDefault();
  const address = inputField.value;
  const localAPIWeather = "/weather?address=" + address;
  message1.textContent = "Loading...";
  message2.textContent = "";

  fetch(localAPIWeather)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.eror) {
        console.log(data.error);
        message1.textContent = "";
      } else {
        console.log(data);
        message1.textContent = data.location;
        message2.textContent =
          "The temperature there is " + data.foreCast.temperature + " degrees";
      }
    })
    .catch((err) => {
      console.log("Error : ", err.message);
    });
}
