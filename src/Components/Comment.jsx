import { useState, useEffect } from "react";
import axios from "axios";
function Comment({ setComments, comments, comment, id }) {
  const [isEditing, setIsEditing] = useState(false);
  const [commentEditing, setCommentEditing] = useState("");

  const fetchPosts = async () => {
    const response = await axios.get(`http://localhost:9000/Posts/${id}`);
    setComments(response.data.comment);
  };

  useEffect(() => {
    // Fetch the replays when the component mounts
    fetchPosts();
  }, []);

  const handleEdit = async () => {
    setIsEditing(!isEditing);
    if (!commentEditing) return;
    const updatedComment = comments.map((ele) => {
      if (ele.id === comment.id) {
        return {
          ...comment,
          comment: commentEditing,
        };
      } else {
        return ele;
      }
    });
    setComments(updatedComment);
    await axios.patch(`http://localhost:9000/Posts/${id}`, {
      comment: updatedComment,
    });
  };

  const handleDelete = async (ids) => {
    const response = await axios.get(`http://localhost:9000/Posts/${id}`);
    const postData = response.data;
    const updatedComment = postData.comment.filter((item) => item.id !== ids);

    axios.put(`http://localhost:9000/Posts/${id}`, {
      ...postData,
      comment: updatedComment,
    });
    setComments(updatedComment);
  };

  let commentText;
  isEditing
    ? (commentText = (
        <input onChange={(e) => setCommentEditing(e.target.value)} />
      ))
    : (commentText = <span>{comment.comment}</span>);
  return (
    <>
      <div>
        <img
          src="https://cdn.discordapp.com/attachments/1112627096804655246/1121372700796014603/profile-user-round-red-icon-symbol-download-png-11639594337tco5j3n0ix-removebg-preview.png"
          alt="avater"
        />
        <div>name</div>
        <div>{commentText}</div>
        <div>{comment.date}</div>
      </div>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={() => handleDelete(comment.id)}>Delete</button>
    </>
  );
}
export default Comment;
