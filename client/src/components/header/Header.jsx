import "./header.css"
import homepic from "../../assets/homepic.jpg";

export default function Header() {
  return (
    <div className='header'>
        <div className="headerTitles">
            <span className="headerTitleSm">Open Sports</span>
            <span className="headerTitleLg" style={{color: "blue"}}>Journal</span>
        </div>
        <img className="headerImg" src={homepic} alt="" />
    </div>
  )
}
