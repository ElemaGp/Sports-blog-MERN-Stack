import "./post.css";
import {Link} from "react-router-dom";


export default function Post({post}) { //accepting the "post" prop from Posts component
  const PF = "http://localhost:5000/images/";     
  return (
    <div className="post">
      {post.photo &&                                       //IF the user uploads a photo along with the post...
        <img className="postImg" src={PF + post.photo} alt="" />   //the "PF" is the url to the images folder here, which needs to come before the post itself. You declared the "const PF" above.
        }
        <div className="postInfo">
            <div className="postCats"> {
              post.categories.map(c=>( //mapping through the categories property array of each post object
                <span className="postCat">{c.name}</span>
              ))
            }
            </div>
            <Link to={`/post/${post._id}`} className="link">          {/*this links to the details of a specific post, like blogDetails */}
            <span className="postTitle">{post.title} </span>         {/*the post title*/}
            </Link>
            
            <hr />
            <span className="postDate">{new Date(post.createdAt).toDateString()}</span>         {/*the timestamp*/}
        </div>

        
        <p className="postDesc">
        <Link to={`/post/${post._id}`} className="link">
          {post.desc}
        </Link>
        </p>
    </div>
  )
}
            

        
                
                
