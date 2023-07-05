import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Post.css";
import Comments from "./Comments";
import { json } from "react-router-dom";

const NewPost = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:9000/posts");
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
var users4 = JSON.parse(localStorage.getItem("user"));
var userI4d = users4.id;
console.log(userI4d);
    const newPostObject = {
      content: newPost,
      timestamp: new Date().toISOString(),
      userId: userI4d,
      comment: [],
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/posts/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = (id) => {
    const currentPost = posts.find((post) => post.id === id);
    setNewContent(currentPost.content);
    setIsEdit(true);
  };

  const handleUpdate = async (id) => {
    try {
      const updatedPost = {
        ...posts.find((post) => post.id === id),
        content: newContent,
      };
      await axios.put(`http://localhost:9000/posts/${id}`, updatedPost);
      setPosts(posts.map((post) => (post.id === id ? updatedPost : post)));
      setIsEdit(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
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
              {!isEdit ? (
                <>
                  <p className="post-content">{post.content}</p>
                  <button onClick={() => handleEdit(post.id)}>Edit</button>
                </>
              ) : (
                <>
                  <input
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                  />
                  <button onClick={() => handleUpdate(post.id)}>Update</button>
                </>
              )}
              <p className="post-timestamp">{post.timestamp}</p>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </div>
            <Comments id={post.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewPost;
