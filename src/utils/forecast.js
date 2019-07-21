const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/e63962dc8952c362796a9a9ecd88ca27/'+latitude+','+longitude

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            const currentTemp = body.currently.temperature
            const precipChance = body.currently.precipProbability
            const summary = body.daily.data[0].summary
            callback(undefined, {
            data: summary + ' The current temperature is ' + currentTemp + ' degrees (C), and there is ' + precipChance + '% chance of rain.'
            })
        }
    })
}

module.exports = forecast