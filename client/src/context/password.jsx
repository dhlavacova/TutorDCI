import {useEffect} from "react";
import {createContext, useContext, useState} from "react";
import {changePasswordRequest} from "../api/password.js";


const PswContext = createContext();

export const usePassword = () => {
    const context = useContext(PswContext);
    if (!context) throw new Error("usePassword must be used within a PasswordProvider");
    return context;
};

export const PasswordProvider = ({children}) => {
    const [password, setPassword] = useState(null)

    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    const changePassword = async (password) => {
        try {
            const res = await changePasswordRequest(password)
            if (res.status === 200) {
                setPassword(res.data);
                setIsAuthenticated(true);
            }
        } catch (err) {
            console.log(error.response.data);
            setErrors(error.response.data.message);

        }
    }
    return (<PswContext.Provider
            value={{changePassword, isAuthenticated, errors, password, loading}}
        >{children}</PswContext.Provider>
    );

}