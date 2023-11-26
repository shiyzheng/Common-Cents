const express = require('express');

const User = require('../models/user');
const Achievement = require('../models/achievement');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { body } = req;
  const { username, password } = body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      await User.create({ username, password });
      req.session.username = username;
      res.send('user creation was successful');
    } else {
      res.send('username taken');
    }
  } catch (e) {
    console.log(e);
    res.send('error occured');
  }
});

router.post('/login', async (req, res) => {
  const { body } = req;
  const { username, password } = body;
  try {
    const user = await User.findOne({ username });
    if (user.password === password) {
      console.log(req.session);
      req.session.username = username;
      res.send('you are logged in');
    } else {
      res.send('wrong password');
    }
  } catch (e) {
    res.send('error occurred');
  }
});

router.post('/logout', (req, res) => {
  req.session.username = null;
  res.send('you logged out');
});

router.get('/isLogged', (req, res) => {
  res.json(req.session.username);
});

router.get('/profile', async (req, res) => {
    const { username } = req.query;
    try {
      const user = await User.findOne({ username: username });
      res.json(user.points);
    } catch (e) {
      res.send('error occurred');
    }
});

// get user's obtained achievements
router.get('/achievements', async (req, res) => {
  const { username } = req.query;
  try {
    const user = await User.findOne({ username: username });
    res.json(user.achievements);
  } catch (e) {
    res.send('error occurred');
  }
});


// get all achievements
router.get('/allAchievements', async (req, res) => {
  try {
    const allAchievements = await Achievement.find();
    res.json(allAchievements);
  } catch (e) {
    res.send('error occurred');
  }
});


router.get('/leaderboards', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    res.send('error occurred');
  }
});


module.exports = router;