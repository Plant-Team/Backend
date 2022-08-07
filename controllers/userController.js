//controlers/userController.js
//require the Express module
const express = require('express')
const bcrypt= require('bcrypt')
// instantiate a router
const router = express.Router()
// import the user model
const User = require('../models/User')
const jsonwt = require('jsonwebtoken')

// require createUserToken

const { createUserToken } = require('../middleware/auth')

// Add router to the router object.

router.get('/', async(req,res,next) => {
    try{
        const users = await User.find({})
        res.json(users)
    } catch(err) {
        next(err)
    }
})

// router.post('/', async(req,res,next) => {
//     try{
//         const newUser = await User.create(req.body)
//         res.json(newUser)
//     } catch(err) {
//         next(err)
//     }

// })

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

// Signing up
router.post('/signup', async (req, res, next) => {
    const { email, username, password, firstname, lastname } = req.body
    try {
        const password = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create({ email, username, password, firstname, lastname })
        return res.status(201).json(newUser)
    }  catch (error) {
        return next(error)
    }
})

// Signing in
router.post('/signin', (req, res, next) => {
    User.findOne({ username: req.body.username })
    .then((user) => createUserToken(req, user))
    .then((token) => res.json({ token }))
    .catch(next)
})

module.exports = router