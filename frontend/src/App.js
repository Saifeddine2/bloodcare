import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import React from "react";
import Cookies from "js-cookie";
import MyEvents from "./component/Event/MyEvents";
import MyEventDetails from "./component/Event/MyEventDetails";
import Login from "./component/Authentification/Login";
import Logout from "./component/Authentification/Logout";
import Register from "./component/Authentification/Register";
import Home from "./component/Home/Home";
import Main from "./component/Alert/Main";
import Chatbot from "./component/Chatbot/Chatbot";
import Geocode from "./component/Map/Geocode";
import UserDonation from "./component/userDonations/UserDonation";
import PlannedEventsList from "./component/Event/PlannedEventsList";
import EventDetailsPage from "./component/Event/EventDetailsPage";
import EventMain from "./component/Event/EventMain";
import BloodList from "./component/Hospital/bloodList";
import { Navigation } from "./Layout/navigations";
import NotFound from "./Layout/NotFound";
import BloodTotalsPage from "./component/Hospital/BloodTotalsPage";
import Main2 from "./component/Event/Main2";
import Main3 from "./component/Hospital/Main3";
import Prediction from "./component/Hospital/prediction";
import EventForm from "./component/Event/EventForm"; // Import your EventForm component

const AppContent = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/yourDonations" element={<UserDonation />} />
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/logout" element={<Logout />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/alerte" element={<Main />} />
        <Route path="/geocode" element={<Geocode />} />
        <Route path="/event" element={<Main2 />} />
        <Route path="/Event/events/:eventId" element={<EventDetailsPage />} />
        <Route path="/events" element={<EventMain />} />
        <Route path="/myevents" element={<MyEvents />} />
        <Route path="/Event/participants_details/:eventId/" element={<MyEventDetails />} />
        <Route path="/prediction" element={<Prediction />} />

        {/* Keep the add_events route pointing to EventMain */}
        <Route path="/add_events" element={<EventMain />} />

        {/* New route for hospitals to create events */}
        <Route path="/hospitals/add_events" element={<EventForm />} />

        <Route path="/hospitals/list_blood" element={<Main3 />} />
        <Route path="/hospitals/blood_totals" element={<BloodTotalsPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/error" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
