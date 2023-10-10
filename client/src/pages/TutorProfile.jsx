import React, { useState } from "react";
import { useEffect } from "react";
import {useInfoTutor} from "../context/infotutorContext";
import { useAuth } from "../context/authContext";
import {FaCalendar, FaCamera, FaClock, FaHourglass} from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import curve from "../assets/ttten.svg"
import {Label} from "../components/ui/index.js";



function TutorProfile() {
  const [classNumber, setClassNumber] = useState("");
  const [course, setCourse] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const { isAuthenticated, user } = useAuth();
  const { availibilityTutor, getAvailibilityTutor } = useInfoTutor();
  useEffect(() => {
    getAvailibilityTutor();
  }, []);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  return (
      <div>
        <div className="w-full p-10 rounded-xs">

          <div className="bg-slate-300 flex items-center p-10 rounded-md relative" style={{
            backgroundImage: `url(${curve})`, // Establece el SVG como fondo

            backgroundSize: "cover", // Ajusta el tamaño del fondo según sea necesario
            backgroundRepeat: "no-repeat", // Evita la repetición del fondo
            boxShadow: `-6px 6px 10px rgba(0, 0, 0, 0.2)`,
            zIndex: 1,
          }}>

            <label
                htmlFor="profileImageInput"
                className="relative cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
              <img
                  src={profileImage ? URL.createObjectURL(profileImage) : "/img/avatar-default.jpeg"}
                  alt=""
                  className="w-40 h-40 rounded-full"
              />
              {isHovered && (
                  <div className="absolute inset-0 bg-gray-300 bg-opacity-40 flex justify-center items-center rounded-full">
                    <input
                        type="file"
                        name="profileImage"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="profileImageInput"
                    />
                    <FaCamera className="text-3xl text-white" />
                  </div>
              )}
            </label>
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

        </div>
        <div className="max-w-md w-full p-10 rounded-md ">

          {availibilityTutor && (
              <div className= "mt-5 flex -mx-2">

                  { availibilityTutor.map((tutor,index)=> ( tutor.availability.map(avail=> (
                      <ul>
                        <li key={index} className="w-2/3 px-2">

                          <Label>
                            <FaCalendar/> Day: {avail.day}
                          </Label>
                          <Label>
                            <FaClock/> Time: {avail.time}
                          </Label>
                          <Label>
                            <FaHourglass/> Duration: {avail.duration} Hour
                          </Label>
                        </li>
                      </ul>
                  ))))}

              </div>
          )}

        </div>
      </div>
  );
}

export default TutorProfile;