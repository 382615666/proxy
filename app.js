const express = require('express')
const proxy = require('http-proxy-middleware')

const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, './static')))

//读取路由
fs.readdirSync('./route').forEach(fileName => {
    app.use(require(`./route/${fileName}`))
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './login.html'))
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
    console.log('connetct mongodb success')
}, err => {
    console.log(err)
})

app.use(proxy('/cms/v1', {
    target: 'http://127.0.0.1:8000'
}))



app.listen('3001', () => {
    console.log('http://127.0.0.1:3001')
})