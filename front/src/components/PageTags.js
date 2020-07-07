import React from "react";

const PageTags = ({ tags, updateTag, tagOnClick }) => {
  return (
    <>
      <div className="tags">
        Page Tags:
        <br />
        {tags.map((t) => (
          <div
            key={t[0]}
            className="tags-tag"
            onClick={async () => {
              tagOnClick(t[0]);
              updateTag(t[1]);
            }}
          >
            {t[1]}
            {"        "}
          </div>
        ))}
      </div>
    </>
  );
};
export default PageTags;
