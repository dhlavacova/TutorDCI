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
    useEffect(() => {
        if (nachricht.length > 0) {
            const timer = setTimeout(() => {
                setNachricht([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [nachricht]);

    const slackFromcontext = async (message) => {
        console.log("slack router",message)
        try {
            setMessage(message)
            const res = await slackRequest(message)
            if (res.status === 200) {
setNachricht('Message was sent to your class')
setMessage('')
            }
        } catch (err) {
            console.log(err.response.data);

        }
    }



    return (<SlackContext.Provider
            value={{slackFromcontext,message,setMessage, nachricht}}
        >
            {children}
        </SlackContext.Provider>
    );

}

