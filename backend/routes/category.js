const express = require('express');

const qs = require('qs')
const _ = require('lodash');

const Category = require('../models/category');

const router = express.Router();

const NO_OBJECT = {};

const STATUS = {
  OK: 200,
  CREATED: 201,
  EXISTS: 409,
  NOT_FOUND: 404,
}

// specifies prefix of the query parameter name for questions
const QUESTION_QUERY_PREFIX = "question";
const QUESTION_NUMBERS = [1, 2, 3, 4, 5];

function cloneObject(object) {
  return JSON.parse(JSON.stringify(object));
}

// given req.query, returns list of questions 
// function extractQuestions(query) {
//   let questionList = [];
//   QUESTION_NUMBERS.forEach(element => {
//     const queryName = QUESTION_QUERY_PREFIX + element; 
//     if (query[queryName]) {
//       questionList.push(query.queryName);
//     }
//   });
//   console.log("questionList:::", questionList);
//   return questionList;
// }

// returns true if the question is already in the category, else returns false
function questionInCategory(category, question) {
  let ret = false;
  category.questions.forEach(element => {
    console.log("element, question", element, question);
    console.log(_.isEqual(element, question));
    if (_.isEqual(element, question)) {
      ret = true;
    }
  })
  return ret;
}

// returns updated category with the question
function updateCategory(category, question) {
  category.questions.push(question);
  return category;
}

// if the url encodes a question object, extracts it, else returns empty object
function getQuestion(url) {
  const tokens = url.split("?");
  if (tokens.length < 2) {
    return {};
  } else {
    return qs.parse(tokens[1]);
  }
}

function buildEmptyCategory(name) {
  const new_category = {
    name: name,
    questions: [],
  };
  return new_category;
}

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (e) {
    res.send('error occurred: ' + e);
  }
});

router.get('/getId', async (req, res) => {
  const { id } = req.query;
  try {
    const category = await Category.findOne({ _id: id });
    res.json(category);
  } catch (e) {
    res.send('error occurred');
  }
});

router.get('/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const category = await Category.findOne({ name: name });
    if (category != null) {
      res.status(STATUS.OK);
      res.json(category);
    } else {
      res.status(STATUS.NOT_FOUND);
      res.json(NO_OBJECT);
    }
  } catch (e) {
    res.send('error occurred: ' + e);
  }
});

// used to create a new category if one does not exist yet
router.put('/:name', async (req, res) => {
  try {
    const existing_category = await Category.findOne({ name: req.params.name});
    if (existing_category == null) {
      const new_category = buildEmptyCategory(req.params.name); 
      Category.create(new_category);
      res.status(STATUS.CREATED);
      res.json(new_category);
    } else {
      res.status(STATUS.EXISTS);
      res.json({});
    }
  } catch (e) {
    res.send('error occurred: ' + e);
  }
});

// delete requests return the new resource that is created 
// or an empty object if the resource does not exist
router.delete('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const category = await Category.findOne({ name: name });
    const clone = await cloneObject(category);
    if (category != null) {
      await Category.deleteOne({ name: name });
      res.status(STATUS.OK);
      res.type('application/json');
      res.json(clone);
    } else {
      res.status(STATUS.NOT_FOUND);
      res.json({});
    }
  } catch (e) {
    res.send('error occurred: ' + e);
  }
});

module.exports = {
  router,
  STATUS: STATUS,

  questionInCategory,  
  updateCategory,
  getQuestion,
};