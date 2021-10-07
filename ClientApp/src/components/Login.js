import axios from "axios";
import React from "react";
import { useState } from "react";
import Button from "reactstrap/lib/Button";
import FormInput from "./FormInput";
import { useHistory } from "react-router-dom";

const Login = () => {
  // State
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const history = useHistory();

  // Functions
  const formSubmitHandler = (e) => {
    e.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };
    axios
      .post("auth/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        history.push("home");
      })
      .catch((err) => alert(err.message));
  };

  // UI
  return (
    <div className="flex__container">
      <div className="login__container shadow">
        <div className="login__header">
          <h2>Login</h2>
        </div>
        <form className="login__form" onSubmit={formSubmitHandler}>
          <div className="login__field">
            <FormInput
              label="Username"
              onchange={setusername}
              value={username}
            />
          </div>
          <div className="login__field">
            <FormInput
              label="Password"
              onchange={setpassword}
              value={password}
            />
          </div>
          <div className="mt-2">
            <Button color="primary" type="submit">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
