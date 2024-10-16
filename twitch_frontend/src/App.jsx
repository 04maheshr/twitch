import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/navbar/navbar'; 
import Homepage from './components/pages/createroom'; 
import Join from "./components/pages/join";
import Login from "./components/pages/login";
import { useState } from "react";

const App = () => {
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));

  return (
    <div>
      {userToken ? (
        <Router>
          <Navbar />
          <div className="bg-black">
            <Routes>
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/join" element={<Join />} />
            </Routes> 
          </div>
        </Router>
      ) : (
        <Login setUserToken= {setUserToken}/>
      )}
    </div>
  );
};

export default App;
