const fs = require('fs')
const path = require('path')

function getToken (req) {
    return req.query.token
}

function getSecret (key) {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../../config/secret.json')), 'utf-8')[key]
}

//获取url中的参数
function getQueryString (url, paramKey) {
    if (url.indexOf('#') >= 0) {
        url = url.substr(0, url.indexOf('#'));
    }
    // 获取要取得的get参数位置
    var get = url.indexOf(paramKey + '=');
    if (get === -1) {
        return ''
    }
    // 截取字符串
    var getParamStr = url.slice(paramKey.length + get + 1);
    // 判断截取后的字符串是否还有其他get参数
    var nextparam = getParamStr.indexOf('&');
    if (nextparam !== -1) {
        getParamStr = getParamStr.slice(0, nextparam);
    }
    return decodeURIComponent(getParamStr)
}

module.exports = {
    getToken,
    getSecret,
    getQueryString,
}

