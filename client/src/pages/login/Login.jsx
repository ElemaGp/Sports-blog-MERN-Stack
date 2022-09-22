import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom"
import { Context } from "../../context/Context";
import "./login.css"

export default function Login() {

  //since i used useref for the username and password, and passed them into the input tag, i dont have to do "onChange=..." in the tags. The value is passed automatically since useref stores the value of mutable objects.
  const userRef = useRef(); 
  const passwordRef = useRef();
  const {  dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e)=>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"});  //this does the LOGIN_START part of the Action file, updating the value of isFetching accordingly (the value of "user" and "error" will remain as it is because their values are the same in initial state and login_start)
    try{
      const res = await axios.post("/auth/login", {     //axios calling the "api/auth/login" in backend to authenticate and log in the user. if there's a response(res), it means the user has logged in successfully
        username: userRef.current.value,  //i used useref to get the username and password values here. But in the Register component, i used "onChange=(e)=>setEmail(e.target.value)" in the jsx. This shows that you can either use the event handler or useref to grab the value of an input field. Both methods work.
        password: passwordRef.current.value,
      });
      dispatch({type:"LOGIN_SUCCESS", payload: res.data}); //since login is successful, you can now access the payload part of the LOGIN_SUCCESS in the Action file. The payload is the response data. ("User" becomes true, Error becomes false according to LOGIN-SUCCESS in Action)
    }catch(err){
      dispatch({type:"LOGIN_FAILURE"}); //if there's an error, LOGIN_FAILURE in Action is triggered.
    };
  };

  return (
    <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" className="loginInput" placeholder="Enter your username..."  ref={userRef}/>
            <label>Password</label>
            <input type="password" className="loginInput" placeholder="Enter your password..." ref={passwordRef} />
            <button className="loginButton" type="submit" disabled={isFetching}>Login</button>    
        </form>
            <button className="loginRegisterButton">
              <Link to="/register" className="link">Register</Link>
            </button>
    </div>
  )
}
    
