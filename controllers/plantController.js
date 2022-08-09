const express = require("express");
const router = express.Router();
const Plant = require("../models/Plant");
const User = require("../models/User");

const { requireToken } = require("../middleware/auth");

// Routes

// All plants
router.get("/",  async (req, res, next) => {
  try {
    const plants = await Plant.find({});
    res.json(plants);
  } catch (err) {
    next(err);
  }
});

// Plant by ID
router.get("/:id", async (req, res, next) => {
  try {
    const plant = await Plant.findById({ _id: req.params.id });
    res.json(plant);
  } catch (err) {
    next(err);
  }
});

// Searching for plant
// router.get("/search", async (req, res) => {
//   try {
//     const allPlants = await Plant.find({ name: req.body.query });
//     if (!allPlants || allPlants.length === 0)
//       res.status(400).send({ error: "No Plant was found" });
//     res.status(200).send(allPlants);
//   } catch (err) {
//     next(err);
//   }
// });

// Post plant + add plant ID to owner
router.post("/", requireToken, async (req, res, next) => {
  try {
    const newPlant = await Plant.create(req.body);
    const user = await User.updateOne(
      { _id: newPlant.owner },
      { $push: { plants: newPlant._id } },
      { new: true }
    );
    res.json(newPlant);
  } catch (err) {
    next(err);
  }
});

// Update plant
router.put("/:id", requireToken, async (req, res, next) => {
  try {
    const plantUpdated = await Plant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (plantUpdated) {
      res.json(plantUpdated);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

// Delete plant
router.delete("/:id", requireToken, async (req, res, next) => {
  try {
    const deletePlant = await Plant.findByIdAndDelete(req.params.id);
    if (deletePlant) {
      res.json(deletePlant);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;