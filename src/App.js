import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

//-> component imports
import Main from "./components/Main";
import { login, logout, selectUser } from "./features/userSlice";
import { BrowserRouter } from "react-router-dom";
import Authentication from "./components/authentication/Authentication";
import { auth } from "./components/firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //-> user is logged in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
          })
        );
      } else {
        //-> user is logged out
        dispatch(logout());
      }
    });
  }, []);
  return (
    <BrowserRouter>
      <div className="app">
        {!user ? <Authentication /> : <Main />}
        <Toaster position="top-center" reverseOrder={true} />
      </div>
    </BrowserRouter>
  );
}

export default App;
