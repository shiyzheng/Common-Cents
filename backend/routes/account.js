const express = require('express');

const User = require('../models/user');
const Achievement = require('../models/achievement');
const { authenticateUser, verifyUser, decode } = require('../utils/auth');

const router = express.Router();

/**
 * COMMON HTTP STATUS CODES
 * 200 - OK
 * 201 - CREATED
 * 
 * 400 - CLIENT ERROR
 * 401 - Unauthorized
 * 403 - Forbidden, wrong user
 * 404 - Not found
 */


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

router.get('/profile', async (req, res) => {
    const { username } = req.query;
    try {
      const user = await User.findOne({ username: username });
      res.json(user.points);
    } catch (e) {
      res.send('error occurred');
    }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({users});
  } catch (err) {
    res.status(401).json({error: err});
  }
});

router.get('/user', async (req, res) => {
  try {
    const { body } = req;
    const { username } = body;
    const user = await User.findOne({ username });
    res.status(200).json({user});
  } catch (err) {
    res.status(401).json({error: err});
  }
});

// get user's obtained achievements
router.get('/achievements', async (req, res) => {
  const { username } = req.query;
  try {
    const user = await User.findOne({ username: username });
    res.json({ achievements: user.achieved });
  } catch (e) {
    res.send('error occurred');
  }
});

router.post('/my-achievements', async (req, res) => {
  if (await verifyUser(req.headers.authorization)) {
    try {
      const { body } = req;
      const { username } = body;
      const user = await User.findOne({ username });
      res.status(200).json({ achievements: user.achieved })
    } catch (e) {
      res.status(401).json({error: e});
    }
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
        const { username, lesson } = body;
        const user = await User.findOne({ username });
        res.status(200).json({ unit: user.progress[lesson][0], level: user.progress[lesson][1] });
      } catch (err) {
        res.status(400).json({error: err});
      }
  }
});

/**
 * further changes: check length of Category.find({ lesson }) to cap out progress
 */
router.post('/update-user-progress', async (req, res) => {
  if (await verifyUser(req.headers.authorization)) {
    try {
      const { body } = req;
      const { username, lesson } = body;
      const user = await User.findOne({ username });
      const { progress } = user;
      const newLevel = progress[lesson][1] + 1;
      let newProgress;
      if (newLevel > 9) {
        newProgress = [progress[lesson][0] + 1, 0];
      } else {
        newProgress = [progress[lesson][0], newLevel];
      }
      console.log(newProgress);
      await User.updateOne(
        { username },
        { $set: { [`progress.${lesson}`]: newProgress }}
      );
      res.status(201).json({ message: 'Progress updated' })
    } catch (err) {
      res.status(400).json({error: err})
    }
  }
});

router.post('/add-achievement', async (req, res) => {
  if (await verifyUser(req.headers.authorization)) {
    try {
      const { body } = req;
      const { username, achievement } = body;
      const { name, id } = achievement;
      await User.updateOne(
        { username }, 
        { $push: { achieved: { name, id } } }
      );
      res.status(201).json({ message: 'Achivement added' })
    } catch (err) {
      res.status(400).json({error: err});
    }
  }
});

router.post('/add-points', async (req, res) => {
  if (await verifyUser(req.headers.authorization)) {
    try {
      const { body } = req;
      const { username, lesson, points } = body;
      await User.updateOne(
        { username },
        { $inc: { [`points.${lesson}`]: points } } // OPEN TO CHANGE
      );
      res.status(200).json({ message: 'Points Updated' });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }
});

module.exports = router;