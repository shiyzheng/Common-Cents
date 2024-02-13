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
  console.log("check how null:::", category, question);
  let ret = false;
  if (question === null) {
    return ret;
  }
  category.questions.forEach(element => {
    if (_.isEqual(element.question, question.question)) {
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
    return null;
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

router.get('/getName', async (req, res) => {
  const { name } = req.query;
  try {
    const category = await Category.findOne({ name: name });
    res.json(category);
  } catch (e) {
    res.send('error occurred');
  }
});


// admin insert, delete, modify operations for categories 

//   router.get('/:name', async (req, res) => {
//   try {
//     const category = await Category.findOne({
//       name: req.params.name
//     });
//     if (category != null) {
//       res.status(STATUS.OK);
//       res.json(category);
//     } else {
//       res.status(STATUS.NOT_FOUND);
//       res.json(NO_OBJECT);
//     }
//   } catch (e) {
//     res.send('error occurred: ' + e);
//   }
// });


// used to create a new category if one does not exist yet
// also used to add a question in an existing category if the question
// is not already in the category
// router.put('/:name', async (req, res) => {
//   try {
//     const existing_category = await Category.findOne({ name: req.params.name});
//     const question = getQuestion(req.originalUrl);
//     if (existing_category === null) {
//       let new_category = buildEmptyCategory(req.params.name); 
//       updateCategory(new_category, question);
//       await Category.create(new_category);
//       res.status(STATUS.CREATED);
//       res.json(new_category);
//     } else {
//       if (questionInCategory(existing_category, question) || question === null) {
//         res.status(STATUS.EXISTS);
//         res.json({});
//       } else {
//         const updated_category = updateCategory(existing_category, question);
//         await Category.findOneAndUpdate({ name: req.params.name },
//           { questions: updated_category.questions })
//         res.status(STATUS.CREATED);
//         res.json(question);
//       }
//     }
//   } catch (e) {
//     console.error("error:::", e)
//     res.send('error occurred: ' + e);
//   }
// });

///
router.put('/add', async (req, res) => {
  try {
    console.log(req.body)
    const existing_category = await Category.findOne({ Name: req.body.unit });
    const question = req.body.name;
    if (existing_category === null) {
      let new_category = {
        Category: req.body.category,
        Name: req.body.unit,
        Beginner: [],
        Waystage: [],
        Advanced: []
      }
      if (req.body.difficulty == "Beginner") {
        new_category.Beginner.push({
          Question: question,
          Answers: req.body.answers,
          Correct: req.body.correct
        })
      } else if (req.body.difficulty == "Waystage") {
        new_category.Waystage.push({
          Question: question,
          Answers: req.body.answers,
          Correct: req.body.correct
        })
      } else if (req.body.difficulty == "Advanced") {
        new_category.Advanced.push({
          Question: question,
          Answers: req.body.answers,
          Correct: req.body.correct
        })
      }
      await Category.create(new_category);
      res.status(STATUS.CREATED);
      res.json(new_category);
    } else {
      if (question === null) {
        res.status(STATUS.EXISTS);
        res.json({});
      } else {
        if (req.body.difficulty == "Beginner") {
          existing_category.Beginner.push({
            Question: question,
            Answers: req.body.answers,
            Correct: req.body.correct
          })
          await Category.findOneAndUpdate({ Name: req.body.category },
            { Beginner: existing_category.Beginner })
        } else if (req.body.difficulty == "Waystage") {
          existing_category.Waystage.push({
            Question: question,
            Answers: req.body.answers,
            Correct: req.body.correct
          })
          await Category.findOneAndUpdate({ Name: req.body.category },
            { Waystage: existing_category.Waystage })
        } else if (req.body.difficulty == "Advanced") {
          existing_category.Advanced.push({
            Question: question,
            Answers: req.body.answers,
            Correct: req.body.correct
          })
          await Category.findOneAndUpdate({ Name: req.body.category },
            { Advanced: existing_category.Advanced })
        }
        res.status(STATUS.CREATED);
        res.json(question);
      }
    }
  } catch (e) {
    console.error("error:::", e)
    res.send('error occurred: ' + e);
  }
});
///

// delete requests return the new resource that is created
// or an empty object if the resource does not exist
// if the url contains a question, then you must delete
// just the question and not the category

// async function routerDeleteCategory(req, res) {
//   try {
//     const category = await Category.findOne({ name: req.params.name });
//     if (category != null) {
//       await Category.deleteOne({ name: req.params.name });
//       res.status(STATUS.OK);
//       res.json(category);
//     } else {
//       res.status(STATUS.NOT_FOUND);
//       res.json({});
//     }
//   } catch (e) {
//     console.error('error occurred:' + e);
//     res.send('error occurred: ' + e);
//   }
// }

// async function routerDeleteQuestion(req, res, question) {
//   try {
//     const category = await Category.findOne({ name: req.params.name });
//     if (category != null) {
//       if (questionInCategory(category, question)) {
//         await Category.updateOne(
//           { name: req.params.name },
//           {
//             $pull: {
//               questions: { question: question.question }
//             }
//           },
//         );
//         res.status(STATUS.OK);
//         res.json(question);
//       } else {
//         res.status(STATUS.NOT_FOUND);
//         res.json({});
//       }
//     } else {
//       res.status(STATUS.NOT_FOUND);
//       res.json({});
//     }
//   } catch (e) {
//     console.error('error occurred:' + e);
//     res.send('error occurred: ' + e);
//   }
// }

// router.delete('/:name', async (req, res) => {
//   const question = getQuestion(req.originalUrl);
//   if (question === null) {
//     routerDeleteCategory(req, res); 
//   } else {
//     routerDeleteQuestion(req, res, question);
//   }
// });

router.post('/lesson-level', async (req, res) => {
  try {
    const { body } = req;
    const { lesson, level } = body;
    const id = level[0];
    const progress = level[1];
    const category = Category.findOne({
      Lesson: lesson,
      id,
    });
    switch (progress) {
      case 0:
        res.json({questions: category.Beginner.slice(0, questions.length / 3)});
        break;
      case 1:
        res.json({questions: category.Beginner.slice(questions.length / 3, -questions.length / 3)});
        break;
      case 2:
        res.json({questions: category.Beginner.slice(-questions.length / 3, questions.length)})
        break;
    }
  } catch (err) {
    res.json({error: err})
  }
});


module.exports = {
  router,

  STATUS: STATUS,

  questionInCategory,  
  updateCategory,
  getQuestion,
};