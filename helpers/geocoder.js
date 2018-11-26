var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
 
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyA6pItobxq0v_r7pWG5w_R36jtaVw8h520', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
 
var geocoder = NodeGeocoder(options);

function convertAddressLat(address){
    geocoder.geocode(address, function(err, res) {
        return res.latitude
    });
}
function convertAddressLong(address){
    geocoder.geocode(address, function(err, res) {
        return res.longitude
    });
}
module.exports = convertAddressLong;
module.exports = convertAddressLat;

// output :
// [{
//   latitude: 48.8698679,
//   longitude: 2.3072976,
//   country: 'France',
//   countryCode: 'FR',
//   city: 'Paris',
//   zipcode: '75008',
//   streetName: 'Champs-Élysées',
//   streetNumber: '29',
//   administrativeLevels: {
//     level1long: 'Île-de-France',
//     level1short: 'IDF',
//     level2long: 'Paris',
//     level2short: '75'
//   },
//   provider: 'google'
// }]