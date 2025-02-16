import React, { useEffect } from "react";
import WOW from "wowjs";
import "animate.css";

const Rdv = () => {
  useEffect(() => {
    const wow = new WOW.WOW({
      live: false,
    });
    wow.init();
  }, []);

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center mx-auto pb-4 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "500px" }}>
          <p className="section-title bg-white text-center txt-primary px-3">Our Services</p>
          <h1 className="mb-5">Services That We Offer For Entrepreneurs</h1>
        </div>
        <div className="row gy-5 gx-4">
          <div className="col-lg-4 col-md-6 pt-5 wow fadeInUp" data-wow-delay="0.1s">
            <div className="service-item d-flex h-100" >
             
              <div className="service-text p-5 pt-0"style={{ backgroundColor: `#54a8b91c` }}>
                <div className="service-icon">
                  <img className="img-fluid rounded-circle" src="\img\1.png" alt="" />
                </div>
                <h5 className="mb-3">Volunteer at Blood Drives</h5>
                <p className="mb-4">Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet.</p>
                <a className="btn btn-square rounded-circle" href="">
                  <i className="bi bi-chevron-double-right"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 pt-5 wow fadeInUp" data-wow-delay="0.3s">
            <div className="service-item d-flex h-100">
             
              <div className="service-text p-5 pt-0"style={{ backgroundColor: `#54a8b91c` }}>
                <div className="service-icon">
                  <img className="img-fluid rounded-circle" src="\img\2.png" alt="" />
                </div>
                <h5 className="mb-3">Help in Disasters and Wars</h5>
                <p className="mb-4">Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet.</p>
                <a className="btn btn-square rounded-circle" href="">
                  <i className="bi bi-chevron-double-right"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 pt-5 wow fadeInUp" data-wow-delay="0.5s">
            <div className="service-item d-flex h-100">
              
              <div className="service-text p-5 pt-0"style={{ backgroundColor: `#54a8b91c` }}>
                <div className="service-icon">
                  <img className="img-fluid rounded-circle" src="\img\3.png" alt="" />
                </div>
                <h5 className="mb-3">Sharing Alert</h5>
                <p className="mb-4">Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet.</p>
                <a className="btn btn-square rounded-circle" href="">
                  <i className="bi bi-chevron-double-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rdv;
