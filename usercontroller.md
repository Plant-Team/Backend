// Signing in
// router.post("/signin", async (req, res, next) => {
//   const { username, password } = req.body;
//   try {
//     const findUser = await User.findOne({ username });
//     if (!findUser) throw new Error("Username not found");

//     const validPassword = await bcrypt.compare(password, findUser.password);
//     if (!validPassword) throw new error("Incorrect Password");

//     const payLoad = {
//       id: findUser._id,
//       email: findUser.email,
//       username: findUser.username,
//       type: "user",
//     };
//     jsonwt.sign(payLoad, JWT_SECRET, { expiresIn: 3600 }, (error, token) => {
//       if (error) throw new Error("Session has ended, please log in again");
//       res.json({ success: true, token: `Bearer ${token}`, data: legit });
//     });
//   } catch (error) {
//     return next(error);
//   }
// });

