const router = require("express").Router(); //importing express
const User = require("../models/User"); //importing the User model (schema) since you'll be using it to create a new posts, update, read, delete.
const Post = require("../models/Post"); //importing the Post model (schema) since you'll be using it to delete a user's posts after the user's account is deleted


//CREATE POST
router.post("/", async (req, res) => {
    const newPost = new Post(req.body); //creating a new post using the POST model (schema)
    try{
        const savedPost = await newPost.save(); //saving post
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err)
    }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id); //finding the post that has the id in the route url("param") from the database, and saving it in "const post". The "Post" there is the model (schema).
        if (post.username === req.body.username) { //this means, if the username associated with the 'post' const (url route) matches the username associated with the user ...(it means it's the same username and he's the owner of the post) 
        try{
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                $set:req.body,
            }, {new:true}
            );
            res.status(200).json(updatedPost);
    }catch(err){
            res.status(500).json(err); //if there's an error updating the post
    }

        }else{
            res.status(401).json("You can update only your post"); //if the username associated with the post in database doesnt match the username associated with the user. 
        }

    }catch(err){
        res.status(500).json(err); //if the id of the post couldnt be found by the server
    }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id); //finding the post that has the id in the route url, and saving it in "const post". The "Post" there is the model (schema).
        if (post.username === req.body.username) { //this means, if the username associated with the 'post' matches with the username property we'll send along with the axios request from frontend, then that user is the owner and can delete the post. (Note that req.body simply means that the axios request from the frontend will come with the value for that. So in this case, req.body."username" means that we'll set a value for that username when sending the request from frontend with axios. (note: in the frontend, we later set the username: user.username. Meaning that this function makes sure that the post.username and user.username match, meaning that the logged in user is the author of the post and so can delete the post.) )
        try{
            await post.delete(); //deleting post
            res.status(200).json("Post has been deleted");
    }catch(err){
            res.status(500).json(err); //if there's an error deleting the post
    }

        }else{
            res.status(401).json("You can delete only your post"); //if the username associated with the post in database doesnt match the username associated with the user. 
        }

    }catch(err){
        res.status(500).json(err); //if the id of the post couldnt be found by the server
    }
});



//GET POST
router.get("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id); //finding the post with that id and saving it to 'const post' 
        res.status(200).json(post); //showing only the others, without the password (thereby hiding the password)
    }catch(err){
        res.status(500).json(err)
    }
});

//GET ALL POSTS (OR POSTS BY A USER OR BY CATEGORY)
router.get("/", async (req, res) => {
    const username = req.query.user; //"query" refers to what comes after the question mark in the url. The fact that i put it as "req.query.user" means that the user property will come from the axios request. user=Jane, will display all posts made by the person with the username Jane. Note that this filtering is possible because the Post model has a "username" and "categories" properties in the schema. 
    const catName = req.query.cat;
    try{
        let posts;
        if(username){ //if username exists in the query...
            posts = await Post.find({username}); // "posts" will be equal to the posts by that username
        } else if (catName) { //if a category exists in the query...
            posts = await Post.find({categories:{$in:[catName],},  //in the "Posts" model, we set categories to be an array. So this code basically says to look at the categories array and if the query contains a certain item in the array eg music, that item shout be set equal to the post variable.
        });
        } else {
            posts = await Post.find(); //if theres no username or categories, it displays all posts
        }
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err)
    }
});


module.exports = router;

            
