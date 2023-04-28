import React, { useState } from "react";
import "./CreatePostForm.css";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useCustomForm from "../../hooks/useCustomForm";

const CreatePostForm = ({ fetchPost }) => {
  const [text, setText] = useState([""]);
  const [user, token] = useAuth();

  let initialValues = {
    text: text,
    user_id: user.id,
    likes: 0,
    dislikes: 0
  };

  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    initialValues,
    postNewComment
  );

  function refreshPage() {
    window.location.reload(true);
  }

  async function postNewComment(formdata) {
    try {
      let response = await axios
        .post("http://127.0.0.1:8000/api/Comments/", formdata, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        fetchPost()
        reset()
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <div className="form" >
      <form
        style={{ marginBlock: 20, marginTop: 10}}
        className="form"
        onSubmit={handleSubmit}
      >
        <br></br>
        <label className="form">
          Share your thoughts with the Soccer Community!{" "}
          <input
            placeholder="What's on your mind?"
            style={{ marginRight: 20, padding: 15, }}
            className="form"
            type="text"
            name="text"
            value={formData.text}
            onChange={handleInputChange}
          />
        </label>
        <button
          onClick={refreshPage}
          style={{ marginLeft: 5, marginBottom: 10 }}
          class="btn btn-primary btn-sm"
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
};
export default CreatePostForm;
