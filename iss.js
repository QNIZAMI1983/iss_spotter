const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(callback) {
  fetchMyIP((error, ip) => { // Ensure you are using the correct parameters here
    if (error) return callback(error, null);

    request(`https://ipwho.is/json/${ip}`, (error, response, body) => {
      if (error) return callback(error, null);

      try {
        const data = JSON.parse(body);
        if (!data.success) {
          callback('Invalid IP address', null);
          return;
        }

        const coords = {
          latitude: data.latitude,
          longitude: data.longitude
        };

        callback(null, coords);
      } catch (parseError) {
        callback(parseError.message, null);
      }
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };
