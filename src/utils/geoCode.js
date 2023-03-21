const request = require("request");

const mapboxUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const accessKey =
  "pk.eyJ1IjoicHJhc2hhbnQxMiIsImEiOiJjbGZhbW80eWcweGx1M3JwZW04NjEzZzlqIn0.hv3W69TeSa9Tdy7c_Qwxew";

getGeoCode = (address, callBack) => {
  const url =
    mapboxUrl +
    encodeURIComponent(address) +
    ".json?access_token=" +
    accessKey +
    "&limit=1";

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      return callBack(
        { error: "Unable to find location, try another search" },
        null
      );
    } else if (body.features.length === 0) {
      return callBack("Unable to find location, try another search", null);
    }
    if (body.error) {
      return callBack("Unable to find location, try another search", null);

      // return callBack(null, data.features[0].center[0], data.features[0].center[1]);
    } else {
      if (body.features.length) {
        const data = body.features[0];
        return callBack(null, {
          latitude: data.center[0],
          longitude: data.center[1],
          location: data.place_name,
        });
      } else {
        return callBack({ error: "Something went wrong!" }, null);
      }
    }
  });
};

module.exports = getGeoCode;
