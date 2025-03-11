import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CommentSection = () => {
  // Extracting video ID from URL parameters
  const { id: Video_id_Num } = useParams();

  // State for storing fetched comments
  const [commentDetails, set_comment] = useState([]);
  
  // State for managing new comment input
  const [newComment, setNewComment] = useState("");
  
  // State for managing edited comment input
  const [editContent, setEditContent] = useState("");
  
  // State to track which comment is being edited
  const [editId, setEditId] = useState(null);

  // Fetch comments when the component mounts
  useEffect(() => {
    fetch(`https://youtube-project-py16.onrender.com/getComments/${Video_id_Num}`)
      .then((response) => response.json())
      .then((data) => set_comment(data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  // Function to add a new comment
  const addComment = () => {
    if (!newComment.trim()) return;
    fetch("https://youtube-project-py16.onrender.com/addComment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Video_id_Num, content: newComment }),
    })
      .then((response) => response.json())
      .then(() => {
        fetch(`https://youtube-project-py16.onrender.com/getComments/${Video_id_Num}`)
          .then((response) => response.json())
          .then((data) => set_comment(data))
          .catch((error) => console.error("Error fetching updated comments:", error));
      });
    setNewComment("");
  };

  // Function to delete a comment
  const deleteComment = (id) => {
    fetch(`https://youtube-project-py16.onrender.com/deleteComment/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => set_comment(commentDetails.filter((comment) => comment._id !== id)))
      .catch((error) => console.error("Error deleting comment:", error));
  };

  // Function to edit a comment
  const editComment = (id, content) => {
    setEditId(id);
    setEditContent(content);
  };

  // Function to update a comment
  const updateComment = (id) => {
    if (!editContent.trim()) return;
    fetch(`https://youtube-project-py16.onrender.com/updateComment/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: editContent }),
    })
      .then((response) => response.json())
      .then(() => {
        fetch(`https://youtube-project-py16.onrender.com/getComments/${Video_id_Num}`)
          .then((response) => response.json())
          .then((data) => set_comment(data))
          .catch((error) => console.error("Error fetching updated comments:", error));
      });
    setEditId(null);
    setEditContent("");
  };

  return (
    <div>
      <h2>Comments</h2>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={addComment}>Post</button>
      <ul>
        {commentDetails.map((comment) => (
          <li key={comment._id}>
            {editId === comment._id ? (
              <>
                <input
                  type="text"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <button onClick={() => updateComment(comment._id)}>Update</button>
              </>
            ) : (
              <>
                <p>{comment.content}</p>
                <button onClick={() => editComment(comment._id, comment.content)}>Edit</button>
                <button onClick={() => deleteComment(comment._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;