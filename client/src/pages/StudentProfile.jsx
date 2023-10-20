import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { FaCamera } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import curve from "../assets/ttten.svg";
import { useInfoStudent } from "../context/infostudentContext";


function StudentProfile() {
  const [profileImage, setProfileImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { allInfoStudents, getAllInfoStudents } = useInfoStudent();

  useEffect(() => {
    getAllInfoStudents();
  }, []);

  const currentStudent = allInfoStudents.students
    ? allInfoStudents.students.find(
      (student) => student.studentName === user.username
    )
    : null;

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
        <div
          className="bg-slate-300 flex items-center p-10 rounded-md relative"
          style={{
            backgroundImage: `url(${curve})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            boxShadow: `-6px 6px 10px rgba(0, 0, 0, 0.2)`,
            zIndex: 1,
          }}
        >
          <label
            htmlFor="profileImageInput"
            className="relative cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={profileImage ? URL.createObjectURL(profileImage) : "/img/avatar-default.png"}
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
          <div className="text-gray-900 ml-5">
            <p className="text-lg font-semibold border-b-2"
              style={{ borderColor: 'blue' }}>My Profile</p>
            <p className="text-4xl font-semibold">
              {isAuthenticated ? user.username : ""}
            </p>
            {currentStudent && (
              <>
                <p className="font-semibold">
                  {currentStudent.profession}</p>
                <p className="text-xs">DCI
                  {isAuthenticated ? user.role : ""}
                  {currentStudent.classNumber}</p>
              </>
            )}
            {currentStudent && (
              <p className="text-xs flex items-center">
                <FaEnvelope className="mr-1" />
                {currentStudent.studentEmail}
              </p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

export default StudentProfile;
