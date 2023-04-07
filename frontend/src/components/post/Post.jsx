import LikeDislikeButton from "./LikeDislikeButtons"



const Post = (props) => {

    // The Date displays
    // let currentDate = new Date();
    // let cDay = currentDate.getDate();
    // let cMonth = currentDate.getMonth() + 1;
    // let cYear = currentDate.getFullYear();
    // console.log("" + cDay + "/" + cMonth + "/" + cYear + "");

    return (<div>
        <div className="form">{props.post.user.username}</div>
        <div className="form">{props.post.text} </div>
        {/* <LikeDislikeButton/> */}
    </div>)
}

export default Post