import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
}, { collection: 'users' })

export {
  userSchema,
}
