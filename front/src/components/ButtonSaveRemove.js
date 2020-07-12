import React from "react";

// Button to save or remove item from user savedItems
const ButtonSaveRemove = ({
  activityId,
  user,
  saveBtnOnclick,
  removeBtnOnclick,
}) => {
  const btn = user.savedItems.includes(activityId) ? (
    <button
      onClick={() => {
        removeBtnOnclick(user, activityId);
      }}
    >
      Remove
    </button>
  ) : (
    <button
      onClick={() => {
        saveBtnOnclick(user, activityId);
      }}
    >
      Save
    </button>
  );
  return user.savedItems ? btn : <></>;
};
export default ButtonSaveRemove;
