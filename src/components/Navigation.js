import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => (
  <nav>
    <ul>
      <Link to="/">Home</Link>
    </ul>
    <ul>
      <Link to="/profile">{userObj.displayName}'s Profile</Link>
    </ul>
    <ul>반영속도 비교용: 이름: {userObj.displayName}</ul>
  </nav>
);

export default Navigation;
