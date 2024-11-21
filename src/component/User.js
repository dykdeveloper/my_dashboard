import React from "react";
import { useSelector } from "react-redux";
import "../file/css/user.css";

export default function User() {
  const loggedInUser = useSelector((state) => state.auth.user);
  return (
    <>
      <div className="useractive">
        <h3>Active User</h3>
        <div className="active-user">
        <div className="header-active">
          <p>Username:</p>
          <p>Email:</p>
          <p>Status:</p>
        </div>
        <div className="detail-active">
          <p>{loggedInUser.username}</p>
          <p>{loggedInUser.email}</p>
          <p>Active</p>
        </div>
        </div>
      </div>
    </>
  );
}
