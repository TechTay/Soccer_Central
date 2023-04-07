import React, { useState } from "react";

// React-Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import API from "../../API";

const ProfileImage = () => {
    const [data, setData] = useState({
        image_url: "",
    });
}

const handleImageChange = (e) => {
    let newData = { ...data };
    newData["image_url"] = e.target.files[0];
    setData(newData);
};

const doSubmit = async (e) => {
    e.preventDefault();
    const response = await API.createMyModelEntry(data);
    if (response.status === 400) {
        setErrors(response.data);
    }
};

return (

    <Form>
        <Row>
    
        </Row>
        <Row>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>My Image</Form.Label>
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
       
        <Button
            variant="primary"
            type="submit"
            onClick={(e) => doSubmit(e)}>
        </Button>
    </Form>
);

            

export default ProfileImage