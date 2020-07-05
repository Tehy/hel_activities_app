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
  useEffect(() => {
    setTimeout(() => {
      setShowNotification();
    }, 4000);
  }, [showNotification]);
  useEffect(() => {
    (async () => {
      setData(await getData());
      if (localStorage.getItem("loggedInUser")) {
        //console.log("LOADING COOKIE");
        const userObject = JSON.parse(localStorage.getItem("loggedInUser"));
        setUser(userObject);
      }
    })();
  }, []);
  const updateData = (x) => {
    setData(x);
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
    return showNewUserForm
      ? (setShowLoginForm(true), setShowNewUserForm(false))
      : setShowLoginForm(true);
  };
  const showNewUserFormToggle = () => {
    return showLoginForm
      ? (setShowLoginForm(false), setShowNewUserForm(true))
      : setShowNewUserForm(true);
  };
  const userSet = (userObject) => {
    // TODO refactor odd function
    setUser(userObject);
    updateCookie(userObject);
    setShowNewUserForm(false);
    setShowLoginForm(false);
  };
  const userUnSet = () => {
    setUser();
    localStorage.removeItem("loggedInUser");
  };
  const setNotification = (type) => {
    setShowNotification(type);
  };
  const notification = (type) => {
    return <Notification type={type} />;
  };
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
        <button onClick={showNewUserFormToggle}>Create User</button>
        {showLoginForm && (
          <LoginForm
            setNotification={setNotification}
            userSet={userSet}
            setShowLoginForm={setShowLoginForm}
          />
        )}
        {showNewUserForm && (
          <NewUserForm
            setNotification={setNotification}
            setShowNewUserForm={setShowNewUserForm}
          />
        )}
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
        <h2>Loading...</h2>
      )}
    </>
  );
}

export default App;
