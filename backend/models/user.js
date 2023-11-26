const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  points: { type: Object },
  achievements: [{ type: String }],
  admin: { type: Boolean, default: false}
});

const User = model('User', userSchema);
module.exports = User;