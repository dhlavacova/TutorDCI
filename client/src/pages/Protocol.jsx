import React, {useEffect}from 'react';
import { useProtocol} from "../context/protocolContext.jsx";
//import { Button, } from "../components/ui";
//import {data} from "autoprefixer";
//import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue,Link} from "@nextui-org/react";


const columns = [
    {name: "STUDENT", uid: "student"},
    {name: "DATUM", uid: "date"},
    {name: "THEME", uid: "theme"},
   {name: "PDF PRINT", uid: "pdf"},
];

function Protocol() {
    const {allProtocols, getAllProtocols} = useProtocol();
    // allProtocols, setAllProtocols

    useEffect(() => {
        getAllProtocols();
    }, []);
    const users=allProtocols
    function getCurrentDate(datum) {
        console.log("getCurrentDate ausgeführt mit: ", datum)
        try {
            const dateOptions = { weekday: 'long',day: '2-digit', month: '2-digit', year: 'numeric' };
            /*const timeOptions = { hour: '2-digit', minute: '2-digit' };*/
            if (!(datum instanceof Date)) {
                console.log("datum war kein date objekt")
                datum = new Date(datum);
            }
            const datePart = datum.toLocaleDateString('de-De', dateOptions);
            /*const timePart = datum.toLocaleTimeString('en-US', timeOptions);*/
            console.log("getCurrentDate returned: ", `${datePart}`)
            return `${datePart}`
        } catch (error) {
            console.error("Error in getCurrentDate:", error);
            return "Invalid Date";
        }
    }
    const renderCell = React.useCallback((user, columnKey) => {
        console.log("renderCell ausgeführt")
        const cellValue = user[columnKey];
        console.log("columnkey", columnKey);
        switch (columnKey) {

            case "student":
                return (
                    <User
                       /* avatarProps={{radius: "lg", src: user.avatar}}*/
                        description={user.student}
                        name={cellValue}
                    >
                        {user.student}
                    </User>
                );
            case "date":
                return (
                    <div className="flex flex-col">
                        {console.log(`switch datum ${user.date}`)}
                        <p className="text-bold text-sm capitalize">{getCurrentDate(user.date)}</p>
                    </div>
                );
            case "theme":
                return (
                    <Chip className="capitalize"  size="sm" variant="flat">
                        {user.theme}
                        {cellValue}
                    </Chip>
                );
           case "pdf":
                return (
                    <div className="relative flex items-center ">
                        <button
                            >
                        <Link href={"/api/pdf/" + user._id} className="bg-slate-500 text-white font-bold py-2 px-4 rounded-l-lg hover:bg-slate-600 ml-6" >pdf Herunterladen</Link>
                    </button>
           </div>
           )
               ;
            default:
                return cellValue;
        }
    }, []);
    console.log(allProtocols)

    return (
        <Table aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
            {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={users}>
                {(item) => (
                    <TableRow key={item._id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>

       /* <div className="flex items-center justify-center flex-col w-full space-y-4">
            <div className="headerMonth">September 2023</div>
                {allProtocols.map((data,index) => <div className="w-full flex items-center justify-between mb-2" key={index}>
                    <div className="flex-shrink-0">
                        <div className="date">{getCurrentDate(data.date)}</div>
                    </div>
                    <div className="flex flex-row items-center space-x-4 flex-grow">
                    <div className="time">20:00-22:00</div>


                    <div className="topic">{data.theme}</div>
                        <div className="topic">{data.student}</div>

                        <div className="flex-shrink-0">

                        <Button className="ml-auto"><a href={"/api/pdf/" + data._id} className="btn ml-auto">pdf Herunterladen</a></Button>
                        </div>
            </div>
        </div>)}






        </div>*/
    );
}

export default Protocol

