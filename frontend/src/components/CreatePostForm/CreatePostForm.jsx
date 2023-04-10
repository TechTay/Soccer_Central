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
    <div>
      <form
        style={{ marginBlock: 10 }}
        className="container"
        onSubmit={handleSubmit}
      >
        <br></br>
        <label>
          Message{" "}
          <input
            style={{ marginRight: 60, padding: 20 }}
            className="form"
            type="text"
            name="text"
            value={formData.text}
            onChange={handleInputChange}
          />
        </label>
        <button
          style={{ marginLeft: 20, marginTop: 5 }}
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
