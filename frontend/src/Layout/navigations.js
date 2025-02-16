import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { Nav } from "react-bootstrap";
import Login from "../component/Authentification/Login";
import Register from "../component/Authentification/Register";
import Chatbot from "../component/Chatbot/Chatbot";
import { CitizenNavigation } from "./citizenNavigation";
import { AssociationNavigation } from "./associationNavigation";
import { HospitalNavigation } from "./hospitalNavigation";
import "../Styles/theme.css";

export function Navigation() {
  const [userConnected, setUserConnected] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    const userType = Cookies.get("user_type");
    if (accessToken) {
      setUserConnected(true);
      setUserType(userType);
    } else {
      setUserConnected(false);
    }
  }, []);

  const handleLoginModalOpen = () => {
    setShowLoginModal(true);
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  const handleRegisterModalOpen = () => {
    setShowRegisterModal(true);
  };

  const handleRegisterModalClose = () => {
    setShowRegisterModal(false);
  };

  return (
    <header
      className="site-navbar light js-sticky-header site-navbar-target"
      role="banner"
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-6 col-xl-2">
            <div className="mb-0 site-logo">
              <Link to="/" className="mb-0">
                Blood Care<span className="text-primary">.</span>
              </Link>
            </div>
          </div>
          <div
            className="col-6 d-inline-block d-xl-none ml-md-0 py-3"
            style={{ position: "relative", top: "3px" }}
          >
            <a href="#" className="site-menu-toggle js-menu-toggle float-right">
              <span className="icon-menu h3 text-black"></span>
            </a>
          </div>
          <div className="col-12 col-md-8 d-none d-xl-block">
            <nav
              className="site-navigation position-relative"
              role="navigation"
            >
              <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
               {!(userConnected && userType === "hospital") && (
  <li>
    <NavLink to="/" exact activeClassName="active">
      Home
    </NavLink>
  </li>
)}             
                <li>
                  <NavLink to="/alerte" exact activeClassName="active">
                    Emergency
                  </NavLink>
                </li>
                {userConnected && userType === "citizen" && (
                  <>
                    <CitizenNavigation /> <Chatbot />
                  </>
                )}
                {userConnected && userType === "hospital" && (
                  <HospitalNavigation />
                )}
                {userConnected && userType === "association" && (
                  <AssociationNavigation />
                )}
              </ul>
            </nav>
          </div>
          <div className="col-8 col-md-2 text-right">
            <nav
              className="site-navigation position-relative"
              role="navigation"
            >
              <ul className="site-menu main-menu js-clone-nav d-none d-lg-block">
                {userConnected ? (
                  <li>
                    <Nav.Link
                      as={NavLink}
                      to="/user/logout"
                      exact
                      activeClassName="active"
                    >
                      Logout
                    </Nav.Link>
                  </li>
                ) : (
                  <div style={{ display: "flex", gap: "10px" }}>
                    <li>
                      <Nav.Link
                        onClick={handleLoginModalOpen}
                        style={{ cursor: "pointer" }}
                      >
                        Login
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        onClick={handleRegisterModalOpen}
                        style={{ cursor: "pointer" }}
                      >
                        Register
                      </Nav.Link>
                    </li>
                  </div>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <Login show={showLoginModal} onHide={handleLoginModalClose} />
      <Register show={showRegisterModal} onHide={handleRegisterModalClose} />
    </header>
  );
}
