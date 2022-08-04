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


module.exports = router