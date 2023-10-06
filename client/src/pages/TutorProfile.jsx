import React, { useState, useEffect } from "react";
import { Button, Card, Input, Label, Message } from "../components/ui";
import { useAuth } from "../context/authContext";
import { FaCamera } from "react-icons/fa";
import curve from "../assets/ttten.svg"
//import { createTutor} from "../api/infotutor.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//import { tutorSchema } from "../schemas/infotutor.js"



function TutorProfile() {

  const {
    // register,
    // handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tutorSchema)
  });

  const { isAuthenticated, user, errors: tutorErrors } = useAuth();

  const [classNumber, setClassNumber] = useState("");
  const [availability, setAvailability] = useState([]); // Un array para almacenar disponibilidad
  const [availabilityDay, setAvailabilityDay] = useState(""); // Día de disponibilidad
  const [availabilityTime, setAvailabilityTime] = useState(""); // Hora de disponibilidad
  const [availabilityDuration, setAvailabilityDuration] = useState(""); // Duración de la clase
  const [platformLink, setPlatformLink] = useState("");
  const [course, setCourse] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [profileImage, setProfileImage] = useState(null);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleMouseEnter = (e) => {
    e.stopPropagation(); // Detiene la propagación del evento
    setIsHovered(true);
  };

  const handleMouseLeave = (e) => {
    e.stopPropagation(); // Detiene la propagación del evento
    setIsHovered(false);
  };

 /* const addAvailability = () => {
    // Verificar si se han ingresado todos los campos de disponibilidad
    if (availabilityDay && availabilityTime && availabilityDuration) {
      // Crear un objeto para representar la disponibilidad
      const newAvailability = {
        day: availabilityDay,
        time: availabilityTime,
        duration: availabilityDuration,
      };

      // Agregar la disponibilidad al array de disponibilidad
      setAvailability([...availability, newAvailability]);

      // Limpiar los campos de disponibilidad
      setAvailabilityDay("");
      setAvailabilityTime("");
      setAvailabilityDuration("");
    } else {
      alert("please complete the following conditions");
    }
  };*/
/*console.log({availability})
console.log({availabilityDay})
  console.log({})*/
  const handleSubmit = async (e,availability) => {
    e.preventDefault();
console.log("availability in hanldeSubmit",availability)
    try {
      // Crea un objeto con los datos del formulario
      const tutorData = {
        course,
        classNumber,
        availability:
            [{  day: availabilityDay,
          time: availabilityTime,
          duration: availabilityDuration,}],
        platformLink,
        profileImage,
      };
console.log({tutorData})
      // Llama a la función para crear un tutor en el servidor
      const response = await createTutor(tutorData);

      // Verifica la respuesta del servidor y muestra un mensaje si es necesario
      if (response.data && response.data.message) {
        console.log("Server response:", response.data.message);
        // Limpia los campos después de enviar los datos si es necesario
        setClassNumber("");
        setAvailability([]);
        setPlatformLink("");
        setCourse("");
        setProfileImage(null);
        setAvailabilityDay("");
        setAvailabilityTime("");
        setAvailabilityDuration("");
      } else {
        console.error("Error identifying user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // const [tutors, setTutors] = useState([]);
  // useEffect(() => {

  //   const fetchTutorProfile = async () => {
  //     try {
  //       const profileData = await getTutorsProfile();         setClassNumber(profileData.classNumber);
  //       setAvailability(profileData.availability);
  //       setPlatformLink(profileData.platformLink);
  //       setCourse(profileData.course);
   
  //     } catch (error) {
  //       console.error("Error fetching tutor profile:", error);
  //     }
  //   };

  //   if (isAuthenticated) {
  //     fetchTutorProfile();
  //   }
  // }, [isAuthenticated]); 

  return (
    <div className=" w-full p-10 rounded-xs">
      <div className=" flex items-center p-10 bg-gray-300 rounded-md
relative"
        style={{
          backgroundImage: `url(${curve})`, // Establece el SVG como fondo

          backgroundSize: "cover", // Ajusta el tamaño del fondo según sea necesario
          backgroundRepeat: "no-repeat", // Evita la repetición del fondo
          boxShadow: `-6px 6px 10px rgba(0, 0, 0, 0.2)`,
          zIndex: 1,
        }}
      >
        <label htmlFor="profileImageInput"
          className="relative cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>

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
          <p className="text-sm font-semibold">My profile</p>
          <p className="text-4xl font-semibold mb-1">
            {isAuthenticated ? user.username : ""}
          </p>


        </div>
      </div>



      <div className="w-full p-10 bg-gray-100  rounded-md flex ">
        <div className="w-1/2 ">
          {/*<form onSubmit={handleSubmit}>*/}
          {/*  <label className="text-xs text-black" htmlFor="course">Select the course you wish to teach</label>*/}
          {/*  <select*/}
          {/*    className="w-full mt-2 bg-gray-200 px-4 py-2 rounded-md text-black"*/}
          {/*    name="course"*/}
          {/*    value={course}*/}
          {/*    onChange={(e) => setCourse(e.target.value)}*/}
          {/*    required*/}
          {/*  >*/}
          {/*    <option value="">Select a course</option>*/}
          {/*    <option value="Web Development">Web Development</option>*/}
          {/*    <option value="Online Marketing">Online Marketing</option>*/}
          {/*  </select>*/}


          {/*  <Label htmlFor="classNumber">Course ID</Label>*/}
          {/*  <Input*/}
          {/*    type="text"*/}
          {/*    name="classNumber"*/}
          {/*    value={classNumber}*/}
          {/*    onChange={(e) => setClassNumber(e.target.value)}*/}
          {/*    placeholder="e.g., 22d08a"*/}
          {/*    required*/}
          {/*  />*/}

          {/*  <label className="text-xs text-black" htmlFor="availability">How many hours can you teach per week?</label>*/}
          {/*  <div className="flex mt-2">*/}
          {/*    <select*/}
          {/*      className="w-1/3 bg-gray-200 px-2 py-2 rounded-md text-black"*/}
          {/*      name="availabilityDay"*/}
          {/*      value={availabilityDay}*/}
          {/*      onChange={(e) => setAvailabilityDay(e.target.value)}*/}
          {/*      required*/}
          {/*    >*/}
          {/*      <option value="">Day</option>*/}
          {/*      <option value="Monday">Monday</option>*/}
          {/*      <option value="Tuesday">Tuesday</option>*/}
          {/*      <option value="Wednesday">Wednesday</option>*/}
          {/*      <option value="Thursday">Thursday</option>*/}
          {/*      <option value="Friday">Friday</option>*/}
          {/*      <option value="Saturday">Saturday</option>*/}
          {/*      <option value="Sunday">Sunday</option>*/}
          {/*    </select>*/}
          {/*    <input*/}
          {/*      type="time"*/}
          {/*      name="availabilityTime"*/}
          {/*      value={availabilityTime}*/}
          {/*      onChange={(e) => setAvailabilityTime(e.target.value)}*/}
          {/*      className="w-1/3 bg-gray-200 px-2 py-2 rounded-md text-black ml-2 "*/}
          {/*      required*/}
          {/*    />*/}
          {/*    <input*/}
          {/*      type="number"*/}
          {/*      name="availabilityDuration"*/}
          {/*      value={availabilityDuration}*/}
          {/*      onChange={(e) => setAvailabilityDuration(e.target.value)}*/}
          {/*      placeholder="2h"*/}
          {/*      className="w-1/3 bg-gray-200 px-2 py-2 rounded-md text-black ml-2"*/}
          {/*      required*/}
          {/*    />*/}
          {/*  </div>*/}

          {/*  <div className="mt-4"></div>*/}
          {/*  <Label htmlFor="platformLink">Platform Link</Label>*/}
          {/*  <Input*/}
          {/*    type="text"*/}
          {/*    name="platformLink"*/}
          {/*    value={platformLink}*/}
          {/*    onChange={(e) => setPlatformLink(e.target.value)}*/}
          {/*    placeholder="e.g., https://us02web.zoom.us/oz"*/}
          {/*    required*/}
          {/*  />*/}

          {/*  <Button type="submit">Save</Button>*/}
          {/*   <Button type="button" onClick={addAvailability}>Add Availability</Button>*/}

          {/*</form>*/}
        </div>
        <div className="w-1/2 p-10">
          {availability.length > 0 && (
            <Card>
              <div className="mt-2">
                <h2 className="text-2xl font-semibold ">{course}</h2>
                <p className="mb-4">Tutor in Course {classNumber}</p>
                <p className="font-semibold">Availability:</p>
                <ul>
                  {availability.map((item, index) => (
                    <li key={index}>
                      {item.day}, {item.time} hours, {item.duration} {item.duration > 1 ? "hours" : "hour"}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          )}
        </div>
      </div>


    </div>
  );
}

export default TutorProfile;