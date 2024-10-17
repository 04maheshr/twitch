import { useNavigate } from "react-router-dom";  
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext"; // Import UserContext here

const Login = () => {
  const { setUserToken } = useContext(UserContext);
  return (
    <div>
      <button
        onClick={() => {
          setUserToken(true); 
        }}
        className="active:bg-red-500"
      >
        Authorize
      </button>
    </div>
  );
};

export default Login;

