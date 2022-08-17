//import React from "react";
import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { onAuthStateChanged, updateCurrentUser } from "firebase/auth";

//console.log(authService.currentUser); #null
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null); //to check user
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user); //will be called when Logged in
        //console.log("로그인한 유저:", user);
        //console.log("Loginstatus:", isLoggedIn);
        //console.log("useridcheck:", user.uid);
      } else {
        setIsLoggedIn(false);
        //console.log("Loginstatus:", isLoggedIn);
      }
      setInit(true);
      //console.log("Loginstatus:", isLoggedIn);
      //console.log("setInitStatus", init);
    });
  }, []);

  const refreshUser = async () => {
    await updateCurrentUser(authService, authService.currentUser);
    setUserObj(authService.currentUser);
  };

  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          userObj={userObj}
          refreshUser={refreshUser}
        /> //setting parameters
      ) : (
        "initializing...."
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;

/*return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />;
      <footer>&copy; {new Date().getFullYear()} Nwitter by J</footer>
    </>
  );*/
