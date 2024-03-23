const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const progressSchema = new Schema({
  Introduction: { type: Array, default: [0, 0] },
  Saving: { type: Array, default: [0, 0] },
  Spending: { type: Array, default: [0, 0] },
  "Earning Income": { type: Array, default: [0, 0] },
  "Managing Credit": { type: Array, default: [0, 0] },
})

const pointsSchema = new Schema({
  Introduction: { type: Number, default: 0 },
  Saving: { type: Number, default: 0 },
  Spending: { type: Number, default: 0 },
  "Earning Income": { type: Number, default: 0 },
  "Managing Credit": { type: Number, default: 0 },
})

// CAN CHANGE ORIGINAL DIFFICULTY
const catSchema = new Schema({
  Beginner: { type: Array, default: [] },
  Waystage: { type: Array, default: [] }
})

const diffSchema = new Schema({
  Introduction: { type: catSchema, default: () => ({}) },
  Saving: { type: catSchema, default: () => ({}) },
  Spending: { type: catSchema, default: () => ({}) },
  "Earning Income": { type: catSchema, default: () => ({}) },
  "Managing Credit": { type: catSchema, default: () => ({}) },
})

const achievementsSchema = new Schema({
  name: { type: String }
})

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  points: { type: pointsSchema, default: () => ({}) },
  progress: { type: progressSchema, default: () => ({}) },
  difficultyScores: { type: diffSchema, default: () => ({}) },
  achieved: [achievementsSchema],
  admin: { type: Boolean, default: false},
  totalPoints: { type: Number, default: 0 },
});

const User = model('User', userSchema);
module.exports = User;