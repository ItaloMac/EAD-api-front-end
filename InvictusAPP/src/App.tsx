import { Routes, Route } from "react-router";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Course from "./pages/Course";
import Institutional from "./pages/Institutional";
import Faculty from "./pages/Faculty"
import ErrorBoundary from "./pages/ErrorBoundary";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Courses />} errorElement={<ErrorBoundary error={undefined} />} />
      <Route path="/about" element={<About />} errorElement={<ErrorBoundary error={undefined} />} />
      <Route path="/curso/:id" element={<Course />} errorElement={<ErrorBoundary error={undefined} />} />
      <Route path="/institucional" element={<Institutional />} errorElement={<ErrorBoundary error={undefined} />} />
      <Route path="/corpodocente" element={<Faculty />} errorElement={<ErrorBoundary error={undefined} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
