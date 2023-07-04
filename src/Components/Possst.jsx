import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Possst.css"
const PostsComponent = () => {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:9000/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const addPost = async () => {
    try {
      const response = await axios.post("http://localhost:9000/posts", {
        title: newPostTitle,
        content: newPostContent,
        comments: [],
      });
      setPosts([...posts, response.data]);
      setNewPostTitle("");
      setNewPostContent("");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:9000/posts/${postId}`);
      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const addComment = async (postId, newComment) => {
    try {
      const response = await axios.post(
        `http://localhost:9000/posts/${postId}/comments`,
        {
          text: newComment,
        }
      );
      const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          return { ...post, comments: [...post.comments, response.data] };
        }
        return post;
      });
      setPosts(updatedPosts);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const deleteComment = async (postId, commentId) => {
    try {
      await axios.delete(
        `http://localhost:9000/posts/${postId}/comments/${commentId}`
      );
      const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          const updatedComments = post.comments.filter(
            (comment) => comment.id !== commentId
          );
          return { ...post, comments: updatedComments };
        }
        return post;
      });
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div>
      <h1>Add a Post</h1>
      <input
        type="text"
        value={newPostTitle}
        onChange={(e) => setNewPostTitle(e.target.value)}
        placeholder="Enter post title"
      />
      <textarea
        value={newPostContent}
        onChange={(e) => setNewPostContent(e.target.value)}
        placeholder="Enter post content"
      />
      <button onClick={addPost}>Add Post</button>

      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <button onClick={() => deletePost(post.id)}>Delete Post</button>

          <h3>Comments</h3>
          {post.comments.map((comment) => (
            <div key={comment.id}>
              <p>{comment.text}</p>
              <button onClick={() => deleteComment(post.id, comment.id)}>
                Delete Comment
              </button>
            </div>
          ))}

          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Enter comment"
          />
          <button onClick={() => addComment(post.id, newComment)}>
            Add Comment
          </button>
        </div>
      ))}
    </div>
  );
};

export default PostsComponent;
