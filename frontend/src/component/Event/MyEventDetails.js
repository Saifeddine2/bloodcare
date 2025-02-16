import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Navigate } from "react-router-dom";
import "./MyEventDetails.css";
import Cookies from "js-cookie";

const MyEventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAssociation, setIsAssociation] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const userType = Cookies.get("user_type");

    if (userType !== "association") {
      setIsAssociation(false);
    } else {
      const fetchEventDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/Event/participants_details/${eventId}/`
          );
          setEvent(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching event details:", error);
          setError("Error fetching event details");
          setLoading(false);
        }
      };

      fetchEventDetails();
    }
  }, [eventId]);

  if (!isAssociation) {
    return <Navigate to="/error" />;
  }

  if (loading) {
    return <p className="myevent-loading-text">Loading event details...</p>;
  }

  if (error) {
    return <p className="myevent-error-text">{error}</p>;
  }

  const filteredParticipants = event.participant_emails.filter((email) =>
    email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="myevent-details-wrapper">
      <div className="box">
        <h2 className="myevent-title">Event Participants Details</h2>
        <p className="myevent-participants-count">
          Number of Participants: {event.participants_count}
        </p>
        <div className="form-group">
          <input
            className="form-control  text-center rounded-5 "
            placeholder="Search participants"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: "10px", margin: "0 auto", width: "70%" }}
          />
        </div>
        <ul
          className="myevent-participant-list overflow-auto"
          style={{ maxHeight: "300px" }}
        >
          {filteredParticipants.map((email, index) => (
            <li key={index} className="myevent-participant-email">
              <span>{index + 1}</span> {email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyEventDetails;
