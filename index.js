const {fetchMyIp, fetchGeoCords} = require('./iss');
fetchMyIp((error, ip)=>{
  if (error) {
    console.log('It didnt work!', error);
    return;
  }

  console.log('Your IP is: ', ip);
});

fetchGeoCords('99.250.18.66', (error, coords) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned Coords:' , coords);
});