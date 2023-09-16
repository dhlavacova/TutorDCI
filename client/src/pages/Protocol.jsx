import React, {useEffect}from 'react';
import { useProtocol} from "../context/protocolContext.jsx";
import { Button, } from "../components/ui";
function Protocol() {
    const {allProtocols, getAllProtocols} = useProtocol();
    // allProtocols, setAllProtocols

    useEffect(() => {

        getAllProtocols();

    }, []);
    function getCurrentDate(datum) {
        try {
            const options = { weekday: 'long',day: '2-digit', month: '2-digit', year: 'numeric' };

            if (!(datum instanceof Date)) {
                datum = new Date(datum);
            }

            return datum.toLocaleDateString('de-DE', options);
        } catch (error) {
            console.error("Error in getCurrentDate:", error);
            return "Invalid Date";
        }
    }


    return (
        <div className="flex items-center justify-center flex-col w-full space-y-4">
            <div className="headerMonth">September 2023</div>
                {allProtocols.map((data,index) => <div className="w-full flex items-center justify-between mb-2" key={index}>
                    <div className="flex-shrink-0">
                        <div className="date">{getCurrentDate(data.date)}</div>
                    </div>
                    <div className="flex flex-row items-center space-x-4 flex-grow">
                    <div className="time">20:00-22:00</div>

                    <div className="student">{data.name}</div>
                    <div className="topic">{data.theme}</div>
                        <div className="flex-shrink-0">
                        <Button className="ml-auto"><a href={"/api/protocol/pdf/" + data.uuid} className="btn ml-auto">pdf Herunterladen</a></Button>
                        </div>
            </div>
        </div>)}






        </div>
    );
}

export default Protocol

