const express = require('express')
const router = express.Router()
const Plant = require('../models/Plant')

// Routes
router.get('/', async(req,res,next) => {
    try{
        const plant = await Plant.find({})
        res.json(plant)

    } catch(err) {
        next(err)
    }
})

router.get('/:id', (req, res) => {
	Plant.findById({ _id: req.params.id }).then((plant) => {
		res.json(plant);
	});
});

router.post('/', async(req,res,next) => {
    try{
        const newPlant = await Plant.create(req.body)
        res.json(newPlant)
    } catch(err) {
        next(err)
    }

})

router.post('/', async(req,res,next) => {
    try{
        const newPlant = await Plant.create(req.body)
        res.json(newPlant)
    } catch(err) {
        next(err)
    }

})
router.put('/:id', async(req,res,next) => {
    try{
        const plantUpdated = await Plant.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )

        if(plantUpdated) {
            res.json(plantUpdated)
        } else {
            res.sendStatus(404)
        }
    } catch(err) {
        next(err)
    }
})


router.delete('/:id', async(req,res,next) => {
    try{
        const deletePlant = await Plant.findByIdAndDelete(req.params.id)
        if(deletePlant) {
            res.json(deletePlant)
        } else {
            res.sendStatus(404)
        }
    } catch(err) {
        next(err)
    }
})


// EXport the routes
module.exports = router