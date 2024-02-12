
const axios = require('axios');

const getLatLongFromLocation = async ({address}) => {
    // const address = req.query.address;
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${address}&format=json`);
  

    if (!response.ok) {
        const geoData = response.data;
        return {lat:geoData[0].lat, lng:geoData[0].lon, name:geoData[0].name};
    }
    const geoData = response.data;
 //  res.json({lat:'', lng:'', name:''});
     // Parse the JSON response
    return {lat:'', lng:'', name:''};

}
module.exports = {
    getLatLongFromLocation
}