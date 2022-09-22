const express = require("express"); //importing the installed express
const app = express(); //setting the express function in the app variable
const dotenv = require("dotenv"); //dotenv protects our databse's password and username. That's why we installed it and put our mongodb link there. Now we're importing it here
const mongoose = require("mongoose"); //importing the mongoose we installed, which helps us interact with the database.
const authRoute = require("./routes/auth");//importing the authentication route for sending POST requests and receiving response for signup and login
const userRoute = require("./routes/users");//importing the route for sending PUT and DELETE requests for the user information
const postRoute = require("./routes/posts");//importing the route for sending POST, PUT, DELETE, GET requests for the posts 
const categoryRoute = require("./routes/categories");//importing the route for sending POST, PUT, DELETE, GET requests for Categories (only the POST and GET request for creating and displaying all categories is available now though. I can add the other features later) 
const multer = require("multer"); // importing multer for storing uploaded images
const path = require("path"); //importing "path" for setting the path for storing images.
//yarn add express mongoose dotenv multer - installs the above packages.
//npm init installs node
//yarn add nodemon installs nodemon. In the node part of package.json, put "start": "nodemon index.js". Type yarn start in terminal and nodemon now watches your files consistently.
//IN YOUR OTHER PROJECTS, EVERYTHING IN THIS index.js FILE CAN BE COPIED. FOR THE OTHER FILES, YOU CAN COPY THE FILES YOU NEED AND THE FILES THAT ARE  "REQUIRED"(IMPORTED)/(NESTED) IN THEM. INSTALL THE NECESSARY PACKAGES (OR YOU CAN CLONE THE PROJECT FROM GITHUB AND DO "YARN INSTALL" OR "NPM INSTALL" TO INSTALL ALL THE DEPENDENCY PACKAGES IN THE PACKAGE.JSON). USE OLD CODE, YOUTUBE, GOOGLE, LONG NOTE AS RESOURCES.


dotenv.config(); //fires the dotenv for database protection
app.use(express.json()); //allows the code to be able to send requests in json form to database  (so it can get a response from the database).
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connect(process.env.MONGO_URL, { //connecting mongoose to the mongodb database url (through the env which is the file where we put the url so it is protected)
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("Connected to MongoDB"))
.catch((err) => console.log(err));



//setting up multer: basically, when a user uploads an image, multer will take the user's file and save it to the 'images' folder we created, using the filename we will provide below. (note that for bigger projects, you can use CDN services such as aws, firebase etc for storing the user's images. But multer can work too.)
const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, "images"); //it'll upload to the 'images' folder we created.
    },
    filename:(req, file, cb) => {
     cb(null, req.body.name); //filename will be "req.body.name" which means whatever name the user will give to his image.
    },
});
const upload = multer({storage:storage}); //"storage" here refers to the storage constant we declared above.
app.post("/api/upload", upload.single("file"), (req, res) => {  //this line basically says the user can upload a single file, and we named the file "file" (for backend).
  res.status(200).json("File has been uploaded");
})

app.use("/api/auth", authRoute); //"/api/auth" is what we have named the part of the url that must be between the domain name and the specific route url, that the signup/login POST requests will be made to after the user has put in his details and clicks the login/register button. So it will be to eg. /api/auth/register or /api/auth/login. You can use Postman app as frontend to test sending the requests (time 25:30 on the tutorial)
app.use("/api/users", userRoute); //"/api/users" is what we have named the part of the url that must be between the domain name and the specific route url, that the 'user'  PUT request (to update user info eg email and password), DELETE request (to delete user)  and GET request (to see user info) will be made to to edit the user information. 
app.use("/api/posts", postRoute); //"/api/posts" is what we have named the part of the url that must be between the domain name and the specific route url, that a post's POST request (to create new post), PUT request (to update user info), DELETE request (to delete user)  and GET request (to see user info) will be made to. 
app.use("/api/categories", categoryRoute); //"/api/categories" is what we have named the part of the url that must be between the domain name and the specific route url, that POST requests to create a category and GET request to diaplay all categories can be sent to.

app.listen("5000", ()=>{ //express is now listening on port 5000
    console.log("Backend is running");
})