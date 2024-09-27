import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Navbar = () => {
  let location = useLocation();
  let history = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("token");
    history("./home");
  };

  return (
    <>
      <nav
        className="navbar bg-dark border-bottom border-body navbar-expand-lg"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            ArticleHub
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/home" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/home"
                >
                  Add Note
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <Link to="/login" role="button">
                  <Button
                    variant="contained"
                    color="secondary"
                    className="mx-2"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup" role="button">
                  <Button
                    variant="contained"
                    color="secondary"
                    className="mx-2"
                  >
                    SignUp
                  </Button>
                </Link>
              </form>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                onClick={handlelogout}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
