const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up statis directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'MJ Fuller'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'MJ Fuller'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'MJ Fuller',
        msg: 'Help meeeee!'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must include an address to get the weather.'
        })
    } 

    geocode(req.query.address, (error,{ latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude,longitude, (error,{ data }) => {
            if (error) {
                return res.send({ error} )
            }
            
            res.send({
                forecast: data,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (rew,res) => {
    console
    res.send({
       products: [] 
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        msg: 'Help article not found.',
        name: 'MJ Fuller'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        msg: 'Page not found.',
        name: 'MJ Fuller'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})