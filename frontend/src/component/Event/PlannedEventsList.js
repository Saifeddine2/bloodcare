import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./PlannedEventsList.css";
import Geocode from "../Map/Geocode";

const PlannedEventsList = () => {
  const [events, setEvents] = useState([]);
  const userType = Cookies.get("user_type");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/Event/liste_events/"
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    if (!dateString) return "Time not available";
    const date = new Date(dateString);
    const options = { hour: "2-digit", minute: "2-digit" };
    return date.toLocaleTimeString(undefined, options);
  };

  const futureEvents = events.filter((event) => {
    const eventDate = new Date(event.date_and_hour);
    const today = new Date();
    return eventDate > today;
  });

  if (userType !== "citizen" && userType !== "association") {
    return <Navigate to="/error" />;
  }

  return (
    <div className="events-container">
      <h1 className="events-title">
        <span className="black-text">Planned</span>{" "}
        <span style={{ color: "#cc466a" }}>Events!</span>{" "}
      </h1>
      <div className="events-list">
        {futureEvents.map((event) => (
          <div key={event.id} className="decoration__data">
            <img
              src="https://th.bing.com/th/id/R.8488212d54ffcca478b950faf962e76b?rik=4STiOHBqbhxnJA&pid=ImgRaw&r=0"
              alt=""
              className="decoration__img"
            />
            <h3 className="events-title">{event.eventname}</h3>

            <p>
              Organized by :
              <p style={{ color: "#cc466a", fontWeight: "bold" }}>
                {event.association_or_hospital}
              </p>
            </p>
            <p className="para">Location: {event.location}</p>
            <p className="para">Date: {formatDate(event.date_and_hour)}</p>
            <p className="para">Time: {formatTime(event.date_and_hour)}</p>
            <Link
              to={`/Event/events/${event.id}/`}
              className="button type2 rounded-5"
            >
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlannedEventsList;
