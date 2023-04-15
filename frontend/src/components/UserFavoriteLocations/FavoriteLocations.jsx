import axios from "axios";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";

let initialValues = {
  location_id: "",
  user_id: "",
};

const UserFavLocations = ({ fetchFavLocations }) => {
  const [user, token] = useAuth();

  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    initialValues,
    postFavLocation
  );

  async function postFavLocation(formdata) {
    try {
      let response = await axios
        .post("http://127.0.0.1:8000/api/Locations/locationdetails/", formdata, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(() => fetchFavLocations())
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <UserFavLocations />
    </div>
  )

}


export default UserFavLocations
