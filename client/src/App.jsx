import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";

import { ProtectedRoute } from "./routes";

import Home from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { TutoringBookingForm } from "./pages/TutoringBookingForm";
import  LoginPage  from "./pages/LoginPage";
import { ClassesPage } from "./pages/ClassesPage";
import StudentProfile from "./pages/StudentProfile";
import TutorProfile from "./pages/TutorProfile"; // 
import Protocol from "./pages/Protocol";

import { AuthProvider } from "./context/authContext";
import { TaskProvider } from "./context/tasksContext";
import { ProtocolProvider } from "./context/protocolContext";
import Setting from "./pages/Setting.jsx";
import {PasswordProvider} from "./context/password.jsx";


function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <ProtocolProvider>
          <PasswordProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/dashboard" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/book" element={<ClassesPage />} /> //Naming Conventions 
                <Route path="/add-task" element={<TutoringBookingForm />} />
                <Route path="/book/:id" element={<TutoringBookingForm />} />
                <Route path="/profile">
                  {/* Utiliza una ruta anidada para los perfiles */}
                  <Route path="student" element={<StudentProfile />} />
                  <Route path="tutor" element={<TutorProfile />} />
                </Route>
                <Route path="/protocol" element={<Protocol/>}/>
                <Route path="/settings" element={<Setting/>}/>
              </Route>
            </Routes>
          </BrowserRouter>
          </PasswordProvider>
        </ProtocolProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
