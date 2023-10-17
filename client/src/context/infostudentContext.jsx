import {
    createContext,
    useContext,
    useState,
    
} from "react";
import { getStudents } from "../api/infostudent.js";

const InfoStudentContext = createContext();

export const useInfoStudent = () => {
    const context = useContext(InfoStudentContext);
    if (!context) throw new Error("InfoStudent must be used within a InfoStudentProvider");
    return context;
};

export function InfoStudentProvider({ children }) {

    const [allInfoStudents, setAllInfoStudents] = useState([]);


    const getAllInfoStudents = async () => {
        try {
            const res = await getStudents();
            setAllInfoStudents(res.data);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <InfoStudentContext.Provider
            value={{
                allInfoStudents,
                getAllInfoStudents,
            }}
        >
            {children}
        </InfoStudentContext.Provider>
    );
}