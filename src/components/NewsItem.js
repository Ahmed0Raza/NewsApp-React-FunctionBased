import React from "react";

const NewsItem =(props)=> {
    let { title, description, imgUrl, newsUrl, author, date, source } = props;
    return (
      <div className="card my-3" style={{ maxWidth: "320px", height: "100%", display: "flex", flexDirection: "column" }}>
        <div className="container" style={{ position: "relative" }} >
          <span className="badge rounded-pill bg-danger" style={{ position: "absolute", top: "10px", right: "10px" }}>
            {source}
            <span className="visually-hidden">unread messages</span>
          </span>
        </div>
        <img
          src={imgUrl}
          className="card-img-top"
          alt="..."
          style={{ width: "100%", height: "150px", objectFit: "cover" }}
        />
        <div className="card-body" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
          <div>
            <h5 className="card-title" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {title}
            </h5>
            <p className="card-text" style={{ maxHeight: "70px", overflow: "hidden", textOverflow: "ellipsis" }}>
              {description}
            </p>
          </div>
            <p style={{ fontSize: "0.8em", marginBottom: "0" }}>
              By {author} on {new Date(date).toGMTString()}
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-primary"
              style={{ alignSelf: "flex-start", padding: "8px 20px", fontSize: "0.9em" }}
            >
              Read More
            </a>
        </div>
      </div>
    );
}

export default NewsItem;
