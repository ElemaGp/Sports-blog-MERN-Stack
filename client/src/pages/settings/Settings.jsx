import { useContext, useState } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import "./settings.css"
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {
    const [file, setFile] = useState(null); //creating the "file" useState for the image
    const [username, setUsername] = useState(""); //creating the "username" useState for the username
    const [email, setEmail] = useState(""); //creating the "email" useState for the email
    const [password, setPassword] = useState(""); //creating the "password" useState for the password
    const [success, setSuccess] = useState(false); //for displaying the sucess message on the browser after a user successfully updates his user info on the profile.
    
    const {user, dispatch} = useContext(Context); //importing the "user" and dispatch (Action & Reducer) from useContext.
    const PF = "http://localhost:5000/images/"; //this refers to the "images" folder we created here and set up in the backend index.js, for storing uploaded pictures. Here, it'll store the user's profile pic.

    const handleSubmit = async(e)=>{
        e.preventDefault();
        dispatch({type:"UPDATE_START"}); //here, the context type is "UPDATE_START" (from Reducer)
        const updatedUser = {
          userId: user._id, //the backend requires "req.body.userId" to match it against req.params.id (the id on the url route), to ensure that it is the logged in user's account that he's trying to update it's information. So we have to pass the userId in the axios post request we'll be sending to update so the backend will use it for the comaparison.
          username, email, password, //the new username, email or  password properties that will be sent to the backend.
        };
        if(file){     //this part helps for uploading images
          const data = new FormData();
          const filename = Date.now() + file.name; //the fact that the filename's name starts with "Date.now" means the user can't name different images with the same name.
          data.append("name", filename); //to upload the name for the file
          data.append("file", file); //to upload the image file
          updatedUser.profilePic = filename; //the "profilePic" property is in the "user" model in the backend. So this line means that for this updatedUser object, the "profilePic" property's value is filename. Just like we have the "user", "desc", "title" properties that are also in the backend model, we have now also sent the "profilePic" property and the value will be the filename..
          try{
            await axios.post("/upload", data); //"/api/upload" is what we named route for image upload in backend index.js. 
          
          }catch(err){}
        }
        try{
           const res = await axios.put("/users/" + user._id, updatedUser);   //axios will send the post request to "/api/posts/<the id>", and the updatedUser object will contain and provide the data of the new user eg name, email, profilePic. (Basically  like "model" in backend, but this one has the actual data for the model properties, supplied by the user).
           setSuccess(true); //after updating the user info, setSuccess is set to true, and now the div under the button tag will show "profile updated".
           dispatch({type:"UPDATE_SUCCESS", payload: res.data}); //here, after the update is successful, the context type is "UPDATE_SUCCESS" (from Reducer context). The "payload: res.data" means that the "payload" (which we set to be the value of the user(in Reducer)) becomes "res.data" which is the response object from the database. So the "user" then has the data properties we just updated it with.
          }catch(err){
            dispatch({type:"UPDATE_FAILURE"}); //here, the context type is "UPDATE_FAILURE" (from Reducer)
          }
        };

    return (
    <div className="settings">
        <div className="settingsWrapper">
            <div className="settingsTitle">
                <span className="settingsUpdateTitle">Update Your Account</span>
                <span className="settingsDeleteTitle">Delete Account</span>
            </div>
            <form className="settingsForm" onSubmit={handleSubmit}>
                <label>Profile Picture</label>
                <div className="settingsPP">
                    <img src={file ? URL.createObjectURL(file) : PF+user.profilePic} alt="" />
                    <label htmlFor="fileInput">
                    <i className="settingsPPIcon fa-solid fa-circle-user"></i>
                    </label>
                    <input type="file"  id="fileInput" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])} />
                </div>
                <label>Username</label>
                <input type="text" placeholder={user.username} onChange={e=>setUsername(e.target.value)} /> 
                <label>Email</label>
                <input type="email" placeholder={user.email} onChange={e=>setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" onChange={e=>setPassword(e.target.value)} />
                <button className="settingsSubmit" type="submit">Update</button>
                {success && <span style={{color: "green", textAlign: "center", marginTop: "20px"}}>Profile has been updated</span>} 
            </form>
        </div>
        <Sidebar />
    </div>
  )
}
