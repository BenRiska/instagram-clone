import React, { useState, useEffect } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import db from "./firebase";
import firebase from "firebase";

function Post({ imageUrl, username, caption, postId, user }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snap) =>
        setComments(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      );

    return () => unsubscribe();
  }, []);

  const postComment = (e) => {
    e.preventDefault();
    if (comment) {
      db.collection("posts").doc(postId).collection("comments").add({
        username: user.displayName,
        text: comment,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={username}
          src="https://scontent-lht6-1.cdninstagram.com/v/t51.2885-19/s320x320/44369640_739650676412539_748425753867059200_n.jpg?_nc_ht=scontent-lht6-1.cdninstagram.com&_nc_ohc=Ryxomb1WTksAX86_uXk&oh=7b8c89a4d6f4202e678dc71ce36aaccf&oe=5F9F1652"
        />
        <h3>FeatureField</h3>
      </div>

      {/* Username - avatar*/}

      <img className="post__image" src={imageUrl} alt="feed post" />
      {/* image*/}
      <h4 className="post__text">
        <strong>{username}</strong> {caption}{" "}
      </h4>
      {/* username caption*/}
      <div className="post__comments">
        {comments.map((com) => (
          <p>
            <strong>{com.username}</strong> {com.text}
          </p>
        ))}
      </div>
      <form className="post__commentBox">
        <input
          className="post__input"
          value={comment}
          type="text"
          placeholder="Add a comment.."
          onChange={(e) => setComment(e.currentTarget.value)}
        />
        <button
          className="post__button"
          disabled={!comment}
          onClick={(e) => postComment(e)}
        >
          post
        </button>
      </form>
    </div>
  );
}

export default Post;
