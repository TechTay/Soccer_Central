import React from "react";
import { Link} from "react-router-dom";

const AddFavButton = () => {


    return (
        <Link to="/JoinGame" className="btn btn-primary">Add to Favorites</Link>
    );
  
}
export default AddFavButton;