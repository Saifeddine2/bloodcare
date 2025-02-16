import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Event/css/templatemo-digimedia-v2.css";

const Alertlist = () => {
  const [alertes, setAlertes] = useState([]);
  const [selectedAlerte, setSelectedAlerte] = useState(null);

  useEffect(() => {
    const fetchAlertes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/alerte/liste_alertes/"
        );
        setAlertes(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des alertes :", error);
      }
    };

    fetchAlertes();
  }, []);

  const handleShowDetails = (alerte) => {
    setSelectedAlerte(alerte);
  };

  // aff que  les alertes de la dernière semaine
  const currentDate = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(currentDate.getDate() - 7); 
  const recentAlerts = alertes.filter(
    (alerte) => new Date(alerte.date) >= oneWeekAgo
  );

  // sort les alertes selon date
  const sortedAlerts = recentAlerts.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div
      className="container-fluid container-service py-5"
      style={{ maxHeight: "600px", overflowY: "auto" }}
    >
      <div className="container py-3">
        <center>
          <h4>
            Save a life <em>!</em>
          </h4>
        </center>
        {sortedAlerts.map((alerte) => (
          <div key={alerte.id} className="row mb-3">
            <div className="col-md-12">
              <div
                className="alert-item news-block d-flex mt-2 p-3"
                style={{
                  backgroundColor: "#54A9B9",
                  borderRadius: "20px",
                  boxShadow: "0 0 45px rgba(0, 0, 0, .05)",
                }}
              >
                <img src="/img/alerte.png"></img>
                <div className="news-block-info flex-grow-1 ms-3">
                  <div className="news-block-title mb-2">
                    <h6 className="text-white">
                      Blood type: {alerte.typeDeSang}
                    </h6>
                  </div>
                  <div className="news-block-date">
                    <p className="text-white">
                      Gravity level: {alerte.niveauGravite}
                    </p>
                  </div>
                  <div className="news-block-date">
                    <p className="text-white">
                      <i className="fas fa-map-marker-alt me-2"></i>Location :{" "}
                      {alerte.lieu}
                    </p>
                  </div>
                  <div className="news-block-date">
                    <p className="text-white">
                      <i class="fa-solid fa-calendar-days"></i> Date:{" "}
                      {new Date(alerte.date).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="news-block-action">
                  <button
                    className="btn "
                    onClick={() => handleShowDetails(alerte)}
                  >
                    Donate
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedAlerte && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", marginTop: "10%" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title container py-1">
                  <h4 style={{ fontSize: "2em" }}>
                    Emergency case for{" "}
                    <em>
                      {selectedAlerte.prenom} {selectedAlerte.nom}
                    </em>{" "}
                  </h4>
                </h5>
              </div>
              <div className="modal-body" style={{ marginTop: "20px" }}>
                <p style={{ fontSize: "1em" }}>
                  Details: {selectedAlerte.description}
                </p>
                <p style={{ fontSize: "1em" }}>
                  Phone number: {selectedAlerte.tel}
                </p>
              </div>
              <div className="modal-footer ">
                <button
                  style={{
                    border: "2px solid #a80707a5",
                    color: "#a80707a5",
                    transition: "all 0.3s ease",
                    backgroundColor: "transparent",
                  }}
                  type="button"
                  className="btn rounded-5 "
                  data-bs-dismiss="modal"
                  onClick={() => setSelectedAlerte(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alertlist;
