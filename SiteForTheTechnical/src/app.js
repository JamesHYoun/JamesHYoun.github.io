const express = require('express')
const app = express()
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(process.cwd() + '/public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/blogs', (req, res) => {
    res.render('blogs')
})

module.exports = app