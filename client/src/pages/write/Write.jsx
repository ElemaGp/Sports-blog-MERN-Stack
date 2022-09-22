import "./write.css"
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";


export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const {user} = useContext(Context);
  const [cats, setCats] = useState([]);
  
  
  

  useEffect(() =>{
    const getCats = async ()=>
    {
      const res = await axios.get("/categories"); //get the objects in "/api/categories" array from backend.the "/api" was indicated by you in the package.json here after you installed axios. And thats the route you put the posts files in in the backend (.../api/categories).
      setCats(res.data);// setting/putting all the categories in the useState array
    }
    getCats();
  }, []);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories: cats
      
    };
    if(file){     //this part helps for uploading images
      const data = new FormData();
      const filename = Date.now() + file.name; //the fact that the filename's name starts with "Date.now" means the user can't name different images with the same name.
      data.append("name", filename); //to upload the name for the file
      data.append("file", file); //to upload the image file
      newPost.photo = filename; //the "photo" property is in the "post" model in the backend. So this line means that for this newPost object, the "photo" property's value is filename. Just like we have the "user", "desc", "title" properties that are also in the backend model.
      try{
        await axios.post("/upload", data); //"/api/upload" is what we named route for upload in backend index.js
      }catch(err){}
    }
    try{
      const res = await axios.post("/posts/", newPost);   //axios will send the post request to "/api/posts/", and the newPost object will contain and provide the structure/data of the new post eg user, title, desc, photo. (Basically  like "model" in backend, but this one has actual data for the moodel properties, supplied by the user).
      window.location.replace("/post/" + res.data._id); //after the new post created and sent-stored in database, the user is redirected to the "Single" page which shows the postDetails. (In app.js, you indicated that if the route is to "/post/:postId", it should go to the "Single" page showing the postDetail).
    }catch(err){}
    };

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" /> //this means that if the user chooses a file, the code creates a url of the image and the user can see it on this "Write" page as he's creating his post. I then accepted the value below in the input tag that i use for accessing the file from my pc. I used onChange and set it to "setFile" so that it's displayed on the browser.
      )}
        <form className="writeForm" onSubmit={handleSubmit}>
            <div className="writeFormGroup">
                <label htmlFor="fileInput">
                  <i className= "writeIcon fa-solid fa-plus"></i>
                </label>
                <input type="file" id="fileInput" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])} />    
                <input type="text" placeholder="Title" className="writeInput" autoFocus={true}
                onChange={e=>setTitle(e.target.value)} />
            </div>
            <div className="writeFormGroup">
                <textarea placeholder="What's happening in sports?..." type="text" className="writeInput writeText"
                 onChange={e=>setDesc(e.target.value)}></textarea>

            
            </div>
            <button className="writeSubmit" type="submit">Publish</button>

            

        
                
        </form>
    </div>
  )
}

