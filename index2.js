
const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then(flyOvers =>{
    for(let flyOver of flyOvers){
      //I could prob make this all a function and import it but im tired and hungry
      const datetime = new Date(0);
      datetime.setUTCSeconds(flyOver.risetime);
      const duration = flyOver.duration;
      console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
  }) .catch((error) => {
    console.log("It didn't work: ", error.message);
  });