import React, { useState } from 'react'
import { RiArrowDropDownLine, RiArrowDropUpFill, RiArrowDropUpLine } from 'react-icons/ri'
import "./Sidebar2.css"
import { IoLockClosedOutline, IoPersonOutline } from 'react-icons/io5';
import { MdMenu, MdOutlineCreditCard, MdOutlineMail } from 'react-icons/md';
import { TbMailOpened } from 'react-icons/tb';
import { IoMdContacts } from 'react-icons/io';
import { SlLayers } from 'react-icons/sl';
import { FaRegPenToSquare } from 'react-icons/fa6';
import { LuMessageCircle } from 'react-icons/lu';
import { Link, useLocation } from 'react-router-dom';


const Sidebar2 = () => {
  const location = useLocation();
  const currentPath = location.pathname;
const isInvoiceRoute = currentPath.startsWith("/invoice");
const isReplyRoute=currentPath.startsWith("/replyMessage")
const isAccRoute =
  currentPath === "/myMembership" ||
  currentPath === "/myProfile" ||
  currentPath === "/changePassword" ||
  isInvoiceRoute;

const isIntroRoute =
  currentPath === "/dashboard" ||
   currentPath === "/makeIntroduction" ||
  currentPath === "/myContacts" ||
  currentPath === "/emailTemplate" ||
  currentPath === "/emailSignature" ||
  isReplyRoute;

const isResRoute =
  currentPath === "/appHelp" ||
  currentPath === "/contact" ||
  currentPath === "/network";


  const [showAcc, setAcc] = useState(isAccRoute);
  const [showIntro, setIntro] = useState(isIntroRoute);
  const [showRes, setRes] = useState(isResRoute);

  const [showSideNav, setSideNav] = useState(true);
  return (
    <div style={{ display: "flex", color: "red" }}>

      {showSideNav &&
        <div className='sidebar'>
          <div><Link to="/"><img src="https://tracsdev.apttechsol.com/public/uploads/website-images/logo-2024-09-05-10-18-08-4078.png" /></Link></div>
          <div className='contentSide'>
            <div className='accS' onClick={() => setAcc(prev => !prev)}>
              <div><h1>Account Settings</h1></div>
              <div>
                {showAcc ? (
                  <RiArrowDropUpLine size={32} />
                ) : (
                  <RiArrowDropDownLine size={32} />
                )}
              </div>
            </div>
            {
              showAcc &&
              <div className='accDrop'>
                <Link to="/myMembership"><div className={`accDrop1 ${currentPath === "/myMembership"  || currentPath.startsWith("/invoice")? "activeItem" : "" }`}><div style={{ marginTop: "3px", marginRight: "8px" }}><MdOutlineCreditCard /></div><h2>My Membership</h2></div></Link>
                <Link to="/myProfile"><div className={`accDrop1 ${currentPath === "/myProfile" ? "activeItem" : "" }`}><div style={{ marginTop: "3px", marginRight: "8px" }}><IoPersonOutline /></div><h2>My Profile</h2></div></Link>
                <Link to="/changePassword"><div className={`accDrop1 ${currentPath === "/changePassword" ? "activeItem" : "" }`}><div style={{ marginTop: "3px", marginRight: "8px" }}><IoLockClosedOutline /></div><h2>Change Password</h2></div></Link>
              </div>
            }
            <div className='intross' onClick={() => setIntro(prev => !prev)}>
              <div><h1>Introductions Settings</h1></div>
              <div>
                {showIntro ? (
                  <RiArrowDropUpLine size={32} />
                ) : (
                  <RiArrowDropDownLine size={32} />
                )}
              </div>

            </div>
            {
              showIntro &&
              <div className='introDrop'>
                <Link to="/dashboard"> <div className={`introDrop1 ${currentPath === "/dashboard" ||currentPath === "/makeIntroduction" || currentPath.startsWith("/replyMessage") ? "activeItem" : "" }`}><div style={{ marginTop: "3px", marginRight: "8px" }}><TbMailOpened /></div><h2>Introduction Message</h2></div></Link>
                <Link to="/myContacts"> <div className={`introDrop1 ${currentPath === "/myContacts" ? "activeItem" : "" }`}><div style={{ marginTop: "3px", marginRight: "8px" }}><IoMdContacts /></div><h2>My Contacts</h2></div></Link>
                <Link to="/emailTemplate"><div className={`introDrop1 ${currentPath === "/emailTemplate" ? "activeItem" : "" }`}><div style={{ marginTop: "3px", marginRight: "8px" }}><MdOutlineMail /></div><h2>Email Templates</h2></div></Link>
                <Link to="/emailSignature"><div className={`introDrop1 ${currentPath === "/emailSignature" ? "activeItem" : "" }`}><div style={{ marginTop: "3px", marginRight: "8px" }}><SlLayers /></div><h2>Email Signature</h2></div></Link>
              </div>
            }
            <div className='resss' onClick={() => setRes(prev => !prev)}>
              <div><h1>Resources</h1></div>
              <div>
                {showRes ? (
                  <RiArrowDropUpLine size={32} />
                ) : (
                  <RiArrowDropDownLine size={32} />
                )}
              </div>
            </div>
            {
              showRes &&
              <div className='resDrop'>
                <Link to="/appHelp"><div className={`resDrop1 ${currentPath === "/appHelp" ? "activeItem" : "" }`}><div style={{ marginTop: "3px", marginRight: "8px" }}><FaRegPenToSquare /></div><h2>App Help</h2></div></Link>
                <Link to="/contact"><div className={`resDrop1 ${currentPath === "/contact" ? "activeItem" : "" }`}><div style={{ marginTop: "3px", marginRight: "8px" }}><LuMessageCircle /></div><h2>Contact Us</h2></div></Link>
                <Link to="/network"><div className={`resDrop1 ${currentPath === "/network" ? "activeItem" : "" }`}><div style={{ marginTop: "3px", marginRight: "8px" }}><FaRegPenToSquare /></div><h2>Networking 101</h2></div></Link>
              </div>
            }
          </div>
        </div>
      }
    </div>
  )
}

export default Sidebar2
