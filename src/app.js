const express = require('express');
const path = require('path'); //part of node core built-in modules
const hbs = require('hbs');

const app = express();
//allows files to get rendered from public folder
const publicDirectoryPath = path.join(__dirname, '../public');

//by default, templates folder is called views which is read by express
//this is the process needed to change and apply its name 
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath);

const partialsPath = path.join(__dirname, '../templates/partials');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


//Setup handlebars location
app.set('view engine', 'hbs');
//configures partials
hbs.registerPartials(partialsPath);

//Setup static directory to server
//allows files to get rendered from public folder
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'John Dueno'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Supreme Leader',
        name: 'John Dueno'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Hotline',
        role: 'To help and serve',
        name: 'John Dueno'
    })
})

// app.get('', (req, res) => {
//     res.send('<h1>Welcome!</h1>'); //won't show since index.html is default route 
// });

/* app.get('/help', (req, res) => { older versions compared to app.use()
    res.send({
        name: "Don John",
        age: 25
    });
});

//about
app.get('/about', (req, res) => {
    res.send('<h1>Get to know me!</h1>');
}); */

//weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Don John',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Don John',
        errorMessage: 'Page not found'
    })
})

//listen
app.listen(3000, () => {
    console.log('Server is up on port 3000');
})

/* geocode(req.query.address, (error, {latitude, longitude, location}) => {
    if (error) {
        return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return res.send({ error });
        }
        
        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        });
    });
}); */