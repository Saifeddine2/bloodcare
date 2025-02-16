import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import "./css/templatemo-digimedia-v2.css";
import axios from "axios";
import Cookies from "js-cookie";

function EventForm({ onEventSubmitted }) {
  const associationName = Cookies.get("name");
  const navigate = useNavigate();
  const userType = Cookies.get("user_type");
  const [formData, setFormData] = useState({
    eventname: "",
    location: "",
    association_or_hospital: associationName,
    date: "",
    hour: "",
  });

  const [userLocation, setUserLocation] = useState(null);
  const [previousPath, setPreviousPath] = useState("");
  const location = useLocation();

  const isAuthorizedUser = userType === "association" || userType === "hospital";

  useEffect(() => {
    if (!isAuthorizedUser) {
      return;
    }

    const getLocation = () => {
      if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        return;
      }
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    };

    getLocation();
    setPreviousPath(location.pathname);
  }, [location.pathname, isAuthorizedUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/Event/ajouter_event/",
        formData
      );
      if (response.status === 201) {
        alert("Your Event has been created!");
        onEventSubmitted();
        setFormData({
          eventname: "",
          location: "",
          association_or_hospital: associationName,
          date: "",
          hour: "",
        });
        navigate("/myevents");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  if (!isAuthorizedUser) {
    return <Navigate to="/error" />;
  }

  return (
    <div id="contact" className="contact-us section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div
              className="section-heading wow fadeIn"
              data-wow-duration="1s"
              data-wow-delay="0.5s"
            >
              <br />
              <h4>
                <br />
                <br />
                Create Event <em>Now</em>
              </h4>
              <div className="line-dec"></div>
            </div>
          </div>
          <div
            className="col-lg-12 wow fadeInUp"
            data-wow-duration="0.5s"
            data-wow-delay="0.25s"
          >
            <form
              id="contact"
              onSubmit={handleSubmit}
              style={{
                boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
                position: "relative",
                backgroundColor: "#fff",
                borderRadius: "23px",
                textAlign: "center",
                marginTop: "1%",
              }}
            >
              <div className="row">
                <div className="col-lg-12">
                  <div className="contact-dec"></div>
                </div>
                <div
                  className="col-lg-5"
                  style={{ flex: "0 0 auto", width: "41.66666667%" }}
                >
                  {userLocation && (
                    <div id="map">
                      <iframe
                        src={`https://maps.google.com/maps?q=${userLocation.lat},${userLocation.lng}&z=13&ie=UTF8&iwloc=&output=embed`}
                        title="User Location"
                        width="100%"
                        height="500"
                        frameBorder="0"
                        style={{ border: "0" }}
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </div>
                <div className="col-lg-7">
                  <div className="fill-form">
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label
                          className="form-label visually-hidden"
                          htmlFor="inputEventName"
                        >
                          Event Name
                        </label>
                        <input
                          className="form-control form-quriar-control"
                          id="inputEventName"
                          type="text"
                          name="eventname"
                          placeholder="Event Name"
                          value={formData.eventname}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-12 mb-3">
                        <label
                          className="form-label visually-hidden"
                          htmlFor="inputLocation"
                        >
                          Location
                        </label>
                        <input
                          className="form-control form-quriar-control"
                          id="inputLocation"
                          type="text"
                          name="location"
                          placeholder="Location"
                          value={formData.location}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label
                          className="form-label visually-hidden"
                          htmlFor="inputDate"
                        >
                          Date
                        </label>
                        <input
                          className="form-control form-quriar-control"
                          id="inputDate"
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label
                          className="form-label visually-hidden"
                          htmlFor="inputHour"
                        >
                          Hour
                        </label>
                        <input
                          className="form-control form-quriar-control"
                          id="inputHour"
                          type="time"
                          name="hour"
                          value={formData.hour}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary text-white "
                    >
                      Create Event
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventForm;
