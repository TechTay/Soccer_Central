// import LikeDislikeButton from "./LikeDislikeButtons";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useState, useEffect } from "react";
import ReplyForm from "../Replies/ReplyForm";
import ReplyList from "../ReplyList/ReplyList";


const Post = ({post}) => {
  const [user, token] = useAuth();
  const [replies, setReplies] = useState([{}]);

  const getReplies = async () => {
    // debugger
    let response = await axios.get(
      `http://127.0.0.1:8000/api/Replies/?id=${post.id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setReplies(response.data);
    console.log(response.data);
  };
  useEffect(() => getReplies(), [post]);
  console.log(post)
  return (
    <div>
      {post.user.username}
    <div className="text">{post?.text}</div>
    <ReplyForm commentId={post?.id} getReplies={getReplies}/>
    <ReplyList replies={replies} />
  </div>
  );
};

export default Post;
