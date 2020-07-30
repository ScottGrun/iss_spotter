const request = require("request-promise-native");

const fetchMyIP = function () {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = (body) => {
  let ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/${ip}`);
};

const fetchFlyOver = (cords) => {
  const { latitude, longitude } = JSON.parse(cords).data;
  return request(
    `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`
  );
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then((ip) => fetchCoordsByIP(ip))
    .then((coords) => fetchFlyOver(coords))
    .then((data) =>{
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = {nextISSTimesForMyLocation };
