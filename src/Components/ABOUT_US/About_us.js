import React from 'react'

import Footer from '../Footer/Footer';

import './About_us.css'
import Header from '../Heaader/Header';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const About_us = () => {
    const navigate = useNavigate()
    const handelJoin = () => {
        const token = sessionStorage.getItem("authToken");
        navigate(token ? "/myMembership" : "/tracsSignIn?view=register")
    }

    return (
        <div>
            <Header />

            <Navbar />

            <div className='heroSection'>
                <div ></div>
                <h1 style={{ paddingTop: "32px" }}>Welcome to <span style={{ color: "rgb(43, 90, 158)" }}>TRACS</span></h1>
                <div className='heroSubtext'><p>We empower you to forge meaningful, verified relationships with proven entrepreneurs and thought leaders. It's more than an app—it's an ecosystem for growth.</p>
                </div>
            </div>

            <div >
                <div className='hero2'>
                    <h2>Who We Are</h2>
                    <p>We are more than just a networking app; we are a dynamic community. We are a dedicated team of technology innovators and seasoned networking veterans</p><br />
                    <p>TRACS leverages the deep-rooted community and expertise of the H7 Network to deliver a state-of-the-art platform that respects the art of professional connection. We understand networking because we live it.</p>
                </div></div>


            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">

                        {/* Image Section */}
                        <div className="fade-in-section order-1 md:order-1 relative">
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Team Collaboration"
                                className="rounded-2xl shadow-2xl w-full h-auto"
                            />

                            {/* Floating Stat Card */}
                            <div className="hidden md:block absolute -mt-16 ml-10 bg-white p-6 rounded-xl shadow-xl border-l-4 border-[rgb(0, 188, 212);] max-w-xs" style={{ borderLeft: "2px solid rgb(0, 188, 212);" }} id="awdawdd">
                                <p className="text-primary-900 font-bold text-lg">
                                    <span className='adgbawy'>The Foundation</span>
                                </p>
                                <p className="text-sm text-slate-600 mt-1">
                                    Backed by the <strong>H7 Network</strong>—decades of proven
                                    success in professional connection.
                                </p>
                            </div>
                        </div>

                        {/* Text Section */}
                        <div className="fade-in-section order-2 md:order-2">
                            <h2 className="text font-bold text-accent-500 uppercase tracking-widest mb-2" style={{ color: "rgb(0, 188, 212)" }}>
                                <span className='regfbhsf' >Our Guiding Principles</span>
                            </h2>

                            <h3 className="text-3xl md:text-4xl font-bold text-primary-900 mb-8">
                                <span className='pefvh'>Built By Networkers,</span>
                                <br />
                                <span className='pefvh'>For Networkers.</span>
                            </h3>

                            <div className="space-y-8">
                                {/* Mission */}
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-2 flex items-center" style={{ color: "rgb(30, 58, 138)" }}>
                                        <span className='circleIcon'>◎</span>
                                        Our Mission
                                    </h4>
                                    <p className="text-lg text-slate-600 leading-relaxed border-l-2 border-slate-200 pl-4 ml-1">
                                        Empowering individuals to grow, succeed, and innovate
                                        through the strength of their network. We believe
                                        everyone's next great opportunity is hidden in their
                                        existing connections.
                                    </p>
                                </div>

                                {/* Vision */}
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-2 flex items-center" style={{ color: "rgb(30, 58, 138)" }}>
                                        <span className='circleIcon'>◎</span>
                                        Our Vision
                                    </h4>
                                    <p className="text-lg text-slate-600 leading-relaxed border-l-2 border-slate-200 pl-4 ml-1">
                                        To be the universally trusted cornerstone of global
                                        networking, helping professionals worldwide expand their
                                        reach and forge impactful partnerships.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
             <div >
                <div className='hero2'>
                    <h2>Join Us in Building the Future</h2>
                    <p>We invite you to be part of a community that values collaboration, innovation, and the limitless possibilities that arise when great minds come together. Whether you're looking for career opportunities, business partnerships, or simply seeking inspiration, TRACS is the catalyst for your success..</p><br />
                    
                </div></div>

             
            <Footer />
        </div>
    )
}
export default About_us;