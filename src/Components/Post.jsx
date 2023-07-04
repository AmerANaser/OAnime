import React, { useState ,useEffect } from "react";
import axios from "axios";
import "./Post.css";

const NewPost = () => {
const [posts, setPosts] = useState([]);
const [users, setUsers] = useState({});
const [newPost, setNewPost] = useState("");

useEffect(() => {
  fetchPosts();
  fetchUsers();
}, []);

const fetchPosts = async () => {
  try {
    const response = await axios.get("http://localhost:3000/posts");
    setPosts(response.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

const fetchUsers = async () => {
  try {
    const response = await axios.get("http://localhost:9000/users");
    const usersData = response.data.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {});
    setUsers(usersData);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const handlePostChange = (event) => {
  setNewPost(event.target.value);
};

const handlePostSubmit = async (event) => {
  event.preventDefault();

  const newPostObject = {
    content: newPost,
    timestamp: new Date().toISOString(),
    userId: 1, // Assuming user with ID 1 is the author
  };

  try {
    const response = await axios.post(
      "http://localhost:9000/posts",
      newPostObject
    );
    setPosts([...posts, response.data]);
    setNewPost("");
  } catch (error) {
    console.error("Error creating post:", error);
  }
};

const getUserName = (userId) => {
  const user = users[userId];
  return user ? user.name : "";
};

const getUserAvatar = (userId) => {
  const user = users[userId];
  return user ? user.avatar : "";
};

return (
  <div className="container">
    <h1 className="title">Social Media Post</h1>
    <form onSubmit={handlePostSubmit}>
      <textarea
        className="post-input"
        placeholder="Write your post..."
        value={newPost}
        onChange={handlePostChange}
      />
      <button type="submit" className="post-button">
        Post
      </button>
    </form>
    <div className="post-list">
      {posts.map((post) => (
        <div key={post.id} className="post-item">
          <img
            src={getUserAvatar(post.userId)}
            alt="Avatar"
            className="post-avatar"
          />
          <div>
            <p className="post-author">{getUserName(post.userId)}</p>
            <p className="post-content">{post.content}</p>
            <p className="post-timestamp">{post.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  </div>

  // // const [title, setTitle] = useState("");
  // const [text, setText] = useState("");
  // // const [image, setImage] = useState(null);
  // // const [video, setVideo] = useState(null);
  // // const [comments, setComments] = useState([]);
  // // const [newComment, setNewComment] = useState("");

  // // const handleTitleChange = (event) => {
  // //   setTitle(event.target.value);
  // // };

  // const handleTextChange = (event) => {
  //   setText(event.target.value);
  // };

  // // const handleImageChange = (event) => {
  // //   setImage(event.target.files[0]);
  // // };

  // // const handleVideoChange = (event) => {
  // //   setVideo(event.target.files[0]);
  // // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = {
  //     // title,
  //     text,
  //     // image,
  //     // video,
  //   };

  //   axios.post("http://localhost:9000/posts", data).then((response) => {
  //     console.log(response);
  //   });
  // };

  // // const handleCommentSubmit = (event) => {
  // //   event.preventDefault();
  // //   const comment = {
  // //     text: newComment,
  // //     replies: [],
  // //   };

  // //   axios.post("http://localhost:9000/comments", comment).then((response) => {
  // //     console.log(response);
  // //     setComments([...comments, comment]);
  // //     setNewComment("");
  // //   });
  // // };

  // // const handleReplySubmit = (commentIndex, event) => {
  // //   event.preventDefault();
  // //   const reply = {
  // //     text: event.target.value,
  // //   };

  // //   const updatedComments = [...comments];
  // //   updatedComments[commentIndex].replies.push(reply);

  // //   setComments(updatedComments);
  // // };

  // return (
  //   <div className="container">
  //     <h2>Create New Post</h2>
  //     {/* <input
  //       type="text"
  //       placeholder="Title"
  //       value={title}
  //       onChange={handleTitleChange}
  //     /> */}
  //     <textarea placeholder="Text" value={text} onChange={handleTextChange} />
  //     {/* <input type="file" id="image" onChange={handleImageChange} />
  //     {image && <img src={URL.createObjectURL(image)} alt="Image" />}
  //     <input type="file" id="video" onChange={handleVideoChange} />
  //     {video && <video src={URL.createObjectURL(video)} controls />} */}
  //     <button onClick={handleSubmit}>Post</button>

  //   </div>
);
};

export default NewPost;



  //  <h3>Comments</h3>;
  //  {
  //    comments.map((comment, index) => (
  //      <div key={index}>
  //        <h4>{comment.text}</h4>
  //        <button onClick={(event) => handleReplySubmit(index, event)}>
  //          Reply
  //        </button>
  //        <ul>
  //          {comment.replies.map((reply, replyIndex) => (
  //            <li key={replyIndex}>{reply.text}</li>
  //          ))}
  //        </ul>
  //      </div>
  //    ));
  //  }
  //  <form onSubmit={handleCommentSubmit}>
  //    <input
  //      type="text"
  //      value={newComment}
  //      onChange={(event) => setNewComment(event.target.value)}
  //    />
  //    <button type="submit">Add Comment</button>
  //  </form>;