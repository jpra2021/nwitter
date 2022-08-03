//import React from "react";
import { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

//console.log(authService.currentUser); #null
function App() {
  // eslint-disable-next-line
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
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
