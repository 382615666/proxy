const express = require('express')
const proxy = require('http-proxy-middleware')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')

const app = express()




app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


app.use(express.static(path.join(__dirname, './static')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './login.html'))
})

app.post('/login', (req, res) => {
    res.json({
        token: jwt.sign({a:1}, 'test')
    })
})

app.use((req, res, next) => {
    if (req.path.indexOf('/admin') >  -1) {
        const token = req.query.access_token
        const user = jwt.decode(token, 'test')
        if (user) {
            next()
        } else {
            res.redirect('/')
        }
    }
})


const db = JSON.parse(fs.readFileSync(path.join(__dirname, './config/mongo.json'), 'utf-8'))
mongoose.connect(`mongodb://${db.user}:${db.pwd}@${db.ip}:${db.port}/${db.db}`).then((a) => {
}, err => {
    console.log(err)
})

app.use(proxy('/cms/v1', {
    target: 'http://127.0.0.1:8000'
}))



app.listen('3001', () => {
    console.log('start in port 3001')
})