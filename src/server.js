const express = require('express');
const hbs = require('hbs');
const path = require('path');
require('dotenv').config();
const weatherData = require('../utils/weatherData');

//app configuration
const app = express();
const PORT = process.env.PORT || 5000;

//paths
const publicStaticDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

//endpoints
app.get('/', (req, res) => {
    res.render('index', {
        title: "Weather App"
    })
});

//localhost:5000/weather?address=city
app.get('/weather', (req, res) => {
    const address = req.query.address

    if(!address){
        res.send({
            error: "You must enter city name in text box"
        });
    }

    const responseData = weatherData(address);
    responseData
    .then(response => {
        console.log(response.data);
        res.send({
            "temperature" : response.data.main.temp,
            "cityName" : response.data.name,
            "description" : response.data.weather[0].description
        })
    })
    .catch(error => res.send({error}))
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found!'
    });
});

//listening to port
app.listen(PORT, () => {
    console.log(`Server i running on port ${PORT}`);
});