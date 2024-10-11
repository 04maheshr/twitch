import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/navbar/navbar'; 
import Homepage from './components/pages/createroom'; // Make sure to use the correct path and import the component

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="bg-twitchbackgroundb">
      <Routes>
        <Route path="/" element={<Homepage />} /> {/* Corrected: element uses curly braces and self-closing Route */}
      </Routes> 
      </div>
    </Router>
  );
};

export default App;
