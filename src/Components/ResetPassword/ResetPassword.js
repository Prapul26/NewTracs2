import React, { use, useEffect, useLayoutEffect, useState } from 'react'

import Header from '../Heaader/Header'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { MdEmail } from 'react-icons/md'
import "./ResetPassword.css"
import { Link, useLocation } from 'react-router-dom'
import { Target } from 'lucide-react'
import axios from 'axios'
import { TbLockPassword, TbPasswordMobilePhone } from 'react-icons/tb'

const ResetPassword = () => {
    const [email, setEmail] = useState("")
    const [password,setPassword]=useState("");
    const[otp,setOtp]=useState("");
    const location=useLocation();
    const params= new URLSearchParams(location.search);
    const emailparm=params.get("email");
    console.log("emailparm:", emailparm);
    useEffect(()=>{
        if(emailparm){
            setEmail(emailparm);
            console.log("emailparm:", emailparm);
        }
    },[emailparm])
    const handleSubmit = async () => {
        const payload={
            email:email,
            password:password,
            otp:otp
        }
        try {
            const response = await axios.post("https://tracsdev.apttechsol.com/api/verify-otp", payload);
            alert("Changes Password Successfully");
        } catch (err) {
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
                            <div style={{marginBottom:"10px"}}> <lable>Email</lable></div>
                            <div className='resetInputHolder'>
                                <div><MdEmail size={24} /></div>
                                <div style={{ width: "100%" }}> <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                            </div>
                            <br />
                                <div style={{marginBottom:"10px"}}><lable>Otp</lable></div>
                                 <div className='resetInputHolder'>
                                <div><TbPasswordMobilePhone size={24} /></div>
                                <div style={{ width: "100%" }}> <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} /></div>
                            </div>
                            <br />
                                <div style={{marginBottom:"10px"}}><lable>Password</lable></div>
                                 <div className='resetInputHolder'>
                                <div><TbLockPassword  size={24} /></div>
                                <div style={{ width: "100%" }}> <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                            </div>
                            <br />
                            <button onClick={handleSubmit}>Reset</button>
                            <Link to="/tracsSignIn"><p>Back to Login page</p></Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ResetPassword

