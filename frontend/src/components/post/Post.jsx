import LikeDislikeButton from "./LikeDislikeButton"



const Post = (props) => {

    // The Date displays
    let currentDate = new Date();
    let cDay = currentDate.getDate();
    let cMonth = currentDate.getMonth() + 1;
    let cYear = currentDate.getFullYear();
    console.log("" + cDay + "/" + cMonth + "/" + cYear + "");

    return (<div>
        <div className="postN">{props.post.name}</div>
        <div className="postT">{props.post.text} <LikeDislikeButton/></div>
        
    </div>)
}

export default Post