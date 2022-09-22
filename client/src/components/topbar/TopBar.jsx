import './topbar.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';  //importing the useContext hook
import { Context } from '../../context/Context'; //importing "Context" from the context folder

/* you have to copy/paste font awesome cjn in the index.html before using font awesome icons in react (unlike with react-icons) */


export default function TopBar() {
  const {user, dispatch} = useContext(Context); //dispatching the "user" object from "Context" in useContext so we can access the ptoperties of the "user" object here.
  const PF = "http://localhost:5000/images/"; //the url to the folder where uploaded images will be stored is stored in "const PF".

  const handleLogout = () =>{
    dispatch({ type: "LOGOUT"});  //the LOGOUT type in the Reducer Context sets the user and every other property to null, essentially logging him out.
  };
  return (
    <div className='top'>
        <div className="topIcon topLeft">
        <a href="https://www.facebook.com/opensports" target="_blank" className="link"> <i className="sidebarIcon fa-brands fa-square-facebook"></i> </a>
            <a href="https://www.twitter.com/opensports" target="_blank" className="link"> <i className="sidebarIcon fa-brands fa-square-twitter"></i> </a>
            <a href="https://www.pinterest.com/opensports" target="_blank" className="link"> <i className="sidebarIcon fa-brands fa-square-pinterest"></i> </a>
            <a href="https://www.instagram.com/opensports" target="_blank" className="link"> <i className="sidebarIcon fa-brands fa-square-instagram"></i> </a>
        </div>
        <div className="topCenter">
            <ul className="topList">
              <li className="topListItem"><Link to="/" className='link'>HOME</Link></li>
              <li className="topListItem"><a href="#about" className='link'>ABOUT</a></li>
              <li className="topListItem"><Link to="/" className='link'>CONTACT</Link></li>
              <li className="topListItem"><Link to="/write" className='link'>WRITE</Link></li>
              <li className="topListItem" onClick={handleLogout}>
                {user && "LOGOUT"}
              </li>
            </ul>
        </div>
        <div className="topRight">
          {
            user ? (
              <Link to="settings">
              <img className='topImg' src={PF+user.profilePic} alt='' /> {/* "user.profilePic" means that the code will go to the public folder (PF) url (which in this project  is "localhost/5000:http...../images" (i declared it above)) and look for the image that matches the "user.profilePic" value of that user */}
              </Link>
            ) : (
              <ul className='topList'>
                <li className="topListItem"><Link to="/login" className='link'>LOGIN</Link></li>
                <li className="topListItem"><Link to="/register" className='link'>REGISTER</Link></li>
              </ul>
            )
          }
            
            <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
        </div>
    </div>
  )
}
