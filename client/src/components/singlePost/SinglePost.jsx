import "./singlePost.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const location = useLocation(); //"useLocation" is a react hook
  const path = location.pathname.split("/")[2]; //this gives us the id of any post. Check tutorial 3, 11:00 for more info
  const [post, setPost] = useState({}); //this is where we will store each post object that axios fetches in the useeffect function below. From here, we can access any of the post's properties we want to.
  const PF = "http://localhost:5000/images/";
  const {user} = useContext(Context);
  const [title, setTitle] = useState(""); //for updating (aka editing) the title of a post.
  const [desc, setDesc] = useState(""); //for updating (aka editing) the description of a post.
  const [updateMode, setUpdateMode] = useState(false); //for putting it on edit mode when the edit icon is clicked.


  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path); //since const path gives us the id, this line means to get the data of that post from backend. The url name will be in the form ".../api/posts/<theId>". You already indicated the "/api" part in the package .json file here after you installed axios. And thats the route you put the posts files in in the backend  (.../api/posts).
      setPost(res.data); //now we can have that particular post object that has that id, we set it in the const post we declared above. Now we can then use the post object's propertoes below and display whichever part we want.
      setTitle(res.data.title); //this sets the title property whenever axios fetches another postDetail, to be the "title" property of that post from database. You have to set this so that if you "update/edit" the post.title of a particular post using the "setTitle useState", when you go to another post (aka path with a different id), the post.title property is reset to be the title property (from database) of the new post you've gone to.
      setDesc(res.data.desc); //this sets the description property whenever axios fetches a new postDetail to be the "Desc" property of that post from database. You have to set this so that if you "update/edit" the post.desc of a particular post using the "setDesc useState", when you go to another post (aka path with a different id), the post.desc property is reset to be the desc property (from database) of the new post you've gone to.
    };
    getPost()
  },[path]); //this useEffect fires whenever the path (id) changes 

  const handleDelete= async()=>{
    try{
    await axios.delete(`/posts/${post._id}`, {data: {username: user.username},}); //deletes post. The reason we indicated "username: user.username" is because in the backend where axios will be fetching from, we coded that the post.username must be the same with the req.body.username(which basically just means the "username" property. req.body is just syntax that helps the server-side access data from frontend). Anyway, since we now have to give this "username" a value so that the backend will know how the value of req.body.username, we set it the "username" value to be = user.username. So in the "delete" backend function, it'll crosscheck that the "post.username" is = "user.username"
    window.location.replace("/"); //redirects the user to homepage after deleting post
  }catch (err){}
  };

  const handleUpdate = async ()=>{
    try{
    await axios.put(`/posts/${post._id}`, {username: user.username, title, desc,}); //updates(edits) post. The reason we indicated "username: user.username" is because in the backend where axios will be fetching from, we coded that the post.username must be the same with the req.body.username(which basically just means the "username" property. req.body is just syntax that helps the server-side access data from frontend). Anyway, since we now have to give this "username" a value so that the backend will know how the value of req.body.username, we set it the "username" value to be = user.username. So in the "update" backend function, it'll crosscheck that the "post.username" is = "user.username". The "title" and "desc"  there basically means "title:title", "desc:desc" but since both key and value are the same, we just write "title, desc". Both values will also be passed to the backend because in the backend update function, we need the "req.body" to make the updated post, so  we pass the username, title and description as the "body of the request"(req.body).
   setUpdateMode(false)  //updateMode becomes false after the post has been updated, thereby removing the update input field, textarea and "update" button, and just showing the updated postDetails.
  }catch (err){}
  };
  
  
  return (
    <div className="singlePost">
        <div className="singlePostWrapper">
          {post.photo && (        /*If a photo property exists for the post, it'll be displayed */
            <img src={PF + post.photo} alt="" className="singlePostImg" /> //the "PF" is the url to the images folder here, which needs to come before the post itself. You declared the "const PF" above.
            )}{
              updateMode ? <input type="text" value={title} className="singlePostTitleInput" autoFocus onChange={(e)=>setTitle(e.target.value)}/> : ( //if "updateMode" is set to true, then we have an input field with the value of post.title. Else we have the h1 tag that contains the post. The value of the input tag is "title", and onChange, whatever the user types becomes the new value.
            <h1 className="singlePostTitle">
              {title}    {/*post's title*/}
              {post.username === user?.username && ( //if post.username === user.username, it means that user is the author of the post so he'll see the edit and delete icons. Notice that i also put a question mark after the "user" in this line. This means that if there's no user, the edit and delete icons will not show.
              <div className="singlePostEdit">
              <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i>
              <i className="singlePostIcon fa-regular fa-trash-can" onClick={handleDelete}></i>
              </div>
              )}
            </h1>
              )}
            <div className="singlePostInfo">
              <span className="singlePostAuthor">Author: 
              <Link to={`/?user=${post.username}`} className="link"> {/*the username is the author. The author username here is now made to be a link to the user-query url which shows all blogs by that username*/}
                <b>{post.username}</b>
              </Link> 
              </span>   
              
              <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>    {/*date created */}
            </div>
            {updateMode ? ( <textarea className="singlePostDescInput" value={desc} onChange={(e)=>setDesc(e.target.value)}/> ) : (  //if "updateMode" is true, the user sees a textarea. Else he'll see the body of the post. The value of the teaxtarea is "desc", and onChange, whatever the user types becomes the new value.
            <p className="singlePostDesc">
              {desc} {/*the post's body */}
            </p>
            )} 
            {updateMode && (   //if "updateMode" is true, the user will see the Update button below.
            <button className="singlePostButton" onClick={handleUpdate}>Update</button>
            )}
        </div>
    </div>
  );
}

          
              
