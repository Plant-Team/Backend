const express = require("express");
const cors = require("cors");
const passport = require("passport");

const dotenv = require('dotenv').config()

const app = express();
require("./db/connection");
app.set("port", process.env.PORT || 4000);

//=============================================================================
// Middleware
//=============================================================================


// secret: What we actually will be giving the user on our site as a session cookie
// resave: Save the session even if it's modified, make this false
// saveUninitialized: If we have a new session, we save it, therefore making that true

  
app.get("/", (req, res) => {
  res.redirect("/api/plants");
});

const userController = require("./controllers/userController");
app.use("/api/users/", userController);

const plantController = require("./controllers/plantController");
app.use("/api/plants/", plantController);

app.use((err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).send(message);
});

app.listen(app.get("port"), () => {
  console.log(`PORT: ${app.get("port")}`);
});