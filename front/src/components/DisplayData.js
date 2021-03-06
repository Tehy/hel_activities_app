import React, { useState } from "react";
import { getDataId, getDataRange, getDataTag, getData } from "../services/api";
import DisplaySingle from "./DisplaySingle";
import ButtonSaveRemove from "./ButtonSaveRemove";
import { saveItem, deleteItem } from "../services/db";
import PageTags from "./PageTags";

const DisplayData = ({
  state,
  updateState,
  user,
  updateUserWithItem,
  removeUserItem,
}) => {
  const [prevRange, setPrevRange] = useState("limit=10&start=0");
  const [searchedTag, setSearchedTag] = useState();
  const allData = JSON.parse(state);
  const meta = allData.meta;
  const data = allData.data;
  const tags = Object.entries(allData.tags);

  // update data with previous view
  const backBtnOnclick = async () => {
    updateState(await getDataRange(prevRange));
  };

  // update data with search by tag
  const tagOnClick = async (tag) => {
    updateState(await getDataTag(tag));
  };

  // set searched tag
  const updateTag = async (tag) => {
    setSearchedTag(tag);
  };

  // delete item from user savedItems
  const removeBtnOnclick = async (user, activityId) => {
    // db delete item
    await deleteItem(activityId, user.username);
    //TODO check response status -> removeUserItem(user, activityId);

    // session delete item
    removeUserItem(user, activityId);
  };
  const saveBtnOnclick = async (user, activityId) => {
    // db save item
    await saveItem(activityId, user.username);
    //TODO check response status -> updateUserWithItem(user, activityId);

    // session save item
    updateUserWithItem(user, activityId);
  };

  return (
    <>
      {/* if meta -> received data is list and show meta info */}
      {/* META INFO START */}
      {meta && (
        <div className="meta">
          {meta.count && (
            <div className="count">
              {meta.count} {/* if searchedTag -> show searched tag */}
              {searchedTag && (
                <div
                  style={{ fontWeight: "bold", display: "inline" }}
                  className="tag"
                >
                  {searchedTag}
                </div>
              )}{" "}
              activities found
              <br />
              <div style={{ fontSize: "small" }}>
                results{" "}
                {meta.next
                  ? parseInt(meta.next.split("=").pop()) -
                    10 +
                    " - " +
                    meta.next.split("=").pop()
                  : meta.count - (meta.count % 10) + " - " + meta.count}
              </div>
            </div>
          )}
          {meta.previous && (
            <img
              className="nav-buttons"
              alt="arrow left"
              src="arrow_left.png"
              onClick={async () => {
                // TODO refactor
                const range = meta.previous.split("?").pop();
                updateState(await getDataRange(range));
                setPrevRange("limit=10&start=" + range.split("=").pop());
              }}
            />
          )}
          {meta.next && (
            <img
              className="nav-buttons"
              alt="arrow right"
              src="arrow_right.png"
              onClick={async () => {
                // TODO refactor
                const range = meta.next.split("?").pop();
                updateState(await getDataRange(range));
                setPrevRange("limit=10&start=" + range.split("=").pop());
              }}
            />
          )}
          {/* show "Go back"-btn if no "next&&previous" data -> user has clicked to show "Your activities"*/}
          {!meta.next && !meta.previous ? (
            <button
              onClick={async () => {
                updateState(await getData());
              }}
            >
              Go back
            </button>
          ) : (
            <></>
          )}
        </div>
      )}
      {/* META INFO END */}
      {/* if data -> multiple -> data.map | else -> DisplaySingle */}
      {data ? (
        <>
          <div className="data">
            {data.map((x) => (
              <div className="data-item" key={x.id}>
                {/* Activity name */}
                <span
                  onClick={async () => {
                    /* update data with single data -> DisplaySingle */
                    updateState(await getDataId(x.id));
                  }}
                >
                  {x.name.fi}
                </span>
                <br />
                {/* Activity tags */}
                {x.tags.map((t) => (
                  <div className="data-item-tags" key={t.id}>
                    {t.name}{" "}
                  </div>
                ))}
                {/* If user show button */}
                {user && (
                  <ButtonSaveRemove
                    activityId={x.id}
                    user={user}
                    saveBtnOnclick={saveBtnOnclick}
                    removeBtnOnclick={removeBtnOnclick}
                  />
                )}
                <br />
              </div>
            ))}
          </div>
          {/* Page Tags */}

          <PageTags tags={tags} updateTag={updateTag} tagOnClick={tagOnClick} />
        </>
      ) : (
        <>
          {/* Display Single data page */}
          <DisplaySingle data={allData} backBtnOnclick={backBtnOnclick} />
        </>
      )}
    </>
  );
};
export default DisplayData;
