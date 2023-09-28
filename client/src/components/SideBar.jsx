import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import curve from "../assets/ttten.svg"
import gggyrate from "../assets/gggyrate.svg"
import Avatar from '../components/ui/Avatar'

import { Button, Card, Input, Label } from "../components/ui";





function SideBar() {
    const [profileImage, setProfileImage] = useState(null);
    const { isAuthenticated, user } = useAuth();
    const [course, setCourse] = useState("");
    const [classNumber, setClassNumber] = useState("");





    const userRole = user.role;



    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
    };



    return (
        <div className="flex min-h-screen px-10 ">
            <aside className="w-60 bg-blue-300 rounded-md  " style={{

                backgroundImage: `url()`, // Establece el SVG como fondo

                backgroundSize: "cover", // Ajusta el tamaño del fondo según sea necesario
                backgroundRepeat: "no-repeat", // Evita la repetición del fondo
                boxShadow: `-6px 6px 10px rgba(0, 0, 0, 0.2)`,
                zIndex: 1,

            }}>
                <nav className="mt-4">
                    <Link
                        to={`/profile/${userRole}`}
                        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-400 hover:text-white"
                    >
                        Profile
                    </Link>
                    <Link
                        to="/projects"
                        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-400 hover:text-white"
                    >
                        Settings
                    </Link>
                    <Link
                        to="/team"
                        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-400 hover:text-white"
                    >
                        Team
                    </Link>
                    <Link
                        to="/calendar"
                        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-400 hover:text-white"
                    >
                        Calendar
                    </Link>
                </nav>
            </aside>
            <main >
                <div className=" rounded-xs pl-10 flex-1  ">

                    <div className=" bg-warning-100 flex items-center p-10 rounded-md relative "
                        style={{
                            // backgroundImage: `url(${gggyrate})`, // Establece el SVG como fondo

                            backgroundSize: "cover", // Ajusta el tamaño del fondo según sea necesario
                            backgroundRepeat: "no-repeat", // Evita la repetición del fondo
                            boxShadow: `-6px 6px 10px rgba(0, 0, 0, 0.2)`,
                            zIndex: 1,
                            height: "800px",
                            width: "900px",
                        }}>

                        <Avatar
                            profileImage={profileImage}
                            handleImageChange={handleImageChange}
                        />

                        <div className="text-gray-900 ml-4">
                            <p className="text-sm font-semibold">My Profile</p>
                            <p className="text-4xl font-semibold mb-1">{isAuthenticated ? user.username : ""}
                            </p>
                            <p className="font-semibold">{course}  </p>
                            <p className="text-xs">DCI {isAuthenticated ? user.role : ""} {classNumber}</p>
                            <p className="text-xs flex items-center">
                                {isAuthenticated && (
                                    <>
                                        <FaEnvelope className="mr-1" /> {user.email}
                                    </>
                                )}
                            </p>
                        </div>

                    </div>
                    <div className="max-w-md w-full p-10 rounded-md " >
                        <form>
                            <Label htmlFor="course">Select your profession</Label>
                            <select
                                className="w-full bg-gray-200 px-4 py-2 rounded-md text-black"
                                name="course"
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                                required
                            >
                                <option value="">Select your profession</option>
                                <option value="Web Developer">Web Developer</option>
                                <option value="Online Marketer">Online Marketer</option>
                            </select>


                            <Label htmlFor="classNumber">Class Number</Label>
                            <Input
                                type="text"
                                name="classNumber"
                                value={classNumber}
                                onChange={(e) => setClassNumber(e.target.value)}
                                placeholder="e.g., 22-d08-a"
                                required
                            />

                            <Button type="button" >
                                Save
                            </Button>




                        </form>
                    </div >
                </div>


            </main>
        </div>
    );
}

export default SideBar;
