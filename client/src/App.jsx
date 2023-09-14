import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";

import Home from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { TutoringBookingForm } from "./pages/TutoringBookingForm";
import { LoginPage } from "./pages/LoginPage";
import { ClassesPage } from "./pages/ClassesPage";
import { TaskProvider } from "./context/tasksContext";
import StudentProfile from "./pages/StudentProfile";
import TutorProfile from "./pages/TutorProfile"; // 


function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          
            <Navbar />
            <Routes>
              <Route path="/dashboard" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/book" element={<ClassesPage />} />
                <Route path="/add-task" element={<TutoringBookingForm />} />
                <Route path="/book/:id" element={<TutoringBookingForm />} />
                <Route path="/profile">
                {/* Utiliza una ruta anidada para los perfiles */}
                <Route path="student" element={<StudentProfile />} />
                <Route path="tutor" element={<TutorProfile />} />
              </Route>
              </Route>
            </Routes>
          
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
