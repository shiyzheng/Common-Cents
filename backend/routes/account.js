const express = require('express');

const User = require('../models/user');
const Achievement = require('../models/achievement');
const { authenticateUser, verifyUser, decode } = require('../utils/auth');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { body } = req;
  const { username, password } = body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      await User.create({ username, password });
      res.send('user creation was successful');
    } else {
      res.send('username taken');
    }
  } catch (e) {
    console.log(e);
    res.send('error occurred');
  }
});

// router.post('/checklogin', async (req, res) => {
//   const { body } = req;
//   const { username, password } = body;
//   try {
//     const token = authenticateUser(username, password);
//     res.status(201).json({apptoken: token});
//   } catch (err) {
//     res.status(401).json({error: 'authenticate error'})
//   }
// });

router.post('/login', async (req, res) => {
  const { body } = req;
  const { username, password } = body;
  try {
    const token = authenticateUser(username, password);
    if (await verifyUser(token)) {
      res.status(201).json({apptoken: token});
    } else {
      res.status(401).json({error: 'wrong password'})
    }
  } catch (e) {
    res.status(401).json({error: 'authenticate error'})
  }
});

// router.post('/verify', async (req, res) => {
//   if (await verifyUser(req.headers.authorization)) {
//     res.json({message: 'Successful Authentication'})
//   } else {
//     res.json({message: 'Failed Authentication'})
//   }
// })

// router.post('/logout', (req, res) => {
//   req.session.destroy((error) => {
//     if (error) throw error

//     res.clearCookie('session-id') // cleaning the cookies from the user session
//     res.status(200).send('Logout Success')
//   })
// });

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

router.post('/user-progress', async (req, res) => {
  if (await verifyUser(req.headers.authorization)) {
      try {
        const { body } = req;
        const { username, lesson, unit } = body;
        decoded = decode(username);
        const user = await User.findOne({ username: 'asd' });
        res.json(user.progress[lesson][unit]);
      } catch (err) {
        res.status(400).json({message: 'There was an error'});
      }
  }
});


module.exports = router;