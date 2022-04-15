import React, { useState } from "react";

//-> component imports
import Input from "../common/Input";
import Button from "../common/Button";
import "./css/Authentication.css";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import { notifyDynamicError } from "../notifications/NotificationAlerts";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const loginToApp = (e) => {
    e.preventDefault();
    if (email && password) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userAuth) => {
          dispatch(
            login({
              email: userAuth.user.email,
              uid: userAuth.user.uid,
              displayName: userAuth.user.displayName,
            })
          );
        })
        .catch((error) => {
          notifyDynamicError({ message: error });
        });
      setEmail("");
      setPassword("");
    } else {
      return notifyDynamicError({ message: "Please enter email & password" });
    }
  };
  return (
    <div className={"login__container"}>
      <div>
        <div>
          <h4>Admin Login</h4>
        </div>
        <div>
          <form>
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

            <Button type={"submit"} text={"Login"} onClick={loginToApp} />
          </form>

          <p>
            {/* Not Registered ? <NavLink to="/sign-up">Register</NavLink> */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
