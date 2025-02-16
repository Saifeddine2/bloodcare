import React, { useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "../../Styles/counter.css";

const Register = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    user_type: "",
    city: "",
    blood_type: "",
    phone_number: ""
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match.");
      setTimeout(() => {
        setPasswordMatchError(null);
      }, 5000);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/user/register/",
        formData
      );
      console.log("user registered");
      setSuccessMessage("User registered successfully! Try to login now ");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error("Error registering:", error);
      setErrorMessage("User already exists. Please try another email.");
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
        <h1>Create a new account</h1>
        <br />
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        {passwordMatchError && (
          <div className="alert alert-danger" role="alert">
            {passwordMatchError}
          </div>
        )}
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="row overflow-auto"
          style={{ maxHeight: "300px" }}
        >
          <div className="form-group">
            <input
              placeholder="Your username"
              type="text"
              name="name"
              className="form-control text-center rounded-5"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Your email"
              type="text" //  doit etre email 
              name="email"
              className="form-control text-center rounded-5"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <select
              name="user_type"
              className="form-control text-center rounded-5"
              onChange={handleChange}
              defaultValue={formData.user_type}
            >
              <option value="">Select user type</option>
              <option value="citizen">Citizen</option>
              <option value="hospital">Hospital</option>
              <option value="association">Association</option>
            </select>
          </div>
          <div className="form-group">
            <input
              placeholder="City"
              type="text"
              name="city"
              className="form-control text-center rounded-5"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <select
              name="blood_type"
              className="form-control text-center rounded-5"
              onChange={handleChange}
              defaultValue={formData.blood_type}
              required
            >
              <option value="">Select blood type</option>
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
          <div className="form-group">
            <input
              placeholder="Phone Number"
              type="text"
              name="phone_number"
              className="form-control text-center rounded-5"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Your password"
              type="password"
              name="password"
              className="form-control text-center rounded-5"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              className="form-control text-center rounded-5"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
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
              Register
            </Button>
          </div>
        </form>
        <br />
      </Modal.Body>
    </Modal>
  );
};

export default Register;
