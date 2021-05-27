// modules
const express = require('express')
const morgan = require('morgan')
const documentGenerator = require('./utils/documentsGenerator')

const statsModelController = require('./controllers/statsModelController');
const vsModelController = require('./controllers/vsModelController')
const app = express()

app.set("view engine", "ejs");
//Middlewares
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.json())
// app.use(express.static(`${__dirname}`))
app.use(express.urlencoded({ extended: true }))

//routers
app.route('/stats-model')
    .post(statsModelController.statsModelController)
    .get((req, res) => {
        res.render(`${__dirname}/public/stats-model`)
    })
app.route('/generate_docs').get((req, res) => {
    documentGenerator()
    res.redirect('/stats-model')
})
app.route('/generate_docs_vs').get((req, res) => {
    documentGenerator()
    res.redirect('/vs-model')
})



app.route('/vs-model')
    .get((req, res) => {
        res.render(`${__dirname}/public/vs-model`)
    })
    .post(vsModelController.vectorModelController)





module.exports = app