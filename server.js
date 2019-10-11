const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 
const request = require('request'); 

app.use(express.static('public')); 
app.use(bodyParser.urlencoded({extended: true}));
// By including bodyParser above I can now make use of req.body object  
app.set('view engine', 'ejs'); 

app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null}); 
})
 app.post('/', function (req, res) {
    let city = req.body.city; 
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=bf211229710c40da58cadcab4d650f2b`; 
    request(url, function (err, response, body) {
        if (err) {
            res.render('index', {weather: null, error: 'Error, please try again'}); 
        } else { 
            let weather = JSON.parse(body)
            if (weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'}); 
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`; 
                res.render('index', {weather: weatherText, error: null}); 
            }
        }
    });  
 })

app.listen(3000, function() {
    console.log('Weather App listening on port 3000'); 
})