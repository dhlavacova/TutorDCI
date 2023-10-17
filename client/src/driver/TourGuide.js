import React, { useEffect } from 'react';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

function TourGuide({ isAuthenticated }) {
  const startTour = () => {
    const driverObj = driver();



    driverObj.highlight({
      element: "#botton-book",
      popover: {
        title: "Book a tutoring",
        description: "Click this button to book a tutoring.",
        className: 'driver-highlighted'
      }
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      startTour(); // Inicia el tour cuando el usuario inicia sesión
    }
  }, [isAuthenticated]);

  return null;
}

export default TourGuide;