
import {useEffect} from "react";
import {createContext, useContext, useState} from "react";
import {changePasswordRequest, forgotPasswordRequest} from "../api/password.js";


export const SettingsContext = createContext();

export const useSetting = () => {
    const context = useContext(SettingsContext);
    if (!context) throw new Error("useSetting must be used within a SettingProvider");
    return context;
};

export const SettingsProvider = ({children}) => {
    const [password, setPassword] = useState(null)
    const [email, setEmail] = useState('')
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

    const changePassword = async (data) => {
        console.log("changePassword context",data)
        try {
            const res = await changePasswordRequest(data)
           if (res.status === 200) {
                setPassword(res.data);

            }
        } catch (err) {
            console.log(err.response.data);
            setErrors(err.response.data.message);

        }
    }

    const forgotPassword = async (data) => {
        console.log("forgotPassword context",data)
        try {
            const res = await forgotPasswordRequest(data)
            if (res.status === 200) {
                setEmail(res.data);

            }
        } catch (err) {
            console.log(err.response.data);
            setErrors(err.response.data.message);

        }
    }

    return (<SettingsContext.Provider
            value={{changePassword, errors,password, loading, forgotPassword, email}}
        >
            {children}
    </SettingsContext.Provider>
    );

}

