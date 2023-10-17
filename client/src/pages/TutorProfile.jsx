import React, { useState } from "react";
import { useEffect } from "react";
import { useInfoTutor } from "../context/infotutorContext";
import { useAuth } from "../context/authContext";
import { FaCalendar, FaCamera, FaClock, FaHourglass } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import curve from "../assets/ttten.svg"




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

        <div className="bg-slate-200 flex items-center p-10 rounded-md relative" style={{
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
              src={profileImage ? URL.createObjectURL(profileImage) : "/img/avatar.png"}
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
      <div className="max-w-md  p-10 m-5 rounded-md bg-slate-200 bg-cover bg-no-repeat relative shadow-xl transform translate-x-6 translate-y-6 z-10"
        style={{ backgroundImage: `url(${curve})` }}>
        {availibilityTutor && (
          <div className="mt-4 ">
            <ul>
              {availibilityTutor.map((tutor, index) =>
                tutor.availability.map((avail, availIndex) => (
                  <li key={index} >
                    <label htmlFor="availableHours" className="text-lg font-bold block mb-2 " >
                      Available Hours:
                    </label>
                    <div className="flex items-center text-sm mt-2">
                      <FaCalendar className="mr-2" /> {avail.day}
                    </div>
                    <div className="flex items-center text-sm mt-2">
                      <FaClock className="mr-2" /> {avail.time}
                    </div>
                    <div className="flex items-center text-sm mt-2">
                      <FaHourglass className="mr-2 " /> {avail.duration} Hour
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default TutorProfile;