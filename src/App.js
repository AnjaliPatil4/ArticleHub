import React, { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PersonalDashboard from "./components/PersonalDashboard";
import NoteDetails from "./components/NoteDetails";
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, typ) => {
    setAlert({
      message: message,
      typ: typ,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <NoteState>
      <Router>
        <Navbar />
        {alert !== null ? (
          <Alert alert={{ message: alert.message, typ: alert.typ }} />
        ) : null}

        <div className="container mt-5">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route
              exact
              path="/home"
              element={<Home showAlert={showAlert} />}
            />
            <Route
              exact
              path="/notes"
              element={<PersonalDashboard showAlert={showAlert} />}
            />
            <Route path="/note-details" element={<NoteDetails />} />
            <Route
              exact
              path="/login"
              element={<Login showAlert={showAlert} />}
            />
            <Route
              exact
              path="/signup"
              element={<SignUp showAlert={showAlert} />}
            />

            <Route exact path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
