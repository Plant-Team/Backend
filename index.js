//=============================================================================
// Basic Config
//=============================================================================
const express = require('express');
const cors = require('cors')
const passport = require("passport")
const jwt = require("jsonwebtoken")
const auth = require('./middleware/auth')

//=============================================================================
// Instantiate Express
//=============================================================================
const app = express();
require('./db/connection')
app.set('port', process.env.PORT || 3000)

//=============================================================================
// Middleware
//=============================================================================
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// `express.urlencoded` parses x-ww-form-urlencoded request data and
//  adds it to the request object as request.body
app.use(cors())
// `express.json` parses application/json request data and
//  adds it to the request object as request.body
app.use(passport.initialize())

//=============================================================================
// ROUTES
//=============================================================================
app.get('/', (req, res) => {
	res.redirect('/api/plants')
})

/* START CONTROLLERS HERE */
const userController = require('./controllers/userController')
app.use('/api/users/', userController)

const plantController = require('./controllers/plantController')
app.use('/api/plants/', plantController)
/* END CONTROLLERS HERE */

app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).send(message);
  });

//=============================================================================
// START SERVER
//=============================================================================
app.listen(app.get('port'), () => {
	console.log(`PORT: ${app.get('port')}`)
})
