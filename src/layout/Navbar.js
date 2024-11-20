import React from "react";
import usericon from "../file/images/user.png";
import messageicon from "../file/images/email.png";
import searchicon from "../file/images/magnifying-glass.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../slice/AuthSlice"
import { useNavigate } from "react-router-dom";
import { getInitials } from "../function/Function";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handlelogout = () =>{
    dispatch(logout())
    navigate("/")
  }

  return (
    <>
      <div className="navbarr">
        <div className="add-task">
          <Link to='/form' className="form" href="index.html">
          <p>+ ADD TASK</p>
          </Link>
        </div>
        <div className="search">
          <input type="text" placeholder="search here..." />
          <img src={searchicon} alt="search" className="searchicon" />
        </div>
        <div className="messagebox">
          <img src={messageicon} alt="message" className="message" />
          <div className="message-count">
            <p className="m-count">0</p>
          </div>

          <div className="message-box"></div>
        </div>
        <div className="user-loginbox">
          <img src={usericon} alt="user" className="user" />

          <div className="userbox">
            <div className="profile-dp">
              <h1>{getInitials(user.username)}</h1>
            </div>
            <div className="user-name">
                <p>{user.username}</p>
            </div>
            <div className="logout-btn">
                <button onClick={handlelogout}>logout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
