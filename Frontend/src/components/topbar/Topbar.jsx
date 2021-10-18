import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link ,Redirect} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

export default function Topbar(props) {
  const history = useHistory();
 // const navigate = useNavigate();
  
  const sayHello= async ()=>{
    await localStorage.removeItem("user");
    window.location.href = '/login';
  }

  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">CareerChats</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        
        <div className="topbarIcons">
         {/*<div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
  <span className="topbarIconBadge">1</span> */}
        
          <div className="topbarIconItem">
          <Link to="/messenger" style={{ color: '#FFF' }} >
            <Chat />
            <span className="topbarIconBadge">2</span>
            </Link>
          </div>
          
          <div className="topbarLinks">
          
          <button className="topbarLink"  onClick={sayHello}>Logout</button>
        </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
