import React from "react";

export default function DisplaySingle({ data, backBtnOnclick }) {
  function createMarkup(htmlBody) {
    return { __html: htmlBody };
  }
  return (
    <div className="single-data">
      <button onClick={backBtnOnclick}>Go back</button>
      <br />
      {data.name.fi && (
        <>
          Tapahtuma: {data.name.fi} <br />
        </>
      )}
      {data.info_url && (
        <>
          Linkki:{" "}
          <a href={data.info_url} target="_blank">
            {data.info_url}
          </a>{" "}
          <br />
        </>
      )}
      {data.modified_at && (
        <>
          Muokattu: {data.modified_at} <br />
        </>
      )}
      {data.location && (
        <>
          Sijainti: {data.location.address.street_address},{" "}
          {data.location.address.locality} <br />
        </>
      )}
      {data.description.body && (
        <>
          Kuvaus:{" "}
          <div dangerouslySetInnerHTML={createMarkup(data.description.body)} />{" "}
        </>
      )}
      {data.where_when_duration && (
        <>
          Missä ja million: {data.where_when_duration.where_and_when}
          <br />
          Kesto: {data.where_when_duration.duration}
          <br />
        </>
      )}

      {data.description.images && (
        <>
          <p>Kuvia:</p>
          <div className="images">
            {data.description.images.map((i) => (
              <a className="image" href={i.url} target="_blank" key={i.url}>
                <img src={i.url} width="200" className="img" />
              </a>
            ))}{" "}
            <br />
          </div>
        </>
      )}
    </div>
  );
}
