const express = require("express");
const router = express.Router();
const Plant = require("../models/Plant");
const User = require("../models/User");
// const { requireToken } = require('../middleware/auth')

// Routes
router.get("/", async (req, res, next) => {
  try {
    const plant = await Plant.find({});
    res.json(plant);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", (req, res) => {
  Plant.findById({ _id: req.params.id }).then((plant) => {
    res.json(plant);
  });
});

// router.post("/:id", async (req, res, next) => {
//   try {
//     const newPlant = await Plant.create(req.body);
//     res.json(newPlant);
//   } catch (err) {
//     next(err);
//   }
// });

router.post("/:userId", (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      user.plants.push(req.body);
      return user.save();
    })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(next);
});

router.put("/:id", async (req, res, next) => {
  try {
    const plantUpdated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (plantUpdated) {
      res.json(plantUpdated);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});


// Need to fix delete
// router.delete("/:userId/:plantId", (req, res, next) => {
//   const id = req.params.id;
//   User.findOne({ "plants._id": id })
//     .then((user) => {
//       user.plants.id(id).remove();
//       return user.save();
//     })
//     .then(() => res.sendStatus(204))
//     .catch(next);
// });

// EXport the routes
module.exports = router;