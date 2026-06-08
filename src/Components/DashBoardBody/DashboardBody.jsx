import React, { useState, useEffect ,useRef} from 'react';
import "./DashboardBody.css"
import { 
  Home, 
  Share2, 
  User, 
  Settings, 
  Key, 
  Send, 
  Inbox, 
  BookOpen, 
  FileText, 
  Signature, 
  Phone, 
  Search, 
  Moon, 
  Sun, 
  X,
  ChevronRight, 
  Download, 
  Upload, 
  Plus, 
  CheckCircle, 
  AlertTriangle, 
  AlertCircle, 
  Mail, 
  Clock, 
  FileUp,
  MessageSquare,
  Sparkles,
  Award,
  Database,
  Trash2,
  Check,
  Compass,
  ArrowUpRight
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
export default function DashboardBody() {
   const [theme, setTheme] = useState(() => {
      if (typeof window !== 'undefined') {
        return localStorage.getItem('theme') || 
          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      }
      return 'light';
    });
  
    // Navigation & UI States
    const [activeSection, setActiveSection] = useState('welcome');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeBreadcrumb, setActiveBreadcrumb] = useState('Welcome to TRACS');
    
    // Custom Toast State
    const [toast, setToast] = useState(null);
  
    // Map section ids to reader-friendly titles for the Left Side Page Navigation
    const sectionsMap = {
      welcome: "Welcome to TRACS",
      philosophy: "Networking Philosophy",
      membership: "My Membership",
      profile: "My Profile",
      password: "Change Password",
      makeIntro: "Make Introduction",
      messages: "Intro Messages (Inbox)",
      contacts: "My Contacts",
      templates: "Email Templates",
      signature: "Email Signature",
      networking101: "Networking 101",
      contactus: "Contact Us"
    };
  
    // --- Mock Databases & Business State ---
    const [membership, setMembership] = useState({
      tier: 'Basic Tier Plan',
      quotaUsed: 11,
      quotaLimit: 300,
      storageUsed: 3,
      storageLimit: 1000,
      expiryDate: 'Dec 20, 2026',
      price: '$80 / Year'
    });
  
    const [contacts, setContacts] = useState([
      { id: 'c1', firstName: 'Trevor', lastName: 'Agre', email: 'testuser3@apttechsol.com', group: 'H7 Member', updated: '2025-08-06' },
      { id: 'c2', firstName: 'Shankar', lastName: 'Vanga', email: 'shvanga@gmail.com', group: 'Premium Partner', updated: '2025-08-06' },
      { id: 'c3', firstName: 'Raj', lastName: 'Verma', email: 'raj@gmail.com', group: 'Client', updated: '2025-03-13' }
    ]);
  
    const [templates, setTemplates] = useState([
      { id: 't1', name: 'Introduction Email 1 (System)', category: 'Introduction-Email', subject: 'Intro: [[name_1]] <> [[name_2]]', body: "Hi [[name_2]], \n\nI'd like to introduce you to [[name_1]], who I believe could be a highly valuable connection for your business development efforts. Let me know when you both are free to connect." },
      { id: 't2', name: 'My Quick Follow-up (User)', category: 'Reply-Email', subject: 'Following up: Connection [[name_1]] & [[name_2]]', body: "Hi [[name_1]] & [[name_2]], \n\nI wanted to circle back and make sure you guys had a chance to put something on the calendar! Let me know if I can support in any other way." }
    ]);
  
    const [inbox, setInbox] = useState([
      { 
        id: 'i1', 
        subject: 'Intro: Shankar Vanga <> Trevor Agre', 
        sender: 'You', 
        recipient1: 'Shankar Vanga', 
        recipient2: 'Trevor Agre', 
        sentAt: 'Sent 3 months ago', 
        status: 'Needs Follow-up',
        repliesCount: 0, 
        lastMessage: 'I would like to schedule a meeting with you next week. Please check my calendar...' 
      },
      { 
        id: 'i2', 
        subject: 'Warm Introduction: Raj Verma & Trevor Agre', 
        sender: 'You', 
        recipient1: 'Raj Verma', 
        recipient2: 'Trevor Agre', 
        sentAt: 'Sent 1 week ago', 
        status: 'Connected', 
        repliesCount: 2,
        lastMessage: 'Let us connect on Thursday at 2 PM over Zoom!' 
      }
    ]);
  
    // Make Introduction Form State
    const [selectedPerson1, setSelectedPerson1] = useState(null);
    const [selectedPerson2, setSelectedPerson2] = useState(null);
    const [selectedTemplateId, setSelectedTemplateId] = useState('t1');
    const [emailSubject, setEmailSubject] = useState('Intro: [[name_1]] <> [[name_2]]');
    const [emailBody, setEmailBody] = useState("Hi [[name_2]], \n\nI'd like to introduce you to [[name_1]], who I believe could be a highly valuable connection for your business development efforts. Let me know when you both are free to connect.");
    const [isTokenReplaced, setIsTokenReplaced] = useState(false);
  
    // Profile Form State
    const [profile, setProfile] = useState({
      firstName: 'Shankar',
      lastName: 'Vanga',
      email: 'shvanga@gmail.com',
      description: 'AptTech Solution provides cost effective solutions and custom application development for Web and Mobile for small businesses.'
    });
  
    // Signature State
    const [signature, setSignature] = useState({
      name: 'Shankar Vanga',
      email: 'svanga@apttechsol.com',
      phone: '650-305-0196'
    });
  
    // Support Form State
    const [supportSubject, setSupportSubject] = useState('');
    const [supportMessage, setSupportMessage] = useState('');
  
    // Add Contact Modal State
    const [isAddContactOpen, setIsAddContactOpen] = useState(false);
    const [newContact, setNewContact] = useState({ firstName: '', lastName: '', email: '', group: '' });
  
    // Refs for ScrollSpy
    const sectionsRef = {
      welcome: useRef(null),
      philosophy: useRef(null),
      membership: useRef(null),
      profile: useRef(null),
      password: useRef(null),
      makeIntro: useRef(null),
      messages: useRef(null),
      contacts: useRef(null),
      templates: useRef(null),
      signature: useRef(null),
      networking101: useRef(null),
      contactus: useRef(null)
    };
  
    // Toast helper
    const showToast = (message, type = 'success') => {
      setToast({ message, type });
      setTimeout(() => {
        setToast(null);
      }, 4000);
    };
  
    // Sync theme with HTML document element
    useEffect(() => {
      const root = window.document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    }, [theme]);
  
    // ScrollSpy listener
    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY + 200;
        let active = 'welcome';
        
        for (const [key, ref] of Object.entries(sectionsRef)) {
          if (ref.current && scrollPosition >= ref.current.offsetTop) {
            active = key;
          }
        }
        
        if (active !== activeSection) {
          setActiveSection(active);
          const sectionTitle = sectionsMap[active] || 'Documentation';
          setActiveBreadcrumb(sectionTitle);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [activeSection]);
  
    // Handle Template Swapping
    const handleTemplateChange = (e) => {
      const tempId = e.target.value;
      setSelectedTemplateId(tempId);
      const selected = templates.find(t => t.id === tempId);
      if (selected) {
        setEmailSubject(selected.subject);
        setEmailBody(selected.body);
        setIsTokenReplaced(false);
      }
    };
  
    // Replace Tokens Action
    const handleReplaceTokens = () => {
      if (!selectedPerson1 || !selectedPerson2) {
        showToast('Please select both First Person and Second Person first!', 'error');
        return;
      }
  
      const name1 = `${selectedPerson1.firstName} ${selectedPerson1.lastName}`;
      const name2 = `${selectedPerson2.firstName} ${selectedPerson2.lastName}`;
  
      let parsedSubject = emailSubject
        .replace(/\[\[name_1\]\]/g, name1)
        .replace(/\[\[name_2\]\]/g, name2);
  
      let parsedBody = emailBody
        .replace(/\[\[name_1\]\]/g, name1)
        .replace(/\[\[name_2\]\]/g, name2);
  
      setEmailSubject(parsedSubject);
      setEmailBody(parsedBody);
      setIsTokenReplaced(true);
      showToast('Tokens successfully replaced with selected names!', 'success');
    };
  
    // Send Introduction Action
    const handleSendIntroduction = () => {
      if (!selectedPerson1 || !selectedPerson2) {
        showToast('Select both contacts to initiate an introduction.', 'error');
        return;
      }
      if (!isTokenReplaced) {
        showToast('Error: You must click "Replace Tokens" to format names before sending!', 'error');
        return;
      }
  
      // Process state alterations
      // 1. Quota adjustment
      setMembership(prev => ({
        ...prev,
        quotaUsed: Math.min(prev.quotaUsed + 1, prev.quotaLimit)
      }));
  
      // 2. Add to inbox
      const newInboxItem = {
        id: 'i' + (inbox.length + 1),
        subject: emailSubject,
        sender: 'You',
        recipient1: `${selectedPerson1.firstName} ${selectedPerson1.lastName}`,
        recipient2: `${selectedPerson2.firstName} ${selectedPerson2.lastName}`,
        sentAt: 'Just now',
        status: 'Needs Follow-up',
        repliesCount: 0,
        lastMessage: emailBody.substring(0, 80) + '...'
      };
  
      setInbox([newInboxItem, ...inbox]);
      showToast(`Introduction successfully sent to ${selectedPerson1.firstName} & ${selectedPerson2.firstName}!`, 'success');
  
      // Reset Form
      setSelectedPerson1(null);
      setSelectedPerson2(null);
      setIsTokenReplaced(false);
      // Reset to template defaults
      const originalTemplate = templates.find(t => t.id === 't1');
      if (originalTemplate) {
        setEmailSubject(originalTemplate.subject);
        setEmailBody(originalTemplate.body);
      }
    };
  
    // Add Contact Action
    const handleAddContact = (e) => {
      e.preventDefault();
      if (!newContact.firstName || !newContact.lastName || !newContact.email) {
        showToast('First Name, Last Name and Email are mandatory!', 'error');
        return;
      }
  
      const added = {
        id: 'c' + (contacts.length + 1),
        firstName: newContact.firstName,
        lastName: newContact.lastName,
        email: newContact.email,
        group: newContact.group || 'General Contact',
        updated: new Date().toISOString().split('T')[0]
      };
  
      setContacts([...contacts, added]);
      setMembership(prev => ({ ...prev, storageUsed: prev.storageUsed + 1 }));
      setNewContact({ firstName: '', lastName: '', email: '', group: '' });
      setIsAddContactOpen(false);
      showToast(`${added.firstName} ${added.lastName} has been added to your database!`, 'success');
    };
  
    // Support Form Submit
    const handleSupportSubmit = (e) => {
      e.preventDefault();
      if (!supportSubject || !supportMessage) {
        showToast('Please complete all form fields before submitting.', 'error');
        return;
      }
      showToast('Your support request has been submitted. A specialist will call or email you shortly.', 'success');
      setSupportSubject('');
      setSupportMessage('');
    };
  
    // Profile Save Simulation
    const handleProfileUpdate = (e) => {
      e.preventDefault();
      showToast('Your professional business profile card has been updated!', 'success');
    };
  
    // Signature Save Simulation
    const handleSignatureSave = () => {
      showToast('Your automated email signature block has been saved!', 'success');
    };
  
    // Bump/Nudge Simulation
    const handleBumpInbox = (item) => {
      if (item.repliesCount > 0) {
        showToast('Bump not available: Conversation already contains active replies.', 'error');
        return;
      }
      showToast(`Sent automatic bump nudge for: "${item.subject}"`, 'success');
    };
  
    // Smooth Scrolling to target sections
    const scrollToSection = (id) => {
      const element = sectionsRef[id].current;
      if (element) {
        const yOffset = -110;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        setActiveSection(id);
        setActiveBreadcrumb(sectionsMap[id]);
      }
    };
  
    ////////////////



  const Icon = ({ name, className = "w-6 h-6" }) => {
    //



    //
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

  <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300 font-sans`}>
       
       {/* Global CSS style injection to remove scrollbar on custom classes */}
       <style dangerouslySetInnerHTML={{__html: `
         .no-scrollbar::-webkit-scrollbar {
           display: none !important;
         }
         .no-scrollbar {
           -ms-overflow-style: none !important;  /* IE and Edge */
           scrollbar-width: none !important;  /* Firefox */
         }
       `}} />
 
       {/* Toast Notification */}
       {toast && (
         <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border animate-bounce transition-all duration-300 max-w-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
           {toast.type === 'success' ? (
             <div className="p-1 bg-green-500/10 text-green-500 rounded-full">
               <Check className="w-5 h-5" />
             </div>
           ) : (
             <div className="p-1 bg-red-500/10 text-red-500 rounded-full">
               <AlertCircle className="w-5 h-5" />
             </div>
           )}
           <div>
             <p className="text-xs font-bold text-slate-900 dark:text-white">Notification</p>
             <p className="text-xs text-slate-605 dark:text-slate-400 mt-0.5">{toast.message}</p>
           </div>
         </div>
       )}
 
       {/* Main Content Pane - Now with full width (no left-sidebar padding layout) */}
       <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden transition-all duration-305">
         
         {/* Sticky Header with Title and Search Engine */}
         <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20">
           <div className="flex items-center gap-4">
             <div className="bg-gradient-to-tr from-indigo-650 to-indigo-500 text-white p-2.5 rounded-2xl shadow-md shadow-indigo-500/20 flex-shrink-0">
               <Share2 className="w-5 h-5" />
             </div>
             <div>
               <h1 className="text-lg md:text-2xl font-black tracking-tight text-slate-900 dark:text-white transition-all">
                 {activeBreadcrumb}
               </h1>
               <nav className="flex items-center gap-2 text-[10px] md:text-xs text-slate-405 dark:text-slate-500 mt-1 uppercase font-bold tracking-widest">
                 <span className="font-extrabold text-slate-900 dark:text-slate-100">TRACS HELP CENTER</span>
                 <ChevronRight className="w-3 h-3 text-slate-400" />
                 <span className="text-indigo-650 dark:text-indigo-400 font-extrabold">{activeBreadcrumb}</span>
               </nav>
             </div>
           </div>
 
           <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="relative w-full md:w-80 group">
               <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-405 group-focus-within:text-indigo-500 transition-colors" />
               <input 
                 type="text"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="Search guide & filter interactive items..."
                 className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-855 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 dark:focus:border-indigo-505 transition-all text-sm font-medium text-slate-800 dark:text-white"
               />
             </div>
             <button 
               onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
               className="p-3 bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-855 rounded-2xl text-slate-505 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-750 transition-all shadow-sm"
               title="Toggle Dark Mode"
             >
               {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
             </button>
           </div>
         </header>
 
         {/* Outer Grid-based layout for the Page containing local Navigation within the Page layout */}
         <div className="flex-1 p-4 md:p-8 lg:p-12">
           <div className="max-w-7xl mx-auto pb-24">
             
             {/* The Outer Grid Container */}
             <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
               
               {/* === INNER LEFT SIDE PAGE NAVIGATION (Sticky Table of Contents) === */}
               <div className="hidden lg:block lg:col-span-1 sticky top-32 space-y-6">
                 
                 {/* Scrollspy Navigation Block (removed text header label, removed scroll bar) */}
                 <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-4 shadow-sm">
                   <div className="flex items-center gap-2 text-slate-450 dark:text-slate-550">
                     <Compass className="w-5 h-5 text-indigo-550 animate-spin" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Navigation</span>
                   </div>
                   
                   <div className="h-px bg-slate-100 dark:bg-slate-800" />
                   
                   <div className="space-y-1.5 max-h-[55vh] overflow-y-auto pr-1 no-scrollbar">
                     {Object.keys(sectionsMap).map((key) => (
                       <button
                         key={key}
                         onClick={() => scrollToSection(key)}
                         className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 group
                           ${activeSection === key 
                             ? 'bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 border-l-2 border-indigo-600 dark:border-indigo-400 pl-2.5' 
                             : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/40'
                           }`}
                       >
                         <ChevronRight className={`w-3 h-3 transition-transform group-hover:translate-x-0.5 ${activeSection === key ? 'text-indigo-500' : 'text-slate-300 dark:text-slate-600'}`} />
                         <span className="truncate">{sectionsMap[key]}</span>
                       </button>
                     ))}
                   </div>
                 </div>
 
                 {/* Sub-Widget: Real-time Quota Meter */}
                 <div className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-950/20 dark:to-purple-950/20 border border-indigo-500/10 dark:border-indigo-500/10 rounded-3xl p-5 space-y-4 shadow-sm">
                   <div className="flex items-center justify-between">
                     <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                       <Award className="w-4 h-4 text-indigo-505" /> Live metrics
                     </h4>
                     <span className="text-[9px] bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 font-bold px-2 py-0.5 rounded-full">Basic Tier</span>
                   </div>
                   
                   <div className="space-y-3 text-[11px]">
                     <div>
                       <div className="flex justify-between text-slate-505 dark:text-slate-400 font-semibold mb-1">
                         <span>Introductions Used:</span>
                         <span className="font-bold text-slate-805 dark:text-white">{membership.quotaUsed} / {membership.quotaLimit}</span>
                       </div>
                       <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                         <div 
                           className="bg-indigo-500 h-full rounded-full transition-all duration-500" 
                           style={{ width: `${(membership.quotaUsed / membership.quotaLimit) * 100}%` }}
                         />
                       </div>
                     </div>
 
                     <div>
                       <div className="flex justify-between text-slate-505 dark:text-slate-400 font-semibold mb-1">
                         <span>Contacts Storage:</span>
                         <span className="font-bold text-slate-850 dark:text-white">{contacts.length} / {membership.storageLimit}</span>
                       </div>
                       <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                         <div 
                           className="bg-violet-500 h-full rounded-full transition-all duration-505" 
                           style={{ width: `${(contacts.length / membership.storageLimit) * 100}%` }}
                         />
                       </div>
                     </div>
                   </div>
                 </div>
 
               </div>
 
               {/* === RIGHT COLUMN: Scrollable Content sections === */}
               <div className="lg:col-span-3 space-y-16">
                 
                 {/* Helper function to check if query matches the section */}
                 {(() => {
                   const matchesSearch = (title, contentText) => {
                     if (!searchQuery) return true;
                     const normalizedQuery = searchQuery.toLowerCase();
                     return title.toLowerCase().includes(normalizedQuery) || contentText.toLowerCase().includes(normalizedQuery);
                   };
 
                   return (
                     <>
                       {/* Welcome Section */}
                       {matchesSearch("Welcome to TRACS Help Portal Guide", "Dedicated networking CRM H7 Network manage warm introduction workflow outcomes dashboard settings") && (
                         <section ref={sectionsRef.welcome} id="welcome" data-title="Welcome to TRACS" className="scroll-mt-28">
                           <div className="mb-6 flex items-center gap-4">
                             <div className="p-3 bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 rounded-2xl shadow-sm border border-indigo-200/20">
                               <Home className="w-6 h-6" />
                             </div>
                             <h2 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Welcome to TRACS</h2>
                           </div>
                           
                           <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/5 space-y-6">
                             <p className="text-base md:text-lg text-slate-650 dark:text-slate-300 leading-relaxed font-medium">
                               Welcome to the TRACS Documentation Portal. TRACS is a dedicated networking CRM designed by the <strong className="text-slate-950 dark:text-white font-extrabold">H7 Network</strong> to streamline, manage, and scale warm professional introductions. 
                             </p>
                             <p className="text-slate-650 dark:text-slate-300 leading-relaxed font-medium">
                               Instead of relying on disorganized, text-heavy manual emails that get lost in translation, TRACS automates email workflows, tracks replies dynamically, and measures connection outcomes. It serves as your personal portal to turn casual networking handshakes into active, trackable partnerships.
                             </p>
                             
                             <div className="border-t border-slate-150 dark:border-slate-800 pt-6">
                               <h4 className="font-bold text-slate-400 dark:text-slate-505 uppercase text-xs tracking-widest mb-4">Navigating the Dashboard</h4>
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <div className="flex gap-3 items-start p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-855">
                                   <div className="w-7 h-7 rounded-xl bg-indigo-100 dark:bg-indigo-955 flex-shrink-0 flex items-center justify-center text-indigo-655 dark:text-indigo-400 text-xs font-black">1</div>
                                   <div>
                                     <span className="font-bold text-sm block text-slate-900 dark:text-white">Account Settings Menu</span>
                                     <span className="text-xs text-slate-550 dark:text-slate-404 mt-1 block font-medium">Manage your subscription, quotas, business profiles, and password updates.</span>
                                   </div>
                                 </div>
                                 <div className="flex gap-3 items-start p-4 bg-slate-50 dark:bg-slate-955 rounded-2xl border border-slate-100 dark:border-slate-855">
                                   <div className="w-7 h-7 rounded-xl bg-indigo-100 dark:bg-indigo-955 flex-shrink-0 flex items-center justify-center text-indigo-655 dark:text-indigo-400 text-xs font-black">2</div>
                                   <div>
                                     <span className="font-bold text-sm block text-slate-900 dark:text-white">Core Introduction Engine</span>
                                     <span className="text-xs text-slate-550 dark:text-slate-404 mt-1 block font-medium">Establish standard templates, configure signatures, and trigger dual introductions.</span>
                                   </div>
                                 </div>
                               </div>
                             </div>
                           </div>
                         </section>
                       )}
 
                       {/* Networking Philosophy */}
                       {matchesSearch("The Connect, Serve, and Ask Methodology", "H7 core Connect Serve Ask philosophy trust bonding value referral opportunities") && (
                         <section ref={sectionsRef.philosophy} id="philosophy" data-title="Networking Philosophy" className="scroll-mt-28">
                           <div className="mb-6 flex items-center gap-4">
                             <div className="p-3 bg-indigo-500/10 text-indigo-655 dark:text-indigo-400 rounded-2xl shadow-sm border border-indigo-200/20">
                               <Sparkles className="w-6 h-6" />
                             </div>
                             <h2 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">The Connect, Serve, and Ask® Methodology</h2>
                           </div>
                           
                           <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/5 space-y-6">
                             <p className="text-slate-650 dark:text-slate-300 leading-relaxed font-medium">
                               At its core, TRACS is engineered around H7's foundational <strong className="text-slate-955 dark:text-white font-extrabold">Connect, Serve, and Ask®</strong> philosophy. True business development isn't transactional; it is relation-driven. TRACS makes facilitating helpful connections effortless.
                             </p>
                             
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                               <div className="p-6 bg-slate-50 dark:bg-slate-955 rounded-2xl border border-slate-100 dark:border-slate-850">
                                 <span className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">01. Connect</span>
                                 <h4 className="font-bold text-slate-900 dark:text-white text-base mt-1 mb-2">Build Trusting Bonds</h4>
                                 <p className="text-xs text-slate-550 dark:text-slate-404 leading-relaxed font-medium font-medium">Initiate warm connections. Make intentional, professional introductions instead of sending cold contacts.</p>
                               </div>
                               <div className="p-6 bg-slate-50 dark:bg-slate-955 rounded-2xl border border-slate-100 dark:border-slate-855">
                                 <span className="text-xs font-black uppercase text-teal-600 dark:text-teal-400 tracking-wider">02. Serve</span>
                                 <h4 className="font-bold text-slate-900 dark:text-white text-base mt-1 mb-2">Lead with Value</h4>
                                 <p className="text-xs text-slate-550 dark:text-slate-404 leading-relaxed font-medium font-medium">Provide help and resources to colleagues. Help your network succeed first to build mutual equity.</p>
                               </div>
                               <div className="p-6 bg-slate-50 dark:bg-slate-955 rounded-2xl border border-slate-100 dark:border-slate-855">
                                 <span className="text-xs font-black uppercase text-violet-650 dark:text-violet-400 tracking-wider">03. Ask</span>
                                 <h4 className="font-bold text-slate-900 dark:text-white text-base mt-1 mb-2">Unlock Opportunities</h4>
                                 <p className="text-xs text-slate-555 dark:text-slate-404 leading-relaxed font-medium font-medium font-medium">Express your specific referral needs cleanly, allowing a fully primed network to help you expand.</p>
                               </div>
                             </div>
                           </div>
                         </section>
                       )}
 
                       {/* My Membership Section */}
                       {matchesSearch("My Membership Quotas Tracking", "limits usage real time invoice download quota threshold subscription basic active plan") && (
                         <section ref={sectionsRef.membership} id="membership" data-title="My Membership" className="scroll-mt-28">
                           <div className="mb-6 flex items-center gap-4">
                             <div className="p-3 bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 rounded-2xl shadow-sm border border-indigo-200/20">
                               <Award className="w-6 h-6" />
                             </div>
                             <h2 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">My Membership</h2>
                           </div>
                           
                           <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/5 space-y-8">
                             <div className="space-y-4">
                               <p className="text-slate-655 dark:text-slate-300 leading-relaxed font-medium">
                                 The <strong className="text-slate-955 dark:text-white font-extrabold font-semibold">My Membership</strong> page enables you to monitor your active account subscription, track limits/usage in real-time, and download your billing invoices. Keep a pulse on these limits to ensure introductions go out uninterrupted.
                               </p>
                               
                               <div className="space-y-3">
                                 <h4 className="font-bold text-slate-400 dark:text-slate-505 uppercase text-xs tracking-widest">How to use this page:</h4>
                                 <ul className="space-y-2">
                                   <li className="flex gap-2.5 items-start text-sm text-slate-650 dark:text-slate-300 font-medium">
                                     <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                     <span>Verify the expiration date of your package to prevent account locks.</span>
                                   </li>
                                   <li className="flex gap-2.5 items-start text-sm text-slate-655 dark:text-slate-300 font-medium">
                                     <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                     <span>Keep track of your <strong className="text-slate-955 dark:text-white">Introductions Quota</strong> (e.g. 300 annual introductions limit for the Basic tier).</span>
                                   </li>
                                   <li className="flex gap-2.5 items-start text-sm text-slate-655 dark:text-slate-300 font-medium">
                                     <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                     <span>Monitor your <strong className="text-slate-955 dark:text-white">Contacts Storage</strong> limits (e.g. 1000 contacts capacity).</span>
                                   </li>
                                 </ul>
                               </div>
                             </div>
 
                             {/* Live Functional UI: Membership */}
                             <div className="border border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50 dark:bg-slate-955 p-4 md:p-6">
                               <span className="text-[10px] font-black text-slate-400 dark:text-slate-550 uppercase tracking-widest block mb-4 border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                                 <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Live Interactive Panel: My Membership Plan
                               </span>
                               
                               <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-2xl p-5 space-y-6 max-w-3xl mx-auto shadow-sm">
                                 <div className="flex justify-between items-center flex-wrap gap-3">
                                   <div>
                                     <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">Active Membership Details</h3>
                                     <p className="text-xs text-slate-400 mt-0.5 font-medium">Basic Tier Plan</p>
                                   </div>
                                   <span className="px-3 py-1 bg-green-500/10 text-green-650 dark:text-green-400 text-xs font-bold rounded-full border border-green-500/20 flex items-center gap-1.5">
                                     <span className="w-2 h-2 rounded-full bg-green-550 animate-pulse inline-block" /> Active
                                   </span>
                                 </div>
 
                                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 dark:bg-slate-955 rounded-2xl border border-slate-100 dark:border-slate-850 text-xs font-semibold">
                                   <div>
                                     <span className="text-slate-400 block mb-0.5">Package</span>
                                     <span className="font-bold text-slate-800 dark:text-white">Basic</span>
                                   </div>
                                   <div>
                                     <span className="text-slate-400 block mb-0.5 font-medium">Purchased</span>
                                     <span className="font-bold text-slate-800 dark:text-white font-semibold">Dec 20, 2025</span>
                                   </div>
                                   <div>
                                     <span className="text-slate-405 block mb-0.5 font-medium">Expires On</span>
                                     <span className="font-bold text-slate-800 dark:text-white">{membership.expiryDate}</span>
                                   </div>
                                   <div>
                                     <span className="text-slate-405 block mb-0.5 font-medium">Pricing</span>
                                     <span className="font-bold text-slate-800 dark:text-white">{membership.price}</span>
                                   </div>
                                 </div>
 
                                 <div className="space-y-4">
                                   <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-555">Usage Metrics</h4>
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                     <div className="p-4 bg-slate-50 dark:bg-slate-955 rounded-2xl border border-slate-100 dark:border-slate-855">
                                       <div className="flex justify-between text-xs font-bold mb-1.5">
                                         <span className="text-slate-700 dark:text-slate-300">Introductions Quota</span>
                                         <span className="text-slate-900 dark:text-white font-extrabold">{membership.quotaUsed} / {membership.quotaLimit}</span>
                                       </div>
                                       <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                         <div 
                                           className="bg-indigo-500 h-full rounded-full transition-all duration-500" 
                                           style={{ width: `${(membership.quotaUsed / membership.quotaLimit) * 100}%` }}
                                         />
                                       </div>
                                       <p className="text-[10px] text-slate-405 mt-2">{membership.quotaLimit - membership.quotaUsed} remaining of annual quota</p>
                                     </div>
                                     
                                     <div className="p-4 bg-slate-50 dark:bg-slate-955 rounded-2xl border border-slate-100 dark:border-slate-855">
                                       <div className="flex justify-between text-xs font-bold mb-1.5">
                                         <span className="text-slate-700 dark:text-slate-300 font-semibold">Contacts Storage</span>
                                         <span className="text-slate-900 dark:text-white font-extrabold">{contacts.length} / {membership.storageLimit}</span>
                                       </div>
                                       <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                         <div 
                                           className="bg-violet-500 h-full rounded-full transition-all duration-500" 
                                           style={{ width: `${(contacts.length / membership.storageLimit) * 100}%` }}
                                         />
                                       </div>
                                       <p className="text-[10px] text-slate-405 mt-2">{membership.storageLimit - contacts.length} slots available for contacts</p>
                                     </div>
                                   </div>
                                 </div>
                               </div>
                             </div>
                           </div>
                         </section>
                       )}
 
                       {/* My Profile Section */}
                       {matchesSearch("My Profile Settings Business", "personal details edit profile first name last name website linkedin business description") && (
                         <section ref={sectionsRef.profile} id="profile" data-title="My Profile" className="scroll-mt-28">
                           <div className="mb-6 flex items-center gap-4">
                             <div className="p-3 bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 rounded-2xl shadow-sm border border-indigo-200/20">
                               <User className="w-6 h-6" />
                             </div>
                             <h2 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">My Profile Settings</h2>
                           </div>
                           
                           <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/5 space-y-8">
                             <div className="space-y-4">
                               <p className="text-slate-650 dark:text-slate-305 leading-relaxed font-medium">
                                 Your profile acts as your business card in the TRACS network. A detailed profile builds credibility when others receive your introductions. Update your details under <strong className="text-slate-955 dark:text-white">Account Settings &gt; My Profile</strong>.
                               </p>
                               
                               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed text-slate-550">
                                 <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-2xl">
                                   <strong className="text-slate-805 dark:text-white font-bold block mb-1.5 text-xs">Personal Details</strong>
                                   Mandatory fields include First Name, Last Name, and Email (used for notifications and intro CC routing).
                                 </div>
                                 <div className="p-4 bg-slate-50 dark:bg-slate-955 border border-slate-100 dark:border-slate-850 rounded-2xl">
                                   <strong className="text-slate-805 dark:text-white font-bold block mb-1.5 text-xs">Business Context</strong>
                                   Add your Business Name and Description to give contacts immediate context about your specialty.
                                 </div>
                                 <div className="p-4 bg-slate-50 dark:bg-slate-955 border border-slate-100 dark:border-slate-850 rounded-2xl">
                                   <strong className="text-slate-805 dark:text-white font-bold block mb-1.5 text-xs">Location & Links</strong>
                                   Insert Website and LinkedIn URL links so contacts can research your company and connect easily.
                                 </div>
                               </div>
                             </div>
 
                             {/* Live UI Mockup: Profile Form */}
                             <div className="border border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50 dark:bg-slate-955 p-4 md:p-6">
                               <span className="text-[10px] font-black text-slate-404 dark:text-slate-500 uppercase tracking-widest block mb-4 border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                                 <User className="w-3.5 h-3.5 text-indigo-500" /> Interactive Form Mockup: Edit Profile Details
                               </span>
                               
                               <form onSubmit={handleProfileUpdate} className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-2xl p-5 max-w-3xl mx-auto shadow-sm text-xs">
                                 <div className="flex justify-between items-center mb-6">
                                   <h3 className="text-sm font-bold text-slate-800 dark:text-white">Edit Profile Details</h3>
                                   <span className="text-[10px] text-indigo-600 dark:text-indigo-404 font-black hover:underline cursor-pointer flex items-center gap-1 font-bold">
                                     View Profile
                                   </span>
                                 </div>
 
                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                   <div className="md:col-span-1 flex flex-col items-center justify-center border-r border-slate-105 dark:border-slate-800/60 p-4 text-center">
                                     <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center text-slate-450 border border-slate-200 dark:border-slate-800 mb-3 overflow-hidden">
                                       <User className="w-10 h-10 text-slate-350" />
                                     </div>
                                     <button type="button" className="px-3 py-1.5 bg-slate-105 dark:bg-slate-955 hover:bg-slate-200 dark:hover:bg-slate-855 rounded-xl font-bold border border-slate-200 dark:border-slate-800 text-[10px] transition-colors text-slate-750 dark:text-slate-305 font-bold">Upload Image</button>
                                   </div>
                                   <div className="md:col-span-2 space-y-4 font-semibold">
                                     <div className="grid grid-cols-2 gap-4">
                                       <div>
                                         <label className="block text-slate-405 mb-1 font-bold">First Name *</label>
                                         <input 
                                           type="text" 
                                           value={profile.firstName} 
                                           onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                                           className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-805 dark:text-slate-200 font-semibold focus:ring-2 focus:ring-indigo-500/20"
                                         />
                                       </div>
                                       <div>
                                         <label className="block text-slate-405 mb-1 font-bold">Last Name *</label>
                                         <input 
                                           type="text" 
                                           value={profile.lastName} 
                                           onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                                           className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-805 dark:text-slate-200 font-semibold focus:ring-2 focus:ring-indigo-500/20"
                                         />
                                       </div>
                                     </div>
                                     <div>
                                       <label className="block text-slate-405 mb-1 font-bold">Email *</label>
                                       <input 
                                         type="email" 
                                         value={profile.email} 
                                         disabled 
                                         className="w-full bg-slate-105 dark:bg-slate-955 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-2 text-slate-400 dark:text-slate-550 font-semibold cursor-not-allowed"
                                       />
                                     </div>
                                     <div>
                                       <label className="block text-slate-405 mb-1 font-bold">Business Description</label>
                                       <textarea 
                                         value={profile.description}
                                         onChange={(e) => setProfile({...profile, description: e.target.value})}
                                         className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-750 dark:text-slate-300 leading-relaxed font-semibold focus:ring-2 focus:ring-indigo-500/20" 
                                         rows="3"
                                       />
                                     </div>
                                     <div className="flex justify-end gap-2 pt-2">
                                       <button type="submit" className="px-5 py-2.5 bg-indigo-655 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-sm">Update Profile</button>
                                     </div>
                                   </div>
                                 </div>
                               </form>
                             </div>
                           </div>
                         </section>
                       )}
 
                       {/* Change Password Section */}
                       {matchesSearch("Change Password Safety Encryption", "credentials secure security constraints password rules minimum 8 characters 12+ sugered") && (
                         <section ref={sectionsRef.password} id="password" data-title="Change Password" className="scroll-mt-28">
                           <div className="mb-6 flex items-center gap-4">
                             <div className="p-3 bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 rounded-2xl shadow-sm border border-indigo-200/20">
                               <Key className="w-6 h-6" />
                             </div>
                             <h2 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Change Password</h2>
                           </div>
                           
                           <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/5 space-y-6">
                             <p className="text-slate-650 dark:text-slate-300 leading-relaxed font-medium">
                               Protect your network's data and your introduction history. Update your login credentials at any time under <strong className="text-slate-955 dark:text-white">Account Settings &gt; Change Password</strong>.
                             </p>
                             
                             <div className="bg-amber-500/5 dark:bg-amber-955/20 rounded-2xl p-5 border border-amber-500/20 flex gap-4 items-start">
                               <AlertTriangle className="w-5 h-5 text-amber-550 dark:text-amber-400 mt-1 flex-shrink-0" />
                               <div className="text-sm">
                                 <span className="font-black text-amber-855 dark:text-amber-300 block mb-0.5">Password Constraints:</span>
                                 <span className="text-amber-700 dark:text-amber-405/80 leading-relaxed block text-xs font-semibold">
                                   Passwords must contain a minimum of 8 characters. We strongly suggest 12+ characters including numbers, symbols, and capitalized characters to guard your client database.
                                 </span>
                               </div>
                             </div>
                           </div>
                         </section>
                       )}
 
                       {/* Make Introduction Section */}
                       {matchesSearch("Make Introduction Tool Process", "replace tokens placeholder dual double brackets routing engine matching contact list send introduction") && (
                         <section ref={sectionsRef.makeIntro} id="makeIntro" data-title="Make Introduction" className="scroll-mt-28">
                           <div className="mb-6 flex items-center gap-4">
                             <div className="p-3 bg-indigo-500/10 text-indigo-655 dark:text-indigo-400 rounded-2xl shadow-sm border border-indigo-200/20">
                               <Send className="w-6 h-6" />
                             </div>
                             <h2 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Make Introduction</h2>
                           </div>
                           
                           <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/5 space-y-8">
                             <p className="text-slate-650 dark:text-slate-300 leading-relaxed font-medium">
                               The introduction module connects two professionals in your network. TRACS handles the email routing, appends signature info, and tracks response lifecycle.
                             </p>
 
                             <div className="space-y-4">
                               <h4 className="font-bold text-slate-405 dark:text-slate-505 uppercase text-xs tracking-widest">Step-by-Step Guide</h4>
                               <div className="space-y-4">
                                 <div className="flex gap-4 items-start">
                                   <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-650 dark:text-indigo-400 flex-shrink-0 flex items-center justify-center text-xs font-bold mt-1">1</div>
                                   <div>
                                     <strong className="text-slate-805 dark:text-white text-sm block">Select First Person</strong>
                                     <span className="text-xs text-slate-550 dark:text-slate-400 mt-1 block leading-relaxed font-medium font-medium">Filter between H7 Members, TRACS Members, or Contacts. Search by name/email, and click "Select". You can also add a contact on the fly using "+ Add New Contact".</span>
                                   </div>
                                 </div>
                                 <div className="flex gap-4 items-start">
                                   <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-655 dark:text-indigo-400 flex-shrink-0 flex items-center justify-center text-xs font-bold mt-1">2</div>
                                   <div>
                                     <strong className="text-slate-805 dark:text-white text-sm block">Select Second Person</strong>
                                     <span className="text-xs text-slate-555 dark:text-slate-405 mt-1 block leading-relaxed font-medium font-medium font-medium">Repeat the process to choose the second person. You can swap or clear the selected names if necessary.</span>
                                   </div>
                                 </div>
                                 <div className="flex gap-4 items-start">
                                   <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-955 text-indigo-655 dark:text-indigo-400 flex-shrink-0 flex items-center justify-center text-xs font-bold mt-1">3</div>
                                   <div>
                                     <strong className="text-slate-805 dark:text-white text-sm block">Choose a Template</strong>
                                     <span className="text-xs text-slate-555 dark:text-slate-405 mt-1 block leading-relaxed font-medium font-medium font-medium">Pick from either standard System templates or your custom User templates. Or create one instantly via "+ Create New Template".</span>
                                   </div>
                                 </div>
                                 <div className="flex gap-4 items-start">
                                   <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-955 text-indigo-655 dark:text-indigo-400 flex-shrink-0 flex items-center justify-center text-xs font-bold mt-1">4</div>
                                   <div>
                                     <strong className="text-slate-805 dark:text-white text-sm block">Click Replace Tokens (Mandatory)</strong>
                                     <span className="text-xs text-slate-555 dark:text-slate-405 mt-1 block leading-relaxed font-medium font-medium font-medium">
                                       Click <strong className="text-slate-950 dark:text-white">Replace Tokens</strong>. This swaps the template markers <code className="bg-slate-100 dark:bg-slate-950 px-1.5 py-0.5 rounded font-mono text-[10px] text-red-500 font-bold">[[name_1]]</code> and <code className="bg-slate-100 dark:bg-slate-950 px-1.5 py-0.5 rounded font-mono text-[10px] text-red-500 font-bold">[[name_2]]</code> with the selected names. 
                                     </span>
                                   </div>
                                 </div>
                               </div>
                             </div>
 
                             <div className="bg-red-500/10 rounded-2xl p-5 border border-red-500/20 flex gap-4 items-start">
                               <AlertCircle className="w-5 h-5 text-red-555 flex-shrink-0 mt-0.5" />
                               <div className="text-xs font-semibold">
                                 <span className="font-black text-red-700 dark:text-red-400 block mb-0.5">Critical Verification step:</span>
                                 <span className="text-slate-650 dark:text-slate-300 leading-relaxed block font-semibold">
                                   If you attempt to send an introduction email without clicking "Replace Tokens", TRACS will raise an error and halt the dispatch. Ensure all markers are fully replaced before hitting send!
                                 </span>
                               </div>
                             </div>
 
                             {/* Live Functional Introduction Module */}
                             <div className="border border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50 dark:bg-slate-955 p-4 md:p-6 shadow-inner">
                               <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-4 border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                                 <Send className="w-3.5 h-3.5 text-indigo-505" /> Fully Functional Panel: Make Introduction Engine
                               </span>
                               
                               <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-2xl p-5 max-w-3xl mx-auto shadow-sm text-xs space-y-5">
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                   
                                   {/* Selection: First Person */}
                                   <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50/50 dark:bg-slate-950/20 space-y-2">
                                     <label className="flex items-center gap-2 font-extrabold text-slate-705 dark:text-slate-305">
                                       <span className="w-5 h-5 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center text-[10px]">1</span>
                                       <span>First Person (P1)</span>
                                     </label>
                                     {selectedPerson1 ? (
                                       <div className="p-3 border border-indigo-500 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-between">
                                         <div>
                                           <p className="font-bold text-slate-800 dark:text-white">{selectedPerson1.firstName} {selectedPerson1.lastName}</p>
                                           <p className="text-[10px] text-slate-405">{selectedPerson1.email}</p>
                                         </div>
                                         <button 
                                           type="button"
                                           onClick={() => { setSelectedPerson1(null); setIsTokenReplaced(false); }}
                                           className="text-xs text-red-505 hover:underline font-bold"
                                         >
                                           Clear
                                         </button>
                                       </div>
                                     ) : (
                                       <div className="space-y-2">
                                         <select 
                                           onChange={(e) => {
                                             const p = contacts.find(c => c.id === e.target.value);
                                             if (p) setSelectedPerson1(p);
                                           }}
                                           className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-2 font-bold"
                                           defaultValue=""
                                         >
                                           <option value="" disabled>-- Select First Person --</option>
                                           {contacts.map(c => (
                                             <option key={c.id} value={c.id} disabled={selectedPerson2?.id === c.id}>
                                               {c.firstName} {c.lastName} ({c.group})
                                             </option>
                                           ))}
                                         </select>
                                       </div>
                                     )}
                                   </div>
 
                                   {/* Selection: Second Person */}
                                   <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50/50 dark:bg-slate-950/20 space-y-2">
                                     <label className="flex items-center gap-2 font-extrabold text-slate-705 dark:text-slate-305">
                                       <span className="w-5 h-5 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center text-[10px]">2</span>
                                       <span>Second Person (P2)</span>
                                     </label>
                                     {selectedPerson2 ? (
                                       <div className="p-3 border border-indigo-500 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-between">
                                         <div>
                                           <p className="font-bold text-slate-800 dark:text-white">{selectedPerson2.firstName} {selectedPerson2.lastName}</p>
                                           <p className="text-[10px] text-slate-405">{selectedPerson2.email}</p>
                                         </div>
                                         <button 
                                           type="button"
                                           onClick={() => { setSelectedPerson2(null); setIsTokenReplaced(false); }}
                                           className="text-xs text-red-505 hover:underline font-bold"
                                         >
                                           Clear
                                         </button>
                                       </div>
                                     ) : (
                                       <div className="space-y-2">
                                         <select 
                                           onChange={(e) => {
                                             const p = contacts.find(c => c.id === e.target.value);
                                             if (p) setSelectedPerson2(p);
                                           }}
                                           className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-2 font-bold"
                                           defaultValue=""
                                         >
                                           <option value="" disabled>-- Select Second Person --</option>
                                           {contacts.map(c => (
                                             <option key={c.id} value={c.id} disabled={selectedPerson1?.id === c.id}>
                                               {c.firstName} {c.lastName} ({c.group})
                                             </option>
                                           ))}
                                         </select>
                                       </div>
                                     )}
                                   </div>
 
                                 </div>
 
                                 {/* Template & Compose */}
                                 <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 bg-slate-50/50 dark:bg-slate-955/20 space-y-3">
                                   <h4 className="font-bold text-slate-700 dark:text-slate-300 font-bold">3. Compose Email Template</h4>
                                   
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     <div>
                                       <label className="block text-slate-400 mb-1 font-bold">Select Template</label>
                                       <select 
                                         value={selectedTemplateId} 
                                         onChange={handleTemplateChange}
                                         className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 font-semibold text-slate-750 dark:text-slate-250 font-bold"
                                       >
                                         {templates.map(t => (
                                           <option key={t.id} value={t.id}>{t.name}</option>
                                         ))}
                                       </select>
                                     </div>
                                     <div>
                                       <label className="block text-slate-404 mb-1 font-bold">Subject Line</label>
                                       <input 
                                         type="text" 
                                         value={emailSubject}
                                         onChange={(e) => setEmailSubject(e.target.value)}
                                         className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 font-semibold"
                                       />
                                     </div>
                                   </div>
 
                                   <div>
                                     <label className="block text-slate-404 mb-1 font-bold">Email Body</label>
                                     <textarea 
                                       value={emailBody}
                                       onChange={(e) => setEmailBody(e.target.value)}
                                       className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 font-semibold leading-relaxed"
                                       rows="5"
                                     />
                                   </div>
 
                                   <div className="flex flex-wrap justify-between items-center gap-3 pt-2">
                                     <span className="text-[11px] text-slate-405 flex items-center gap-2 font-medium">
                                       Required Tokens: 
                                       <span className="text-red-505 font-mono font-black">[[name_1]]</span> 
                                       <span className="text-red-505 font-mono font-black">[[name_2]]</span>
                                     </span>
                                     <div className="flex gap-2">
                                       <button 
                                         type="button"
                                         onClick={handleReplaceTokens}
                                         className="px-4 py-2 bg-indigo-555/15 hover:bg-indigo-500/25 text-indigo-655 dark:text-indigo-400 border border-indigo-500/20 rounded-xl font-bold shadow-sm transition-colors"
                                       >
                                         Replace Tokens
                                       </button>
                                       <button 
                                         type="button"
                                         onClick={handleSendIntroduction}
                                         className="px-5 py-2 bg-indigo-600 hover:bg-indigo-705 text-white rounded-xl font-bold shadow-sm transition-colors"
                                       >
                                         Send Introduction
                                       </button>
                                     </div>
                                   </div>
                                 </div>
                               </div>
                             </div>
                           </div>
                         </section>
                       )}
 
                       {/* Introduction Messages (Inbox) Section */}
                       {matchesSearch("Introduction Messages Inbox Track History", "lifecycle tracking filter status replying follow up bump email reminders") && (
                         <section ref={sectionsRef.messages} id="messages" data-title="Intro Messages (Inbox)" className="scroll-mt-28">
                           <div className="mb-6 flex items-center gap-4">
                             <div className="p-3 bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 rounded-2xl shadow-sm border border-indigo-200/20">
                               <Inbox className="w-6 h-6" />
                             </div>
                             <h2 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Introduction Messages (Inbox)</h2>
                           </div>
                           
                           <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/5 space-y-8">
                             <div className="space-y-4">
                               <p className="text-slate-655 dark:text-slate-300 leading-relaxed font-medium">
                                 Once an introduction is sent, you are directed to the <strong className="text-slate-955 dark:text-white">Introduction Messages</strong> (Inbox History) tab. This interface acts as your introduction command center, allowing you to track the lifecycle of your connection.
                               </p>
                               
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                 <div className="space-y-3">
                                   <h4 className="font-bold text-slate-805 dark:text-white text-sm">Auditing and Filters</h4>
                                   <ul className="space-y-2 text-xs leading-relaxed text-slate-500 font-semibold font-medium">
                                     <li className="flex gap-2 items-start">
                                       <ChevronRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                                       <span><strong>Filter status:</strong> Choose between All, Intros Received, Intros Sent, Needs Follow-up, and Archive.</span>
                                     </li>
                                     <li className="flex gap-2 items-start">
                                       <ChevronRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                                       <span><strong>Sorting:</strong> Sort by latest or oldest connection threads.</span>
                                     </li>
                                     <li className="flex gap-2 items-start">
                                       <ChevronRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                                       <span><strong>Search:</strong> Quickly search entries by Subject Line content.</span>
                                     </li>
                                   </ul>
                                 </div>
                                 <div className="space-y-3">
                                   <h4 className="font-bold text-slate-805 dark:text-white text-sm">Inbox Actions</h4>
                                   <ul className="space-y-2 text-xs leading-relaxed text-slate-500 font-semibold font-medium">
                                     <li className="flex gap-2 items-start">
                                       <ChevronRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                                       <span><strong>View:</strong> Opens chronological timeline thread to view responses from Person 1 and Person 2.</span>
                                     </li>
                                     <li className="flex gap-2 items-start">
                                       <ChevronRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                                       <span><strong>Reply:</strong> Send an update using pre-made Reply-Email templates to keep the conversation going.</span>
                                     </li>
                                     <li className="flex gap-2 items-start">
                                       <ChevronRight className="w-4 h-4 text-indigo-505 flex-shrink-0 mt-0.5" />
                                       <span><strong>Bump (Follow-Up):</strong> Send a quick reminder nudge to the participants. The "Bump" option is available *only* when there are zero replies in the thread.</span>
                                     </li>
                                   </ul>
                                 </div>
                               </div>
                             </div>
 
                             {/* Live Functional UI: Inbox History */}
                             <div className="border border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50 dark:bg-slate-955 p-4 md:p-6 shadow-inner">
                               <span className="text-[10px] font-black text-slate-400 dark:text-slate-505 uppercase tracking-widest block mb-4 border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                                 <Inbox className="w-3.5 h-3.5 text-indigo-505" /> Live Interactive Panel: Introduction History Messages
                               </span>
                               
                               <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-2xl p-4 max-w-3xl mx-auto shadow-sm text-xs space-y-4">
                                 <div className="flex justify-between items-center flex-wrap gap-2 border-b border-slate-100 dark:border-slate-800/60 pb-3">
                                   <div className="flex gap-1.5">
                                     <span className="px-3 py-1 bg-indigo-500 text-white rounded-lg font-bold text-[10px]">All ({inbox.length})</span>
                                     <span className="px-3 py-1 bg-slate-50 dark:bg-slate-955 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-[10px] text-slate-505 font-bold cursor-pointer">Needs Follow-up ({inbox.filter(i => i.status === 'Needs Follow-up').length})</span>
                                   </div>
                                   <span className="text-[10px] text-slate-400 font-bold font-bold font-bold">Sort: <strong className="text-slate-650 dark:text-slate-300 font-bold font-bold">Latest</strong></span>
                                 </div>
 
                                 <div className="space-y-3">
                                   {inbox.map(item => (
                                     <div key={item.id} className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 bg-slate-50/50 dark:bg-slate-950/20 space-y-3">
                                       <div className="flex justify-between items-start flex-wrap gap-2">
                                         <div>
                                           <span className={`px-2 py-0.5 text-[9px] font-bold rounded border ${
                                             item.status === 'Connected' 
                                               ? 'bg-green-500/10 text-green-650 border-green-500/20' 
                                               : 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
                                           }`}>
                                             {item.status}
                                           </span>
                                           <h4 className="font-bold text-slate-800 dark:text-white mt-1.5 text-xs md:text-sm">{item.subject}</h4>
                                           <p className="text-[10px] text-slate-400 mt-0.5 font-medium">{item.sentAt}</p>
                                         </div>
                                         <div className="flex gap-1.5">
                                           <button 
                                             type="button"
                                             onClick={() => showToast(`Opening timeline thread detail for intro...`, 'success')}
                                             className="px-2.5 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-305 dark:hover:bg-slate-750 text-slate-750 dark:text-slate-305 rounded-lg font-bold text-[10px] transition-colors"
                                           >
                                             View
                                           </button>
                                           <button 
                                             type="button"
                                             onClick={() => showToast(`Replying with auto-template defaults...`, 'success')}
                                             className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-705 text-white rounded-lg font-bold text-[10px] transition-colors"
                                           >
                                             Reply
                                           </button>
                                           <button 
                                             type="button"
                                             onClick={() => handleBumpInbox(item)}
                                             className={`px-2.5 py-1.5 text-white rounded-lg font-bold text-[10px] transition-colors ${
                                               item.repliesCount === 0 
                                                 ? 'bg-violet-650 hover:bg-violet-700 shadow-sm' 
                                                 : 'bg-slate-200 dark:bg-slate-800 text-slate-404 cursor-not-allowed'
                                             }`}
                                             title={item.repliesCount === 0 ? "Send follow-up nudge" : "Direct follow up disabled as thread contains active replies"}
                                           >
                                             Bump
                                           </button>
                                         </div>
                                       </div>
 
                                       <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[10px]">
                                         <div>
                                           <span className="text-slate-404 block font-semibold">Recipient 1</span>
                                           <span className="font-bold text-slate-705 dark:text-slate-300">{item.recipient1}</span>
                                         </div>
                                         <div>
                                           <span className="text-slate-404 block font-semibold">Recipient 2</span>
                                           <span className="font-bold text-slate-705 dark:text-slate-300">{item.recipient2}</span>
                                         </div>
                                       </div>
 
                                       <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-xl p-3 text-[10px] leading-relaxed text-slate-550 dark:text-slate-404 font-semibold">
                                         <strong className="text-slate-705 dark:text-slate-305 font-extrabold block mb-1">Snippet preview:</strong> 
                                         {item.lastMessage}
                                       </div>
                                     </div>
                                   ))}
                                 </div>
                               </div>
                             </div>
 
                           </div>
                         </section>
                       )}
 
                       {/* My Contacts Section */}
                       {matchesSearch("My Contacts Referral Database", "manual add contacts bulk import template parsed spreadsheet xls cvs file") && (
                         <section ref={sectionsRef.contacts} id="contacts" data-title="My Contacts" className="scroll-mt-28">
                           <div className="mb-6 flex items-center gap-4">
                             <div className="p-3 bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 rounded-2xl shadow-sm border border-indigo-200/20">
                               <Database className="w-6 h-6" />
                             </div>
                             <h2 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">My Contacts</h2>
                           </div>
                           
                           <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/5 space-y-8">
                             <div className="space-y-4">
                               <p className="text-slate-655 dark:text-slate-305 leading-relaxed font-medium font-medium">
                                 Build your referral database in the <strong className="text-slate-955 dark:text-white">My Contacts</strong> section. In addition to adding contacts manually, TRACS features a powerful bulk import system so you don't have to input contacts one by one.
                               </p>
                               
                               <div className="bg-slate-50 dark:bg-slate-955 p-5 rounded-2xl border border-slate-105 dark:border-slate-850 space-y-4">
                                 <h4 className="font-bold text-slate-800 dark:text-white text-xs uppercase tracking-wider flex items-center gap-2 flex-wrap">
                                   <FileUp className="w-4 h-4 text-indigo-505" /> How to Import Contacts in Bulk:
                                 </h4>
                                 <ol className="space-y-3 text-xs leading-relaxed text-slate-500 font-semibold list-decimal pl-4">
                                   <li>Click the <strong className="text-slate-955 dark:text-white font-extrabold font-bold">Download Template</strong> button to fetch the standardized CSV/Excel structure.</li>
                                   <li>Fill out your contact details (First Name, Last Name, Email, Job Title, Company, Group Name) while keeping the original column header format intact.</li>
                                   <li>Click <strong className="text-slate-955 dark:text-white font-extrabold font-bold">Import</strong>, select the completed Excel sheet template from your files, and click upload.</li>
                                   <li>The app will parse the spreadsheet and populate your contacts pool instantly.</li>
                                 </ol>
                               </div>
                             </div>
 
                             {/* Live Functional UI: Contacts Pool Table */}
                             <div className="border border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50 dark:bg-slate-955 p-4 md:p-6 shadow-inner">
                               <span className="text-[10px] font-black text-slate-404 dark:text-slate-500 uppercase tracking-widest block mb-4 border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                                 <Database className="w-3.5 h-3.5 text-indigo-550" /> Live Interactive Panel: My Contact Database Management
                               </span>
                               
                               <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-2xl p-4 max-w-3xl mx-auto shadow-sm text-xs space-y-4">
                                 <div className="flex justify-between items-center flex-wrap gap-3">
                                   <h4 className="font-bold text-slate-705 dark:text-white">Active Referral Database</h4>
                                   <div className="flex gap-1.5 flex-wrap">
                                     <button 
                                       type="button"
                                       onClick={() => showToast('Downloading standardized tracs_template_v2.csv...', 'success')}
                                       className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-955 hover:dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-305 rounded-xl transition-colors flex items-center gap-1"
                                     >
                                       <Download className="w-3.5 h-3.5" /> Download Template
                                     </button>
                                     <button 
                                       type="button"
                                       onClick={() => showToast('Opening system file uploader framework...', 'success')}
                                       className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-955 hover:dark:bg-slate-855 border border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-605 dark:text-slate-305 rounded-xl transition-colors flex items-center gap-1"
                                     >
                                       <Upload className="w-3.5 h-3.5" /> Import Excel
                                     </button>
                                     <button 
                                       type="button"
                                       onClick={() => setIsAddContactOpen(true)}
                                       className="px-3 py-1.5 bg-indigo-650 hover:bg-indigo-705 text-white text-[10px] font-bold rounded-xl shadow-sm transition-colors flex items-center gap-1"
                                     >
                                       <Plus className="w-3.5 h-3.5" /> Add Contact
                                     </button>
                                   </div>
                                 </div>
 
                                 {/* Add Contact Modal Panel (Embedded in interface state cleanly) */}
                                 {isAddContactOpen && (
                                   <form onSubmit={handleAddContact} className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl space-y-3">
                                     <div className="flex justify-between items-center">
                                       <h5 className="font-bold text-indigo-705 dark:text-indigo-400 text-xs uppercase tracking-wider">New Contact Registration</h5>
                                       <button type="button" onClick={() => setIsAddContactOpen(false)} className="text-slate-400 hover:text-slate-605"><X className="w-4 h-4" /></button>
                                     </div>
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                       <input 
                                         type="text" 
                                         placeholder="First Name *" 
                                         value={newContact.firstName}
                                         onChange={(e) => setNewContact({...newContact, firstName: e.target.value})}
                                         className="p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl font-semibold text-xs text-slate-800 dark:text-white" 
                                         required
                                       />
                                       <input 
                                         type="text" 
                                         placeholder="Last Name *" 
                                         value={newContact.lastName}
                                         onChange={(e) => setNewContact({...newContact, lastName: e.target.value})}
                                         className="p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl font-semibold text-xs text-slate-800 dark:text-white" 
                                         required
                                       />
                                       <input 
                                         type="email" 
                                         placeholder="Email Address *" 
                                         value={newContact.email}
                                         onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                                         className="p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl font-semibold text-xs text-slate-800 dark:text-white" 
                                         required
                                       />
                                       <input 
                                         type="text" 
                                         placeholder="Group Title (e.g. Client, Partner)" 
                                         value={newContact.group}
                                         onChange={(e) => setNewContact({...newContact, group: e.target.value})}
                                         className="p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl font-semibold text-xs text-slate-800 dark:text-white" 
                                       />
                                     </div>
                                     <div className="flex justify-end gap-2 pt-1">
                                       <button type="button" onClick={() => setIsAddContactOpen(false)} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-205 dark:bg-slate-800 dark:hover:bg-slate-750 rounded-xl font-bold text-[10px]">Cancel</button>
                                       <button type="submit" className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-705 text-white rounded-xl font-bold text-[10px]">Save Contact</button>
                                     </div>
                                   </form>
                                 )}
 
                                 <div className="overflow-x-auto">
                                   <table className="w-full text-left border border-slate-150 dark:border-slate-855 rounded-2xl overflow-hidden">
                                     <thead>
                                       <tr className="bg-slate-50 dark:bg-slate-950 text-slate-405 dark:text-slate-500 uppercase border-b border-slate-150 dark:border-slate-850 text-[10px]">
                                         <th className="p-3 font-bold">First Name</th>
                                         <th className="p-3 font-bold">Last Name</th>
                                         <th className="p-3 font-bold">Email</th>
                                         <th className="p-3 font-bold">Group Name</th>
                                         <th className="p-3 font-bold">Updated On</th>
                                       </tr>
                                     </thead>
                                     <tbody>
                                       {contacts.map(c => (
                                         <tr key={c.id} className="border-b border-slate-100 dark:border-slate-855 hover:bg-slate-50/50 dark:hover:bg-slate-900/40 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                           <td className="p-3 font-bold text-slate-805 dark:text-white">{c.firstName}</td>
                                           <td className="p-3 font-semibold text-slate-600 dark:text-slate-450">{c.lastName}</td>
                                           <td className="p-3 text-slate-500">{c.email}</td>
                                           <td className="p-3">
                                             <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 font-bold rounded-lg border border-indigo-500/5 text-[9px]">
                                               {c.group}
                                             </span>
                                           </td>
                                           <td className="p-3 text-slate-404 font-medium">{c.updated}</td>
                                         </tr>
                                       ))}
                                     </tbody>
                                   </table>
                                 </div>
                               </div>
                             </div>
 
                           </div>
                         </section>
                       )}
 
                       {/* Email Templates Section */}
                       {matchesSearch("Email Templates Category Settings", "email body snippet title placeholders name_1 name_2 brackets standard category tag") && (
                         <section ref={sectionsRef.templates} id="templates" data-title="Email Templates" className="scroll-mt-28">
                           <div className="mb-6 flex items-center gap-4">
                             <div className="p-3 bg-indigo-500/10 text-indigo-655 dark:text-indigo-400 rounded-2xl shadow-sm border border-indigo-200/20">
                               <FileText className="w-6 h-6" />
                             </div>
                             <h2 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Email Templates</h2>
                           </div>
                           
                           <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/5 space-y-8">
                             <div className="space-y-4">
                               <p className="text-slate-655 dark:text-slate-300 leading-relaxed font-medium">
                                 Standardize your referral communication using templates. Templates save time and maintain professional consistency across intros.
                               </p>
                               
                               <div className="bg-indigo-500/5 dark:bg-indigo-500/10 p-5 border border-indigo-200/30 rounded-2xl space-y-4">
                                 <h4 className="font-bold text-slate-805 dark:text-white text-xs uppercase tracking-wider flex items-center gap-2">
                                   Placeholder Tags Syntax:
                                 </h4>
                                 <p className="text-xs text-slate-650 dark:text-slate-300 leading-relaxed">
                                   Unlike traditional CRM placeholders, the TRACS live app relies on a strict double-bracket placeholder syntax:
                                 </p>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                                   <div className="p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
                                     <span className="text-red-505 font-bold block">[[name_1]]</span>
                                     <span className="text-[10px] text-slate-500 dark:text-slate-404 font-sans mt-1.5 block">Replaces with First Person Name</span>
                                   </div>
                                   <div className="p-3 bg-white dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-xl">
                                     <span className="text-red-505 font-bold block">[[name_2]]</span>
                                     <span className="text-[10px] text-slate-500 dark:text-slate-404 font-sans mt-1.5 block">Replaces with Second Person Name</span>
                                   </div>
                                 </div>
                                 <p className="text-[10px] text-slate-404 dark:text-slate-505 italic">Note: Do not use curly brackets like {"{Person1_FirstName}"} or {"{Person2}"} as they are invalid on the current app and will fail token substitution.</p>
                               </div>
 
                               <div className="space-y-2 text-sm">
                                 <h4 className="font-bold text-slate-800 dark:text-white">Template Categories:</h4>
                                 <ul className="space-y-2 pl-4 list-disc text-xs text-slate-505 leading-relaxed font-bold">
                                   <li><strong className="text-slate-705 dark:text-slate-305 font-extrabold font-semibold">Introduction-Email:</strong> Used on the Make Introduction page to create initial connections.</li>
                                   <li><strong className="text-slate-705 dark:text-slate-305 font-extrabold font-semibold">Reply-Email:</strong> Used in the Inbox Detail threads to follow up or reply to existing threads.</li>
                                 </ul>
                               </div>
                             </div>
 
                             {/* Live UI Mockup: Email Templates Database */}
                             <div className="border border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50 dark:bg-slate-955 p-4 md:p-6 shadow-inner">
                               <span className="text-[10px] font-black text-slate-404 dark:text-slate-505 uppercase tracking-widest block mb-4 border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                                 <FileText className="w-3.5 h-3.5 text-indigo-505" /> Live Interactive Panel: Email Templates Library
                               </span>
                               
                               <div className="bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-855 rounded-2xl p-4 max-w-3xl mx-auto shadow-sm text-xs space-y-4">
                                 <div className="flex justify-between items-center flex-wrap gap-2">
                                   <h4 className="font-bold text-slate-700 dark:text-white">Templates Library ({templates.length})</h4>
                                   <button 
                                     type="button"
                                     onClick={() => showToast('Opening new template model builder...', 'success')}
                                     className="px-3 py-1.5 bg-indigo-650 hover:bg-indigo-755 text-white text-[10px] font-bold rounded-xl shadow-sm"
                                   >
                                     + Add Templates
                                   </button>
                                 </div>
 
                                 <div className="overflow-x-auto border border-slate-150 dark:border-slate-855 rounded-2xl">
                                   <table className="w-full text-[11px] text-left">
                                     <thead>
                                       <tr className="bg-slate-50 dark:bg-slate-950 text-slate-405 dark:text-slate-550 uppercase border-b border-slate-150 dark:border-slate-855 text-[10px]">
                                         <th className="p-3 font-bold">Template Name</th>
                                         <th className="p-3 font-bold">Category Target</th>
                                         <th className="p-3 font-bold">Body Snippet</th>
                                         <th className="p-3 font-bold">Status</th>
                                       </tr>
                                     </thead>
                                     <tbody>
                                       {templates.map(t => (
                                         <tr key={t.id} className="border-b border-slate-100 dark:border-slate-850 hover:bg-slate-50/50 font-semibold text-slate-700 dark:text-slate-350">
                                           <td className="p-3 font-bold text-slate-805 dark:text-white">{t.name}</td>
                                           <td className="p-3 text-slate-500 font-extrabold">{t.category}</td>
                                           <td className="p-3 text-slate-400 max-w-[200px] truncate">{t.body}</td>
                                           <td className="p-3">
                                             <span className="px-2 py-0.5 bg-green-500/10 text-green-600 rounded-lg text-[9px] font-black">Active</span>
                                           </td>
                                         </tr>
                                       ))}
                                     </tbody>
                                   </table>
                                 </div>
                               </div>
                             </div>
 
                           </div>
                         </section>
                       )}
 
                       {/* Email Signature Section */}
                       {matchesSearch("Email Signature Configuration Layout", "automated professionally appended styling footer wysiwyg signature phone email details") && (
                         <section ref={sectionsRef.signature} id="signature" data-title="Email Signature" className="scroll-mt-28">
                           <div className="mb-6 flex items-center gap-4">
                             <div className="p-3 bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 rounded-2xl shadow-sm border border-indigo-200/20">
                               <Signature className="w-6 h-6" />
                             </div>
                             <h2 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Email Signature</h2>
                           </div>
                           
                           <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/5 space-y-8">
                             <p className="text-slate-655 dark:text-slate-305 leading-relaxed font-medium font-medium">
                               Maintain consistent, high-trust branding across your networking. The <strong className="text-slate-955 dark:text-white">Email Signature</strong> configuration automatically appends your professional footer to the bottom of all introduction emails sent from the TRACS system.
                             </p>
                             
                             <div className="space-y-3">
                               <h4 className="font-bold text-slate-400 dark:text-slate-505 uppercase text-xs tracking-widest">Configuration Steps:</h4>
                               <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-305 font-bold">
                                 <li className="flex gap-2.5 items-start">
                                   <ChevronRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                                   <span>Go to <strong className="text-slate-800 dark:text-white font-extrabold">Introductions &gt; Email Signature</strong>.</span>
                                 </li>
                                 <li className="flex gap-2.5 items-start">
                                   <ChevronRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                                   <span>Formulate your signature text in the WYSIWYG editor framework. You can apply bold, italic, lists, and insert hyperlinks (e.g. scheduling calendar links).</span>
                                 </li>
                                 <li className="flex gap-2.5 items-start">
                                   <ChevronRight className="w-4 h-4 text-indigo-550 flex-shrink-0 mt-0.5" />
                                   <span>Click <strong className="text-slate-805 dark:text-white font-bold">Save</strong> to lock in your custom signature block.</span>
                                 </li>
                               </ul>
                             </div>
 
                             {/* Live UI Mockup: Signature Panel Editor */}
                             <div className="border border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50 dark:bg-slate-955 p-4 md:p-6 shadow-inner">
                               <span className="text-[10px] font-black text-slate-404 dark:text-slate-550 uppercase tracking-widest block mb-4 border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                                 <Signature className="w-3.5 h-3.5 text-indigo-505" /> Live Interactive Panel: Signature Block Editor
                               </span>
                               
                               <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-855 rounded-2xl p-4 max-w-3xl mx-auto shadow-sm text-xs space-y-4">
                                 <h4 className="font-bold text-slate-705 dark:text-white">Automated Email Signature Block</h4>
                                 
                                 <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
                                   <div className="bg-slate-50 dark:bg-slate-950 p-2.5 border-b border-slate-200 dark:border-slate-850 flex gap-2">
                                     <button type="button" className="w-6 h-6 hover:bg-slate-205 dark:hover:bg-slate-855 rounded-lg font-bold text-[10px] text-slate-705 dark:text-slate-300">B</button>
                                     <button type="button" className="w-6 h-6 hover:bg-slate-205 dark:hover:bg-slate-855 rounded-lg italic text-[10px] text-slate-705 dark:text-slate-300">I</button>
                                     <button type="button" className="w-6 h-6 hover:bg-slate-205 dark:hover:bg-slate-855 rounded-lg underline text-[10px] text-slate-705 dark:text-slate-300">U</button>
                                   </div>
                                   <div className="p-4 space-y-2 text-[11px] leading-relaxed text-slate-655 dark:text-slate-305 font-bold">
                                     <p>Best regards,</p>
                                     <input 
                                       type="text" 
                                       value={signature.name}
                                       onChange={(e) => setSignature({...signature, name: e.target.value})}
                                       className="font-bold text-slate-805 dark:text-white bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2 py-1 rounded-lg"
                                     />
                                     <div className="flex gap-2">
                                       <input 
                                         type="text" 
                                         value={signature.email}
                                         onChange={(e) => setSignature({...signature, email: e.target.value})}
                                         className="text-indigo-600 dark:text-indigo-455 bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 px-2 py-1 rounded-lg"
                                       />
                                       <input 
                                         type="text" 
                                         value={signature.phone}
                                         onChange={(e) => setSignature({...signature, phone: e.target.value})}
                                         className="text-slate-405 bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 px-2 py-1 rounded-lg"
                                       />
                                     </div>
                                   </div>
                                 </div>
                                 
                                 <div className="flex justify-end pt-1">
                                   <button 
                                     type="button"
                                     onClick={handleSignatureSave}
                                     className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-705 text-white rounded-xl font-bold shadow-sm transition-all"
                                   >
                                     Save Signature
                                   </button>
                                 </div>
                               </div>
                             </div>
 
                           </div>
                         </section>
                       )}
 
                       {/* Networking 101 Section */}
                       {matchesSearch("Networking 101 Methodology Instructions", "Connect Serve and Ask methodology business development build trust serve others leverage introductions") && (
                         <section ref={sectionsRef.networking101} id="networking101" data-title="Networking 101" className="scroll-mt-28">
                           <div className="mb-6 flex items-center gap-4">
                             <div className="p-3 bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 rounded-2xl shadow-sm border border-indigo-200/20">
                               <BookOpen className="w-6 h-6" />
                             </div>
                             <h2 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Networking 101</h2>
                           </div>
                           
                           <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/5 space-y-6">
                             <p className="text-slate-650 dark:text-slate-350 leading-relaxed font-semibold">
                               Access structured training frameworks right inside the TRACS portal. Built upon H7's core <strong className="text-slate-955 dark:text-white font-extrabold font-bold">Connect, Serve, and Ask®</strong> methodology, this page guides you through best practices on:
                             </p>
                             
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                               <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-105 dark:border-slate-850 rounded-2xl leading-relaxed">
                                 <strong className="text-slate-805 dark:text-white font-extrabold block mb-1.5 text-xs">Serving Others First</strong>
                                 Discover how to audit your network's challenges, identify resource shortfalls, and proactively make high-value referrals that establish you as a vital asset.
                               </div>
                               <div className="p-4 bg-slate-50 dark:bg-slate-955 border border-slate-105 dark:border-slate-855 rounded-2xl leading-relaxed">
                                 <strong className="text-slate-805 dark:text-white font-extrabold block mb-1.5 text-xs">Leveraging Warm Introductions</strong>
                                 Master the balance of follow-ups without badgering. Learn when to use standard templates versus adding personalization.
                               </div>
                             </div>
                           </div>
                         </section>
                       )}
 
                       {/* Contact Us Section */}
                       {matchesSearch("Contact Us Support Help", "technical feedback support ticket request form phone direct support fastest phone number") && (
                         <section ref={sectionsRef.contactus} id="contactus" data-title="Contact Us" className="scroll-mt-28">
                           <div className="mb-6 flex items-center gap-4">
                             <div className="p-3 bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 rounded-2xl shadow-sm border border-indigo-200/20">
                               <Phone className="w-6 h-6" />
                             </div>
                             <h2 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Contact Us</h2>
                           </div>
                           
                           <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/5 space-y-8">
                             <div className="space-y-4">
                               <p className="text-slate-655 dark:text-slate-305 leading-relaxed font-semibold">
                                 Need technical support or have platform feedback? Use the built-in <strong className="text-slate-955 dark:text-white font-black font-semibold">Contact Us</strong> portal or connect via phone.
                               </p>
                               
                               <div className="flex items-center gap-4 p-4 bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-200/30 rounded-2xl max-w-md shadow-sm">
                                 <div className="w-10 h-10 rounded-xl bg-indigo-105 dark:bg-indigo-950 text-indigo-655 dark:text-indigo-400 flex items-center justify-center flex-shrink-0 text-sm">
                                   <Phone className="w-5 h-5" />
                                 </div>
                                 <div>
                                   <span className="text-[10px] text-slate-405 uppercase tracking-widest block font-black">Phone Support (Fastest)</span>
                                   <span className="font-extrabold text-slate-805 dark:text-white text-base md:text-lg">513-371-5299</span>
                                 </div>
                               </div>
                             </div>
 
                             {/* Live UI Mockup: Support Form */}
                             <div className="border border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50 dark:bg-slate-955 p-4 md:p-6 shadow-inner">
                               <span className="text-[10px] font-black text-slate-404 dark:text-slate-550 uppercase tracking-widest block mb-4 border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                                 <Mail className="w-3.5 h-3.5 text-indigo-500" /> Live Interactive Form: Create Help Desk Ticket
                               </span>
                               
                               <form onSubmit={handleSupportSubmit} className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-2xl p-5 max-w-xl mx-auto shadow-sm text-xs space-y-4">
                                 <h3 className="font-bold text-slate-805 dark:text-white text-sm">Support Request Form</h3>
                                 <div className="space-y-3 font-semibold">
                                   <div>
                                     <label className="block text-slate-405 mb-1 font-bold">Subject Help Required</label>
                                     <input 
                                       type="text" 
                                       value={supportSubject}
                                       onChange={(e) => setSupportSubject(e.target.value)}
                                       placeholder="Technical help / Billing / General inquiry" 
                                       className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-805 dark:text-white font-semibold focus:ring-2 focus:ring-indigo-500/20"
                                       required
                                     />
                                   </div>
                                   <div>
                                     <label className="block text-slate-405 mb-1 font-bold">Describe Your Question</label>
                                     <textarea 
                                       value={supportMessage}
                                       onChange={(e) => setSupportMessage(e.target.value)}
                                       placeholder="Please describe your query here and click Submit..." 
                                       className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-805 dark:text-white font-semibold leading-relaxed focus:ring-2 focus:ring-indigo-500/20" 
                                       rows="4"
                                       required
                                     />
                                   </div>
                                   <div className="flex justify-end pt-1">
                                     <button type="submit" className="px-5 py-2.5 bg-indigo-655 hover:bg-indigo-705 text-white rounded-xl font-bold shadow-sm transition-colors">
                                       Submit Request Form
                                     </button>
                                   </div>
                                 </div>
                               </form>
                             </div>
 
                           </div>
                         </section>
                       )}
                     </>
                   );
                 })()}
 
               </div>
 
             </div>
 
           </div>
         </div>
       </main>
     </div>

  {}                      
                    </div>
                </div>
            </div></div>

  );
}
