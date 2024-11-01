// App.js
import { BrowserRouter as Router, Route, Routes, Navigate,useLocation } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Homepage from "./components/pages/homepage";
<<<<<<< HEAD
import AppJoin from "./appjoin";
=======
import Join from "./components/pages/join";
>>>>>>> 44999715a85ffa31bb54800f3a67be4fea329dc6
import Login from "./components/pages/login";
import { useContext, useEffect } from "react";
import { UserContext } from "./components/Usercontext/UserContext";
import App from "./App";
<<<<<<< HEAD
import AppCreate from "./appcreate";
=======
>>>>>>> 44999715a85ffa31bb54800f3a67be4fea329dc6
import {
    selectIsConnectedToRoom,
    useHMSActions,
    useHMSStore,
  } from "@100mslive/react-sdk";

// A wrapper to handle token extraction using useLocation inside the Router context
const TokenHandler = ({ setUserToken }) => {
  const location = useLocation(); // Now it's safely inside Router context

  useEffect(() => {
    const hash = location.hash; // Read URL fragment (e.g., #access_token=...)
    const params = new URLSearchParams(hash.replace("#", "?")); // Convert fragment to query params
    const token = params.get("access_token");

    if (token) {
      console.log("Access token found:", token);
      setUserToken(true); // Update state to logged-in
      localStorage.setItem("access_token", token); // Save token for persistence
    }
  }, [location.hash, setUserToken]);

  return null; // This component doesn't render anything
};

const App1 = () => {
  const { userToken, setUserToken } = useContext(UserContext);
  const isConnected = useHMSStore(selectIsConnectedToRoom);

  return (
    <Router>
      {/* TokenHandler component runs only once to extract token */}
      <TokenHandler setUserToken={setUserToken} />

      <div>

        {userToken ? (
          <>
          {!isConnected&&(
            <Navbar setUserToken={setUserToken} />)}
            <div className="bg-black">
              <Routes>
                <Route path="/" element={<Homepage />} />
<<<<<<< HEAD
                <Route path="/join" element={<AppJoin />} />
                <Route path="/createroom" element={<AppCreate/>}/>
=======
                <Route path="/join" element={<Join />} />
                <Route path="/room" element={<App/>}/>
>>>>>>> 44999715a85ffa31bb54800f3a67be4fea329dc6
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App1;
