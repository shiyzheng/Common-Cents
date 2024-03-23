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

const CAPS = {
  Introduction: 7,
  Saving: 9,
  Spending: 7,
  "Managing Credit": 10,
}

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

router.post('/achievement-by-lesson', async (req, res) => {
  try {
    const { body } = req;
    const { lessonObject, points } = body;
    const { lesson, unit } = lessonObject;
    console.log(lesson);
    console.log(points);
    const achievements = await Achievement.find({
      lesson,
      pointThreshold: { $lte: points }
    });
    console.log(achievements);
    res.status(200).json(achievements);
  } catch (e) {
    res.status(401).json({ error: e });
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

      if (newProgress[0] > CAPS[lesson]) {
        // COMMUNICATE WITH FRONT END, MAY HAVE TO CHANGE DEPENDING ON IMPLEMENTATION, ENDLESS MODE?
        newProgress = [-1, -1];
      }

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

// router.post('/add-achievement', async (req, res) => {
//   if (await verifyUser(req.headers.authorization)) {
//     try {
//       const { body } = req;
//       const { username, achievement } = body;
//       const { name } = achievement;
//       await User.updateOne(
//         { username }, 
//         { $addToSet: { achieved: { name } } }
//       );
//       res.status(201).json({ message: 'Achivement added' })
//     } catch (err) {
//       res.status(400).json({error: err});
//     }
//   }
// });

router.post('/update-achievements', async (req, res) => {
  if (await verifyUser(req.headers.authorization)) {
    try {
      const { body } = req;
      const { username, score, quizNum } = body;
      const user = await User.findOne({ username });
      const earnedAchievements = user.achieved.map(achievement => achievement.name);

      const newAchievements = [];
      const total = user.totalPoints;

      const users = await User.find();
      const pointsArr = users.map(user => ({
        username: user.username,
        totalPoints: user.totalPoints
      }));

      newAchievements.push("Complete Introduction to a Topic");

      if (score >= 0.6 && quizNum == 10) {
        newAchievements.push("Master a Topic");
      }

      if (score >= 0.6) {
        newAchievements.push("Pass a Quiz");
      }

      if (score == 1) {
        newAchievements.push("Acquire a Perfect Score on a Quiz");
      }

      if (total >= 1000) {
        newAchievements.push("Achieve 1,000 Points");
      }

      if (total >= 10000) {
        newAchievements.push("Achieve 10,000 Points");
      }

      if (total >= 100000) {
        newAchievements.push("Achieve 100,000 Points");
      }

      if (user.points.Spending >= 1000) {
        newAchievements.push("Achieve 1000 points in the Spending Unit");
      }

      const sortedPointsArr = pointsArr.sort((a, b) => b.totalPoints - a.totalPoints);
      const topTenUsers = sortedPointsArr.slice(0, 10);
      if (topTenUsers.find(user => user.username == username)) {
        newAchievements.push("Reach Top 10 on the Leaderboards");
      }

      const allAchievements = await Achievement.find();
      const numberOfAchievements = allAchievements.length;

      if (newAchievements.length >= numberOfAchievements - 1) {
        newAchievements.push("Complete All Other Achievements");
      }

      newAchievements.forEach(async achievement => {
        if (!earnedAchievements.includes(achievement)) {
          await User.updateOne(
            { username }, 
            { $addToSet: { achieved: { name: achievement } } }
          );
        }
      });
      console.log(user.points.Spending);
      const returnedAchievements = newAchievements.filter(achievement => !earnedAchievements.includes(achievement));
      res.status(200).json({ returnedAchievements });
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
      await User.updateOne(
        { username },
        { $inc: { totalPoints: points } }
      );
      res.status(200).json({ message: 'Points Updated' });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }
});

router.post('/difficulty-array', async (req, res) => {
  if (await verifyUser(req.headers.authorization)) {
    try {
      const { body } = req;
      const { username, lesson, difficulty, wrong } = body;
      await User.updateOne(
        { username },
        { $addToSet: { [`difficultyScores.${lesson}.${difficulty}`]: { $each: wrong } }}
      )
      res.status(200).json({ message: 'Questions added' })
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }
})

module.exports = router;