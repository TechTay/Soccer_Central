import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const JoinedPage = () => {
  const [user, token] = useAuth();
  const [locationPk, setLocationPk] = useState([]);

  
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
                <p></p>
                <p>{location.title}</p>
            </Link>
          );
        })}
    </div>
  );
};

export default JoinedPage;
