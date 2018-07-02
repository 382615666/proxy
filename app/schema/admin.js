const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adminSchema = new Schema({
    account: String,
    password: String
})

module.exports = adminSchema