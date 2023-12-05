import Navbar from "./NavBar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Register from "./Register";
import Trip from "./Trip";

const App = () => {
  return (
      <div>
        <Navbar></Navbar>
        <div>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/trip" element={<Trip/>}/>
          </Routes>
        </div>
      </div>
  );
}

export default App;
