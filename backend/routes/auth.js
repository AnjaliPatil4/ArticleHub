const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
JWT_SECRET = "Enjoying the day";
const fetchuser = require("../middleware/fetchuser");
//Route1 : Create a User using : POST "/api/auth/createuser". Doesn't require Auth

router.post(
  "/createuser",
  [
    body("email", "Enter correct name").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      // Check whether the user with this email exists already

      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "Sorry a user with this email already exists",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const token = jwt.sign({ user: { id: user._id } }, JWT_SECRET);
      console.log(token);
      //res.json({ msg: "User is added Successfully", user: user });
      success = true;
      res.json({ success, token: token });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success, error: "Internal Server Error" });
    }
    // .then((user) => res.json(user))
    //   .catch((err) => {
    //     console.log(err);
    //     res.json({
    //       error: "Please enter a unique email",
    //       message: err.message,
    //     });
    //   });
    // console.log(req.body);
    // const user = User(req.body);
    // await user.save();
    // res.send(req.body);
  }
);

//Route2: Authenticate a User using : POST "/api/auth/login". Doesn't require login
router.post(
  "/login",
  [
    body("email", "Enter correct name").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let success = false;
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ errors: "Sorry User does not exist" });
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare)
        return res
          .status(400)
          .json({ errors: "Login with correct credentials" });
      const data = {
        user: {
          id: user._id,
        },
      };
      const token = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success: success, token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route3 : Get LoggedIn User details using POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User found:", user);
    res.json(user);
  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
