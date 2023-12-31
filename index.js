const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned IP:', ip);

  fetchCoordsByIP((error, coords) => { // Note the correct parameter here
    if (error) {
      console.log("It didn't work!", error);
      return;
    }

    console.log('It worked! Returned coordinates:', coords);
  });
});

