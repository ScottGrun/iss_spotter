const fetchMyIp = require('./iss');

fetchMyIp((error, ip)=>{
  if (error) {
    console.log('It didnt work!', error);
    return;
  }

  console.log('Your IP is: ', ip);
});