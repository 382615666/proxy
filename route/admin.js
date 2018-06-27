const express = require('express')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/login', (req, res) => {
    res.json({
        token: jwt.sign({a:1}, 'test')
    })
})

module.exports = router