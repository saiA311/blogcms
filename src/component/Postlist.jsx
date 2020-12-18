import React from "react";
import postlist from "../post.json";
import Markdown from "react-markdown";
import { useHistory } from "react-router-dom";

const Postlist = () => {
  const excerptlist = postlist.map((post) => {
    return post.content.split(" ").slice(0, 50).join(" ");
  });
  const History = useHistory();
  return (
    <div className="postlist">
      <h1 className="title">All Posts</h1>
      {postlist.length &&
        postlist.map((post, i) => (
          <div className="post-card" key={post.id}>
            <h2>{post.title}</h2>
            <small>-{post.date}</small>
            <hr />
            <div className="post-card_content">
              <Markdown children={excerptlist[i]} allowDangerousHtml={true} />
              <span
                className="read-btn"
                onClick={() => History.push(`/post/:${post.id}`)}
              >
                Read More
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Postlist;
