import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Register.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Header from '../Heaader/Header';
import { Link, useNavigate } from 'react-router-dom';
import { IoBriefcaseOutline, IoLockClosedOutline, IoMailOutline, IoPerson, IoPersonOutline, IoPhoneLandscapeOutline } from 'react-icons/io5';
import { LuRectangleVertical } from 'react-icons/lu';
import { CiPhone } from 'react-icons/ci';

const Register = ({ switchToLogin }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [referredBy, setReferredBy] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [message, setMessage] = useState('');
    const [csrfToken, setCsrfToken] = useState('');
          const [messageType, setMessageType] = useState(""); // "success" | "error"
    

    // 🟢 Fetch CSRF Token on Component Mount

const navigate=useNavigate()
    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages

        // Basic validation
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        const payload = {
            first_name: firstName,
            last_name: lastName,
            email,
            phone,
            password,
            confirm_password: confirmPassword,
            referred_by: referredBy || null,
            business_name: businessName || null,
        };

        try {
            const response = await axios.post(' https://tracsdev.apttechsol.com/api/storeRegister', payload, {
                headers: {
                    // Replace YOUR_TOKEN_HERE with the actual token
                    Authorization: 'XSRF-TOKEN=eyJpdiI6Iit2dGdoUFJsNktvcnBEY2lCV0FFYUE9PSIsInZhbHVlIjoicjZ1c2RZbmNnVmc2RUlVNExQd3dIRFI3UkdIc2srNnlXcFdYeGUxVVdNT3F1REY2NllyZ0MrTXY2bWVROXZHZ1haeStLZ2tOVE5FSEltK1dVUVNwOVdVQTY1dE1tWXh6NWFqZE9oNjFXNFNkclZxZmdXSU40aEllTTBPci9VRFEiLCJtYWMiOiI1OGMyNmNkZjcyZmYxY2ZiYWM2ZDBmMjZiNWFkMmNmMjc4YzFkYjRhM2UyNGE2ZjkwMDM3NjEyYjM4NjY5OGI1IiwidGFnIjoiIn0%3D; _session=eyJpdiI6ImpQbWpRNDhDQWJmaFJHK0sydUxUSEE9PSIsInZhbHVlIjoiVWluVjVmM3d1RlIxVThxcFJRMEVCY2pVWll1dlMvZlhXMmdtR1d3UE1NVG8vNW5DTWtWT2l4MjYwelJDZERQS2M0TE00WXRaYitEQ0lQdjEwYzMyQWJyNDdwOVRDS2p4V3lNcnExYUNSaUxxbjZLaWhjVU43WTRVdS9uN2V4SXAiLCJtYWMiOiI0MDA5ZGU1OTdjZWJlYTk2MDAxNDEwYTljZGYxNThjYzFlYzQyZTY5Njg1Yzc2MTI0MTdjYzU4ZjkwZmYwYjJjIiwidGFnIjoiIn0%3D',
                    Accept: 'application/json',
                },
            }
            );

            if (response.status === 201) {
                alert(response.data.message || 'Registration successful. Please verify your email.');
          navigate("/login")

                console.log('User registered:', response.data.user);
            }
        } catch (error) {
            if (error.response) {
                const errorMsg = error.response.data.errors
                    ? Object.values(error.response.data.errors).flat().join(' ')
                    : error.response.data.message || 'Registration failed. Please try again.';
                setMessage(errorMsg);
                
            } else {
                setMessage('An unexpected error occurred. Please try again.');
            }
        }
    };
  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);

    const part1 = digits.slice(0, 3);
    const part2 = digits.slice(3, 6);
    const part3 = digits.slice(6, 10);

    if (digits.length <= 3) return part1;
    if (digits.length <= 6) return `${part1}-${part2}`;
    return `${part1}-${part2}-${part3}`;
  };
    return (
        <div>
            <Header />
            <Navbar />
            <div className='registerPage'>
                <div className='regHolder'>
                    <form className='registerForm' onSubmit={handleRegister}>

                        <div className="reg1cont" style={{ paddingBottom: "0px", marginBottom: '20px', borderBottom: "1px solid black" }}><p>Register </p></div>


                        <div className='regContainer'>  <label htmlFor='firstName'>First Name<span style={{ color: "red", fontWeight: "600" }}>*</span></label>
                            <div style={{ display: "flex", border: "1px solid #ddd", marginBottom: "20px", marginTop: "15px", background: "transparent" }}>
                                <div className='picgif'><IoPersonOutline /></div>
                                <div className='inputgif'> <input
                                    type='text'
                                    id='firstName'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                /></div>
                            </div>

                            <label htmlFor='lastName'>Last Name<span style={{ color: "red", fontWeight: "600" }}>*</span></label>
                            <div style={{ display: "flex", border: "1px solid #ddd", marginBottom: "20px", marginTop: "15px", background: "transparent" }}>
                                <div className='picgif'><IoPersonOutline /></div>
                                <div className='inputgif'>
                                    <input
                                        type='text'
                                        id='lastName'
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    /></div></div>

                            <label htmlFor='email'>Email<span style={{ color: "red", fontWeight: "600" }}>*</span></label>
                            <div style={{ display: "flex", border: "1px solid #ddd", marginBottom: "20px", marginTop: "15px", background: "transparent" }}>
                                <div className='picgif'><IoMailOutline /></div>
                                <div className='inputgif'>
                                    <input
                                        type='email'
                                        id='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    /></div>
                            </div>
                            <label htmlFor='phone'>Phone</label>

                            <div style={{ display: "flex", border: "1px solid #ddd", marginBottom: "20px", marginTop: "15px", background: "transparent" }}>
                                <div className='picgif'><CiPhone /></div>
                                <div className='inputgif'><input
                                    type='text'
                                    id='phone'
                                      placeholder="123-123-1133"
                                    value={phone}
                                   onChange={(e) => {
                            const formatted = formatPhoneNumber(e.target.value);
                            setPhone(formatted);
                          }}
                                    required
                                /></div></div>

                            <label htmlFor='password'>Password<span style={{ color: "red", fontWeight: "600" }}>*</span></label>
                            <div style={{ display: "flex", border: "1px solid #ddd", marginBottom: "20px", marginTop: "15px", background: "transparent" }}>
                                <div className='picgif'><IoLockClosedOutline /></div>

                                <div className='inputgif'><input
                                    type='password'
                                    id='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                /></div></div>

                            <label htmlFor='confirmPassword'>Confirm Password<span style={{ color: "red", fontWeight: "600" }}>*</span></label>
                            <div style={{ display: "flex", border: "1px solid #ddd", marginBottom: "20px", marginTop: "15px", background: "transparent" }}>
                                <div className='picgif'><IoLockClosedOutline /></div>
                                <div className='inputgif'> <input
                                    type='password'
                                    id='confirmPassword'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                /></div></div>
                            <label htmlFor='businessName'>Business Name</label>

                            <div style={{ display: "flex", border: "1px solid #ddd", marginBottom: "20px", marginTop: "15px", background: "transparent" }}>
                                <div className='picgif'><IoBriefcaseOutline /></div>
                                <div className='inputgif'>
                                    <input
                                        type='text'
                                        id='businessName'
                                        value={businessName}
                                        onChange={(e) => setBusinessName(e.target.value)}
                                    /> </div></div>
                            <label htmlFor='referredBy'>Who introduces you?</label>
                            <div style={{ display: "flex", border: "1px solid #ddd", marginBottom: "20px", marginTop: "15px", background: "transparent" }}>
                                <div className='picgif'><IoPersonOutline /></div>
                                <div className='inputgif'><input
                                    type='text'
                                    id='referredBy'
                                    value={referredBy}
                                    onChange={(e) => setReferredBy(e.target.value)}
                                /></div></div>



                            <button type='submit' style={{ background: "#eeba2b", color: "black", fontSize: "18px", padding: "10px 25px 10px 25px" }}>Register</button>
                            {message && <p className="message">{message}</p>}</div>

                        <p onClick={switchToLogin} className='switch'>
                            <Link to='/login' style={{ textDecoration: "none", color: "inherit" }}> Already have an account? Login here.</Link>
                        </p>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Register;
