import mongoose from 'mongoose'
import schema from '../schema/admin'

export default mongoose.model('Admin', schema)