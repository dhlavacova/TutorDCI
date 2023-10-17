import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet
} from "react-router-dom";
import { ProtectedRoute } from "./routes";
import Home from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import StudentProfile from "./pages/StudentProfile";
import { TutorProfile } from "./pages/TutorProfile";
import Setting from "./pages/Setting.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import NotFound from './pages/NotFound';
import Protocol from "./pages/Protocol";
import { TutoringBookingForm } from "./pages/TutoringBookingForm";
import { ClassesPage } from "./pages/ClassesPage";
import { AuthProvider } from "./context/authContext";
import { TaskProvider } from "./context/tasksContext";
import { ProtocolProvider } from "./context/protocolContext";
import { SettingsProvider } from "./context/settingsContext.jsx";
import { InfoTutorProvider } from './context/infotutorContext';
import { InfoStudentProvider } from './context/infostudentContext';
import { Navbar } from "./components/Navbar";
import Footer from "./components/footer";
import './index.css';
import CreatTutorClass from "./components/SelectCours/CreatTutorClass.jsx";
import CreateStudentClass from './components/StudentInfo/CreateStudentClass.jsx';

// import {ClassTutorProvider} from "./context/creatTutorClassContext.jsx";


function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <ProtocolProvider>
          <InfoStudentProvider>
            <InfoTutorProvider>
              <SettingsProvider>
                <BrowserRouter>
                  <div className="min-h-screen flex flex-col">
                    <main className="container content-container mx-auto px-2 md:px-10 flex-grow">
                      <Navbar className="navbar" />
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/register2/:role" element={<CreatTutorClass />} /> {/* <--- Add this route */}
                        <Route path="/register3/:role" element={<CreateStudentClass />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route element={<ProtectedRoute />}>
                          <Route path="/book" element={<ClassesPage />} />
                          <Route path="/add-task" element={<TutoringBookingForm />} />
                          <Route path="/book/:id" element={<TutoringBookingForm />} />
                          <Route path="/profile">
                            <Route path="student" element={<StudentProfile />} />
                            <Route path="tutor" element={<TutorProfile />} />
                          </Route>
                          <Route path="/protocol" element={<Protocol />} />
                          <Route path="/settings" element={<Setting />} />
                          <Route path="*" element={<NotFound />} />
                        </Route>
                      </Routes>
                    </main>
                  </div>
                  <Outlet />
                  <Footer />
                </BrowserRouter>
              </SettingsProvider>
            </InfoTutorProvider>
          </InfoStudentProvider>
        </ProtocolProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;



