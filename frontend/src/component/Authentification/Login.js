import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../Styles/counter.css";

const Login = ({ show, onHide }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    try {
      const { data } = await axios.post("http://localhost:8000/token/", user);
      Cookies.set("access_token", data.access);
      Cookies.set("refresh_token", data.refresh);

      const response = await axios.get("http://localhost:8000/user/profile/", {
        headers: {
          Authorization: `Bearer ${data.access}`,
        },
      });

      const userData = response.data;
      Cookies.set("user_type", userData.user_type);
      Cookies.set("user_email", userData.email);
      Cookies.set("name", userData.name);

      if (userData.user_type === "hospital") {
        navigate("/hospitals/blood_totals");
      } else {
        window.location.reload();
      }
      window.location.reload();
      onHide();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage("Invalid email or password.");
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
      } else {
        setErrorMessage("Network error. Please check your internet connection.");
      }
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered style={{ marginTop: "1%" }}>
      <Modal.Body className="text-center">
        <center>
          <img
            className="align-self-start me-3"
            src="/img/BloodCare.png"
            alt=""
            style={{ maxWidth: "200px" }}
          />
        </center>
        <h1>Sign in to your account</h1>
        <br/>
        <center>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit} style={{ width: "90%" }}>
            <div className="form-group">
              <input
                className="form-control  text-center rounded-5 "
                placeholder="Enter Email"
                name="email"
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: "10px", margin: "0 auto", width: "100%" }}
              />
            </div>
            <div className="form-group">
              <input
                name="password"
                type="password"
                className="form-control  text-center rounded-5"
                placeholder="Enter password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                style={{ padding: "10px", margin: "0 auto", width: "100%" }}
              />
            </div>
            <div className="form-group d-flex justify-content-between mb-4">
              <input
                type="checkbox"
                className="form-check-input rounded-5 ml-1"
                id="rememberMe"
              />
              <label className="form-check-label ml-2 " htmlFor="rememberMe">
                Remember me
              </label>
              <a href="#" className="ml-auto">
                Forgot your password?
              </a>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="danger"
                type="submit"
                className="group rounded-5 relative flex justify-center "
                style={{
                  width: "200px",
                  margin: "0 auto",
                  backgroundColor: "#cc466a",
                }}
              >
                <i className="bi bi-lock-fill"></i>
                Login
              </Button>
            </div>
          </form>
        </center>
        <br />
      </Modal.Body>
    </Modal>
  );
};

export default Login;
