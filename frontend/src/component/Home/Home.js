import React from "react";
import Cookies from "js-cookie";
import Welcome from "./Welcome";
import Features from "./Features";
import Rdv from "./Rdv";
import Alert from "./Alert";

import OurEvents from "./OurEvents";
import PackagesSection from "./PackagesSection";
import "../../Styles/home.css";
import "../../Styles/theme.css";
import Team from "./Team";

export default function Home() {
  const accessToken = Cookies.get("access_token");

  if (accessToken) {
    // utilisateur connecte
    console.log(
      "Le cookie access_token est présent et non vide :",
      accessToken
    );
  } else {
    // utilisateur non connecte
    console.log("Le cookie access_token est vide ou n'existe pas");
  }

  return (
    <main>
      <Welcome />
      <Features />
      <PackagesSection />
      <Rdv />
      <Alert />
      <Team />
      <OurEvents />
     
    </main>
  );
}
