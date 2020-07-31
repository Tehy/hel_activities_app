import React, { useState } from "react";
import login from "../services/login";

const LoginForm = ({ userSet, setShowLoginForm, setNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      const response = await login({ username, password });
      if (response.status === 200) {
        userSet(response.data);
        //setPassword("");
        //setUsername("");
        setNotification("success");
      } else {
        setNotification("error");
      }
    }
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        name
        <input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <br />
        password
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <button
        onClick={() => {
          setShowLoginForm(false);
        }}
      >
        Cancel
      </button>
    </>
  );
};
export default LoginForm;
