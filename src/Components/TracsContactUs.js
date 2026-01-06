
import Header from './Heaader/Header';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import axios from 'axios';
import "./TracsContactUS.css"
import React, { useState, useEffect } from 'react';

// Define the contact information data structure
const contactData = [
    {
        title: "Call Us",
        value: "513.371.5299",
        link: "tel:5133715299",
        icon: (
            <svg className="h-10 w-10 mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72a12.84 12.84 0 0 0 .7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45a12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
        ),
        type: 'link'
    },
    {
        title: "Send an Email",
        value: "info@tracs.app",
        link: "mailto:info@tracs.app",
        icon: (
            <svg className="h-10 w-10 mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
        ),
        type: 'link'
    }
    
];

// Reusable Contact Card Component
const ContactCard = ({ title, value, link, icon, type }) => {
    // Custom style for consistent color/font (text-xl font-semibold text-gray-800)
    const contentClasses = "text-xl font-semibold text-gray-800 leading-relaxed";
    const hoverClasses = type === 'link' ? "hover:text-indigo-600 transition duration-150" : "";

    return (
        <div className="contact-card bg-white border border-gray-200 rounded-xl p-6 text-center hover:bg-indigo-50 shadow-sm
            transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
            
            <div className="text-indigo-500 mx-auto mb-4">
                {icon}
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>

            {/* Content Display: Link or Plain Text */}
            {type === 'link' ? (
                <a href={link} className={`${contentClasses} ${hoverClasses} block break-all`}>
                    {value}
                </a>
            ) : (
                <p className={contentClasses}>{value}</p>
            )}
        </div>
    );
};

// Main App Component
const TracsContactUS = () => {
    // Fix: Use useEffect to inject the global font link without using non-standard style attributes.
    useEffect(() => {
        // Only run once on mount
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
        
        // Cleanup function (optional but good practice)
        return () => {
            document.head.removeChild(fontLink);
        };
    }, []);
const [data, setData] = useState("");
  const [capVal, setCapVal] = useState("");
      const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [subject, setSubject] = useState("")
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("authToken");
      const formData = new FormData();
      formData.append("user_id", data.user?.id);
      formData.append("email", data.user?.email);
      formData.append("description", description);
      formData.append("subject", subject);
      formData.append("g-recaptcha-response", "test");

      const response = await axios.post("https://tracsdev.apttechsol.com/api/storeusercontactpage", formData, {
        headers: {
          Authorization: `Bearer ${token}`,

        },
      });

      alert("success");



    } catch (err) {
      console.log("message failed to send");

    }
  }
  const [subtitle, settitle] = useState("");
  
  useEffect(() => {
  const fetchdata = async () => {
    try {
      const token = sessionStorage.getItem("authToken");

      const response = await axios.get(
        "https://tracsdev.apttechsol.com/api/user-contact-us",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const resData = response.data;

      setData(resData);

      // ✅ FIX: use response data directly
      setEmail(resData.user?.email || "");

      settitle(
        resData.helpnote?.find(item => item.id === 18)?.title || ""
      );

    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  fetchdata();
}, []);

    return (
        <div> <Header />
        <Navbar />
         <div
        className="ph1"
        style={{ marginTop: "2px", marginBottom: "20px" }}
      >
        <div className="p1h1">
          <h1 style={{ fontSize: "35px" }}>Contact</h1>
        </div>
      </div>

        <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4 font-sans ">
            {/* The font family 'Inter' is now applied globally via the link tag added in useEffect */}
           
            
             <div className="conus">

          <div className="container mx-auto max-w-1xl ">
         

            <div className="cons1">
              {/* Main Content Area */}
              <div >
                <div style={{ display: "flex", justifyContent: "center" }} className='raedaw'> 
  <h1>GET IN TOUCH</h1>
</div>

                <div style={{}}>
                  <label style={{ marginBottom: "20px" }}>Email</label>   <br />

                  <input style={{ width: "80%", background: "grey", margin: "5px", padding: "5px" }} value={email} /><br />
                  <label style={{ marginBottom: "20px", marginTop: "25px" }}>Subject</label>   <br />
                  <input style={{ width: "80%", margin: "5px", padding: "5px", border: "1px solid black" }} value={subject} onChange={(e) => setSubject(e.target.value)} /><br />
                  <label style={{ marginBottom: "10px" }}>Message</label>   <br />
                  <textarea value={description} style={{ border: "1px solid black", width: "80%", marginTop: "20px", height: "200px" }} onChange={(e) => setDescription(e.target.value)} />
                </div>

                {/* Action Buttons */}

              </div>
              <button style={{ background: "orange", padding: "10px 20px 10px 20px", marginTop: "40px", borderRadius: "10px" }} onClick={handleSave}>Submit</button>
            </div>

            {/* Success Message Toast */}


          </div>
        </div>
        </div>
        <Footer /></div>
    );
};

export default TracsContactUS;