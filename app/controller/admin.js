const Admin = require('../model/admin')
const jwt = require('jsonwebtoken')

const util = require('../util/util')

const login = async (req, res) => {
    const result = await Admin.find(req.body)
    if (result.length) {
        const token = jwt.sign({
            _id: result[0]._id,
            account: result[0].account
        }, util.getSecret('token'))
        res.json({token})
    } else {
        res.json({
            error: {
                message: '账号或用户名错误'
            }
        })
    }
}

const validateToken = (req, res) => {
    const user = jwt.decode(util.getToken(req), util.getSecret('token'))
    if (user) {
        next()
    } else {
        res.redirect('/')
    }
}

module.exports = {
    login,
    validateToken
}