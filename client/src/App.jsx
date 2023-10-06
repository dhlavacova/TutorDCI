
import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./routes";
import Home from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { TutoringBookingForm } from "./pages/TutoringBookingForm";
import LoginPage from "./pages/LoginPage";
import { ClassesPage } from "./pages/ClassesPage";
import StudentProfile from "./pages/StudentProfile";
import TutorProfile from "./pages/TutorProfile";
import Protocol from "./pages/Protocol";
import { AuthProvider } from "./context/authContext";
import { TaskProvider } from "./context/tasksContext";
import { ProtocolProvider } from "./context/protocolContext";
import Footer from "./components/footer";
import Setting from "./pages/Setting.jsx";
import { SettingsProvider } from "./context/settingsContext.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import NotFound from './pages/NotFound';
import './index.css';
import CreatTutorClass from "./components/SelectCours/CreatTutorClass.jsx";
import {ClassTutorProvider} from "./context/creatTutorClassContext.jsx";


function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <ProtocolProvider>
          <SettingsProvider>
            <ClassTutorProvider>
            <BrowserRouter>
              <div className="min-h-screen flex flex-col">
                <main className="container content-container mx-auto px-4 md:px-10 flex-grow">
                  <Navbar className="navbar"  />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/register2/:role" element={<CreatTutorClass />} /> {/* <--- Add this route */}
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
            </ClassTutorProvider>
          </SettingsProvider>
        </ProtocolProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;



