import React, { useEffect, useState } from 'react';
import { useProtocol } from "../context/protocolContext.jsx";
import { useAuth } from "../context/authContext";
//import { Button, } from "../components/ui";
//import {data} from "autoprefixer";
//import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue, Link, Avatar } from "@nextui-org/react";
import { AiOutlineDownload } from "react-icons/ai";



const columns = [
    { name: "PARTICIPANT", uid: "student" },
    { name: "DATE", uid: "date" },
    { name: "THEME", uid: "theme" },
    { name: "PDF PRINT", uid: "pdf" },
];

function Protocol() {
    const { allProtocols, getAllProtocols } = useProtocol();
    // const [imgSrc, setImgSrc] = useState(`http://localhost:4000/api/user-image?timestamp=${new Date().getTime()}`)

    // const { user } = useAuth()

    // console.log(user)

    useEffect(() => {
        getAllProtocols();
        // setImgSrc(`http://localhost:4000/api/user-image?timestamp=${new Date().getTime()}`);

    }, []);


    const users = allProtocols

    function getCurrentDate(datum) {
        try {
            const dateOptions = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
            /*const timeOptions = { hour: '2-digit', minute: '2-digit' };*/
            if (!(datum instanceof Date)) {
                // console.log("datum was not a date object");
                datum = new Date(datum);
            }
            const datePart = datum.toLocaleDateString('en-GB', dateOptions);
            // console.log("datePart:", datePart)
            return `${datePart}`
        } catch (error) {
            console.error("Error in getCurrentDate:", error);
            return "Invalid Date";
        }
    }
    const renderCell = React.useCallback((user, columnKey) => {
        // console.log("renderCell ausgeführt")
        const cellValue = user[columnKey];
        // console.log("columnkey", columnKey);

        switch (columnKey) {
            case "student":
                return (
                    // <div className="flex items-center">
                    //     <Avatar
                    //         isBordered
                    //         color="default"
                    //         className="w-20 h-20 text-large"
                    //         src={imgSrc || "https://i.pravatar.cc/150?u=a042581f4e29026024d"}
                    //     />
                    //     <span className='ml-4 font-medium'>{user.student}</span>
                    // </div>
                    <User
                        avatarProps={{
                            radius: "lg",
                            src: user.profileImage
                        }}
                        /* description={user.student}*/
                        name={cellValue}
                    >
                    </User>
                );
            case "date":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{getCurrentDate(user.date)}</p>
                    </div>
                );
            case "theme":
                return (
                    <Chip className="capitalize" size="md" color='default' variant="flat">
                        {user.theme}

                    </Chip>
                );
            case "pdf":
                return (
                    <div className="relative flex items-center ">
                        <button

                        >
                            <Link style={{ marginLeft: '6px' }} href={"/api/pdf/" + user._id} className="bg-slate-300 text-black font-bold py-2 px-2 rounded-lg hover:bg-slate-600  hover:text-white ml-6" ><AiOutlineDownload /></Link>
                        </button>
                    </div>
                )
                    ;


            default:
                return cellValue;
        }
    }, []);


    return (
        <div className='p-10'>
            <header className="flex justify-between  ">
                <h1 className="text-3xl font-semibold text-slate-800">
                    Overview of Your Lessons
                </h1>
            </header>
            <p className="text-slate-700 text-xs pb-10 ">
                Here you will find a complete list of your lessons with the option to download protocols in PDF format.
            </p>
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
                {/* <TableBody emptyContent={"No Lessons."}>{[]}</TableBody> */}
            </Table>

        </div>


    );
}

export default Protocol

