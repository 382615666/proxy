const express = require('express')
const admin = require('../app/controller/admin')

const router = express.Router()

router.all('/admin/*', admin.validateToken)

router.post('/login', admin.login)

module.exports = router