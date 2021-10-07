import axios from "axios";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();
  useEffect(() => {
    axios
      .get("auth/logout")
      .then((res) => {
        if (res.status === 200) {
          localStorage.clear();
          history.push("/");
        } else {
          alert("Logout failed!");
          history.push("/home");
        }
      })
      .catch((err) => {
        alert(err.message);
        history.push("/home");
      });
  }, []);

  return <div>Loging you out. Please wait....</div>;
};

export default Logout;
