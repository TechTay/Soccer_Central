import React, { useState } from "react";

// React-Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const LocationImages = (locationPk) => {
    const [data, setData] = useState([]);
    const [user, token] = useAuth();

const handleImageChange = (e) => {
    let newData = { ...data };
    newData = e.target.files[0];
    setData(newData);
};

const refreshPage = () => {
  window.location.reload(false);

}

const doSubmit = async (e) => {
    e.preventDefault();
    let form_data = new FormData();
  form_data.append("image_url", data)
 
  
  try {
    let response = await axios
      .patch(`http://127.0.0.1:8000/api/Locations/update/${locationPk.locationId}/`, form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
  } catch (error) {
    console.log(error.response);
  }
  refreshPage();
}

return (

    <Form>
        <Row>
    
        </Row>
        <Row>
            <Form.Group style={{}} controlId="formFile" className="mb-3 ">
                <Form.Label></Form.Label>
                <Form.Control
                    type="file"
                    name="image_url"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={(e) => {
                        handleImageChange(e);
                    }}
                />
            </Form.Group>
        </Row>
       
        <Button className="form"
            variant="primary"
            type="edit"
            onClick={(e) => doSubmit(e)}> Update!
        </Button>
        {/* <Button className="form"
            variant="primary"
            type="edit"
            onClick={(e) => doSubmit(e)}>
        </Button> */}
    </Form>
);
}
            

export default LocationImages