import React from 'react'
import './Footer.css'
import gplay from '../../assets/ggplay.jpg'
import { FaFacebook, FaPhone, FaPhoneAlt } from "react-icons/fa";

import { FaPhoneFlip, FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import aplay from '../../assets/apple.png'
import { Link } from 'react-router-dom';
import { CiLocationOn } from 'react-icons/ci';
import { IoMagnetOutline, IoMailOutline } from 'react-icons/io5';
const Footer = () => {
    return (
        <div className='footer-container'>

            <div className='dlc-holder'>
                <div className='download-container'>
                    <h1>Download Our App</h1>
                    <div className='store-holder' style={{ display: "flex" }}>
                        <div className='playStore-container'>
                            <a href="https://play.google.com/store/apps/details?id=com.hotspot.tracs&pli=1" target="_blank" rel="noopener noreferrer"><img src="https://tracs.app/public/user/images/google-play-store.png" /></a>
                        </div>
                        <div className='appleStore-container'>
                            <a href='https://apps.apple.com/us/app/tracs-for-h7-network/id6446471421' target="_blank" rel="noopener noreferrer"><img src="https://tracs.app/public/user/images/apple-store.png" /></a>

                        </div>

                    </div>
                    <div className='socialInvisible'>
                        <a href="https://www.facebook.com/h7network"><div className="facebook">
                            {" "}
                            <FaFacebook size={28} color='black' />
                        </div></a>

                        <a href="https://www.linkedin.com/company/h7network/"><div className="LinkedIn">
                            <FaLinkedin size={28} color="black" />
                        </div></a>
                    </div>
                    <div className='socilaMediaStore-container'>
                        <div className="socila-icons">
                            <a href="https://www.facebook.com/h7network" target="_blank"
                                rel="noopener noreferrer"><div className="facebook">
                                    {" "}
                                    <FaFacebook size={28} color='black' />
                                </div></a>

                            <a href="https://www.linkedin.com/company/h7network/" target="_blank"
                                rel="noopener noreferrer"><div className="LinkedIn">
                                    <FaLinkedin size={28} color="black" />
                                </div></a>
                        </div>
                    </div>
                </div>
                <div className='important-links-container'>
                    <div className='imp-links'>

                    </div>
                    <div className='wdadad'><a href="https://h7network.blog/" target="_blank"
                        rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}><p>TRACS is a subsidiary of the H7 Network</p></a></div>
                </div>
                <div className='contact-container'>
                    <div className='contact'>

        


                        <div className="conulli" style={{ display: "flex" }}>
                            <div style={{ marginTop: "14px" }}><IoMailOutline /></div>
                            <div style={{ marginTop: "9px" }}>   <ul><li style={{ listStyle: "none", fontWeight: "400", fontSize: "16px" }}> info@tracs.app</li>
                            </ul>
                            </div>
                        </div>
                        <div className="conulli" style={{ display: "flex" }}> <div style={{ marginTop: "20px" }}><FaPhoneAlt /></div>
                            <div style={{ marginTop: "16px" }}> <ul>
                                <li style={{ listStyle: "none", fontWeight: "400", fontSize: "16px" }}> 513.371.5299</li>
                            </ul></div>

                        </div>


                    </div>
                </div>

            </div>
            <div className='copyright-container'>
                <div className='tpc-container'>
                    <div style={{ display: "flex", textAlign: "center", alignContent: 'center', justifyContent: "center" }}>  <p><Link to='/terms' style={{ textDecoration: "none", color: "inherit" }}>Terms and Condition</Link> / </p> <p><Link to='/privacy' style={{ textDecoration: "none", color: "inherit" }}>Privact Policy</Link>  /</p> <p> <Link to='/contact' style={{ textDecoration: "none", color: "inherit" }}> Contact</Link></p></div>
                </div>
                <div>
                    <h3 style={{ color: "white" }}>Copyright 2025 .AptTech Solutions Inc . All Rights Reserved.</h3>
                </div>

            </div>
        </div>
    )
}
export default Footer;