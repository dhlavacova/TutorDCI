import {createContext, useContext, useState} from "react";
import {
    getTasksAllRequest,
} from "../api/protocol.js";

const ProtocolContext = createContext();

export const useProtocol = () => {
    const context = useContext(ProtocolContext);
    if (!context) throw new Error("useTasks must be used within a TaskProvider");
    return context;
};

export function ProtocolProvider({children}) {

    const [allProtocols, setAllProtocols] = useState([]); // Nuevo estado para todas las tareas [
const[studentName, setStudentName] = useState([]);

    const getAllProtocols = async () => {
        try {
            const res = await getTasksAllRequest();
            setAllProtocols(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ProtocolContext.Provider
            value={{
                allProtocols,
                getAllProtocols,
            }}
        >
            {children}
        </ProtocolContext.Provider>
    );
}