const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const progressSchema = new Schema({
  Intro: { type: Array, default: [0, 0] },
  Saving: { type: Array, default: [0, 0] },
  Spending: { type: Array, default: [0, 0] },
  "Earning Income": { type: Array, default: [0, 0] },
  "Managing Credit": { type: Array, default: [0, 0] },
})

const pointsSchema = new Schema({
  Intro: { type: Number, default: 0 },
  Saving: { type: Number, default: 0 },
  Spending: { type: Number, default: 0 },
  "Earning Income": { type: Number, default: 0 },
  "Managing Credit": { type: Number, default: 0 },
})

const achievementsSchema = new Schema({
  name: { type: String }
})

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  points: { type: pointsSchema, default: () => ({}) },
  progress: { type: progressSchema, default: () => ({}) },
  achieved: [achievementsSchema],
  admin: { type: Boolean, default: false}
});

const User = model('User', userSchema);
module.exports = User;