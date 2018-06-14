const express = require('express')
const proxy = require('http-proxy-middleware')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next) => {
    const token = req.query.access_token
    const user = jwt.decode(token, 'test')
    if (user) {
        next()
    } else {

    }
})

app.use(proxy('/cms/v1', {
    target: 'http://127.0.0.1:8000'
}))


app.listen('3001', () => {
    console.log('start in port 3001')
})