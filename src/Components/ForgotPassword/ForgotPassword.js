import React, { useState } from 'react'
import "./ForgotPassword.css"
import Header from '../Heaader/Header'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { MdEmail } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { Target } from 'lucide-react'
import axios from 'axios'

const ForgotPassword = () => {
  const redirect=useNavigate();
  const [email,setEmail]=useState("")
  const handleSubmit=async()=>{
    try{
 const response=await axios.post("https://tracsdev.apttechsol.com/api/send-otp",{email:email});
 alert("sent Otp Successfully");
 redirect(`/resetPassword?email=${email}`)
    }catch(err){
console.log(err.response)
    }
   
  }
  return (
    <div>
      <Header />
      <Navbar />
      <div>
        <div className='resetPassword'>
           
           <div className='resetPassHolder'>
            <div className='resetPassHolderHeading'><h1>Reset password</h1></div>
            <div className='resetContainer'>
          <div className='resetInputHolder'>
            <div><MdEmail size={24}/></div>
            <div style={{width:"100%"}}> <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/></div>
            </div> 
            <br/>
            <button onClick={handleSubmit}>Send Email</button>
           <Link to="/tracsSignIn"><p>Back to Login page</p></Link> 
            </div>
            </div> 
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ForgotPassword

