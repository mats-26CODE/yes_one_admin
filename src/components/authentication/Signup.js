import React, { useState } from "react";
import { NavLink } from "react-router-dom";

//-> component imports
import Button from "../common/Button";
import Input from "../common/Input";
import { auth } from "../firebase";
import { login } from "../../features/userSlice";
import {
  notifyDynamicError,
  notifyMissingName,
} from "../notifications/NotificationAlerts";
import "./css/Authentication.css";
import { useDispatch } from "react-redux";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const signup = (e) => {
    e.preventDefault();

    if (!name) {
      notifyMissingName();
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
              })
            );
          });
      })
      .catch((error) => notifyDynamicError({ message: error }));

    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div className={"signup__container"}>
      <div>
        <form>
          <Input
            type={"text"}
            placeholder={"full name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type={"email"}
            placeholder={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type={"password"}
            placeholder={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type={"submit"} text={"Sign up"} onClick={signup} />
        </form>

        <p>
          Already Registered ? <NavLink to="/">Login</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
