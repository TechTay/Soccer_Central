import React, { useState } from 'react';
import "./LikeDislike.css"

const LikeDislikeButton = () => {
    
    const [disLikeButton, setDisLikeButton] = useState("inactive");
    const [likeButton, setLikeButton] = useState("inactive");

    function handleLikeClick(){
        if(likeButton === "inactive"){
            setLikeButton("active");
            setDisLikeButton("inactive")
        }
        else {
            setLikeButton("inactive");
        }
    }
    function handleDisLikeClick(){
        if(disLikeButton === "inactive"){
            setDisLikeButton("active");
            setLikeButton("inactive");
            }
        else {
                setDisLikeButton("inactive");
            }
    }

    return ( <div>
        <button className={likeButton} onClick={handleLikeClick}>Like</button>
        <button className={disLikeButton} onClick={handleDisLikeClick}>Dislike</button>
        </div>
    )
}



export default LikeDislikeButton