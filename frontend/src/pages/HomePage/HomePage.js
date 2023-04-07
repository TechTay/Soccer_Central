import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import AddLocationPage from "../AddLocationPage/AddLocationPage";
import CreatePostForm from "../../components/CreatePostForm/CreatePostForm";
import PostList from "../../components/Postlist/Postlist";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [locations, setLocations] = useState([]);
  const [posts, setPosts] = useState([{}]);
  
  function addNewPost(newPost) {
    let tempPosts = [newPost, ...posts];
    setPosts(tempPosts);
  }

  useEffect(() => {
    const fetchlocations = async () => {
      try {
        let response = await axios.get(
          "http://127.0.0.1:8000/api/Locations/all/",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setLocations(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchlocations();
  }, [token]);

  return (
    <div className="form">
      <h1>{user.username}'s Dashboard</h1>
      <form>
        <div
          className="form"
          style={{
            fontSize: "12px",
            display: "block",
            width: 1000,
            padding: 50,
          }}
        >
          <Tabs defaultActiveKey="second">
            <Tab
              style={{ fontSize: "15px" }}
              eventKey="first"
              title="My Favorites"
            >
              <div className="form">Your favorite places to play!</div>
            </Tab>
            <Tab
              style={{ fontSize: "15px", padding: 10 }}
              eventKey="second"
              title="Available Games"
            >
              <div className="form">A list of all available pick-up games.</div>

              <p className="form" style={{ fontSize: "15px" }}>
                Click the bubble to add to your "Favorites" list
              </p>
              {locations &&
                locations.map((locations) => (
                  <p
                    className="form"
                    style={{ fontSize: "15px", padding: 10 }}
                    key={locations.id}
                  >
                    {locations.title}
                    {locations.address}
                    {locations.time}
                    {locations.date}
                  </p>
                ))}
            </Tab>
            <Tab
              style={{ fontSize: "15px" }}
              eventKey="third"
              title="My History"
            >
              <div className="form">A list of your recent activities.</div>
            </Tab>
            <Tab
              style={{ fontSize: "15px" }}
              eventKey="fourth"
              title="Soccer Social Feed"
            >
              <div className="form">
                A news feed of information and chatter by fellow soccer
                enthustist.
              </div>
              <CreatePostForm addNewPost={addNewPost} />
              <PostList posts={posts} />
            </Tab>
            <Tab
              style={{ fontSize: "15px" }}
              eventKey="fifth"
              title="Add New Location"
            >
              <div className="form">
                Know of a new place to play? Add it here for your fellow soccer
                enthustist!
              </div>
              <AddLocationPage />
            </Tab>
          </Tabs>
        </div>
      </form>
    </div>
  );
};

export default HomePage;
