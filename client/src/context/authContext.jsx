import { useEffect } from "react";

import {
  createContext,
  useContext,
  useState
} from "react";
import {
  loginRequest,
  registerRequest,
  verifyTokenRequest,
  logoutRequest
} from "../api/auth";

//import{createTutorClassRequer} from "../api/infotutor.js"

import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
//const [tutorClass, setTutorClass] = useState(null)
  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true); // Asegúrate de establecer isAuthenticated en true aquí
      }
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.message);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.message);
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    await logoutRequest();
    // Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get("isLogged");
      /*const cookiesToken=Cookies.get("token");*/
      if (!cookies) {
        console.log("no cookies")
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        // console.log("res in authcontext useEffect ", res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

/*  const tutClass = async (data) => {
    console.log("tutorClass",data)
    try{
      const res =await createTutorClassRequer(data)
    if(res.status ===200){
      setTutorClass(res.data)
    }
    }
    catch (err) {
      console.log(err.response.data);
      setErrors(err.response.data.message);

    }
  }*/

  return (
    <AuthContext.Provider
      value={{
      /*  tutorClass,
        tutClass,*/
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
