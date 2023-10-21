import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useTasks } from "../context/tasksContext";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { FiChevronDown } from "react-icons/fi";
// import Calendar from "../calendar.jsx"

export default function ButtonClass({ task, addToGoogleCalendar }) {
  const { deleteTask } = useTasks();
  const [selectedOption, setSelectedOption] = React.useState(new Set(["join"]));
  const [platformLink, setPlatformLink] = useState("");

  useEffect(() => {
    axios
      .get("/auth/availibility")
      .then((response) => {
        const tutorData = response.data;
        setPlatformLink(tutorData[0].platformLink);
      })
      .catch((error) => {
        console.error("Error fetching platform link:", error);
      });
  }, []);
  // useEffect(() => {
  //   gapi.load('client:auth2', () => {
  //     gapi.client.init({
  //       apiKey: 'AIzaSyBpuv2HQAoMR9HSuCElXbj972qI596Ii7k',
  //       clientId: '542822958898-kj68tsrqpvg1j2mo1r04b8vpqv1c8o3u.apps.googleusercontent.com',
  //       discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
  //       scope: 'https://www.googleapis.com/auth/calendar.events',
  //     });
  //   });
  // }, []);



  // function addToGoogleCalendar(classDetails) {
  //   gapi.client.calendar.events.insert({
  //     calendarId: 'primary', // Puedes cambiarlo si quieres usar un calendario diferente
  //     resource: {
  //       summary: classDetails.theme,
  //       description: 'Descripción del evento',
  //       start: {
  //         dateTime: classDetails.date, // Debe ser una fecha y hora en formato ISO 8601
  //       },
  //       end: {
  //         dateTime: classDetails.date, // Debe ser una fecha y hora en formato ISO 8601
  //       },
  //     },
  //   }).then((response) => {
  //     console.log('Evento creado:', response.result);
  //   }).catch((error) => {
  //     console.error('Error al crear el evento:', error);
  //   });
  // }


  const descriptionsMap = {
    join:
      "Enter the Zoom session and engage in real-time educational experiences, where you can learn and participate interactively.",
    cancel:
      "If your plans change, easily cancel your reservation to allow other students to benefit from this learning opportunity.",
  //   calendar:
  //     "Streamline your academic life with a single click by adding this class to your Google Calendar, ensuring you never miss an important session on your journey to knowledge.",//
   };

  const labelsMap = {
    join: "Join class",
    cancel: "Cancel this class",
    // calendar: "Add to calendar",
  };

  const selectedOptionValue = Array.from(selectedOption)[0];

  const handleClick = () => {
    if (selectedOptionValue === "cancel") {
      if (task) {
        deleteTask(task._id);
      }
    } else if (selectedOptionValue === "join") {
      if (platformLink) {
        window.location.href = platformLink;
      }
    } else if (selectedOptionValue === "calendar") {
      if (task) {
        // addToGoogleCalendar({
        //   theme: task.theme,
        //   tutor: task.tutor,
        //   student: task.student,
        //   date: task.date,
        // });

      }
    }
  };

  return (
    <ButtonGroup variant="shadow">
      <Button onClick={handleClick}>{labelsMap[selectedOptionValue]}</Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly>
            <FiChevronDown />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="options"
          selectedKeys={selectedOption}
          selectionMode="single"
          onSelectionChange={setSelectedOption}
          className="max-w-[300px]"
        >
          <DropdownItem key="join" description={descriptionsMap["join"]}>
            {labelsMap["join"]}
          </DropdownItem>
          <DropdownItem key="cancel" description={descriptionsMap["cancel"]}>
            {labelsMap["cancel"]}
          </DropdownItem>
          {/* <DropdownItem key="calendar" description={descriptionsMap["calendar"]}>
            {labelsMap["calendar"]}
          </DropdownItem> */}
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
}
