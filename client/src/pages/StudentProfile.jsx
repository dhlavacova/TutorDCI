import React, { useState } from "react";
import { Button, Card, Input, Label } from "../components/ui";
import { useAuth } from "../context/authContext";
import { FaCamera } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import curve from "../assets/ttten.svg"
import gggyrate from "../assets/gggyrate.svg"
import ssstar from "../assets/ssstar.svg"
import haikei from "../assets/blurry-gradient-haikei.svg"


function StudentProfile() {
  const [classNumber, setClassNumber] = useState("");
  const [course, setCourse] = useState("");
  const [availability, setAvailability] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const { isAuthenticated, user } = useAuth();

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
      <div className="bg-gray-300 w-full p-10 rounded-xs">

      <div className="flex items-center p-10 rounded-md relative" style={{
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
      <Card>
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
      </Card>
    </div>
  );
}

export default StudentProfile;
