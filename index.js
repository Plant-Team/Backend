const express = require("express");
const cors = require("cors");
const passport = require("passport");

// const session = require("express-session");
// const MongoDBSession = require('connect-mongodb-session')(session)



const app = express();
require("./db/connection");
app.set("port", process.env.PORT || 4000);

//=============================================================================
// Middleware
//=============================================================================
const mongoURI = process.env.DATABASE_URL;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// const store = new MongoDBSession({
//   uri: mongoURI, 
//   collection: 'my sessions'
// })
// app.use(
//   session({
//     secret: "this is will give us cookie",
//     resave: false,
//     saveUninitialized: false,
//     store: store,
//   })
//   );
  

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


