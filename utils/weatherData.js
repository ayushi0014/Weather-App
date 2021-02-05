const axios = require('axios');
require('dotenv').config();

const weatherData = (address) => {
    const url = process.env.BASE_URL + encodeURIComponent(address) + "&appid=" + process.env.SECRET_KEY;
    const responseData = axios.get(url)
    return responseData;
}


module.exports = weatherData;