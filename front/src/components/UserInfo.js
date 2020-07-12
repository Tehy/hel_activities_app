import React from "react";
import { getSavedItems } from "../services/api";

const UserInfo = ({ logout, username, savedItems, updateData }) => {
  return (
    <div className="user-info">
      <p>
        User <span style={{ fontWeight: "bold" }}>{username} </span>
        logged in. You have
        <span style={{ fontWeight: "bold" }}> {savedItems.length} </span>
        activities <button onClick={logout}>Logout</button>{" "}
        {savedItems.length > 0 ? (
          <button
            onClick={async () => {
              updateData(); // effectively displays "Loading..."
              //TODO setLoading(true)

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
