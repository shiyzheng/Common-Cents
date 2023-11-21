const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const questionSchema = new Schema({
    question: { type: String, required: true },
    possibleAnswers: { type: String, required: true },
    correctAnswer: {type: String, required: true },
})

const categorySchema = new Schema({
  name: { type: String, required: true },
  questions: [questionSchema],
});

const Category = model('Category', categorySchema);

module.exports = Category;