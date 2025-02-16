import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./EventDetailsPage.css";

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [email, setEmail] = useState(Cookies.get("user_email") || "");
  const [phoneNumber, setPhoneNumber] = useState("+212620169238"); // New state for phone number
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        if (eventId) {
          console.log(`Fetching event details for event ID: ${eventId}`);
          const response = await axios.get(
            `http://localhost:8000/Event/events/${eventId}/`
          );
          console.log("Event details fetched:", response.data);
          setEventDetails(response.data);

          const location = response.data.location;
          const geocodeResponse = await axios.get(
            "https://nominatim.openstreetmap.org/search",
            {
              params: {
                q: location,
                format: "json",
                limit: 1,
              },
            }
          );

          if (geocodeResponse.data.length > 0) {
            const { lat, lon } = geocodeResponse.data[0];
            setCoordinates([lat, lon]);
          }

          setLoading(false);
        } else {
          setError(new Error("Event ID not provided"));
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value); // Update phone number state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/Event/events/${eventId}/generate_ticket/`,
        {
          email: email,
          phone_number: phoneNumber, // Send phone number
        }
      );
      setSuccessMessage(
        "Email submitted successfully. Check your inbox for the ticket!"
      );
      setEmail("");
      setPhoneNumber(""); // Reset phone number input
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      setSuccessMessage("");
    }
    setSubmitting(false);
  };

  if (loading) return <div className="text-red"><center>Loading event details...</center></div>;
  if (error) return <div>Error fetching event details: {error.message}</div>;

  return (
    <div className="event-details-page mt-5 bg-image">
      <div className="container-fluid about py-5">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-xl-5">
              <div className="h-100">
                <img
                  src="\img\G3.png"
                  className="img-fluid w-100 h-100"
                  alt="Image"
                />
              </div>
            </div>
            <div className="col-xl-7">
              <h3 className="text-uppercase text-secondary">EVENT DETAILS</h3>
              <h1 className="mb-4">Give a helping hand to a needy people</h1>
              <p className="fs-5 mb-4">
                Explore the captivating details of our event dedicated to
                helping those in need. Immerse yourself in an enriching
                experience where every detail matters.
              </p>
              <div className="tab-class bg-secondary p-4">
                <div className="tab-content">
                  <div id="tab-1" className="tab-pane fade show p-0 active">
                    <div className="row">
                      <div className="col-12">
                        <div className="d-flex">
                          <div className="text-start my-auto">
                            <h5 className="text-uppercase mb-3">
                              <b>Be a Hero: Give Blood, Give Hope</b>
                            </h5>
                            <p className="mb-4">
                              Join us for this essential event. Your generosity
                              can save lives and inspire others to follow in
                              your footsteps. Together, we make a real
                              difference. Give blood, give hope - be the hero
                              the world needs today.
                            </p>
                            <div className="d-flex align-items-center justify-content-start">
                              <a
                                className="btn-hover-bg btn rounded-5 text-white py-2 px-4"
                                href="#"
                                style={{
                                  backgroundColor: "#cc466a",
                                  color: "white",
                                }}
                              >
                                Read More
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center ">
            <center>
              {" "}
              <span className="subheading text-black mb-2">
                Welcome to Blood Care
              </span>
              <h2 className="subheading text-black mb-5">
                In This Page You Can View:
              </h2>
            </center>
          </div>
          <div className="row">
            <div className="col-md-3 services-2 w-100 text-center">
              <div className="icon icon-1 d-flex align-items-center justify-content-center">
                <img src="\img\event1.png" alt="Image" />
              </div>
              <div className="text">
                <h4>Details</h4>
                <p>
                  Discover when and at what time the event will take place. Mark
                  a calendar to ensure you don't miss this event.
                </p>
              </div>
            </div>
            <div className="col-md-3 services-2 w-100 text-center">
              <div className="icon icon-2 d-flex align-items-center justify-content-center">
                <img src="\img\organizer.png" alt="Image" />
              </div>
              <div className="text">
                <h4>Organizer</h4>
                <p>
                  Learn about the association organizing this event. Find out
                  how they are striving to make a positive difference.
                </p>
              </div>
            </div>
            <div className="col-md-3 services-2 w-100 text-center">
              <div className="icon icon-3 d-flex align-items-center justify-content-center">
                <img src="\img\adress.png" alt="Image" />
              </div>
              <div className="text">
                <h4>Adress</h4>
                <p>
                  Check out where the event will be held. Learn where you can
                  contribute and meet fellow participants.
                </p>
              </div>
            </div>
            <div className="col-md-3 services-2 w-100 text-center">
              <div className="icon icon-4 d-flex align-items-center justify-content-center">
                <img src="\img\Participate.png" alt="Image" />
              </div>
              <div className="text">
                <h4>Participate</h4>
                <p>
                  Get involved and be a part of this meaningful event. Share
                  your details to receive your ticket .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="event-details-container">
        <div className="event-details">
          <center>
            {" "}
            <table className="details-table">
              {" "}
              <tbody>
                <tr>
                  <td className="details-header">Details</td>
                </tr>
                <tr>
                  <td className="details-label">Date:</td>
                  <td>
                    {new Date(eventDetails.date_and_hour).toLocaleDateString()}
                  </td>
                </tr>
                <tr>
                  <td className="details-label">Time:</td>
                  <td>
                    {new Date(eventDetails.date_and_hour).toLocaleTimeString()}
                  </td>
                </tr>
                <tr>
                  <td className="details-label">Cost:</td>
                  <td>Free</td>
                </tr>
                <tr>
                  <td className="details-header">Organizer</td>
                </tr>
                <tr>
                  <td className="details-label">Association:</td>
                  <td>{eventDetails.association_or_hospital}</td>
                </tr>
                <tr>
                  <td className="details-label">Phone:</td>
                  <td>01 4537 8639 243</td>
                </tr>
                <tr>
                  <td className="details-header">Address</td>
                </tr>
                <tr>
                  <td className="details-label">Location:</td>
                  <td>{eventDetails.location}</td>
                </tr>
              </tbody>{" "}
            </table>
          </center>

          {coordinates && (
            <MapContainer
              center={coordinates}
              zoom={13}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={coordinates}>
                <Popup>{eventDetails.location}</Popup>
              </Marker>
            </MapContainer>
          )}
          <div style={{ paddingTop: "20px" }}>
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
                </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={handlePhoneChange}
                required
              />
            </div>
    <button
        type="submit"
        disabled={submitting}
        className="btn rounded-5"
        style={{ backgroundColor: "#cc466a", color: "white" }}
    >
        {submitting ? "Submitting..." : "Participate"}
    </button>
</form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;

