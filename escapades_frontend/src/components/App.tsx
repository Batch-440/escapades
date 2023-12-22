import Navbar from "@/components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home/Home";
import Register from "@/pages/Register/Register";
import Trip from "@/pages/Trip";

import Login from "@/pages/Login";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trip" element={<Trip />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
