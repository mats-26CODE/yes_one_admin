import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

const Authentication = () => {
  const routes = () => {
    return (
      <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/sign-up" component={Signup} />
      </div>
    );
  };

  return <BrowserRouter>{routes()}</BrowserRouter>;
};

export default Authentication;
