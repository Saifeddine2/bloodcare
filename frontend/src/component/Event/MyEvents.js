import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MyEvents.css";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import EditEvent from "./EditEvent";
import "./css/templatemo-digimedia-v2.css";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const associationName = Cookies.get("name");
  const [isAssociation, setIsAssociation] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const userType = Cookies.get("user_type");

    if (userType !== "association") {
      setIsAssociation(false);
    } else {
      fetchEvents();
    }
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://localhost:8000/Event/liste_events/"
      );
      const filtered = response.data.filter(
        (event) => event.association_or_hospital === associationName
      );
      setEvents(filtered);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Error fetching events");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (event) => {
    setSelectedEvent(event);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedEvent(null);
    fetchEvents();
  };

  if (!isAssociation) {
    return <Navigate to="/error" />;
  }

  return (
    <section className="events" id="events-section">
      <div className="content-wrapper">
        <div className="inner-container container-fluid">
          <div className="row">
            <div
              className="section-heading wow fadeIn"
              data-wow-duration="1s"
              data-wow-delay="0.5s"
            >
              <h4>
                My <em>Events</em>
              </h4>
              <center>
                <div className="line-dec "></div>
              </center>
            </div>
          </div>
          <div className="row">
            {loading && (
              <div className="col-md-12">
                <p className="my-events-loading-text">Loading events...</p>
              </div>
            )}
            {error && (
              <div className="col-md-12">
                <p className="my-events-error-text">{error}</p>
              </div>
            )}
            {events.map((event) => (
              <div key={event.id} className="col-md-4 mb-4">
                <div className="project-item">
                  <div className="event-item">
                    <div className="date">
                      <h3 className="events-title"> {event.eventname}</h3>
                    </div>
                    <div
                      className="dh"
                      style={{
                        marginTop: "2%",
                      }}
                    >
                      Date and time: {event.date_and_hour}
                    </div>
                    <div className="location">Location: {event.location}</div>
                    <div
                      className="row"
                      style={{
                        marginTop: "3%",
                      }}
                    >
                      <div className="col d-flex justify-content-start align-items-center">
                        <Link
                          to={`/Event/participants_details/${event.id}/`}
                          className="btn rounded-5"
                          style={{
                            backgroundColor: "rgba(0, 132, 139, 0.39)",
                            color: "black",
                          }}
                        >
                          View Participants
                        </Link>
                        <button
                          onClick={() => handleEditClick(event)}
                          className="btn rounded-5 ml-2"
                          style={{ backgroundColor: "#cc466a", color: "white" }}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedEvent && (
        <EditEvent
          show={showEditModal}
          onHide={handleEditModalClose}
          eventName={selectedEvent.eventname}
          location={selectedEvent.location}
          date={selectedEvent.date}
          time={selectedEvent.time}
          id={selectedEvent.id}
        />
      )}
    </section>
  );
};

export default MyEvents;
