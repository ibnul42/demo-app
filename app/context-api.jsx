"use client";

import React, { createContext, useContext, useState } from "react";

const HomeContext = createContext({
  selectedCamera: "Study Room",
  setSelectedCamera: () => {},
  selectedRoom: "Living Room",
  setSelectedRoom: () => {},
  dashboardRooms: [],
  cameraRooms: [],
});

export const HomeContextProvider = ({ children }) => {
  const [selectedRoom, setSelectedRoom] = useState("Living Room");
  const [selectedCamera, setSelectedCamera] = useState("Living Room 1");

  const dashboardRooms = ["Living Room", "Dining", "Bedroom 1", "Bedroom 2"];
  const cameraRooms = [
    "Living Room",
    "Study Room",
    "Bed Room",
    "Bed Room 2",
    "Balcony",
  ];

  const value = {
    selectedCamera,
    setSelectedCamera,
    selectedRoom,
    setSelectedRoom,
    dashboardRooms,
    cameraRooms,
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

export const useHomeContext = () => useContext(HomeContext);
