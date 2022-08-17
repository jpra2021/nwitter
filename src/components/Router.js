import React from "react";
//import { useState } from "react";
// check after next week
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation";

//react-router-dom?
//router example
//export default()=><Router>
//    <Switch>

//    </Switch>
//</Router>

//hooks?

//export default () => {
const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  //console.log("uid check in AppRouter:", userObj);
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <div
        style={{
          maxWidth: 890,
          width: "100%",
          margin: "0 auto",
          marginTop: 80,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home userObj={userObj} />}></Route>
              <Route
                path="/profile"
                element={
                  <Profile userObj={userObj} refreshUser={refreshUser} />
                }
              ></Route>
            </>
          ) : (
            <Route path="/" element={<Auth />}></Route>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
