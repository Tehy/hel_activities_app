import React from "react";

const Notification = ({ type }) => {
  let noteType;
  let note;
  //TODO login error, usercreate error->username taken,
  if (type === "error") {
    noteType = "notification-error";
    note = "wrong username or password";
  } else if (type === "success") {
    noteType = "notification-success";
    note = "log in success";
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
  return <div className={noteType}>{note}</div>;
};
export default Notification;
