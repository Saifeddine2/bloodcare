import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../Event/css/templatemo-digimedia-v2.css";

import axios from "axios";

function AlertForm({ onAlertSubmitted }) {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    lieu: "",
    tel: "",
    typeDeSang: "",
    niveauGravite: "",
    description: "",
  });

  const [userLocation, setUserLocation] = useState(null);
  const [previousPath, setPreviousPath] = useState("");
  const location = useLocation();

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getLocation();

    setPreviousPath(location.pathname);
  }, [location.pathname]);

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
        "http://localhost:8000/alerte/ajouter_alerte/",
        formData
      );
      if (response.status === 201) {
        alert("Your Alert have been shared ! Wait for donation ");
        onAlertSubmitted();
        setFormData({
          nom: "",
          prenom: "",
          lieu: "",
          tel: "",
          typeDeSang: "",
          niveauGravite: "",
          description: "",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
    }
  };
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
              <h4>
                <br /> <br /> <br />
                Share Alert <em>Now</em>
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
              }}
            >
              <div className="row">
                <div class="col-lg-12">
                  <div class="contact-dec"> </div>
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
                      <div className="col-md-6 mb-3">
                        <label
                          className="form-label visually-hidden"
                          htmlFor="inputNom"
                        >
                          Last Name
                        </label>
                        <input
                          className="form-control form-quriar-control"
                          id="inputNom"
                          type="text"
                          name="nom"
                          placeholder="Last Name"
                          value={formData.nom}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label
                          className="form-label visually-hidden"
                          htmlFor="inputPrenom"
                        >
                          First Name
                        </label>
                        <input
                          className="form-control form-quriar-control"
                          id="inputPrenom"
                          type="text"
                          name="prenom"
                          placeholder="FIrst name"
                          value={formData.prenom}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-12 mb-3">
                        <label
                          className="form-label visually-hidden"
                          htmlFor="inputTel"
                        >
                          Phone number
                        </label>
                        <input
                          className="form-control form-quriar-control"
                          id="inputTel"
                          type="tel"
                          name="tel"
                          placeholder="Phone Number"
                          value={formData.tel}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-12 mb-3">
                        <input
                          className="form-control"
                          type="text"
                          name="lieu"
                          placeholder="Location"
                          value={formData.lieu}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label
                            className="visually-hidden"
                            htmlFor="selectTypeDeSang"
                          >
                            Blood type
                          </label>
                          <select
                            className="form-select"
                            id="selectTypeDeSang"
                            name="typeDeSang"
                            value={formData.typeDeSang}
                            placeholder=" Select the type of blood"
                            onChange={handleChange}
                            required
                          >
                            <option value="" disabled selected hidden>
                              Blood Type
                            </option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                          </select>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label
                            className="visually-hidden"
                            htmlFor="selectNiveauGravite"
                          >
                            Niveau de gravité
                          </label>
                          <select
                            className="form-select"
                            id="selectNiveauGravite"
                            name="niveauGravite"
                            value={formData.niveauGravite}
                            onChange={handleChange}
                            required
                          >
                            <option value="" disabled selected hidden>
                              Severity level
                            </option>
                            <option value="faible">Low</option>
                            <option value="moyen">Medium</option>
                            <option value="grave">High</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-12 mb-3">
                        <label
                          className="form-label visually-hidden"
                          htmlFor="inputDescription"
                        >
                          Details
                        </label>
                        <textarea
                          className="form-control form-quriar-control description-textarea"
                          id="inputDescription"
                          name="description"
                          placeholder="Details"
                          value={formData.description}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn   "
                      style={{
                        width: "200px",
                      }}
                    >
                      ALERT NOW
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

export default AlertForm;
