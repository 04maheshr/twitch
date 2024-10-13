import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";

const HomePage = () => {
  const [showIcon, setIcon] = useState(false);
  const navigate = useNavigate();

  const toggleFunction = () => {
    setIcon((prev) => !prev);
    console.log(!showIcon); 
  };

  const someFunction = () => {
    console.log("Go to meeting room");
    navigate("/invite");
  };

  return (
    <div className="h-auto flex">
      <div className="pl-10 pt-10 pb-10">
        <FaPlusCircle
          className="text-4xl text-purple-800 cursor-pointer transition-colors duration-300 hover:text-white" 
          onClick={toggleFunction}
        />
      </div>
      <div className={`transition-opacity duration-300 ease-in-out ${showIcon ? 'opacity-100' : 'opacity-0'}`}>
        {showIcon && (
          <div className="pl-4 pt-10">
            <button 
              className="text-white bg-purple-800 hover:bg-purple-600 transition duration-300 ease-in-out p-2 rounded" 
              onClick={someFunction}
            >
              Create Meeting
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
