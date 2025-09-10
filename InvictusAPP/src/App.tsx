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
import Users from "./pages/admin/users/users";
import AdminPanel from "./pages/admin/admin-panel";
import ProtectedAdminRoute from "./interfaces/ProtectedAdminRoute";
import UserData from "./pages/admin/users/userdata";
import UserRegistrations from "./pages/admin/users/userregistrations";
import Registrations from "./pages/admin/registration/registrations";
import RegistrationData from "./pages/admin/registration/registrations-data";
import RegistrationCreate from "./pages/admin/registration/registration-create-page";
import Classes from "./pages/admin/class/classes";
import ClassRegistrations from "./pages/admin/class/class-registrations-page";
import ClassData from "./pages/admin/class/class-data";
import ClassCreate from "./pages/admin/class/class-create-page";
import CoursesPage from "./pages/admin/course/courses-page";
import CourseData from "./pages/admin/course/course-data-page";
import CourseCreate from "./pages/admin/course/course-create-page";
import CourseClasses from "./pages/admin/course/course-classses-page";
import CourseTeachers from "./pages/admin/course/course-teachers-page";
import AddTeacherToCourse from "./pages/admin/course/add-teacher-page";
import TeacherData from "./pages/admin/teachers/teacher-data";
import Teachers from "./pages/admin/teachers/teachers";
import CreateTeacher from "./pages/admin/teachers/create-teacher";
import CourseModules from "./pages/admin/course/course-modules-page";
import TeacherModules from "./pages/admin/teachers/teacher-modules-page";
import ModuleData from "./pages/admin/module/module-data-page";
import AddModule from "./pages/admin/module/add-module-page";
import AddClassToCourse from "./pages/admin/course/add-class-page";
import ListClassroomFromModule from "./pages/admin/classroom/list-classroom-from-module";
import CreateClassroomFromModulePage from "./pages/admin/classroom/create-classroom-from-module-page";
import UpdateClassroomPage from "./pages/admin/classroom/update-classroom-page";
import PreCheckout from "./components/Checkout/pre-checkout";

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
      <Route path="/admin/painel-administrativo" element={<ProtectedAdminRoute><AdminPanel /></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      <Route path="/admin/usuarios" element={<ProtectedAdminRoute><Users /></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      '<Route path="/admin/aluno/:id" element={<ProtectedAdminRoute><UserData /></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      '<Route path="/admin/aluno/:id/matriculas" element={<ProtectedAdminRoute><UserRegistrations /></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      '<Route path="/admin/matriculas" element={<ProtectedAdminRoute><Registrations /></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      '<Route path="/admin/matricula/:id" element={<ProtectedAdminRoute><RegistrationData /></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      '<Route path="/admin/matricula/cadastrar-nova" element={<ProtectedAdminRoute><RegistrationCreate /></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      '<Route path="/admin/turmas" element={<ProtectedAdminRoute><Classes/></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      '<Route path="/admin/turma/matriculas/:id" element={<ProtectedAdminRoute><ClassRegistrations/></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      '<Route path="/admin/turma/:id" element={<ProtectedAdminRoute><ClassData/></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      '<Route path="/admin/turma/criar-nova" element={<ProtectedAdminRoute><ClassCreate/></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      '<Route path="/admin/cursos" element={<ProtectedAdminRoute><CoursesPage/></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      '<Route path="/admin/curso/:id" element={<ProtectedAdminRoute><CourseData/></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      '<Route path="/admin/curso/criar-novo" element={<ProtectedAdminRoute><CourseCreate/></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      '<Route path="/admin/curso/:id/turmas" element={<ProtectedAdminRoute><CourseClasses/></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      '<Route path="/admin/curso/:id/professores" element={<ProtectedAdminRoute><CourseTeachers/></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      '<Route path="/admin/curso/:id/modulos" element={<ProtectedAdminRoute><CourseModules/></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      '<Route path="/admin/curso/:id/adicionar-modulo" element={<ProtectedAdminRoute><AddModule/></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      '<Route path="/admin/curso/:id/adicionar-turma" element={<ProtectedAdminRoute><AddClassToCourse/></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      '<Route path="/admin/professor/criar-novo" element={<ProtectedAdminRoute><CreateTeacher/></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      '<Route path="/admin/curso/:id/adicionar-professor" element={<ProtectedAdminRoute><AddTeacherToCourse/></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      '<Route path="/admin/professor/:id" element={<ProtectedAdminRoute><TeacherData/></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      '<Route path="/admin/professores" element={<ProtectedAdminRoute><Teachers/></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      '<Route path="/admin/professor/:id/modulos" element={<ProtectedAdminRoute><TeacherModules/></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      '<Route path="/admin/modulo/:id" element={<ProtectedAdminRoute><ModuleData/></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      '<Route path="/admin/modulo/:id/aulas" element={<ProtectedAdminRoute><ListClassroomFromModule/></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      '<Route path="/admin/modulo/:id/criar-aula" element={<ProtectedAdminRoute><CreateClassroomFromModulePage/></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      '<Route path="/admin/modulo/:id/atualizar-aula/:id" element={<ProtectedAdminRoute><UpdateClassroomPage/></ProtectedAdminRoute>} errorElement={<ErrorBoundary error={undefined} />} />
      '<Route path="/pre-checkout/:userId/:cursoId" element={<PreCheckout />} errorElement={<ErrorBoundary error={undefined} />} />'
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
