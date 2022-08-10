//import React from "react";
import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { onAuthStateChanged } from "firebase/auth";

//console.log(authService.currentUser); #null
function App() {
  const [init, setInit] = useState(false);
  // eslint-disable-next-line
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
        console.log(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "initializing...."}
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
