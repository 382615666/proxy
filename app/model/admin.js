const mongoose = require('mongoose')
const schema = require('../schema/admin')

module.exports = mongoose.model('Admin', schema)