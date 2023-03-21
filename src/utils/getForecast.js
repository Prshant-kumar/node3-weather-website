const request = require("request");

getForecase = (coordData, callback) => {
  const { latitude, longitude } = coordData;

  const url =
    "http://api.weatherstack.com/current?access_key=4a148c877b10988c0b5ed5bdf34b1dd0&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      console.log("Error Ocurred:", err.message);
      return callback("Can not get data for the location provided", null);
    }
    if (body.error) {
      console.log("Unable to find location");
      return callback("Can not get data for the location provided", null);
    } else {
      const data = body.current;
      return callback(null, data);
    }
  });
};

module.exports = getForecase;
