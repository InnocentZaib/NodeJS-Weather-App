const request = require('request');

const forecast = (lat, long, cb) => {

    const url = 'https://api.darksky.net/forecast/e50d2f3f252dafa4f8f3c432a5ac9fda/' + encodeURIComponent(lat) + ',' + encodeURIComponent(long);

    request({url, json: true}, (err, { body }) => {
        if(err) {
            cb('Unable to connect to weather services', undefined);
        } else if (body.error) {
            cb('The given location is invalid. Try another search', undefined);
        }else {
            cb(undefined, body);
        }
    });

}

module.exports = forecast

