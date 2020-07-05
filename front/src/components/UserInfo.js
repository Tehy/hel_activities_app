import React from "react";
import { getSavedItems } from "../services/api";

const UserInfo = ({
  logout,
  username,
  savedItems,

  updateData,
}) => {
  return (
    <div className="user-info">
      <p>
        User <span style={{ fontWeight: "bold" }}>{username} </span>
        logged in, has
        <span style={{ fontWeight: "bold" }}> {savedItems.length}</span> saved
        activities <button onClick={logout}>Log out</button>{" "}
        {savedItems.length > 0 ? (
          <button
            onClick={async () => {
              updateData(await getSavedItems(savedItems));
            }}
          >
            Your Activities
          </button>
        ) : (
          <></>
        )}
      </p>{" "}
    </div>
  );
};
export default UserInfo;
