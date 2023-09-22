import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User } from "@nextui-org/react";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";

export default function App() {
    const { logout, user } = useAuth();

    // Supongamos que userRole está disponible en el contexto.
    const userRole = user.role;

    return (
        <div className="flex items-center gap-4">
            <Dropdown placement="bottom-start">
                <DropdownTrigger>
                    <User
                        as="button"
                        avatarProps={{
                            isBordered: true,
                            src: "https://i.pravatar.cc/150?u=a04258114e29026708c",
                        }}
                        className="transition-transform"
                        description={`DCI@${user.role}`}
                        name={user.username}
                    />
                </DropdownTrigger>


                <DropdownMenu aria-label="User Actions" variant="flat" className="text-black">
                    <DropdownItem key="profile" >
                        <Link to={`/profile/${userRole}`}>
                            <div className="w-full">Profile</div>
                            </Link>

                    </DropdownItem>
                    <DropdownItem key="settings">
                        <Link to="/settings">My Settings</Link>
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger" onClick={logout}>
                        Log Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
