import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const JoinButton = () => {
  const handleClick = () => {
    const url = `/JoinGame`;
    window.location.href = url;
  };

  return (
    <div>
      <button onClick={handleClick} className="btn btn-primary">
        Join Session
      </button>
    </div>
  );
};
export default JoinButton;
