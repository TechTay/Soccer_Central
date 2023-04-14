import LikeDislikeButton from "./LikeDislikeButtons"
// import ReplyForm from "../Replies/ReplyForm/ReplyForm";
// import ReplyList from "../Replies/ReplyList/ReplyList";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useState, useEffect } from "react";


const Post = (props) => {
        

    return (<div>
        <div className="form">{props.post.user.username}</div>
        <div className="form">{props.post.text} </div>
        {/* <LikeDislikeButton/> */}
    </div>)
}

export default Post