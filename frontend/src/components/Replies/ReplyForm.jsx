import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import { useState } from "react";

const ReplyForm = ({commentId, getReplies}) => {
  const [user, token] = useAuth();
  const [text, setText] = useState([]) 


  function refreshPage() {
    window.location.reload(true);
  }

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
    <div class="position-absolute top-80 start-50 translate-middle">
      
      <form className="form" onSubmit={(e) => postReply(e)}>
        <label style={{ marginTop: 40 }} className="form">
          Reply: {""}
          <input
            name="text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <input onClick={refreshPage} style={{ marginBottom: 30 }} className="form" class="btn btn-primary btn-sm" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default ReplyForm