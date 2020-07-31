import React, { useState, useEffect } from "react";
import "./App.css";
import { getData } from "./services/api";
import NewUserForm from "./components/NewUserForm";
import LoginForm from "./components/LoginForm";
import DisplayData from "./components/DisplayData";
import UserInfo from "./components/UserInfo";
import Header from "./components/Header";
import Notification from "./components/Notification";

function App() {
  const [data, setData] = useState();
  const [user, setUser] = useState();
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showNotification, setShowNotification] = useState();

  // Notification trigger
  useEffect(() => {
    setTimeout(() => {
      setShowNotification();
    }, 4000);
  }, [showNotification]);

  // on load, fetch data, check cookie for user info
  // TODO if not user, dont load data
  useEffect(() => {
    (async () => {
      if (localStorage.getItem("loggedInUser")) {
        setData(await getData());
        const userObject = JSON.parse(localStorage.getItem("loggedInUser"));
        setUser(userObject);
      }
    })();
  }, []);

  // update data state to update DisplayData component
  const updateData = (data) => {
    setData(data);
  };
  const updateCookie = (userObject) => {
    localStorage.setItem("loggedInUser", JSON.stringify(userObject));
  };
  const spliceItemFromArray = (array, item) => {
    const index = array.indexOf(item);
    const newArray = array.splice(index, 1);
    //TODO check index>-1
    return newArray;
  };
  const removeUserItem = (user, itemId) => {
    //updates session data
    const updtUser = {
      savedItems: spliceItemFromArray(user.savedItems, itemId),
      ...user,
    };
    setUser(updtUser);
    updateCookie(updtUser);
  };
  const updateUserWithItem = (user, itemId) => {
    //updates session data
    const updtUser = { savedItems: user.savedItems.push(itemId), ...user };
    setUser(updtUser);
    updateCookie(updtUser);
  };
  const showLoginFormToggle = () => {
    /* REMOVED due to app service plan change
    return showNewUserForm
      ? (setShowLoginForm(true), setShowNewUserForm(false))
      : setShowLoginForm(true); */

    return setShowLoginForm(true);
  };
  /* REMOVED due to app service plan change
  const showNewUserFormToggle = () => {
    return showLoginForm
      ? (setShowLoginForm(false), setShowNewUserForm(true))
      : setShowNewUserForm(true);
  };
  */

  // set user, hide login/create user forms, fetch data
  const userSet = (userObject) => {
    // TODO refactor odd function
    setUser(userObject);
    updateCookie(userObject);
    setShowNewUserForm(false);
    setShowLoginForm(false);
    (async () => {
      setData(await getData());
    })();
  };

  // logout user, delete cookie data
  const userUnSet = () => {
    setUser();
    setData();
    localStorage.removeItem("loggedInUser");
  };
  // set notification type
  const setNotification = (type) => {
    setShowNotification(type);
  };
  const notification = (type) => {
    return <Notification type={type} />;
  };
  // show user related functionalities
  const userFunctions = () => {
    return user ? (
      <UserInfo
        username={user.username}
        savedItems={user.savedItems}
        logout={userUnSet}
        updateData={updateData}
      />
    ) : (
      <div className="user-forms">
        <button onClick={showLoginFormToggle}>Login</button>

        {/*
        REMOVED due to app service plan change
        <button onClick={showNewUserFormToggle}>Create User</button> */}
        {showLoginForm && (
          <LoginForm
            setNotification={setNotification}
            userSet={userSet}
            setShowLoginForm={setShowLoginForm}
          />
        )}
        {/* REMOVED due to app service plan change
        {showNewUserForm && (
          <NewUserForm
            setNotification={setNotification}
            setShowNewUserForm={setShowNewUserForm}
          />
        )} */}
      </div>
    );
  };

  return (
    <>
      <Header />
      {showNotification && notification(showNotification)}
      {!user ? (
        userFunctions()
      ) : data ? (
        <>
          {userFunctions()}
          <div className="App">
            <DisplayData
              user={user}
              updateState={updateData}
              state={data}
              updateUserWithItem={updateUserWithItem}
              removeUserItem={removeUserItem}
            />
          </div>
        </>
      ) : (
        <h2 className="loading">Loading...</h2>
      )}
    </>
  );
}

export default App;
