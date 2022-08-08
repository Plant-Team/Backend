const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");
const jsonwt = require("jsonwebtoken");

const { createUserToken } = require("../middleware/auth");

// ROUTES

//Get all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// Get users by ID
router.get("/:userId", (req, res, next) => {
  User.findById(req.params.userId)
    .populate("plants.user")
    .then((user) => res.json(user))
    .catch(() => res.sendStatus(404));
});

//
// router.get("/:userId", async (req, res, next) => {
//     try {
//         const userPlants = await User.findById(req.params.userId).populate('plants.user')
//         if (userPlants) {
//             res.json(userPlants.plants)
//         } else {
//             res.sendStatus(404)
//         }
//     } catch(err) {
//         next(err)
//     }
//   });

//
router.post("/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      user.plants.push(req.body);
      return user.save();
    })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(next);
});

//
// router.post('/', async(req,res,next) => {
//     try{
//         const newUser = await User.create(req.body)
//         res.json(newUser)
//     } catch(err) {
//         next(err)
//     }

// })

// Update user
router.put("/:id", async (req, res, next) => {
  try {
    const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (userUpdated) {
      res.json(userUpdated);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

// Delete user
router.delete("/:id", async (req, res, next) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (deleteUser) {
      res.json(deleteUser);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

// Signing up
router.post("/signup", async (req, res, next) => {
  const { email, username, password, firstname, lastname } = req.body;
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      email,
      username,
      password,
      firstname,
      lastname,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    return next(error);
  }
});

// Signing in
// router.post("/signin", async (req, res, next) => {
//   const { username, password } = req.body;
//   try {
//     const findUser = await User.findOne({ username });
//     if (!findUser) throw new Error("Username not found");

//     const validPassword = await bcrypt.compare(password, findUser.password);
//     if (!validPassword) throw new error("Incorrect Password");

//     const payLoad = {
//       id: findUser._id,
//       email: findUser.email,
//       username: findUser.username,
//       type: "user",
//     };
//     jsonwt.sign(payLoad, JWT_SECRET, { expiresIn: 3600 }, (error, token) => {
//       if (error) throw new Error("Session has ended, please log in again");
//       res.json({ success: true, token: `Bearer ${token}`, data: legit });
//     });
//   } catch (error) {
//     return next(error);
//   }
// });

router.post('/signin', (req, res, next) => {
    User.findOne({ username: req.body.username })
    .then((user) => createUserToken(req, user))
    .then((token) => res.json({ token }))
    .catch(next)
})

module.exports = router;
