const express = require("express");
const router = express.Router();
const Plant = require("../models/Plant");
const User = require("../models/User");
// const { requireToken } = require('../middleware/auth')

// Routes

// All plants
router.get("/", async (req, res, next) => {
  try {
    const plant = await Plant.find({});
    res.json(plant);
  } catch (err) {
    next(err);
  }
});

// Plant by ID
router.get("/:id", (req, res) => {
  Plant.findById({ _id: req.params.id }).then((plant) => {
    res.json(plant);
  });
});

router.post('/', async(req,res,next) => {
    try{
        const newPlant = await Plant.create(req.body)
        const user = await User.updateOne({_id:newPlant.owner}, { $push:{plants:newPlant._id} })
        res.json(newPlant)
    } catch(err) {
        next(err)
    }

})

// Update plant
router.put("/:id", async (req, res, next) => {
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
router.delete("/:id", async (req, res, next) => {
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
