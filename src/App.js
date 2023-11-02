// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Feed from "./components/Feed"

class App extends React.Component {
  state = {
    rooms: [], // Placeholder for room data
    bookings: [], // Placeholder for booking data
  };

  // Function to edit a room


  // Function to edit a booking
  handleEditBooking = (bookingId) => {
    // Implement logic to edit booking using bookingId
    console.log(`Editing booking with ID: ${bookingId}`);
  };

  // Function to cancel a booking
  handleCancelBooking = (bookingId) => {
    // Implement logic to cancel booking using bookingId
    console.log(`Canceling booking with ID: ${bookingId}`);
  };

  render() {
    return (
      
      <Router>
      <Header/>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Feed
              />
            }
          />
        </Routes>
        <Footer/>
      </Router>
    );
  }
}

export default App;
