const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
// Add a comment for git

//SET TEMPLATE ENGINE (EJS)
app.set('view engine', 'ejs');

// STATIC ASSETS
const publicPathDirectory = path.join(__dirname , 'public');
app.use(express.static(publicPathDirectory));


// ROUTES
app.get('', (req, res, next) => { // Root Route
    res.render('index', {
        pageTitle: 'Weather App',
        author: 'Shahzaib Muhammad Riaz'
    });
});


app.get('/help', (req, res, next) => {

    res.render('help', {
        pageTitle: 'Need Help'
    });

}); 

app.get('/help/*', (req, res, next) => {

    res.render('404', {
        pageTitle: 'Weather App | Help Article not found',
        errorMessage: 'Help Article not found'
    });

});

app.get('/about', (req, res, next) => {

    res.render('about', {
        pageTitle: 'About Us'
    });

});

app.get('/weather', (req, res, next) => {
    

    if(!req.query.address){
        return res.send({
            error: "Address not provided for weather data to fetch"
        });
    }

    
    geocode(req.query.address , (error, {latitude, longitude, place} = {}) => {

        if(error) {
            return res.send({error});
        }

        forecast(latitude, longitude,(err, forecastData) => {

            if(err) {
                return res.send({err});
            }

            res.send({
                forecast: forecastData.currently,
                place,
                address: req.query.address
            });

        }); 

    });
});

app.get('/products', (req, res, next) => {

    return console.log(req.query);


});

app.get('*', (req, res, next) => {
    res.render('404', {
        pageTitle: 'Weather App | 404 Not Found',
        errorMessage: 'Page you are trying to look not found'
    });
})


app.listen(port, () => {
    console.log("Server starts on port " + port);
});

