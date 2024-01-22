const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const questionSchema = new Schema({
    Question: { type: String, required: true },
    Answers: { type: [String], required: true },
    Correct: {type: String, required: true },
})

const categorySchema = new Schema({
  Lesson: { type: String, required: true },
  Name: { type: String, required: true },
  Beginner: [questionSchema],
  Waystage: [questionSchema],
  Advanced: [questionSchema]
  // questions: [questionSchema],
});

const Category = model('Category', categorySchema);

module.exports = Category;