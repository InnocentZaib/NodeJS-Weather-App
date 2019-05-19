const request = require('request');

const geoCode = (address, cb) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?limit=1&access_token=pk.eyJ1IjoiemFpYm11Z2hhbDQyMCIsImEiOiJjanZxdWgzNDEyZm52M3pydHlydDFyemxmIn0.emB-psedUp5sILVTJQNqlA';


    request({url, json: true}, (error, { body }) => {

        if(error) {

            cb('Unable to connect to location services', undefined);

        }else if(body.features.length === 0) {

            cb('Unable to find location. Try another search.', undefined);

        }else {

            cb(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                place: body.features[0].place_name
            });
        
        }

    });


}

module.exports = geoCode;
