const express = require('express');

const Category = require('../models/category');

const router = express.Router();

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
router.put('/putname', async (req, res) => {
  try {
    console.log("putname route reached");
    const { name } = req.query;
    const new_category = {
      name: name,
      questions: []
    }
    Category.insertMany([new_category]);
  } catch (e) {
    res.send('error occurred: ' + e);
  }
});

module.exports = router;