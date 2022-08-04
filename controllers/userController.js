//controlers/userController.js
//require the Express module
const express = require('express')
// instantiate a router
const router = express.Router()
// import the user model
const User = require('../models/User')

// Add router to the router object.

router.get('/', (req, res, next) => {
    User.find({})
    .then((users) => res.json(users))
    .catch(next)
})


module.exports = router