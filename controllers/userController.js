//controlers/userController.js
//require the Express module
const express = require('express')
// instantiate a router
const router = express.Router()
// import the user model
const User = require('../models/User')

// Add router to the router object.

router.get('/', async(req,res,next) => {
    try{
        const users = await User.find({})
        res.json(users)
    } catch(err) {
        next(err)
    }
})

router.post('/', async(req,res,next) => {
    try{
        const newUser = await User.create(req.body)
        res.json(newUser)
    } catch(err) {
        next(err)
    }

})

router.put('/:id', async(req,res,next) => {
    try{
        const userUpdated = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )

        if(userUpdated) {
            res.json(userUpdated)
        } else {
            res.sendStatus(404)
        }
    } catch(err) {
        next(err)
    }
})


router.delete('/:id', async(req,res,next) => {
    try{
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        if(deleteUser) {
            res.json(deleteUser)
        } else {
            res.sendStatus(404)
        }
    } catch(err) {
        next(err)
    }
})

module.exports = router