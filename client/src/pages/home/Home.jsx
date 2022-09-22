import "./home.css"
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios"; //importing axios
import { useLocation } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]); //for displaying or updating which array of posts to be displayed, or to display one of the posts if necessary
  const {search} = useLocation();


  useEffect(()=>{ //fetching posts from backend
    const fetchPosts = async () =>{
      const res = await axios.get("/posts"+search); //axios helps frontend interact with backend (yarn add axios). import it above and write your proxy in package.json. The "/posts" here represents the route it will access after the prior domain url you indicated in the package.json's proxy file you wrote. The "+search" means we can search can add query to the url so we can get posts made only by a particlar user or in a particular category.(Remember in the "posts" route in backend api, we have a route for getting all posts based on user or categories. We just impletemented the frontend here with that "search" )
      setPosts(res.data); //updating the value of the posts array to be all the posts data from backend
    };
    fetchPosts();
  },[search]);

  return (
    <>
    <Header />
    <div className="home">
        <Posts posts={posts} /> {/*passing the const post  as a prop into the "Posts" compoenent */}
        <Sidebar />
    </div>
    </>
  )
}
