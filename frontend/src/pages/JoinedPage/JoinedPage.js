import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const JoinedPage = () => {
  const [user, token] = useAuth();
  const [locationPk, setLocationPk] = useState([]);

  const showToastMessage = () => {
    toast.success('You have successfully updated a new location Image!', {
        position: toast.POSITION.TOP_CENTER
    });
    setTimeout(function(){
        window.location.reload();
     }, 5700);
};

    const fetchJoinedGame = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/Locations/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setLocationPk(response.data);
        
      } catch (error) {
        console.log(error.response);
      }
    };

    useEffect(() => {
      fetchJoinedGame();
    }, []);

  return (
    <div>
      <h3 className="form" style={{ padding: 15}}>Choose the Session you would like to join!</h3>
      {locationPk && locationPk.map(location => {
          return (
            <Link className="form" to={`/details/${location.id}`} key={location.id}>
                <p>{location.title}  {location.time}  {location.date}</p>
                {showToastMessage}
            </Link>
            
          );
        })}
        <ToastContainer />
    </div>
  );
};

export default JoinedPage;
