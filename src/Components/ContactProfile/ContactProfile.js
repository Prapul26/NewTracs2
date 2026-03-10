import React, { useEffect, useState } from 'react'
import "./ContactProfile.css"

import { TiArrowBack } from 'react-icons/ti';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../Heaader/Header';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import axios from 'axios';
const ContactProfile = () => {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  }
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const type = searchParams.get("memberType");
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [contactOf,setCOntactOf]=useState("")
  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("authToken");

      try {
        const response = await axios.get(
          `https://tracsdev.apttechsol.com/api/contacts_details/${userId}/${type}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        const resData = response.data;

        setData(resData);
setCOntactOf(resData?.user_profile?.memberuser?.name || "");
        // ✅ Use response directly
        setName(
          `${resData?.user_profile?.first_name || ""} ${resData?.user_profile?.last_name || ""}`
        );

        setEmail(resData?.user_profile?.email || "");

      } catch (err) {
        console.log(err.response);
      }
    };

    if (userId && type) {
      fetchData();
    }
  }, [userId, type]);  // ✅ important dependency
  return (
    <div style={{ background: "white" }}>
      <Header />
      <Navbar />
      <div className='cprofileCOntainer'>
        <div className='bg-blue-600 hover:bg-blue-500 mb-5' style={{ padding: "8px 18px", color: "white", width: "70px", borderRadius: "15px" }} onClick={handleBack}><TiArrowBack size={30} /></div>
        <h2>Contact of {contactOf}</h2>
        <div className='cprofileHolder'>

          <img src="https://tracsdev.apttechsol.com/public/uploads/contact_icon.png" />
          <h3>{name}</h3>
          <p>{email}</p>
        </div>
      </div>
    </div>

  )
}

export default ContactProfile
