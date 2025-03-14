import { Routes, Route } from "react-router";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Course from "./pages/Course";
import Institutional from "./pages/Institutional";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Courses />} />
      <Route path="/about" element={<About />} />
      <Route path="/curso/:id" element={<Course />} />
      <Route path="/institucional" element={<Institutional/>} />
    </Routes>
  );
}

export default App;
