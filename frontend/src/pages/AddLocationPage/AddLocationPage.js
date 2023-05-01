import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../../components/ProfileImage/ProfileImage";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import { Alert } from "bootstrap";

let initialValues = {
  title: "",
  address: "",
  date: "",
  time: "",
  image_url: ""
};

const AddLocationPage = ({ fetchlocations }) => {
  const [user, token] = useAuth();

  const alert = () => {
    <div class="alert alert-success" role="alert">
      You have successfully added a new location!
    </div>
  }

  const refreshPage = () => {
    window.location.reload(true);

  }

  const clickHandler = event => {
    // refreshPage();
    alert();
  }

  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    initialValues,
    postNewLocation
  );

  async function postNewLocation(formdata) {
    debugger
    try {
      let response = await axios
        .post("http://127.0.0.1:8000/api/Locations/", formdata, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        console.log(response.data)
        .then(() => fetchlocations())
        .then(() => reset());
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      {/* <h2>{user.username}</h2> */}
      <form className="form" style={{ padding: 20 }} onSubmit={handleSubmit}>
        <label>
          Name of Location:{" "}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Address:{" "}
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </label>
        <label>
          What day is this available?:{" "}
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </label>
        <label>
          What time does it start?:{" "}
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
          />
        </label>
        <label>
          {/* Upload an Image of the area:{" "} */}
          <ProfileImage />
          {/* <input
            type="upload"
            name="image_url"
            value={formData.image_url}
            onChange={handleInputChange}
          /> */}
        </label>
        <button onClick={clickHandler} type="submit">Add New Location</button>
      </form>
    </div>
  );
};

export default AddLocationPage;
