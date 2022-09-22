const router = require("express").Router(); //importing express
const Category = require("../models/Category"); //importing the User model (schema) 

router.post("/", async (req, res) =>{
    const newCat = new Category(req.body);
    try{
        const savedCat = await newCat.save(); //creating a new Category
        res.status(200).json(savedCat);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/", async (req, res) =>{
    try{
        const cats = await Category.find(); //finding all the categories, using the Category model
        res.status(200).json(cats); //displaying all categories (in json. Postmman has a feature i used to view the json objects). (The res.status will be shown in console, but we will display the categories in the frontend in another way using normal browser text format. The .json format here is just so we can see that the code is working (using postman JSON) now that we are just working on the backend. Postman has a feature that i used to view the json object.Later when i've built the front end, i wont need that part)
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;

