import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useParams } from "react-router-dom";



const JoinGameDetailsPage = () => {
  const [user, token] = useAuth();
  const { JoinGame } = useParams();
  const [ location, setLocation ] = useState([]);
  
  
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
      {location.user?.map((users) => {
        return (
          <div style={{ fontSize: "15px", padding: 10 }} key={users.id}>
            <h2>Players in Attendance:</h2>
            <p>{users.username}</p>
            <p>{user.username}</p>
            
            </div>
        )
      })}
        <h2>Location Information:</h2>
        <ul>Name: {location.title}</ul>
        <ul>Address: {location.address}</ul> 
        <ul>Date of Play: {location.date}</ul>
        <ul>Start Time: {location.time}</ul>
        <ul><img  
              src={`http://127.0.0.1:8000${location.image_url}`}
              alt="location's image"
            /></ul>
    </div>
    </form>
    
  );
};

export default JoinGameDetailsPage;
