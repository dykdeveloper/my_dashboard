import React from "react";
import usericon from "../file/images/user.png";
import messageicon from "../file/images/email.png";
import searchicon from "../file/images/magnifying-glass.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../function/Function";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";


export default function Navbar({ onSearch }) {
  const tasks = useSelector((state) => state.tasks);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [notifications, setNotifications] = useState([]);
  const userEmail = user?.email;

  const handlelogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    onSearch(query);
  };

  const showSearchBar = location.pathname.startsWith("/dashboard");

  const checkForUpcomingTasks = () => {
    const now = new Date();
    const userTasks = tasks[userEmail]?.tasks || [];
    const newNotifications = [...notifications]; 

    userTasks.forEach((task) => {
      const taskStart = new Date(task.startDate);
      const timeDiff = taskStart - now;

      if (timeDiff <= 3 * 60 * 1000 && timeDiff > 0) {
        const notificationMessage = `Task "${task.name}" is starting in 2 minutes.`;

        if (!newNotifications.some((notif) => notif === notificationMessage)) {
          newNotifications.push(notificationMessage);
        }
      }
    });

    setNotifications(newNotifications);
  };

  const handleRemoveNotification = (index) => {
    const updatedNotifications = notifications.filter(
      (_, notifIndex) => notifIndex !== index
    );
    setNotifications(updatedNotifications);
  };

  useEffect(() => {
    const intervalId = setInterval(checkForUpcomingTasks, 60000);

    return () => clearInterval(intervalId);
  }, [tasks, userEmail, notifications]);

  return (
    <div className="navbarr">
      <div className={`add-task ${showSearchBar ? "" : "not"}`}>
        <Link to="/form" className="form">
          <p>+ ADD TASK</p>
        </Link>
      </div>
      {showSearchBar && (
        <div className="search">
          <input
            type="text"
            placeholder="search here..."
            onChange={handleSearchChange}
          />
          <img src={searchicon} alt="search" className="searchicon" />
        </div>
      )}
      <div className="messagebox">
        <img src={messageicon} alt="message" className="message" />
        <div className="message-count">
          <p className="m-count">{notifications.length}</p>
        </div>

        {notifications.length > 0 && (
          <div className="message-box">
            {notifications.map((notification, index) => (
              <div key={index} className="notification-item">
                <p>{notification}</p>
                <button
                  className="remove-notification-btn"
                  onClick={() => handleRemoveNotification(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
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
  );
}
