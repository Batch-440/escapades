import Navbar from "./NavBar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Register from "./Register";
import Trip from "./Trip";

const App = () => {
  return (
      <BrowserRouter>
        <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/trip" element={<Trip/>}/>
          </Routes>

      </BrowserRouter>
  );
}

export default App;
