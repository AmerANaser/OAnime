import React, { useState } from "react";
import axios from "axios";
import "./Post.css";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("text", text);
    data.append("image", image);
    data.append("video", video);

    axios.post("/posts", data).then((response) => {
      console.log(response);
    });
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const comment = {
      text: newComment,
      replies: [],
    };

    axios.post("/comments", comment).then((response) => {
      console.log(response);
      setComments([...comments, comment]);
      setNewComment("");
    });
  };

  const handleReplySubmit = (commentIndex, event) => {
    event.preventDefault();
    const reply = {
      text: event.target.value,
    };

    const updatedComments = [...comments];
    updatedComments[commentIndex].replies.push(reply);

    setComments(updatedComments);
  };

  return (
    <div className="container">
      <h2>Create New Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
      />
      <textarea placeholder="Text" value={text} onChange={handleTextChange} />
      <input type="file" id="image" onChange={handleImageChange} />
      {image && <img src={URL.createObjectURL(image)} alt="Image" />}
      <input type="file" id="video" onChange={handleVideoChange} />
      {video && <video src={URL.createObjectURL(video)} controls />}
      <button onClick={handleSubmit}>Post</button>
      <h3>Comments</h3>
      {comments.map((comment, index) => (
        <div key={index}>
          <h4>{comment.text}</h4>
          <button onClick={() => handleReplySubmit(index)}>Reply</button>
          <ul>
            {comment.replies.map((reply, replyIndex) => (
              <li key={replyIndex}>{reply.text}</li>
            ))}
          </ul>
        </div>
      ))}
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default NewPost;
