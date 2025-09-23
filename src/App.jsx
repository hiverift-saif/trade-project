import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
// import Home from "./Pages/Home";
import Home from "./Pages/Home";
import FreeDemo from "./Pages/FreeDemo";
import AboutUs from "./Pages/AboutUs";
import Blog from "./Pages/Blog";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Quickstart from "./Pages/Quickstart";
// import { Home } from "lucide-react";
// import Home from "./pages/Home";
// import FreeDemo from "./pages/FreeDemo";
// import AboutUs from "./pages/AboutUs";
// import Login from "./pages/Login";
// import Registration from "./pages/Registration";
// import Blog from "./pages/Blog";

function App() {
  return (
    <Router>
      <div className="">
        <Navbar />
        <main className="">
          <Routes>
            <Route path="/" element={<Home />} />
             <Route path="/Quickstart" element={<Quickstart/>} />
            {/* <Route path="/freedemo" element={<FreeDemo />} /> */}
            {/* <Route path="/aboutus" element={<AboutUs />} /> */}
            {/* <Route path="/blog" element={<Blog />} /> */}
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
