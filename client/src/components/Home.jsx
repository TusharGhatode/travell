import React, { useEffect, useState } from "react";
import Gallory from "./Gallory";
import Contact from "./Contact";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email");
    setIsLoggedIn(!!email); // Convert to boolean
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("email"); // Remove email from localStorage
    localStorage.removeItem("clientId"); // Remove email from localStorage
    localStorage.removeItem("role"); // Remove email from localStorage


    setIsLoggedIn(false); // Update state
    navigate("/"); // Redirect to the homepage
  };

  return (
    <div>
      <header class="header" data-header>
        <div class="overlay" data-overlay></div>

        <div class="header-top">
          <div class="container">
            <a class="helpline-box"></a>

            <a href="#" class="logo">
              <img src="/logo.svg" alt="Tourly logo" />
            </a>

            <div class="header-btn-group"></div>
          </div>
        </div>

        <div class="header-bottom">
          <div class="container">
            <ul class=""></ul>

            <nav class="navbar" data-navbar>
              <ul class="navbar-list">
                <li>
                  <a href="#home" class="navbar-link" data-nav-link>
                    home
                  </a>
                </li>

                <li>
                  <a href="#gallery" class="navbar-link" data-nav-link>
                    gallery
                  </a>
                </li>

                <li>
                  <a href="#contact" class="navbar-link" data-nav-link>
                    contact us
                  </a>
                </li>
              </ul>
            </nav>

            <div>
              {!isLoggedIn ? (
                <button
                  className="btn w-40 btn-primary"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              ) : (
                <button className="btn w-40 btn-primary" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main>
        <article>
          <section class="hero" id="home">
            <div class="container">
              <h2 class="h1 hero-title">Journey to explore world</h2>

              <p class="hero-text">
                Ac mi duis mollis. Sapiente? Scelerisque quae, penatibus?
                Suscipit class corporis nostra rem quos voluptatibus habitant?
                Fames, vivamus minim nemo enim, gravida lobortis quasi, eum.
              </p>

              <div class="btn-group">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    const email = localStorage.getItem("email"); // Retrieve email from localStorage
                    const role = localStorage.getItem("role"); // Retrieve email from localStorage

                    if (email && role === "client") {
                      navigate("/packages"); // Navigate if email exists
                    } else {
                      alert("Please login ."); // Show alert if email is missing
                    }
                  }}
                >
                  Book now
                </button>
              </div>
            </div>
          </section>
        </article>
      </main>

      <Gallory />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
