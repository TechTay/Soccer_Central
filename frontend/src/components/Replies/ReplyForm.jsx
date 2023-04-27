import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import { useState } from "react";

const ReplyForm = ({commentId, getReplies}) => {
  const [user, token] = useAuth();
  const [text, setText] = useState([]) 

  async function postReply(e) {
    e.preventDefault()
    debugger
    try {
      let reply = {
        comment_id: commentId,
        text: text,
        user_id: user.id,
      };
      let response = await axios.post(
        `http://127.0.0.1:8000/api/Replies/`,
        reply,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
     getReplies() 
    } catch (error) {}
  }

  return (
    <div className="container">
      <h5>{user.username}</h5>
      <form className="form" onSubmit={(e) => postReply(e)}>
        <label style={{ padding: "1em" }}>
          Reply: {""}
          <input
            name="text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default ReplyForm