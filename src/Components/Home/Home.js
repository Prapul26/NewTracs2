import React, { useEffect, useState } from "react";
import "./Home.css";
import "./Home2.css";
import Slider from "react-slick";
import imgage from "../../assets/image.png"
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import '../global.css'


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Heaader/Header";
import image2 from "../../assets/Tracs.png"


const Home = () => {
  const navigate = useNavigate()

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showtext, setText] = useState(true)

  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    setToken(token);
    setIsLoggedIn(!!token);
    setText(!token);

    const logout = () => {
      sessionStorage.removeItem("authToken");
      setToken(null);
      setIsLoggedIn(false);
      setText(true);
      navigate("/tracsSignIn");
    };

    // --- Inactivity Tracking ---
    const updateLastActivity = () => {
      localStorage.setItem("lastActivityTime", Date.now().toString());
    };

    const checkInactivity = () => {
      const lastActivity = parseInt(localStorage.getItem("lastActivityTime"), 10);
      if (!lastActivity) return;

      const now = Date.now();
      const diff = now - lastActivity;

      if (diff > 60 * 60 * 1000) {
        logout(); // 10 minutes of inactivity
      }
    };

    // --- Detect user activity ---
    const activityEvents = ["mousemove", "keydown", "click", "scroll"];
    activityEvents.forEach((event) =>
      window.addEventListener(event, updateLastActivity)
    );
    updateLastActivity(); // Set initial

    // --- Detect visibility change ---
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        updateLastActivity(); // Save timestamp on tab close
      } else {
        checkInactivity(); // Check if user was idle too long
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // --- Cleanup ---
    return () => {
      activityEvents.forEach((event) =>
        window.removeEventListener(event, updateLastActivity)
      );
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [navigate]);


  const handleMakeIntroClick = () => {
    const token = sessionStorage.getItem("authToken");
    navigate("/whatIsMakeIntro");
  };

  const handleDashboard = () => {
    const token = localStorage.getItem("authToken");
    navigate("/inbox");
  };

  return (
    <div className="homeHolder">
      <Header />
      <Navbar />
      <div className="home-details">
        <div className="heading1Holder">

          <div className="heading1">
            <h1  >
              Turn Connections into Relationships Effortlessly.
            </h1>
            <p class="">
              TRACS is a smart tool that helps you manage your network, make seamless introductions, and drive business growth through warm referrals.
            </p>


            {!isLoggedIn && (
              <div>
                <Link
                  to="/tracsSignIn?view=register"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <button style={{ background: "#eeba2b" }}>Get Started</button>
                </Link>
              </div>
            )}


          </div>
          <div className="tracsPic"><img src="https://tracsdev.apttechsol.com/public/uploads/website-images/TRACS_Process_Diagram.png" /></div>
        </div>
        <div className="heading2">
          <h2 class="">What TRACS Can Do for You</h2>
          <p class="">
            Discover a new way to leverage your professional relationships for mutual success.
          </p>
        </div>
        <div className="hoverCards">
          <div className="hover1">
            <div className="hoverCenrterimg">
              <div className="hoverimg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                  <path d="M22 17v-2a4 4 0 0 0-3-3.87" />
                  <path d="M5 11v-1a4 4 0 0 1 4-4h.5" />
                  <path d="M15 7v-1a4 4 0 0 0-4-4h-.5" />
                </svg>
              </div>
            </div>
            <h3 class="awdh3">Seamless Networking</h3>
            <p class="">Easily manage your contacts, remember key details, and stay connected with the people who matter most.</p>
          </div>
          <div className="hover1">
            <div className="hoverCenrterimg">
              <div className="hoverImg2"> <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-2zM6 8a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3H6z" />
                <line x1="12" y1="12" x2="12" y2="17" />
                <line x1="12" y1="7" x2="12" y2="7" />
              </svg></div></div>
            <h3 class="awdh3">Warm Introductions</h3>
            <p class="">Make professional to others with simple, trackable system that ensures a smooth hand-off.</p>
          </div>
          <div className="hover1">
            <div className="hoverCenrterimg">
              <div className="hoverImg3">  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg></div></div>
            <h3 class="awdh3">Drive Referrals</h3>
            <p class="">Track the success of your introductions and see the direct impact they have on your business and professional network.</p>
          </div>

        </div>
        <div className="heading3">
          <h2 >How It Works in 3 Simple Steps</h2>
          <p>
            Getting started with TRACS is quick and intuitive.
          </p>
        </div>
        <div className="numberCards">
          <div className="numcard1">
            <div className="nimImgholder">
              <div className="numImg">1</div>
            </div>

            <h3 class="awdh3">Build Your Network</h3>
            <p >Easily make introductions, keep track of them, and even import all your contacts to make introductions to them seamlessly.</p>
          </div>

          <div className="numcard1">
            <div className="nimImgholder">
              <div className="numImg2">2</div>
            </div>
            <h3 className="awdh3">Make the Right Intro</h3>
            <p>Identify the perfect match and create a warm introduction with a simple, automated process.</p>
          </div>

          <div className="numcard1">
            <div className="nimImgholder">
              <div className="numImg3">3</div>
            </div>

            <h3 className="awdh3">Track and Follow-Up</h3>
            <p>Monitor the progress of your referrals and get notified when it's time to follow up to ensure a successful outcome.</p>
          </div>
        </div>


      </div>
      <div className="bluefooter">
        <div><h2>Ready to leverage your network?</h2></div>
        <div><strong>Join TRACS and start making powerful introductions today.</strong></div>

        <div>
          <Link to="/tracsSignIn?view=register" style={{ textDecoration: "none", color: "inherit" }}>
            <button style={{ padding: "5px 14px 5px 14px", borderRadius: "6px" }}>Register</button>
          </Link>
        </div>

      </div>
      <Footer />
    </div>
  );
};
export default Home;
