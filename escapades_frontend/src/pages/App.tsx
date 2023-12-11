import Navbar from "@/components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home/Home";
import Register from "@/pages/Register";
import Trip from "@/pages/Trip";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trip" element={<Trip />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
