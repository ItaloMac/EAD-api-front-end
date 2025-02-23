import { Routes, Route } from "react-router";
import Cursos from "./pages/Cursos";
import About from "./pages/About";
import MenuBar from "./components/Layout/MenuBar"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Cursos />} />
      <Route path="/about" element={<About />} />
      <Route path="/menu-bar" element={<MenuBar />} />
    </Routes>
  );
}

export default App;
