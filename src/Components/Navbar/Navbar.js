import React, { useEffect, useState }  from 'react'
import { Link } from 'react-router-dom'
import tracsLogo from "../../assets/Tracs.png"
import './Navbar.css'
import Header from '../Heaader/Header'
const Navbar = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [showResources,setResources]=useState(false);
  const [isLogedIn,setIsLoggedIn]=useState(false);
  useEffect(()=>{
    const token=sessionStorage.getItem("authToken");
    setIsLoggedIn(token)
  })
  return (
    
    <div className='Navbar-Container'>
       
      <div className='navbar-holder'onMouseLeave={() =>{ setDropdownVisible(false);setResources(false)}}>
       <Link to="/"> <img  src="https://tracsdev.apttechsol.com/public/uploads/website-images/logo-2024-09-05-10-18-08-4078.png" 
            style={{ height: "90px",width:"200px",marginTop:"-10px" }}/></Link>
        <ul style={{display:"flex",listStyleType:"none"}} >
           <Link to='/' style={{textDecoration:"none",color:"inherit"}}><li >HOME</li></Link> 
           <li
            onMouseEnter={()=>{setDropdownVisible(true);setResources(false)}} 
           
           
          >
            ABOUT US
            {isDropdownVisible && (
              <div className='dropdown-menu23'   onMouseEnter={()=>setDropdownVisible(true)} >
              <div className='fopl' style={{paddingTop:"10px",paddingBottom:"10px",borderBottom:"1px solid #e6e9e8"}}> <Link to='/about_us' style={{ textDecoration: 'none', color: 'inherit' }}><span style={{marginLeft:"10px",fontSize:"14px"}}>About Us</span></Link></div> 
               <div  className='fopl'style={{paddingTop:"10px",paddingBottom:"10px",borderBottom:"1px solid #e6e9e8"}}><Link to='/contactUs' style={{ textDecoration: 'none', color: 'inherit' }}><span  style={{marginLeft:"10px",fontSize:"14px"}}>Contact Us</span></Link></div> 
                <div className='fopl' style={{paddingTop:"10px",paddingBottom:"10px",borderBottom:"1px solid #e6e9e8"}}><Link to='/partner' style={{ textDecoration: 'none', color: 'inherit' }}><span  style={{marginLeft:"10px",fontSize:"14px"}}>Partners</span></Link></div>
                {
                  isLogedIn && (<div  className='fopl' style={{paddingTop:"10px",paddingBottom:"10px",borderBottom:"1px solid #e6e9e8"}}><Link to='/help2' style={{ textDecoration: 'none', color: 'inherit' }}><span  style={{marginLeft:"10px",fontSize:"14px"}}>App Help</span></Link></div>)
                }
              </div>
            )}
          </li>
                     <li onMouseEnter={()=>{setResources(true) ;
                      setDropdownVisible(false)}}> RESOURCES
                      {showResources &&(<div className='resources1' onMouseLeave={()=>setResources(false)  }>
              <div className='fopl' style={{paddingTop:"10px",paddingBottom:"10px",borderBottom:"1px solid #e6e9e8"}}> <Link to='/faq' style={{ textDecoration: 'none', color: 'inherit' }}><span style={{marginLeft:"10px",fontSize:"14px"}}>FAQ'S</span></Link></div> 
              <div className='fopl' style={{paddingTop:"10px",paddingBottom:"10px",borderBottom:"1px solid #e6e9e8"}}> <Link to='/network' style={{ textDecoration: 'none', color: 'inherit' }}><span style={{marginLeft:"10px",fontSize:"14px"}}>NETWORKING 101</span></Link></div> 

                      </div>)}</li> 

           <Link to="/pricing" style={{textDecoration:"none",color:"inherit"}}><li>PRICING</li></Link> 
          
        </ul>
      </div>
    </div>
    
  )
}

export default Navbar
