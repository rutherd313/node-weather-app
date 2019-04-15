const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/1c0e9ab220adbbe2e54b37c07311841e/" + latitude + ',' + longitude;
    
    request({url, json: true}, (error, {body}) => {
        const summary = body.daily.data[0].summary;
        const temperature = body.currently.temperature;
        const precipProbability = body.currently.precipProbability;
        const bodyError = body.error;
        const tempHigh = body.daily.data[0].temperatureHigh;
        const tempLow = body.daily.data[0].temperatureLow;
        if (error) {
            callback("Unable to conncect to weather service", undefined)
        } else if (bodyError) {
            callback("Unable to find location", undefined);
        } else {
            callback(undefined, summary + " It is currently " + temperature + " out. There is a " + precipProbability + "% chance of rain. " + 
            "High for today is: " + tempHigh + "with a low of: " + tempLow);
        }
    });
};

module.exports = forecast;