import {
    createContext,
    useContext,
    useState
} from "react";
import {
    createTutor,
    getTutors
} from "../api/infotutor.js";

const InfoTutorContext = createContext();

export const useInfoTutor = () => {
    const context = useContext(InfoTutorContext);
    if (!context) throw new Error("InfoTutor must be used within a InfoTutorProvider");
    return context;
};

export function InfoTutorProvider({ children }) {

    const [allInfoTutors, setAllInfoTutors] = useState([]);


    const getAllInfoTutors = async () => {
        try {
            const res = await getTutors();
            setAllInfoTutors(res.data);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <InfoTutorContext.Provider
            value={{
                allInfoTutors,
                getAllInfoTutors,
                createTutor,
            }}
        >
            {children}
        </InfoTutorContext.Provider>
    );
}