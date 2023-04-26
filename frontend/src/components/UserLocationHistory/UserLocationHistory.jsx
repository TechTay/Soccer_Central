import axios from "axios";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";

let initialValues = {
  location_id: "",
  date_of_play: "",
};

const UserLocationHistory = ({ fetchHistory }) => {
  const [user, token] = useAuth();

  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    initialValues,
    postLocationHistory
  );

  async function postLocationHistory(formdata) {
    try {
      let response = await axios
        .post("http://127.0.0.1:8000/api/Locations/historydetails/", formdata, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        fetchHistory()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <UserLocationHistory />
    </div>
  )

}


export default UserLocationHistory