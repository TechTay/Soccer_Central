import axios from "axios";
import React from "react";
import ProfileImage from "../../components/ProfileImage/ProfileImage";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let initialValues = {
  title: "",
  address: "",
  date: "",
  time: "",
};

const AddLocationPage = ({ fetchlocations }) => {
  const [user, token] = useAuth();

  const showToastMessage = () => {
    toast.success('You have successfully added a new Location !', {
        position: toast.POSITION.TOP_CENTER
    });
    setTimeout(function(){
      window.location.reload();
   }, 5700);
};

  
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    initialValues,
    postNewLocation
  );

  async function postNewLocation(formdata) {
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
          {/* <ProfileImage />
          */}
        </label>
        <button onClick={showToastMessage} type="submit">Add New Location</button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default AddLocationPage;
