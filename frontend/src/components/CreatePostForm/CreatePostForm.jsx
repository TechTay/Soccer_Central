import React, { useState } from "react";
import "./CreatePostForm.css"


const CreatePostForm = (props) => {
    const [name, setName] = useState([""]);
    const [text, setText] = useState([""]);
    
    
  
    const handleSubmit = (e) => {
        e.preventDefault()
        // Create a newPost object
        let newPost = {
          "name": name,
          "text": text,
          
        }
  
        // use the addNewPost function
        props.addNewPost(newPost)
    }
  
    
    
  
    return (
    <div>
      <form style={{ marginBlock: 10 }} className="container" onSubmit={handleSubmit}>
        <label>
          Title
          <input style={{ marginBlock: 10 }} type="text" value ={name} onChange={(event) => setName(event.target.value)}/>
        </label>
        <br></br>
        <label>
          Message
          <input style={{marginRight: 60, padding: 20}} className="form" type="text" value={text} onChange={(event) => setText(event.target.value)} />
        </label>
        <button style={{marginLeft: 20, marginTop: 5}} class="btn btn-primary btn-sm" type="submit" >Post</button> 
        
      </form>
    </div>
  )};
  ;
  
  export default CreatePostForm;