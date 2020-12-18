import React from "react";
import postlist from "../post.json";
import Markdown from "react-markdown";

const Postpage = (props) => {
  const metaurlstring = props.match.params.postID;
  const postID = Number(metaurlstring.slice(1, metaurlstring.length));
  const pagepost = postlist.filter((post) => post.id === postID);
  if (pagepost.length !== 0) {
    return (
      <div>
        {pagepost.length &&
          pagepost.map((post, i) => (
            <div className="post_page" key={post.id}>
              <h2>{post.title}</h2>
              <small>-{post.date}</small>
              <hr />
              <div className="post_page-content">
                <Markdown children={post.content} allowDangerousHtml={true} />
              </div>
            </div>
          ))}
      </div>
    );
  } else {
    return (
      <div className="post_failed">
        <h1>ERROR: 404 page not Found</h1>
      </div>
    );
  }
};

export default Postpage;
