const express = require('express')
const proxy = require('http-proxy-middleware')
const jwt = require('jsonwebtoken')

const app = express()


const token = jwt.sign({a: 1}, 't')
const a = jwt.decode(token, 't')
console.log(token)
console.log(a)

app.use(proxy('/cms/v1', {
    target: 'http://127.0.0.1:8000'
}))


app.listen('3001', () => {
    console.log('start in port 3001')
})