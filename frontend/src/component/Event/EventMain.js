import React, { useState, useEffect } from "react";
import EventForm from "./EventForm";
import PlannedEventsList from "./PlannedEventsList";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const EventMain = () => {
  const [refreshPage, setRefreshPage] = useState(false);
  const userType = Cookies.get("user_type");

  useEffect(() => {
    if (refreshPage) {
      window.location.reload();
      setRefreshPage(false);
    }
  }, [refreshPage]);

  const handleEventSubmitted = () => {
    setRefreshPage(true);
  };

  if (userType !== "citizen" && userType !== "association") {
    return <Navigate to="/error" />;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ marginRight: "10px" }}>
    <EventForm onEventSubmitted={handleEventSubmitted} /> 
        </div>
      </div>
    </div>
  );
};

export default EventMain;
