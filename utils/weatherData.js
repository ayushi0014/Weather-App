const request = require('request');
require('dotenv').config();

const weatherData = (address, callback) => {
    const url = process.env.BASE_URL + encodeURIComponent(address) + "&appid=" + process.env.SECRET_KEY;
    request({url, json : true}, (error, {body}) => {
        if(error){
            callback("Can't fetch data from open weather map api", undefined);
        } else if(!body.main || !body.main.temp || !body.weather || !body.name){
            callback("Unable to find required data, try another location", undefined);
            } else{
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name
            });
        }

    })
}


module.exports = weatherData;