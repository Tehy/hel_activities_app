import React, { useState } from "react";
import { getDataId, getDataRange, getDataTag } from "../services/api";
import DisplaySingle from "./DisplaySingle";
import ButtonSaveRemove from "./ButtonSaveRemove";
import { saveItem, deleteItem } from "../services/db";
import Tags from "./Tags";

const DisplayData = ({
  state,
  updateState,
  user,
  updateUserWithItem,
  removeUserItem,
}) => {
  const [prevRange, setPrevRange] = useState("limit=10&start=0");
  const [tag, setTag] = useState();

  //console.log("state", state);
  const allData = JSON.parse(state);
  const meta = allData.meta;
  const data = allData.data;
  const tags = Object.entries(allData.tags);

  const backBtnOnclick = async () => {
    updateState(await getDataRange(prevRange));
  };
  const tagOnClick = async (tag) => {
    updateState(await getDataTag(tag));
  };

  const updateTag = async (tag) => {
    setTag(tag);
  };

  const removeBtnOnclick = async (user, activityId) => {
    const response = await deleteItem(activityId, user.username);
    //console.log("FRONT RESPONSE", await response);
    removeUserItem(user, activityId);
  };
  const saveBtnOnclick = async (user, activityId) => {
    const response = await saveItem(activityId, user.username);
    //console.log("FRONT RESPONSE", response);
    updateUserWithItem(user, activityId);
  };

  return (
    <>
      {meta && (
        <div className="meta">
          {meta.count && (
            <div className="count">
              {meta.count}{" "}
              {tag && (
                <div
                  style={{ fontWeight: "bold", display: "inline" }}
                  className="tag"
                >
                  {tag}
                </div>
              )}{" "}
              activities found
              <br />
              {meta.next
                ? "( " +
                  (parseInt(meta.next.split("=").pop()) - 10) +
                  " - " +
                  meta.next.split("=").pop() +
                  " )"
                : "( " +
                  (meta.count - (meta.count % 10)) +
                  " - " +
                  meta.count +
                  " )"}
            </div>
          )}
          {meta.previous && (
            <button
              onClick={async () => {
                // TODO refactor
                const range = meta.previous.split("?").pop();
                updateState(await getDataRange(range));
                setPrevRange("limit=10&start=" + range.split("=").pop());
              }}
            >
              previous
            </button>
          )}
          {meta.next && (
            <button
              onClick={async () => {
                // TODO refactor
                const range = meta.next.split("?").pop();
                updateState(await getDataRange(range));
                setPrevRange("limit=10&start=" + range.split("=").pop());
              }}
            >
              next
            </button>
          )}
        </div>
      )}
      {/* if data -> multiple -> data.map | else -> DisplaySingle */}
      {data ? (
        <>
          <div className="data">
            {data.map((x) => (
              <div className="data-item" key={x.id}>
                <span
                  onClick={async () => {
                    updateState(await getDataId(x.id));
                  }}
                >
                  {x.name.fi}
                </span>
                <br />

                {x.tags.map((t) => (
                  <div className="data-item-tags" key={t.id}>
                    {t.name}{" "}
                  </div>
                ))}
                {/* {x.id} */}

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
          <Tags tags={tags} updateTag={updateTag} tagOnClick={tagOnClick} />
        </>
      ) : (
        <DisplaySingle data={allData} backBtnOnclick={backBtnOnclick} />
      )}
    </>
  );
};
export default DisplayData;
