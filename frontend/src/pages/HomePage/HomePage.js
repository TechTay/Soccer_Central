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
import ProfileImage from "../../components/ProfileImage/ProfileImage";
import JoinButton from "../../components/JoinAddFavButtons/JoinButton";
import LocationImages from "../../components/LocationImages/LocationImages";


const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [locations, setLocations] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userLocations, setUserLocations] = useState([""]);
  const [userLocationHistory, setUserLocationHistory] = useState([""]);
  const [userImage, setUserImage] = useState([]);
  const [locationImage, setLocationImage] = useState([{}]);
  // const [data, setData] = useState([]);
  // console.log(locationImage)


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   }

  //   const handleImageChange = (e) => {
  //     let newData = { ...data };
  //     newData = e.target.value;
  //     setData(newData);
  // };

  //   const refreshPage = () => {
  //     window.location.reload(true);
  //   }

  //   let form_data = new FormData();
  //   form_data.append("image_url", data)
  //   // refreshPage();

  // const patchlocationImage = async (locationPk) => {
  //   try {
  //     let response = await axios.patch(
  //       `http://127.0.0.1:8000/api/Locations/update/${locationPk.image_url}/`, form_data,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: "Bearer " + token
  //         },
  //       }
  //     );
  //     setLocationImage(response.data);
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };
  

  const fetchProfileImage = async () => {
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/images/all/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setUserImage(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchLocationHistory = async () => {
    try {
      let response = await axios.get(
        "http://127.0.0.1:8000/api/Locations/historydetails/",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setUserLocationHistory(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchUserLocations = async () => {
    try {
      let response = await axios.get(
        "http://127.0.0.1:8000/api/Locations/locationdetails/",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setUserLocations(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchlocations = async () => {
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/Locations/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setLocations(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchPost = async () => {
    try {
      let response = await axios.get(
        "http://127.0.0.1:8000/api/Comments/all/",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setPosts(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchlocations();
    fetchUserLocations();
    fetchLocationHistory();
    fetchProfileImage();
    // patchlocationImage();
  }, [token]);

  return (
    <div className="form">
      <ProfileImage />
      <div>
        {userImage.map((userImage) => (
          <p
            className="form"
            style={{ fontSize: "15px", padding: 10 }}
            key={userImage.id}
          >
            <img
              class="rounded float-start"
              src={`http://127.0.0.1:8000${userImage.image_url}`}
              alt="location's image"
            />
          </p>
        ))}
      </div>
      <h1>{user.username}'s Dashboard</h1>

      <div
        className="form"
        style={{
          fontSize: "12px",
          display: "block",
          width: 1000,
          padding: 50,
        }}
      >
        {/* First tab begins */}
        <Tabs defaultActiveKey="second">
          <Tab
            style={{ fontSize: "15px" }}
            eventKey="first"
            title="My Favorites"
          >
            <div className="form">Your favorite places to play!</div>
            <div>
              {userLocations.map((FavLocations) => (
                <p
                  className="form"
                  style={{ fontSize: "15px", padding: 10 }}
                  key={FavLocations.id}
                >
                  {FavLocations.title}
                  <img
                    class="rounded float-start"
                    src={`http://127.0.0.1:8000${FavLocations.image_url}`}
                    alt="location's image"
                  />
                  <ul>
                    {" "}
                    {FavLocations.address} {FavLocations.time}{" "}
                    {FavLocations.date}
                  </ul>
                </p>
              ))}
            </div>
          </Tab>

          {/* Second tab begins */}
          <Tab
            style={{ fontSize: "15px", padding: 10 }}
            eventKey="fourth"
            title="Available Games"
          >
            <div className="form" style={{ fontSize: "20px", padding: 5 }}>
              A list of all available pick-up games.
            </div>

            {locations &&
              locations.map((locations) => (
                <p
                  className="form"
                  style={{ fontSize: "17px", padding: 5 }}
                  key={locations.id}
                >
                  {<JoinButton />} 
                  <ul>{locations.title} </ul>
                  {<LocationImages locationId= {locations.id}/>} 
                  <img
                    class="rounded float-start"
                    src={`http://127.0.0.1:8000${locations.image_url}`}
                    alt="location's image"
                  />
                  
                  <ul>
                    {locations.address} {locations.time} {locations.date}
                  </ul>
                </p>
              ))}
{/* PATCH request Rendering */}
                
            {locationImage &&
              locationImage.map((locationImage) => (
                <p
                  className="form"
                  style={{ fontSize: "17px", padding: 5 }}
                  key={locationImage.id}
                >
                  {/* <img
              class="rounded float-start"
              src={`http://127.0.0.1:8000${locationImage.image_url}`}
              alt="location's image"
            />  */}
                </p>
              ))}
              
                

          </Tab>

          {/* third tab begins  */}
          <Tab style={{ fontSize: "15px" }} eventKey="third" title="My History">
            {/* conditional rendering done here. LOOK IT UP */}
            <div className="form">A list of your recent activities.</div>
            {userLocationHistory.map((userHistory) => {
              if (userLocationHistory[0].location) {
                return (
                  <p
                    className="form"
                    style={{ fontSize: "15px", padding: 5 }}
                    key={userHistory.id}
                  >
                    <ul>
                      {userHistory.date_of_play}
                      {userHistory.location.address}
                      {userHistory.location.title}
                      {userHistory.location.date}
                      {userHistory.location.time}
                    </ul>
                    <img
                      class="rounded float-start"
                      src={`http://127.0.0.1:8000${userHistory.location.image_url}`}
                    />
                  </p>
                );
              } else {
                <p>Loading</p>;
              }
            })}
          </Tab>

          {/* fourth tab begins  */}
          <Tab
            style={{ fontSize: "15px" }}
            eventKey="second"
            title="Soccer Social Feed"
          >
            <div className="form">
              A news feed of information and chatter by fellow soccer
              enthustist.
            </div>
            <CreatePostForm />
            <PostList posts={posts} />
          </Tab>

          {/* fifth tab begins  */}
          <Tab
            style={{ fontSize: "15px" }}
            eventKey="fifth"
            title="Add New Location"
          >
            <div className="form">
              Know of a new place to play? Add it here for your fellow soccer
              enthustist!
            </div>
            <AddLocationPage fetchlocations={fetchlocations} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default HomePage;
