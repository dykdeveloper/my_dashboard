import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState("task");

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-heading">
        <h3 className="ps-4 pt-2 mb-5">Dashboard</h3>
      </div>
      <div className="sidebar-menu">
        <ul className="sidebar-nav">
          <li
            className={`sidebar-item ${activeLink === "task" ? "active" : ""}`}
            onClick={() => handleLinkClick("task")}
          >
            <Link
              to="/"
              className={`sidebar-link ${
                activeLink === "task" ? "active2" : ""
              }`}
            >
              <i className="align-middle" data-feather="sliders"></i>
              <span>Task</span>
            </Link>
          </li>
          <li
            className={`sidebar-item ${
              activeLink === "expireTask" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("expireTask")}
          >
            <Link
              to="/expiretask"
              className={`sidebar-link ${
                activeLink === "expireTask" ? "active2" : ""
              }`}
            >
              <i className="align-middle" data-feather="sliders"></i>
              <span>Expire Task</span>
            </Link>
          </li>
          <li
            className={`sidebar-item ${
              activeLink === "completeTask" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("completeTask")}
          >
            <Link
              to="/history"
              className={`sidebar-link ${
                activeLink === "completeTask" ? "active2" : ""
              }`}
            >
              <i className="align-middle" data-feather="sliders"></i>
              <span>History</span>
            </Link>
          </li>
          <li
            className={`sidebar-item ${activeLink === "user" ? "active" : ""}`}
            onClick={() => handleLinkClick("user")}
          >
            <Link
              to="/user"
              className={`sidebar-link ${
                activeLink === "user" ? "active2" : ""
              }`}
            >
              <i className="align-middle" data-feather="sliders"></i>
              <span>User</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
