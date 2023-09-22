import React, { useState } from "react";
import { Button, Card, Input, Label } from "../components/ui";
import { useAuth } from "../context/authContext";
import { FaCamera } from "react-icons/fa";


function TutorProfile() {
  const [classNumber, setClassNumber] = useState("");
  const [availability, setAvailability] = useState([]); // Un array para almacenar disponibilidad
  const [availabilityDay, setAvailabilityDay] = useState(""); // Día de disponibilidad
  const [availabilityTime, setAvailabilityTime] = useState(""); // Hora de disponibilidad
  const [availabilityDuration, setAvailabilityDuration] = useState(""); // Duración de la clase
  const [platformLink, setPlatformLink] = useState("");
  const [course, setCourse] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const { isAuthenticated, user } = useAuth();


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

  const addAvailability = () => {
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
      alert("Por favor, complete todos los campos de disponibilidad.");
    }
  };







  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes enviar la información del perfil del tutor, incluida la imagen de perfil (profileImage), al servidor para guardarla

    const tutorProfileData = {
      classNumber,
      availability,
      platformLink,
      course,
      profileImage, // Incluye la imagen de perfil en los datos del perfil
    };

    // Envía los datos al servidor

    // Limpia los campos después de enviar los datos si es necesario
    setClassNumber("");
    setAvailability("");
    setPlatformLink("");
    setCourse("");
    setProfileImage(null);

    // Esto es solo un ejemplo de cómo se podría enviar la información al servidor.
  };

  return (
    <div className="bg-gray-100 w-full p-10 rounded-xs">
      <div className="flex items-center p-10 bg-gray-100 rounded-md">
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
          <p className="text-4xl font-semibold mb-2">
            {isAuthenticated ? user.username : ""}
          </p>
          <p className="text-xs mb-4">
            {isAuthenticated ? user.email : ""}
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="course">Course</Label>
        <select
          className="w-full bg-gray-200 px-4 py-2 rounded-md text-black"
          name="course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        >
          <option value="">Select a course</option>
          <option value="Web Development">Web Development</option>
          <option value="Online Marketing">Online Marketing</option>
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

        <Label htmlFor="availability">Availability</Label>
        <div className="flex">
          <select
            className="w-1/3 bg-gray-200 px-2 py-2 rounded-md text-black"
            name="availabilityDay"
            value={availabilityDay}
            onChange={(e) => setAvailabilityDay(e.target.value)}
            required
          >
            <option value="">Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          <input
            type="time"
            name="availabilityTime"
            value={availabilityTime}
            onChange={(e) => setAvailabilityTime(e.target.value)}
            className="w-1/3 bg-gray-200 px-2 py-2 rounded-md text-black ml-2"
            required
          />
          <input
            type="number"
            name="availabilityDuration"
            value={availabilityDuration}
            onChange={(e) => setAvailabilityDuration(e.target.value)}
            placeholder="Duration"
            className="w-1/3 bg-gray-200 px-2 py-2 rounded-md text-black ml-2"
            required
          />
        </div>
        <Button type="button" onClick={addAvailability}>
          Add availability
        </Button>
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

        <div className="mt-4"></div>
        <Label htmlFor="platformLink">Platform Link</Label>
        <Input
          type="text"
          name="platformLink"
          value={platformLink}
          onChange={(e) => setPlatformLink(e.target.value)}
          placeholder="e.g., https://us02web.zoom.us/oz"
          required
        />

        <Button type="submit">Save</Button>
      </form>
    </div>
  );
}

export default TutorProfile;
