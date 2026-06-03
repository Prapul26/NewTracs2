import React, { useState, useEffect } from 'react';
import "./HelpGuide.css"
import {
  HelpCircle,
  BookOpen,
  Send,
  Users,
  FileText,
  PenTool,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle
} from 'lucide-react';
import { FaHome, FaQuestionCircle } from 'react-icons/fa';
import { IoLogOut, IoPerson } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar2 from '../Sidebar/Sidebar2';
import { IoMdArrowDropdownCircle, IoMdMenu } from 'react-icons/io';
import ReactQuill from 'react-quill';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import axios from 'axios';
export default function HelpGuide({ setCurrentView }) {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "What do the different introduction statuses mean?",
      answer: "TRACS uses three statuses to help you track referrals:\n• Needs Follow-up (Yellow): The introduction was sent, but neither contact has replied yet. We recommend nudging them.\n• Active (Green): At least one contact has replied, or you sent a message, indicating conversation is in progress.\n• Archive (Blue/Gray): The introduction is closed or no longer requires tracking. You can archive threads to declutter your feed."
    },
    {
      question: "How do template placeholder codes work?",
      answer: "When writing email templates, you can use [[name_1]] and [[name_2]] inside the subject line or message body. When you compose a new introduction and select two contacts, TRACS will automatically swap [[name_1]] with the first person's name and [[name_2]] with the second person's name in the live preview. This saves you from manually copy-pasting names every time."
    },
    {
      question: "What is the 'One-Click Follow-Up' tool?",
      answer: "If an introduction has remained idle and shows the 'Needs Follow-up' badge, a 'One-Click Follow-Up' button will appear on the card in the Introductions Feed. Clicking it automatically opens a pre-composed follow-up message customized with the recipient's first name, letting you review, click send, and log the nudge in seconds."
    },
    {
      question: "How do I append my email signature?",
      answer: "Set up your signature in the 'Email Signature' page. Once saved, there is a toggle labeled 'Append my email signature' in the Make Introduction composer. When checked, your signature details are dynamically added to the bottom of the email preview and output."
    }
  ];
  const Icon = ({ name, className = "w-6 h-6" }) => {
    const icons = {
      'credit-card': <><path d="M2 9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9Z" /><path d="M2 14h20" /></>,
      'user': <><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
      'lock': <><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
      'link': <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" /></>,
      'inbox': <><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></>,
      'users': <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
      'mail': <><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>,
      'pen-square': <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></>,
      'help-circle': <><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></>,
      'thumbs-up': <><path d="M7 10v12" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a2 2 0 0 1 1.01.27Z" /></>,
      'message-square': <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
      'book-open': <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>,
      'menu': <><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></>,
      'chevron-down': <path d="m6 9 6 6 6-6" />,
      'x': <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>,
      'plus': <><path d="M5 12h14" /><path d="M12 5v14" /></>,
    };

    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        {icons[name]}
      </svg>
    );
  };
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [name, setName] = useState("");
  const [Heasderdropdown, setHeaderdropdown] = useState(null);
  const showDropDown = () => {
    setHeaderdropdown(prev => !prev)
  }
  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userId")
    localStorage.removeItem("authToken")
    sessionStorage.removeItem("profileImageUrl")

    navigate("/"); // Redirect to login page
    window.location.reload();
  };
  const navigate = useNavigate();
  const [showSideNav, setSideNav] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSideNav(false); // close mobile sidebar
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const fetchProfile = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      console.log("Token:", token)
      const response = await axios.get("https://tracsdev.apttechsol.com/api/my-profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;


      setImagePreview(
        data?.user?.image
          ? `https://tracsdev.apttechsol.com/public/${data.user.image}`
          : "https://tracsdev.apttechsol.com/public/uploads/user_avatar.jpeg"
      );



    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div style={{ display: "flex" ,height:"100vh"}}>
             <div className="hidden lg:block w-[20.4%]"><Sidebar2 />
             </div>{showSideNav && <div><Sidebar2 />
             </div>}
            <div className="bg-gray-100 text-gray-800 min-h-screen font-sans" style={{ width: "100%" }}>
                <header className="bg-white shadow-sm flex items-center justify-between p-1 border-b">
                    <div className="flex items-center gap-2">
                        {/* MOBILE MENU BUTTON */}
                        <button
                            onClick={() => setSideNav(prev => !prev)}
                            className="lg:hidden p-2 rounded-md bg-gray-100 hover:bg-gray-200"
                        >
                            <IoMdMenu className="w-6 h-6 text-gray-700" />
                        </button>
                        <h1 className="text-2xl font-semibold text-gray-800 ml-4 lg:ml-0"></h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div style={{ marginRight: "15px" }}><Link to="/"><FaHome size={28} /></Link></div>
                        <div className="relative">
                            <button className="flex items-center space-x-2" onClick={showDropDown}>
                                <img src={imagePreview} alt="User Avatar" className="h-10 w-10 rounded-full" />
                                <span className="hidden md:block">{name}</span>
                                <Icon name="chevron-down" className="w-4 h-4" />
                            </button>
                            {Heasderdropdown && <div className="dropDown3" >
                                <Link
                                    to="/dashboard"
                                    style={{ textDecoration: "none", color: "inherit" }}
                                >
                                    <div className="profileDrop">
                                        <div style={{ marginTop: "2px", marginRight: "6px" }}><IoPerson /></div>
                                        <div> <p>Dashboard</p></div>

                                    </div>
                                </Link>
                                <div className="dropLogout" onClick={handleLogout}>
                                    <div style={{ marginTop: "2px", marginRight: "6px" }}><IoLogOut /></div>
                                    <div>    <p>Logout</p></div>

                                </div>
                            </div>}
                        </div>
                    </div>
                </header>
                <div className="bg-grey-50 text-gray-800 font-sans p-1 sm:p-6 lg:p-8" style={{ width: "100%",height:"90%",overflowY:"auto"}}>
                    
                    
                    
                    <div className="container1 mx-auto max-w-1xl mt-6 bg-white p-8 rounded-2xl shadow-lg " >


{}

 <div>
      <div className="page-header">
        <div>
          <h2>Help & User Guide</h2>
          <p className="page-title-desc">Learn how to make the most of the TRACS-V2 professional referral system</p>
        </div>
      </div>

      {/* Grid of Guide Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '35px' }}>
        
        {/* Step 1 */}
        <div className="glass-panel" style={{ padding: '25px', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
            <div style={{ backgroundColor: 'rgba(99,102,241,0.1)', color: 'var(--primary)', padding: '10px', borderRadius: '10px' }}>
              <Users size={20} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700' }}>1. Add Your Contacts</h3>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', flex: 1, marginBottom: '15px' }}>
            Before introducing people, add them to your directory. Go to the **My Contacts** tab to search, add new contacts, or edit existing ones. You can also group them by organizations (like H7 Network).
          </p>
          <button 
            onClick={() => setCurrentView('contacts')}
            className="btn btn-secondary btn-sm"
            style={{ width: 'fit-content' }}
          >
            Manage Contacts
          </button>
        </div>

        {/* Step 2 */}
        <div className="glass-panel" style={{ padding: '25px', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
            <div style={{ backgroundColor: 'rgba(16,185,129,0.1)', color: 'var(--success)', padding: '10px', borderRadius: '10px' }}>
              <FileText size={20} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700' }}>2. Prepare Templates</h3>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', flex: 1, marginBottom: '15px' }}>
            Draft reusable email formats in **Email Templates**. By using placeholders like <code>[[name_1]]</code>, you create dynamic scripts that autofill with correct names during composition.
          </p>
          <button 
            onClick={() => setCurrentView('templates')}
            className="btn btn-secondary btn-sm"
            style={{ width: 'fit-content' }}
          >
            Edit Templates
          </button>
        </div>

        {/* Step 3 */}
        <div className="glass-panel" style={{ padding: '25px', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
            <div style={{ backgroundColor: 'rgba(99,102,241,0.1)', color: 'var(--primary)', padding: '10px', borderRadius: '10px' }}>
              <Send size={20} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700' }}>3. Make Introduction</h3>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', flex: 1, marginBottom: '15px' }}>
            Head over to **Make Introduction**. Choose Recipient 1 and Recipient 2, select a template, and review the live rendering on the right-hand envelope preview. Click send to dispatch!
          </p>
          <button 
            onClick={() => setCurrentView('make-introduction')}
            className="btn btn-primary btn-sm"
            style={{ width: 'fit-content' }}
          >
            Launch Composer
          </button>
        </div>

      </div>

      {/* FAQ Dropdown Accordions */}
      <div className="glass-panel" style={{ padding: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <HelpCircle size={22} style={{ color: 'var(--primary)' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Frequently Asked Questions</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  transition: 'var(--transition-fast)'
                }}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    color: 'var(--text-header)',
                    fontWeight: '600',
                    fontSize: '0.925rem',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {isOpen && (
                  <div 
                    style={{
                      padding: '0 20px 20px',
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      whiteSpace: 'pre-line',
                      lineHeight: '1.6',
                      borderTop: '1px solid var(--border-color)',
                      paddingTop: '15px',
                      backgroundColor: 'rgba(255,255,255,0.01)'
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>


  {}                      
                    </div>
                </div>
            </div></div>

  );
}
