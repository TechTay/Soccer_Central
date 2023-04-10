import React, { useState } from "react";
import "./CreatePostForm.css"
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const CreatePostForm = ({fetchPost}) => {
    const [text, setText] = useState([""]);
    const [user, token] = useAuth();
    
    

  
  
    const handleSubmit = async (e) => {
        e.preventDefault()

        let newPost = {
          user_id:user.id,
          text: text,
          likes: 0,
          dislikes: 0
      }
  
      let response = await axios.post(
        "http://127.0.0.1:8000/api/Comments/",
        newPost,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
      .then(()=> fetchPost())
        // .then(()=> reset())
      console.log(response.data)
    }
  
    
  
    return (
    <div>
      <form style={{ marginBlock: 10 }} className="container" onSubmit={handleSubmit}>
       
        <br></br>
        <label>
          Message
          <input style={{marginRight: 60, padding: 20}} className="form" type="text" value={text} onChange={(event) => setText(event.target.value)} />
        </label>
        <button style={{marginLeft: 20, marginTop: 5}} class="btn btn-primary btn-sm" value='submit' type="submit" >Post</button> 
        
      </form>
    </div>
  )};
  ;
  
  export default CreatePostForm;