const router = require("express").Router(); //importing express
const User = require("../models/User"); //importing the User model (schema) since you'll be using it to create a new user for signup, or authenticate a user for login here
const bcrypt = require('bcrypt'); //for hashing passwords. "yarn add bcrypt".

//REGISTER
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10); //creating the salt for hashing password
        const hashedPass = await bcrypt.hash(req.body.password, salt); //generating the hashed password
        const newUser = new User({  //creating a new user using the User schema
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        const user = await newUser.save(); //saving the new user to database
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({username: req.body.username}); //here you're telling it to find the user with that unique username that was inputed by the user
        !user && res.status(400).json("Wrong credentials!");

        const validated = await bcrypt.compare(req.body.password, user.password); //comparing the input password with the hashed password stored in database
        !validated && res.status(400).json("Wrong credentials!");

        const { password, ...others } = user._doc; //destructuring the user object so that we can seperate "password" from the "other" user properties such as email, username etc, and use it in the next line.
        res.status(200).json(others); //if the login credentials are all correct, it sends all the "other" user objects as JSON to console, except the hashed password (for security). So the password doesnt show even though it is there.
    } 
    catch(err) {
        // res.status(500).json(err); //if the error is causes by the server or no internet connection, this should fire. All errors should be in seperate catch blocks but it's not so i cant use this because it clashes with the error message above. May fix it later.
    }
});



module.exports = router;

