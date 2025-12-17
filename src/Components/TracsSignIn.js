import React, { useEffect, useState } from 'react';
import Header from './Heaader/Header';
import Navbar from './Navbar/Navbar';
import "./TracsSignIn.css"
import Footer from './Footer/Footer';
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from 'axios';

// Main component for the entire application
export default function TracsSignIn() {
  // State to manage which view is currently active
  // 'signIn' or 'register'

const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const viewFromURL = queryParams.get("view");

const [currentView, setCurrentView] = useState(viewFromURL || "signIn");

  // Handler for form submissions
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    console.log('Sign In form submitted');
    // Add sign-in logic here
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log('Register form submitted');
    // Add registration logic here
    // Don't forget to check if password and confirm password match
  };

  // Re-usable icon components
  const EmailIcon = () => (
    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.161V6a2 2 0 00-2-2H3z" />
      <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
    </svg>
  );

  const LockIcon = () => (
    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
    </svg>
  );


   const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(""); // "success" | "error"

  const [popUp, setPopUp] = useState(false);
  const [popupMessage, setPopupMessage] = useState([])
  const showPopUp = () => {
    setPopUp(true);
  }
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch("https://tracsdev.apttechsol.com/api/storeLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const data = await response.json();

      if (response.ok && (data.success === true || data.success === "true")) {
        setMessage(". . . Login successful! . . .");
        sessionStorage.setItem("authToken", data.token);
       
     
          navigate("/dashboard"); // change "/email" to your actual email page route
       

      } else {
        setMessageType("error");
        setTimeout(() => {
          setMessage()
        }, 2000);
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setMessageType("error");
      setTimeout(() => {
        setMessage()
      }, 2000);
      console.error("Error during login:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };
 const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [referredBy, setReferredBy] = useState('');
    const [businessName, setBusinessName] = useState('');

    const [csrfToken, setCsrfToken] = useState('');
        

    // 🟢 Fetch CSRF Token on Component Mount

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
          navigate("/tracsSignIn")

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
useEffect(() => {
  if (viewFromURL) {
    setCurrentView(viewFromURL);
  }
}, [viewFromURL]);

  return (
    // Use bg-gray-100 instead of bg-light
    <div className="bg-gray-100 font-sans" >
        {message && <div>LogIn Successfull</div>}
        <Header />
        <Navbar />
      <div className="container mx-auto my-4 max-w-5xl md:my-12">
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          {/* Main Content Area */}
          <div id="app-container">
            {/* Conditional rendering:
              Show the Sign In view if currentView is 'signIn'
              Show the Register view if currentView is 'register'
            */}

            {/* Sign In View */}
            {currentView === 'signIn' && (
              <div id="sign-in-view">
                <div className="p-6 md:p-10">
                 
                  
                  <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12">
                    {/* Left Column: Important Notes */}
                    <div className="flex flex-col gap-6">
                      <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
                        <h3 className="mb-2 text-lg font-bold text-blue-800">1. Current H7 Members</h3>
                        <div className="flex flex-col gap-2 text-blue-700">
                          <p className='sinp'>
                            Current H7 Members do not need to Sign Up. They only need to Sign In.
                          </p>
                          <p className='sinp'>
                            If you are logging in for the first time, click the "Forgot Password" link to create a password. It will send an email to your registered email address. Please also check your SPAM folder.
                          </p>
                        </div>
                      </div>
                      
                      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-5">
                        <h3 className="mb-2 text-[20px] font-bold text-yellow-800">2. NEW TRACS Users</h3>
                        <div className="text-yellow-700">
                          <p className='sinp'>
                            NEW TRACS Users need to Sign Up first, *unless* they are a current H7 Member. H7 Members must follow instruction 1 above.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Sign In Form */}
                    <div>
                      <div style={{justifyContent:"center",textAlign:"center"}}><h1 className="mb-6 text-center text-3xl font-bold text-gray-900">Sign In</h1></div>
                      {/* Sign In Form */}
                      <form id="sign-in-form" className="flex flex-col gap-4" onSubmit={handleLogin}>
                        
                        {/* Email Field */}
                        <div>
                          <label htmlFor="username" className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                          <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <EmailIcon />
                            </div>
                            <input type="email" id="username" value={email}               onChange={(e) => setEmail(e.target.value)} name="username" className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"  required />
                          </div>
                        </div>

                        {/* Password Field */}
                        <div>
                          <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">Password</label>
                          <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <LockIcon />
                            </div>
                            <input type="password" value={password}  onChange={(e) => setPassword(e.target.value)} id="password" name="password" className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"  required />
                          </div>
                        </div>
                        
                        {/* Forgot Password Link */}
                        <div className="text-right text-sm">
                          <Link to="/forgotPassword" className="font-medium text-blue-600 hover:underline">
                            Forgot Password?
                          </Link>
                        </div>

                        {/* Sign In Button */}
                        <button type="submit" className="mx-auto block rounded-lg bg-blue-600 px-8 py-3 text-center text-base font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                         Login
                        </button>
                      </form>
      
                      <p className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?
                        {/* Button to switch view to 'register' */}
                        <button 
                          onClick={() => setCurrentView('register')} 
                          className="ml-1 cursor-pointer font-medium text-blue-600 hover:underline"
                        >
                          Register here
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sign Up View (Hidden by default) */}
            {currentView === 'register' && (
              <div id="register-view">
                <div className="p-6 md:p-10">
                  <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
                    Create an Account
                  </h2>

                  {/* Registration Form Container */}
                  <div className="mx-auto max-w-lg">
                    {/* Registration Form */}
                    <form id="register-form" className="flex flex-col gap-4" onSubmit={handleRegister}>
                      {/* First and Last Name Grid */}
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="reg-first-name" className="mb-1 block text-sm font-medium text-gray-700">First Name*</label>
                          <input type="text" id="reg-first-name" name="first-name"   value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                        </div>
                        <div>
                          <label htmlFor="reg-last-name" className="mb-1 block text-sm font-medium text-gray-700">Last Name*</label>
                          <input type="text" id="reg-last-name"  value={lastName}
                                        onChange={(e) => setLastName(e.target.value)} name="last-name" className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                        </div>
                      </div> {/* End of grid */}
                    
                      <div>
                        <label htmlFor="reg-business-name" className="mb-1 block text-sm font-medium text-gray-700">Business Name</label>
                        <input type="text" id="reg-business-name" name="business-name"    value={businessName}
                                        onChange={(e) => setBusinessName(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                      </div>

                      <div>
                        <label htmlFor="reg-email" className="mb-1 block text-sm font-medium text-gray-700">Email*</label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <EmailIcon />
                            </div>
                            <input type="email"    value={email}
                                        onChange={(e) => setEmail(e.target.value)} id="reg-email" name="email" className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="reg-phone" className="mb-1 block text-sm font-medium text-gray-700">Phone*</label>
                        <input type="tel"   value={phone}
                                    onChange={(e) => setPhone(e.target.value)} id="reg-phone" name="phone" className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                      </div>
      
                      <div>
                        <label htmlFor="reg-password" className="mb-1 block text-sm font-medium text-gray-700">Password*</label>
                        <input type="password"   value={password}
                                    onChange={(e) => setPassword(e.target.value)} id="reg-password" name="password" className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                      </div>

                      <div>
                        <label htmlFor="reg-confirm-password" className="mb-1 block text-sm font-medium text-gray-700">Confirm Password*</label>
                        <input type="password"  value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)} id="reg-confirm-password" name="confirm-password" className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                      </div>
                      
                      <div>
                        <label htmlFor="reg-introduced-by" className="mb-1 block text-sm font-medium text-gray-700">Who introduced you?</label>
                        <input type="text" id="reg-introduced-by"   value={referredBy}
                                    onChange={(e) => setReferredBy(e.target.value)} name="introduced-by" className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="e.g., John Smith" />
                      </div>

                      {/* Register Button */}
                      <div>
                        <button type="submit" className="mx-auto mt-2 block rounded-lg bg-blue-600 px-8 py-3 text-center text-base font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                          Register
                        </button>
                      </div>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-600">
                      Already have an account?
                      {/* Button to switch view back to 'signIn' */}
                      <button 
                        onClick={() => setCurrentView('signIn')} 
                        className="ml-1 cursor-pointer font-medium text-blue-600 hover:underline"
                      >
                        Sign In here
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}