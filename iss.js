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

module.exports = fetchMyIp;
