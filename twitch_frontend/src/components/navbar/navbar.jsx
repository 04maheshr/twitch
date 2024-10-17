import { useContext } from "react";
import { BsTwitch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // This import is correct

const Navbar = () => {
  const { setUserToken } = useContext(UserContext);

  const handleLogout = () => {
    setUserToken(false);
  };
  
  return (
    <div className="container flex justify-between p-4 bg-navbargrey">
      <div>
        <Link to="/">
          <BsTwitch className="text-4xl text-white" />
        </Link>
      </div>

      <div>
        <ul className="flex space-x-8 mr-3">
          <li className="text-white">
            <Link to="/">Home</Link>
          </li>
          <li className="text-white">
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="text-white">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
