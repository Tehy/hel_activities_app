import React, { useState } from "react";
import newUserCreate from "../services/user";

const NewUserForm = ({ setShowNewUserForm, setNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const createUser = async (e) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      const response = await newUserCreate({ username, password });

      if (response.status === 200) {
        setNotification("user-created");
        setUsername("");
        setPassword("");
      } else if (response.message) {
        if (response.message.includes("401")) setNotification("username-error");
      }
    } else {
      setNotification("empty");
    }
  };
  return (
    <div className="new-user-form">
      <form onSubmit={createUser}>
        name
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
          name="name"
        />
        <br />
        password
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          name="password"
        />
        <br />
        <button type="submit">Create user</button>
      </form>
      <button
        onClick={() => {
          setShowNewUserForm(false);
        }}
      >
        Cancel
      </button>
    </div>
  );
};
export default NewUserForm;
