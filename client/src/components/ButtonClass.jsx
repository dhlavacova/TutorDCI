import React, { useState } from "react";
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

export default function ButtonClass({ task }) {
  const { deleteTask } = useTasks();
  const [selectedOption, setSelectedOption] = React.useState(new Set(["join"]));

  const descriptionsMap = {
    join:
      "Enter the Zoom session and engage in real-time educational experiences, where you can learn and participate interactively.",
    cancel:
      "If your plans change, easily cancel your reservation to allow other students to benefit from this learning opportunity.",
    calendar:
      "Streamline your academic life with a single click by adding this class to your Google Calendar, ensuring you never miss an important session on your journey to knowledge.",
  };

  const labelsMap = {
    join: "Join class",
    cancel: "Cancel this class",
    calendar: "Add to calendar",
  };

  const selectedOptionValue = Array.from(selectedOption)[0];

  const handleClick = () => {
    if (selectedOptionValue === "cancel") {
      // Solo ejecuta la función de cancelación cuando se hace clic en "Cancel this class"
      if (task) {
        deleteTask(task._id);
      }
    } else {
      // Aquí puedes implementar la lógica para "Join class" o "Add to calendar"
      // según los requisitos de tu aplicación.
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
          <DropdownItem key="calendar" description={descriptionsMap["calendar"]}>
            {labelsMap["calendar"]}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
}
