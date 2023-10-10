/*
import {createContext, useContext, useState} from "react";
import {createTutorClassRequer} from "../api/infotutor.js";


const ClassTutorContext = createContext();

export const useClassTutor = () => {
    const context = useContext(ClassTutorContext);
    if (!context) throw new Error("useTasks must be used within a TaskProvider");
    return context;
};

export function ClassTutorProvider({children}) {

    const [tutorClass, setTutorClass] = useState(null) // Nuevo estado para todas las tareas [
    const [errors, setErrors] = useState([]);

    const tutClass = async (data) => {
        console.log("tutorClass", data)
        try {
            const res = await createTutorClassRequer(data)
            if (res.status === 200) {
                setTutorClass(res.data)
            }
        } catch (err) {
            console.log(err.response.data);
            setErrors(err.response.data.message);
        }
    }

    return (
        <ClassTutorContext.Provider
            value={{
                tutorClass,
                tutClass,
                errors,
            }}
        >
            {children}
        </ClassTutorContext.Provider>
    );
}*/
