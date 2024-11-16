import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <div className="sidebar-heading">
        <h3 className="ps-4 pt-2 mb-5">Dashboard</h3>
      </div>
      <div className="sidebar-menu">
        <ul className="sidebar-nav">
          <li className={`sidebar-item ${isActive("/") ? "active" : ""}`}>
            <Link
              to="/"
              className={`sidebar-link ${isActive("/") ? "active2" : ""}`}
            >
              <i className="align-middle" data-feather="sliders"></i>
              <span>Task</span>
            </Link>
          </li>
          <li
            className={`sidebar-item ${isActive("/expiretask") ? "active" : ""}`}
          >
            <Link
              to="/expiretask"
              className={`sidebar-link ${
                isActive("/expiretask") ? "active2" : ""
              }`}
            >
              <i className="align-middle" data-feather="sliders"></i>
              <span>Expire Task</span>
            </Link>
          </li>
          <li
            className={`sidebar-item ${isActive("/history") ? "active" : ""}`}
          >
            <Link
              to="/history"
              className={`sidebar-link ${
                isActive("/history") ? "active2" : ""
              }`}
            >
              <i className="align-middle" data-feather="sliders"></i>
              <span>History</span>
            </Link>
          </li>
          <li className={`sidebar-item ${isActive("/user") ? "active" : ""}`}>
            <Link
              to="/user"
              className={`sidebar-link ${isActive("/user") ? "active2" : ""}`}
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
