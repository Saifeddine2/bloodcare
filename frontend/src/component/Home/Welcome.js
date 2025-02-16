import React from "react";
import { Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
const Welcome = () => {
  return (
    <div className="container-fluid px-0 mb-5">
      <Carousel id="header-carousel" controls={true} indicators={false}>
        <Carousel.Item className="active bg-white">
          <img className="w-100" src="\img\BGHOME.png" alt="First slide" />
          
        </Carousel.Item>
        
      </Carousel>
    </div>
  );
};

export default Welcome;
