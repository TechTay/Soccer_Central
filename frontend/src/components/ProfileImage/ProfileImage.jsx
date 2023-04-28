import React, { useState } from "react";

// React-Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const ProfileImage = () => {
    const [data, setData] = useState([]);
    const [user, token] = useAuth();

const handleImageChange = (e) => {
    let newData = { ...data };
    newData = e.target.files[0];
    setData(newData);
};

const doSubmit = async (e) => {
    e.preventDefault();
    let form_data = new FormData();
  form_data.append("image_url", data)
  
  try {
    let response = await axios
      .post("http://127.0.0.1:8000/api/images/", form_data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
  } catch (error) {
    console.log(error.response);
  }
}

return (

    <Form>
        <Row>
    
        </Row>
        <Row>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload your Image</Form.Label>
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
            type="submit"
            onClick={(e) => doSubmit(e)}>
        </Button>
    </Form>
);
}
            

export default ProfileImage