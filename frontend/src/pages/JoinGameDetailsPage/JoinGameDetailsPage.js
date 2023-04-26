import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useParams } from "react-router-dom";

const JoinGameDetailsPage = () => {
  const [user, token] = useAuth();
  const { JoinGame } = useParams();
  const [ location, setLocation ] = useState([]);
  console.log(location)
  
  useEffect(() => {
    const fetchGame = async () => {
      try {
        let response = await axios.get(
          `http://127.0.0.1:8000/api/Locations/${JoinGame}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setLocation(response.data)
        
      } catch (error) {
        console.log(error);
      }
    };

    fetchGame();
  }, [JoinGame]);
  return (
    
    <form>
    <div class="alert alert-success">
      <strong>Success!</strong> You have successfully joined session {JoinGame}!
      {location.users.map((users) => {
        return (
          <div key={users.id}>
            <p>{users.user}</p>
            </div>
        )
      })}
      
      {console.log(location.user)};
      
        <ul>{location.user}</ul>
        <ul>{user.username}</ul>
        <ul>{location.title}</ul>
        <ul>{location.address}</ul>
        <ul>{location.date}</ul>
        <ul>{location.time}</ul>
        {/* for loop(user in location.users) */}
    </div>
    </form>
    
  );
};

export default JoinGameDetailsPage;
