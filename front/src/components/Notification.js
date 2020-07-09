import React from "react";

const Notification = ({ type }) => {
  let noteType;
  let note;
  if (type === "error") {
    noteType = "notification-error";
    note = "wrong username or password";
  } else if (type === "success") {
    noteType = "notification-success";
    note = "login success";
  } else if (type === "empty") {
    noteType = "notification-error";
    note = "cannot have empty fields";
  } else if (type === "username-error") {
    noteType = "notification-error";
    note = "username taken";
  } else if (type === "user-created") {
    noteType = "notification-success";
    note = "user created";
  }
  return (
    <div className={noteType} id="notification">
      {note}
    </div>
  );
};
export default Notification;
