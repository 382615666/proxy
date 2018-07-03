const fs = require('fs')
const path = require('path')

function getToken (req) {
    return req.query.token
}

function getSecret (key) {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../../config/secret.json')), 'utf-8')[key]
}

//获取url中的参数
function getQueryString (name) {
    const result = window.location.search.substr(1).match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)", 'i')); // 对querystring匹配目标参数
    return result ? decodeURIComponent(result[2]) : ''
}

module.exports = {
    getToken,
    getSecret,
    getQueryString,
}

