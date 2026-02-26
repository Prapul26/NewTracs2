import React from 'react'
import "./ContactProfile.css"

import { TiArrowBack } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import Header from '../Heaader/Header';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
const ContactProfile = () => {
      const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  }
  return (
    <div style={{background:"white"}}>
    <Header />
      <Navbar />
     <div className='cprofileCOntainer'>
                      <div className='bg-blue-600 hover:bg-blue-500 mb-5' style={{ padding: "8px 18px", color: "white", width: "70px", borderRadius: "15px" }} onClick={handleBack}><TiArrowBack size={30} /></div>
         <h2>Contact of name</h2>
        <div className='cprofileHolder'>
            
            <img src='https://static.vecteezy.com/system/resources/previews/027/005/962/non_2x/portrait-of-a-confident-businessman-standing-outdoors-in-front-of-office-building-a-confident-determined-person-ai-generated-free-photo.jpg'/>
<h3>Name</h3>
<p>Email</p>
        </div>
     </div>
      </div>
    
  )
}

export default ContactProfile
