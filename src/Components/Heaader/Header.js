import React, { useEffect, useState } from "react";
import "./Header.css";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import { FcGlobe } from "react-icons/fc";
import { IoLogOut, IoMenu, IoPerson } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { PiGlobe } from "react-icons/pi";

/*  <FaFacebook />
  <FaSquareXTwitter />
 <FaLinkedin />
 <FcGlobe /> 
 <IoMdArrowDropdown />
 <IoMdArrowDropup /> 
 <CiMenuKebab />
 <ImCross />*/
const Header = () => {
  const [menu, showMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [about, showAbout] = useState(false);
  const [about2, showAbout2] = useState(false);
  const [drop1, showDrop1] = useState(false);
  const [drop2, showDrop2] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  useEffect(() => {
    const fetchProfile = async () => {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get("https://tracsdev.apttechsol.com/api/my-profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response?.data?.user) {
          setIsLoggedIn(true);
          const userId = response.data.user.id;
          sessionStorage.setItem("userId", userId);
      const newImage = response.data.user?.image;

if (newImage) {
  // If image exists, build full URL
  setProfileImg(
    newImage.startsWith("http")
      ? newImage
      : `https://tracsdev.apttechsol.com/public/${newImage}`
  );
} else {
  // Fallback avatar
  setProfileImg(
    "https://tracsdev.apttechsol.com/public/uploads/user_avatar.jpeg"
  );
}
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setIsLoggedIn(false);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);


  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userId")

    sessionStorage.removeItem("profileImageUrl")
    setIsLoggedIn(false);
    navigate("/"); // Redirect to login page
    window.location.reload();
  };
  const handelDrop1 = () => {
    showDrop1(!drop1);
    showDrop2(false);
  };
  const handelDrop2 = () => {
    showDrop2(!drop2);
    showDrop1(false);
  };
  const handelMenu = () => {
    showMenu(!menu);
    showDrop1(false)
    showDrop2(false)
  };
  const handleCross = () => {
    showMenu(false);
  };
  const handelAbout = () => {
    showAbout(!about);
  };
  const handelAbout2 = () => {
    showAbout2(!about2);
  };
  return (
    <div className="Header">
      {menu && (
        <div className="Menu">
          <div className="cross">
            <div className="crossPosition" onClick={handleCross}>
              <ImCross size={18} />
            </div>
          </div>
          <div className="home">
            <div className="Home">
              <Link
                to="/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h2 style={{ fontSize: "18px", marginBottom: "4px" }}>HOME</h2>
              </Link>
            </div>
          </div>
          <div className="aboutUs" style={{ paddingTop: "9px" }}>
            <div>
              <h2 style={{ fontSize: "18px" }}>ABOUT US</h2>
            </div>
            <div
              onClick={handelAbout}
              style={{}}
            >
              {" "}
              {about ? (
                <IoMdArrowDropup size={35} />
              ) : (
                <IoMdArrowDropdown size={35} />
              )}
            </div>
          </div>{" "}
          {about && (
            <div className="dropAbout">
              <div className="dropAboutUs">
                <Link
                  to="/about_us"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {" "}
                  <h2 style={{ fontSize: "18px" }}>About us</h2>
                </Link>
              </div>
              <div className="dropContact">
                <Link
                  to="/contact"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {" "}
                  <h2 style={{ fontSize: "18px" }}>Contact</h2>
                </Link>
              </div>
              <div className="dropPartner">
                <Link
                  to="/partner"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {" "}
                  <h2 style={{ fontSize: "18px" }}>Partners</h2>
                </Link>
              </div>
              {isLoggedIn && <div className="dropPartner">
                <Link
                  to="/help"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {" "}
                  <h2 style={{ fontSize: "18px" }}>App Help</h2>
                </Link>
              </div>
              }

            </div>
          )}



          <div className="aboutUs" style={{ paddingTop: "9px" }}>
            <div>
              <h2 style={{ fontSize: "18px" }}>RESOURCES</h2>
            </div>
            <div
              onClick={handelAbout2}
              style={{}}
            >
              {" "}
              {about2 ? (
                <IoMdArrowDropup size={35} />
              ) : (
                <IoMdArrowDropdown size={35} />
              )}
            </div>
          </div>{" "}
          {about2 && (
            <div className="dropAbout">
              <div className="dropAboutUs">
                <Link
                  to="/faq"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {" "}
                  <h2 style={{ fontSize: "18px" }}>FAQ</h2>
                </Link>
              </div>


            </div>
          )}





          <div className="pricing" style={{ padding: "9px" }}>
            <div className="Pricing">
              <Link
                to="/pricing"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h2 style={{ fontSize: "18px" }}>PRICING</h2>
              </Link>
            </div>
          </div>
          <div className="pricing" style={{ paddingTop: "9px" }}>
            <Link
              to="/network"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {" "}
              <div className="Pricing">
                <h2 style={{ fontSize: "18px", marginBottom: "4px" }}>NETWORK 101</h2>
              </div>
            </Link>
          </div>
          {!isLoggedIn && (
            <div className="button-H" style={{ display: "flex" }}>
              <div className="login">
                <Link
                  to="/tracsSignIn?view=signIn"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <button >Login</button>
                </Link>
              </div>
              <div className="register">
                <Link
                  to="/tracsSignIn?view=register"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <button >Register</button>
                </Link>
              </div>
            </div>
          )}
          <div className="social-Media">
            <a href="https://www.facebook.com/h7network" target="_blank"
              rel="noopener noreferrer">
              {" "}
              <div className="fff">
                <FaFacebook size={30} color="#163b6d" />
              </div>
            </a>
            <a href="https://www.linkedin.com/company/h7network/" target="_blank"
              rel="noopener noreferrer">
              <div className="ffn" style={{ marginLeft: "15px" }}>
                {" "}
                <FaLinkedin size={30} color="#163b6d" />
              </div>
            </a>
          </div>
        </div>
      )}
      <div className="header-container">
        <div className="socila-icons">
          <a href="https://www.facebook.com/h7network" target="_blank"
            rel="noopener noreferrer">
            <div className="facebook">
              {" "}
              <FaFacebook size={23} color="white" />
            </div>
          </a>

          <a href="https://www.linkedin.com/company/h7network/" target="_blank"
            rel="noopener noreferrer">
            <div className="LinkedIn">
              <FaLinkedin size={23} color="white" />
            </div>
          </a>
          <a href="https://h7network.blog/" target="_blank"
            rel="noopener noreferrer"><img src="https://h7network.blog/wp-content/uploads/2024/08/h7-header-logo.png" className="htimg" /></a>
        </div>
        <div className="pic">
          <Link to="/"> <img
            src="https://tracsdev.apttechsol.com/public/uploads/website-images/logo-2024-09-05-10-18-08-4078.png"
            style={{ height: "27px" }}
          /></Link>
        </div>
        {isLoggedIn && (<div className="mobPicPro">
          <div className="mobPic1">
            <img
              src={profileImg}
              style={{ height: "100%", width: "100%", borderRadius: "50%" }}
            />
          </div>
          <div className="drop2" onClick={handelDrop2}>
            {drop2 ? (
              <IoMdArrowDropup color="white" size={20} />
            ) : (
              <IoMdArrowDropdown color="white" size={20} />
            )}
            {drop2 && (
              <div className="dropDown2">
                <Link
                  to="/dashboard"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="profileDrop">
                    <div style={{ marginTop: "3px", marginRight: "6px" }}><IoPerson /></div>
                    <div> <p>Dashboard</p></div>
                  </div>
                </Link>
                <div className="dropLogout" onClick={handleLogout}>
                  <div style={{ marginTop: "4px", marginRight: "6px" }}><IoLogOut /></div>
                  <div>    <p>Logout</p></div>
                </div>
              </div>
            )}
          </div>
        </div>)}
        <div className="dropdowns">
          <div className="globe">
            <div className="globee">
              <PiGlobe color="white" size={28} />{" "}
            </div>
            <div className="drop1" style={{ marginTop: "9px" }} onClick={handelDrop1}>
              {drop1 ? (
                <IoMdArrowDropup size={20} color="white" />
              ) : (
                <IoMdArrowDropdown size={20} color="white" />
              )}
              {drop1 && (
                <div className="dropDown1">
                  <div className="usaFlag">
                    {" "}
                    <img
                      style={{ height: "100%", width: "100%" }}
                      src="https://tracsdev.apttechsol.com/public/uploads/website-images/USA.png"
                    />
                  </div>
                  <div className="usa">
                    <h3>USA</h3>
                  </div>
                </div>
              )}
            </div>
          </div>
          {!loading && !isLoggedIn && (
            <div className="LRButton">
              { /*<div style={{ marginLeft: "10px" }}>
              <Link to="/register">
                <button style={{ background: " #eeba2b", color: "black", padding: "5px 8px 5px 8px" }}>Register</button>
              </Link>
            </div> */}
              <div style={{ marginLeft: "10px" }}>
                <Link to="/tracsSignIn?view=signIn">
                  <button style={{ background: " #eeba2b", color: "black", padding: "5px 10px 5px 10px", borderRadius: "5px" }}>Login</button>
                </Link>
              </div>

            </div>
          )}
          {isLoggedIn && (
            <div className="header-profile">
              <div className="picPro">
                <img
                  src={profileImg}
                  style={{ height: "100%", width: "100%", borderRadius: "50%" }}
                />
              </div>
              <div className="drop2" onClick={handelDrop2}>
                {drop2 ? (
                  <IoMdArrowDropup size={20} color="white" />
                ) : (
                  <IoMdArrowDropdown size={20} color="white" />
                )}
                {drop2 && (
                  <div className="dropDown2">
                    <Link
                      to="/dashboard"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div className="profileDrop">
                        <div style={{ marginTop: "2px", marginRight: "6px" }}><IoPerson /></div>
                        <div> <p>Dashboard</p></div>

                      </div>
                    </Link>
                    <div className="dropLogout" onClick={handleLogout}>
                      <div style={{ marginTop: "2px", marginRight: "6px" }}><IoLogOut /></div>
                      <div>    <p>Logout</p></div>

                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="menu" onClick={handelMenu}>
          <FiMenu size={25} color="white" />
        </div>
      </div>
    </div>
  );
};

export default Header;
