import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./nav.css";
import { FcLikePlaceholder } from "react-icons/fc";
import { GlobalData } from "../stack/stack";

export const Header = () => {
  const { favouritesCount, searchRecipe} = useContext(GlobalData);

  const searchHandler=(e)=>{
    searchRecipe(e.target.value)
  }

  const formButton=(e)=>{
    e.preventDefault()
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        {/* Logo and App Name */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="../src/assets/LOGO.jpg"
            alt="Indian Spice Chronicles Logo"
            className="me-2"
            style={{ height: "80px" }}
          />
          <span className="fs-4 fw-bold animated-title">Indian Spice Stories</span>
        </Link>

        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links and Search Bar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            {/* Link to Home Screen */}
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Main Screen
              </Link>
            </li>

            {/* Link to Favourites Screen */}
            <li className="nav-item">
              <Link className="nav-link" to="/favourites">
                Favourites
              </Link>
            </li>

            {/* Favourites Count with Icon */}
            <li className="nav-item d-flex align-items-center">
              <span className="d-flex align-items-center">
                <FcLikePlaceholder className="me-1" style={{ fontSize: "1.5rem" }} />
                ({favouritesCount})
              </span>
            </li>
          </ul>

          {/* Search Bar */}
          <form className="d-flex ms-3" onSubmit={formButton} >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search recipes"
              aria-label="Search"
              onChange={searchHandler}
            />
            <button className="btn btn-outline-success" type="submit" >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};
