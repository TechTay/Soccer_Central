import React from "react";
import Reply from "./Reply";

const ReplyList = (props) => {
    return (<ul>
        {props.replies.map( reply => <Reply reply={reply}/>)}
    </ul>)
}

export default ReplyList