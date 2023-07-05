import { useState, useEffect } from "react";
import axios from "axios";
import Comment from "./Comment";
import "./"
function Comments({id} ){
const [comment , setComment] =useState("");
const [comments , setComments] =useState([]);

const fetchPosts = async () => {
    const response = await axios.get(`http://localhost:9000/Posts/${id}`);
    setComments(response.data.comment);

  };

  useEffect(() => {
    // Fetch the replays when the component mounts
    fetchPosts();
  }, []);
  const currentDate = new Date().toLocaleString();

const handleAddComment = async (e)=> { 
e.preventDefault();
await axios.patch(`http://localhost:9000/Posts/${id}`, {
  comment: [...comments, { comment:comment, date: currentDate, id: currentDate }],
});
 setComments([
   ...comments,
   { comment: comment, date: currentDate, id: currentDate },
 ]);
 setComment("")

}

    return(<>
    {comments.map((comment)=>{
        return (
          <Comment
            id={id}
            comment={comment}
            comments={comments}
            setComments={setComments}
          />
        );
    })}
    <form onSubmit={handleAddComment}>
        <input type="text" value={comment} onChange={(e)=>setComment(e.target.value)}/>
        <button >comment</button>
    </form>
    </>)
}
export default Comments ;