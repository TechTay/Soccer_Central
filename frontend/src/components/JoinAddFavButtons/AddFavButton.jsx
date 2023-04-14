import React from 'react';
import Button from 'react-bootstrap/Button';


const AddFavButtons = async () => {

    
    // const [addToFavs, setAddToFavs] = useState()

    function handleJoinClick() {

        console.log("You have Joined the Game!")
    }
    

    return (
        <form>
            <button class="btn btn-primary" onClick={handleJoinClick}>Join!</button>
        </form>
        
    )


}

export default AddFavButtons