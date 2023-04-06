import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import CreatePostForm from "./Components/CreatePostForm/CreatePostForm";
import PostList from "./Components/Postlist/Postlist";
import axios from "axios";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [cars, setCars] = useState([]);
  const [posts, setPosts] = useState([
    { },
  ]);
  function addNewPost(newPost){
    let tempPosts = [newPost, ...posts]
    setPosts(tempPosts)
    
  }

  useEffect(() => {
    const fetchCars = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/Locations/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setCars(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchCars();
  }, [token]);

  return (
    <div className="container">
      <h1>Home Page for {user.username}!</h1>
      {cars &&
        cars.map((car) => (
          <p key={car.id}>
            {car.year} {car.model} {car.make}
          </p>
        ))}
        <CreatePostForm addNewPost={addNewPost}/>
      <PostList posts={posts}/>
    </div>
  );
};

export default HomePage;
