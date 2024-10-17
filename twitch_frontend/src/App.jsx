// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Homepage from "./components/pages/homepage";
import Join from "./components/pages/join";
import Login from "./components/pages/login";
import { useContext, useState } from "react";
import { UserContext } from "./components/context/UserContext";

const App = () => {
  const {userToken,setUserToken}=useContext(UserContext);  

  return (
    <Router> 
      <div>
        {userToken ? (
          <>
            <Navbar setUserToken={setUserToken} />
            <div className="bg-black">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/join" element={<Join />} />
              </Routes>
            </div>
          </>
        ) : (
          <Login setUserToken={setUserToken} />
        )}
      </div>
    </Router>
  );
};

export default App;
