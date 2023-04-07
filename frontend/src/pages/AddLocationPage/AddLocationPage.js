import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";

let initialValues = {
  title: "",
  address: "",
  date: "",
  time: ""
};

const AddLocationPage = () => {
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    initialValues,
    postNewLocation
  );

  async function postNewLocation() {
    try {
      let response = await axios.post(
        "http://127.0.0.1:8000/api/Locations/",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      navigate("/");
    } catch (error) {}
  }

  return (
    <div className="container">
            {/* <h2>{user.username}</h2> */}
            <form className="form" style={{ padding: 20}} onSubmit={handleSubmit}>
                <label>
                    Name: {" "}
                    <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    />
                </label>
                <label>
                    Address: {" "}
                    <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    />
                </label>
                <label>
                Date: {" "}
                    <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    />
                </label>
                <label>
                Time: {" "}
                    <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    />
                </label>
                <button>Add New Location</button>
            </form>
        </div>
  )
}

export default AddLocationPage;
