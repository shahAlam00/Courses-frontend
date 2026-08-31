import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import Success from "./components/Success";
import CoursePlayer from "./components/CoursePlayer";

function App() {
  const location = useLocation();
  const isPlayerPage = location.pathname.startsWith("/watch/");

  return (
    <>
      {!isPlayerPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/watch/:courseId" element={<CoursePlayer />} />
        <Route path="/success" element={<Success />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
      </Routes>
      {!isPlayerPage && <Footer />}
    </>
  );
}

export default App;
