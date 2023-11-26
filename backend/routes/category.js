const express = require('express');

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

router.put('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const new_category = {
      name: name,
      questions: []
    }
    const category = await Category.findOne({ name: name });
    if (category == null) {
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
  STATUS: STATUS
};