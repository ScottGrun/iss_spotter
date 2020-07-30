const { nextISSTimesForMyLocation } = require("./iss");

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("Something went wront:", error);
  }

  console.log(passTimes);
  for (let flyOver of passTimes.response) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(flyOver.risetime);
    const duration = flyOver.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
});
