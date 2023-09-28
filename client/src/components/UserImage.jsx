import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User } from "@nextui-org/react";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";

export default function App() {
    const { logout, user } = useAuth();

    // Supongamos que userRole está disponible en el contexto.
    const userRole = user.role;
    console.log("user in App ", user)
    return (
        <div className="flex items-center gap-4">
            <Dropdown placement="bottom-start">
                <DropdownTrigger>
                    <Avatar  isBordered color="default"/>
                </DropdownTrigger>



                <DropdownMenu aria-label="User Actions" variant="faded"   className="text-black">
                    <DropdownItem key="profile" >

                        <Link to={`/profile/${userRole}`}>
                            <div className="w-full">Profile</div>
                        </Link>

                    </DropdownItem>
                    <DropdownItem key="settings" textValue="My Settings">
                      <Link to="/settings">My Settings</Link>
                    </DropdownItem>
                    <DropdownItem key="logout" textValue="Log Out" color="danger" onClick={logout}>
                        Log Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
