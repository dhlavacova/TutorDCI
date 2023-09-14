import React, { useState } from "react";
import { Button, Card, Input, Label } from "../components/ui";
import { useAuth } from "../context/authContext";

function TutorProfile() {

  const [availability, setAvailability] = useState("");
  const [platformLink, setPlatformLink] = useState("");

  const { user } = useAuth(); // Obtén la información del usuario autenticado si es necesario

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar la información del perfil del tutor al servidor para guardarla
    // Puedes usar una solicitud POST a tu API para esto
    const tutorProfileData = {
      availability,
      platformLink,
    };

    // Envía los datos al servidor
    // Ejemplo de solicitud POST:
    // fetch('/api/profile/tutor', {
    //   method: 'POST',
    //   body: JSON.stringify(tutorProfileData),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    // .then(response => response.json())
    // .then(data => {
    //   // Manejar la respuesta del servidor, como mostrar un mensaje de éxito
    //   console.log(data);
    //   alert("Perfil de tutor guardado exitosamente");
    // })
    // .catch(error => {
    //   // Manejar errores, como mostrar un mensaje de error
    //   console.error(error);
    //   alert("Error al guardar el perfil de tutor");
    // });

    // Esto es solo un ejemplo de cómo se podría enviar la información al servidor.
  };

  return (
    <div className="bg-gray-100 max-w-md w-full p-10 rounded-md ">
      <h1 className="text-xl font-bold">Tutor Profile</h1>
      <form onSubmit={handleSubmit}>
        {/* <Label htmlFor="subject">Subject</Label>
        <select
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        >
          <option value="">Select a subject</option>
          <option value="Online Marketing">Online Marketing</option>
          <option value="Web Development">Web Development</option>
          {/* Agrega más opciones según sea necesario }
        </select> */}*/




        <Label htmlFor="availability">Availability</Label>
        <Input
          type="text"
          name="availability"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          required
        />

        <Label htmlFor="platformLink">Platform Link</Label>
        <Input
          type="text"
          name="platformLink"
          value={platformLink}
          onChange={(e) => setPlatformLink(e.target.value)}
          required
        />

        <Button type="submit">Guardar</Button>
      </form>
    </div>
  );
}

export default TutorProfile;

