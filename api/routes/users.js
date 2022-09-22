const router = require("express").Router(); //importing express
const User = require("../models/User"); //importing the User model (schema) since you'll be using it to create a new user for signup, or authenticate a user for login here
const Post = require("../models/Post"); //importing the Post model (schema) since you'll be using it to delete a user's posts after the user's account is deleted
const bcrypt = require("bcrypt"); //for hashing password

//UPDATE USER INFORMATION
router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id) {//this means that if the id property in that user's user database object matches the id parameter on the url...(essentially meaning that it is that user's account...)
        if(req.body.password){ //this means, if the axios request from frontend contains a password...
            const salt = await bcrypt.genSalt(10);  //creating salt 
            req.body.password = await bcrypt.hash(req.body.password, salt); //hashing the password and salting it. Now we've gotten the user's password, salted and hashed it.
        }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{ //function to update the info of the user that has the id
          $set: req.body,  //sets/updates the user information to be what was sent in the body of the request
        },{new:true});
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your account");
  }
});

//DELETE USER
router.delete("/:id", async (req, res) => {
    if(req.body.userId === req.params.id) {//this means that if the id property in the user's database object matches the id parameter on the url...(essentially meaning that it is that user's account...)
        try{
            const user = await User.findById(req.params.id);
        
        try {
            await Post.deleteMany({ username: user.username }); //this means that if the username matches the username of the user with the id stated above, it'll delete all his posts (the code below then proceeds to delete the user himself).
            await User.findByIdAndDelete(req.params.id) //deleting the user's account
            res.status(200).json("User has been deleted");
    } catch (err) {
        res.status(500).json(err);
    }
   }catch(err){
    res.status(404).json("User not found"); //If it couldn't find<user>ById
   }
  } else {
    res.status(401).json("You can delete only your account"); //if the user id in the database and the id in the url doesn't match
  }
});

//GET USER
router.get("/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id); //finding the user with that id
        const { password, ...others } = user._doc; // destructuring the User object into password and others
        res.status(200).json(others); //showing only the others, without the password (thereby hiding the password)
    }catch(err){
        res.status(500).json(err)
    }
});

module.exports = router;

