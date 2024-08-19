const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var fetchuser = require("../middleware/fetchuser")

const JWT_SECRET = "AKSHILisagoodb$oy";

//create a user using : POST /api/auth does'nt require auth
router.post(
  "/createuser",
  [
    body("Name", "enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //set default success
    let success = false;
    //if there are errors, return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    //creating unique key for password using
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    console.log(req.body);

    //check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "login with authenticate credentials" });
      }
      //create a new user
      user = await User.create({
        Name: req.body.Name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          Name: user.Name,
          id: user.id,
        },
      };
      const authtoken = await jwt.sign(data, JWT_SECRET);
      // console.log(jwtdata);
      success = true;
      res.json({success, authtoken, Name: user.Name });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

//authenticate a user (login page)
router.post(
  "/login",
  [
    //conditions to be true while taking data
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {

    let success = false;
    //if there are errors, return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //destructuring data to be taken and authenticate by user
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json({
          success,
          error: "logun with correct credentials ",
        });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          error: "enter correct password ",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      // if login is success
      success = true;
      const authtoken = await jwt.sign(data, JWT_SECRET);
      // console.log(jwtdata);
      res.json({success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);






//get user data using credentials(email and password)

router.post('/getuser',fetchuser,async (req, res) => {
  try {
    let userId =await req.user.id;
    const user =await  User.findById(userId).select("-password");
    if(!user){
      return res.status(401).json({error: "user doesn't exist"})
    }

    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
