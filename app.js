const express = require('express')
const proxy = require('http-proxy-middleware')

const app = express()




app.use(proxy('/cms/v1', {
    target: 'http://127.0.0.1:8000'
}))


app.listen('3001', () => {
    console.log('start in port 3001')
})