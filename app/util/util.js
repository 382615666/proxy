const fs = require('fs')
const path = require('path')

function getToken (req) {
    return req.query.token
}

function getSecret (key) {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../../config/secret.json')), 'utf-8')[key]
}

module.exports = {
    getToken,
    getSecret,
}

