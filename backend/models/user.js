const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const progressSchema = new Schema({
  Spending: { type: Array, default: [0, 0] }
})

const pointsSchema = new Schema({
  Spending: { type: Number, default: 0 }
})

const achievementsSchema = new Schema({
  name: { type: String },
  id: { type: Number },
})

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  points: { type: pointsSchema, default: () => ({}) },
  progress: { type: progressSchema, default: () => ({}) },
  achieved: [achievementsSchema],
  notAchieved: [achievementsSchema],
  admin: { type: Boolean, default: false}
});

const User = model('User', userSchema);
module.exports = User;