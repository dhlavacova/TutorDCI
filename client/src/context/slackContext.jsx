import {useEffect} from "react";
import {createContext, useContext, useState} from "react";
import {slackRequest} from "../api/slack.js";


export const SlackContext = createContext();

export const useSSlack = () => {
    const context = useContext(SlackContext);
    if (!context) throw new Error("useSetting must be used within a SettingProvider");
    return context;
};

export const SlackProvider = ({children}) => {
    const [message, setMessage] = useState('')
    const [nachricht, setNachricht] = useState('')


    const slackFromcontext = async (message) => {
        console.log("slack router",message)
        try {
            const res = await slackRequest(message)
            if (res.status === 200) {


            }
        } catch (err) {
            console.log(err.response.data);
            setErrors(err.response.data.message);

        }
    }



    return (<SlackContext.Provider
            value={{slackFromcontext,message,setMessage, nachricht}}
        >
            {children}
        </SlackContext.Provider>
    );

}

