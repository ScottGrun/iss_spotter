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

fetchFlyOver=(cords, callback)=>{
  request(`http://api.open-notify.org/iss-pass.json?lat=${cords.lat}&lon=${cords.long}`,(err, res, body)=>{
    if(err || res.statusCode !== 200){
      return callback(err, null);
    }

    const data = JSON.parse(body);
    return callback(null, data)
  })
}

const nextISSTimesForMyLocation = (callback)=>{
  //Grab IP
  fetchMyIp((error, ip)=>{
    if (error) {
      console.log('It didnt work!', error);
      return;
    }
    
    //If no error grab geo cords from IP
    fetchGeoCords(ip, (error, coords) => {
      if (error) {
        console.log("It didn't work!" , error);
        return;
      }
    
   //If no error grab ISS fly over times
      fetchFlyOver(coords,(error, data)=>{
        if(error){
          console.log(error);
          return;
        }
        callback(null, data);
      })
    });
  });
  
}

module.exports = { nextISSTimesForMyLocation};
