import React from "react";

function PackagesSection(){
 
  return (
    <div className="container-fluid banner my-5 py-5" data-parallax="scroll" data-image-src="\img\bann.png">
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-6 wow fadeIn" data-wow-delay="0.3s">
            <div className="row g-4 align-items-center">
              <div className="col-sm-4">
                <img className="img-fluid rounded" src="\img\banner11 .png" alt="Banner 1" />
              </div>
              <div className="col-sm-8">
                <h2 className="text-black mb-3">"Join Our Community"</h2>
                <p className="text-black mb-4">
                "Your generosity can save lives. Every drop of blood donated has the power to heal and give hope. Join us in our mission to make a positive difference in the world."
                </p>
                <a className="btn btn-secondary rounded-pill py-2 px-4" href="">Read More</a>
              </div>
            </div>
          </div>
          <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
            <div className="row g-4 align-items-center">
              <div className="col-sm-4">
                <img className="img-fluid rounded" src="\img\BANNER22.png" alt="Banner 2" />
              </div>
              <div className="col-sm-8">
                <h2 className="text-black mb-3">"Be a Hero Today: Donate Blood"</h2>
                <p className="text-black mb-4">
                "Be part of something greater. By donating blood, you're giving the gift of life to someone in need. Join us today and help save lives,Your contribution matters."                </p>
                <a className="btn btn-secondary rounded-pill py-2 px-4" href="">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagesSection;
