const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const achievementSchema = new Schema({
    achievementName: { type: String, required: true },
    lesson: {type: String},
    pointThreshold: { type: Number },
})

const Achievement = model('Achievement', achievementSchema);

module.exports = Achievement;