import { Routes, Route } from "react-router";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Course from "./pages/Course";
import Institutional from "./pages/Institutional";
import Faculty from "./pages/Faculty"
import ErrorBoundary from "./pages/ErrorBoundary";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/UserLogin";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordReset from "./pages/PasswordReset";
import ConfirmacaoEmail from "./pages/ConfirmacaoEmail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Courses />} errorElement={<ErrorBoundary error={undefined} />} />
      <Route path="/about" element={<About />} errorElement={<ErrorBoundary error={undefined} />} />
      <Route path="/curso/:id" element={<Course />} errorElement={<ErrorBoundary error={undefined} />} />
      <Route path="/institucional" element={<Institutional />} errorElement={<ErrorBoundary error={undefined} />} />
      <Route path="/corpodocente" element={<Faculty />} errorElement={<ErrorBoundary error={undefined} />} />
      <Route path="/contato" element={<Contact />} errorElement={<ErrorBoundary error={undefined} />} />
      <Route path="/criar-conta" element={<CreateAccount />} errorElement={<ErrorBoundary error={undefined} />} />
      <Route path="/login" element={<Login />} errorElement={<ErrorBoundary error={undefined} />} />
      <Route path="/esqueci-senha" element={<ForgotPassword />} errorElement={<ErrorBoundary error={undefined} />} />
      <Route path="/reset-password" element={<PasswordReset />} errorElement={<ErrorBoundary error={undefined} />} />
      <Route path="/confirmacao-email" element={<ConfirmacaoEmail />} errorElement={<ErrorBoundary error={undefined} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
