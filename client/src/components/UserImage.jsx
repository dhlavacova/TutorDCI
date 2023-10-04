import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";

export default function UserImage() {
    const { logout, user, isAuthenticated } = useAuth();

    const userRole = isAuthenticated && user.role;
    const isTutor = isAuthenticated && user.role === "tutor";

    return (
        <div className="flex items-center gap-4">
            <Dropdown placement="bottom-start">
                <DropdownTrigger>
                    <Avatar isBordered color="default" />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="faded" disabledKeys={["profile"]} className="text-black rounded-lg">
                    <DropdownItem key="profile" textValue="View Profile" className="h-16 gap-2 bg-slate-100">
                        <p className="font-semibold text-xs">Signed in as DCI {user.role}</p>
                        <p className="font-semibold">Welcome {user.username}</p>
                    </DropdownItem>
                    <DropdownItem key="userprofile" textValue="View UserProfile">
                        <Link to={`/profile/${userRole}`}>
                            <div className="w-full font-bold text-blue-600">My Profile</div>
                            <p className="text-xs text-slate-600 italic">Edit profile</p>
                        </Link>
                    </DropdownItem>
                    <DropdownItem key="settings" textValue="View Settings" color="primary">
                        <Link to="/settings">
                            <div className="w-full font-bold text-blue-600">My Settings</div>
                            <p className="text-xs text-slate-600 italic">New password</p>
                        </Link>
                    </DropdownItem>
                    <DropdownItem key="book" textValue="View Bookings" color="primary">
                        <Link to="/book">
                            <div className="w-full font-bold text-blue-600">My Booking</div>
                            <p className="text-xs text-slate-600 italic">New class</p>
                        </Link>
                    </DropdownItem>

                    {isTutor && (
                        <DropdownItem key="protocol" textValue="My Protocol" color="primary">
                            <Link to="/protocol">
                                <div className="w-full font-bold text-blue-600">My Protocol</div>
                                <p className="text-xs text-slate-600 italic">Tutor class</p>
                            </Link>
                        </DropdownItem>
                    )}

                    <DropdownItem
                        key="logout"
                        textValue="Log Out"
                        color="danger"
                        onClick={logout}>
                        Log Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
