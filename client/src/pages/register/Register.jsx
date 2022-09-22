import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom"
import "./register.css"

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false); //for displaying any error that is caught in your catch block to the browser.

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false); //setError is set to false again here so that in case the error has been resolved and the user clicks again, the error message clears and it tries again
    try{
      const res = await axios.post("/auth/register", { //on submit, axios accesses the /api/auth/register backend api to create a new user. (Remember you already put "localhost5000/api" in the package.json as the proxy backend route which will come before the url whenever axios wants to access any backend url)
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login"); //if the register data is "posted" to database successfully without an error, the user is then redirected to login page.
    }catch(err){
      setError(true); //if there's an error, the "Error" useState is set to true.
    }
  };
  
  return (
    <div className="register">
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" className="registerInput" placeholder="Enter your username..."  
            onChange={e=>setUsername(e.target.value)} />
            <label>Email</label>
            <input type="text" className="registerInput" placeholder="Enter your email..." 
            onChange={e=>setEmail(e.target.value)} />
            <label>Password</label>
            <input type="password" className="registerInput" placeholder="Enter your password..." 
            onChange={e=>setPassword(e.target.value)} />
            <button className="registerButton" type="submit">Register</button>
        </form>
            
            
            <button className="registerLoginButton" >
              <Link to="/login" className="link">Login</Link>
            </button>
            {error && <span style={{color: "red", marginTop: "10px"}}>Something went wrong</span>} 
    </div>
  )
}
    
