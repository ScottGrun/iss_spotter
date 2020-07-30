const request = require("request");

const fetchMyIp = (callback) => {
  request("https://api.ipify.org/?format=json", (error, res, body) => {
    if (error || res.statusCode !== 200) {
      return callback(error, null);
    }
    const data = JSON.parse(body);
    console.log(data);
    return callback(null, data.ip);
  });
};

const fetchGeoCords = (ip, callback) => {
  request(`https://ipvigilante.com/${ip}`, (err, res, body) => {
    if (err || res.statusCode !== 200) {
      return callback(err, null);
    }

    const data = JSON.parse(body);
    const geoData = {
      lat: data.data.latitude,
      long: data.data.longitude,
    };

    callback(null, geoData);
  });
};

module.exports = { fetchMyIp, fetchGeoCords };
