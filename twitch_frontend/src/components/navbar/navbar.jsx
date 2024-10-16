import { BsTwitch } from "react-icons/bs";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="container flex justify-between p-4  bg-navbargrey">
      <div>
        <Link to="/"> {/* Make the Twitch icon a home link */}
          <BsTwitch className="text-4xl text-white" />
        </Link>
      </div>

      <div>
        <ul className="flex space-x-8 mr-3">
          <li className="text-white">
            <Link to="/">CreateRoom</Link> {/* Corrected to forward slash */}
          </li>
          <li className="text-white">
            <Link to="/settings">settings</Link> {/* Corrected to forward slash */}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
