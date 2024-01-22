const express = require('express');

const Question = require('../models/question');
const CONSTANTS = require('./constants');
const router = express.Router();

// returns an array of question objects
function getAllQuestions() {
    console.log("testing get all questions");
    console.log("CONSTANTS: ", CONSTANTS);
    const test_object = {
        "hi" : "hello",
    }
    return test_object;
}

 router.get('/', async (req, res) => {
     try {
         const allQuestions = await Question.find();
         res.status(CONSTANTS.STATUS.OK);
         res.json(allQuestions);
     } catch (err) {
         res.send('error occurred: ' + err);
     }
 });


function getQuestionById(id) {
    console.log(id);
    return null;
}

module.exports = {
    router,
    getQuestionById,
    getAllQuestions,
}