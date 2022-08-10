Signing in
router.post("/signin", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const findUser = await User.findOne({ username });
    if (!findUser) throw new Error("Username not found");

    const validPassword = await bcrypt.compare(password, findUser.password);
    if (!validPassword) throw new error("Incorrect Password");

    const payLoad = {
      id: findUser._id,
      email: findUser.email,
      username: findUser.username,
      type: "user",
    };
    jsonwt.sign(payLoad, JWT_SECRET, { expiresIn: 3600 }, (error, token) => {
      if (error) throw new Error("Session has ended, please log in again");
      res.json({ success: true, token: `Bearer ${token}`, data: legit });
    });
  } catch (error) {
    return next(error);
  }
});

Sign up
router.post('/signup', async (req,res, next) => {
    const { email, username, password, firstname, lastname } = req.body
    try {
        const password = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create({ email, username, password, firstname, lastname })
        const createdUser = await newUser.save()
        const payload = {
            id: createdUser._id,
            email: createdUser.email,
            userName: createdUser.username,
            type: "user",
        }
        jsonwt.sign(payload, JWT_SECRET, { expiresIn: 60 * 60 }, (error, token) => {
            if (error) throw new Error("Session has ended, please log in again")
            const legit = jsonwt.verify(token, JWT_SECRET, { expiresIn: 60 });
            res
              .status(201)
              .json({
                success: true,
                token: `Bearer ${token}`,
                data: legit,
                message: "User Created",
              })
        })
    }catch (err) {
        return next(err)
    }
})

router.get('/', async (req, res) => {
  // Find All Plants
  try {
    // If There Is A Search. Get Results From That.
    let results = [];
    if (req.query.search) {
      let query = req.query.search.toLowerCase();
      // First determine if the query matches anything.
      let results = Trie.findSuffixes(query);
      if (results === -1) throw new Error("No Search Found!");
      let promises = results.map(async (result) => {
        if (result.type === "plant") {
          const re = new RegExp(result.word, "i");
          const [plant] = await db.Plant.findOne({
            name: { $regex: re },
          })
          return plant;
        }
      });
      results = await Promise.all(promises);
      res.json({ success: true, count: results.length, results });
    } else {
      results = await db.Plant.find({})
      res.json({ success: true, count: results.length, results });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(plant);
  }
});

Edit user
router.put('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
      // find the current user
      const [type, token] = req.headers.authorization.split(' ');
      const payload = jsonwt.decode(token);
      // check if the user is editing only themselves
      if (payload.id !== _id) throw new Error("Forbidden");
  
      const { username, email, oldpassword, newpassword, firstname, lastname } = req.body;
  
      const user = await User.findOne({ _id });
  
      // if user submitted an oldPassword and newPassword
      if (oldpassword && newpassword) {
        // compare old password
        const isValid = await bcrypt.compare(oldpassword, user.password);
        if (!isValid) throw new Error("Old Password Inccorect");
  
        const isOldPassword = await bcrypt.compare(newPassword, user.password);
        if (isOldPassword) throw new Error("New Password Cannot Be Old Password");
  
        // Salt and hash the password.
        bcrypt.genSalt(10, (error, salt) => {
          if (error) throw new Error("Salt Generation Failed");
  
          bcrypt.hash(newPassword, salt, async (error, hash) => {
            if (error) throw new Error("Hash Password Failure");
  
            // We can now save that new password.
            user.password = hash;
            await user.save();
          }); 
        });
      };
  
      let changedUserName = false;
      let oldUserName = user.username;
      if (user.username !== username) {
        changedUsername = true;
      }
  
      user.userName = userName;
      user.email = email;
      user.firstName = firstName;
      user.lastName = lastName;
  
      // Save the user and the changes.
      await user.save();
  
      res.json({ success: true, message: "User Edit Successful." });
    } catch (error) {
      console.error(error);
      if (error.message === "Forbidden") {
        res.status(403).json({
          success: false,
          message: "You Must Be logged In As That User To Do That",
        });
      } else if (error.name === 'MongoError') {
        const needToChange = error.keyPattern;
        res.status(409).json({
          success: false,
          message: "DataBase Error",
          needToChange
        });
      } else {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    }
  })



  const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret =
	process.env.JWT_SECRET || 'we here in plant world';

    const { Strategy, ExtractJwt } = require('passport-jwt');

    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret,
    };

    const User = require('../models/User');
    const strategy = new Strategy(opts, function (jwt_payload, done) {
        User.findById(jwt_payload.id)
            .then((user) => done(null, user))
            .catch((err) => done(err));
    });
    
    passport.use(strategy);
    passport.initialize();
    passport.session()
    
    const requireToken = passport.authenticate('jwt', { session: false });
    
    const createUserToken = (req, user) => {
        if (
            !user ||
            !req.body.password ||
            !bcrypt.compareSync(req.body.password, user.password)
        ) {
            const err = new Error('The provided username or password is incorrect');
            err.statusCode = 422;
            throw err;
        }
        return jwt.sign({ id: user._id }, secret, { expiresIn: 36000 });
    };
    
    module.exports = {
        requireToken,
        createUserToken,
    };
    