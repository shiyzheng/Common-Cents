const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const questionSchema = new Schema({
    question: { type: String, required: true },
    possibleAnswers: { type: [String], required: true },
    correctAnswer: { type: String, required: true },
    level: {type: Number, required: true}
})

const Question = model('Question', questionSchema);

module.exports = Question;