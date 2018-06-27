import mongoose from 'mongoose'

const Schema = mongoose.Schema

const adminSchema = new Schema({
    account: String,
    password: String
})

export default adminSchema