// import Register from "../Authentification/Register";
import Nav from "react-bootstrap/Nav";
import React, { useState, useEffect } from "react";


const Features = () => {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5 align-items-end">
          <div className="col-lg-6">
            <div className="row g-2">
              <div className="col-6 position-relative wow fadeIn" data-wow-delay="0.7s">
                <div className="about-experience  rounded">
                 <center> <h1 className="display-1 mb-0 text-white">5</h1>
                  <small className="fs-5 fw-bold text-white">Years Experience</small></center>
                  
                </div>
              </div>
              <div className="col-6 wow fadeIn" data-wow-delay="0.1s">
                <img className="img-fluid rounded" src="\img\Blood Donation Logo.png" alt="Service 1" />
              </div>
              <div className="col-6 wow fadeIn" data-wow-delay="0.3s">
                <img className="img-fluid rounded" src="\img\Abvout2.png" alt="Service 2" />
              </div>
              <div className="col-6 wow fadeIn" data-wow-delay="0.5s">
                <img className="img-fluid rounded" src="\img\ABOUT3.png" alt="Service 3" />
              </div>
            </div>
          </div>
          <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
            <p className="section-title bg-white txt-primary text-start  pe-3">About Us</p>
            <h1 className="mb-4">Know About Know About BloodCare: Your Partner in Life-Saving</h1>
            <p className="mb-4">
              Founded on the principles of compassion, community, and commitment, BloodCare leverages cutting-edge technology to make the blood donation process as seamless as possible. Our team comprises dedicated professionals with years of experience in healthcare, technology, and event management,
              all working together to support blood banks, hospitals, and charitable organizations in their life-saving missions.
            </p>
            <div className="row g-5 pt-2 mb-5">
              <div className="col-sm-6">
                <img className="img-fluide mb-4" src="\img\IC2.png" alt="Dedicated Services" />
                <h5 className="mb-3">Dedicated Services</h5>
                <span>Clita erat ipsum et lorem et sit, sed stet lorem sit clita</span>
              </div>
              <div className="col-sm-6">
                
                <img className="img-fluide mb-4" src="\img\IC1.png" alt="Blood " />
                
                <h5 className="mb-3">Blood</h5>
                <span>Clita erat ipsum et lorem et sit, sed stet lorem sit clita</span>
              </div>
            </div>
            <a className="btn btn-secondary rounded-pill py-3 px-5" href="">Explore More</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
