import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import "./NewMessage.css"
import { FiMessageSquare } from "react-icons/fi";
import { FaHome, FaPlus, FaQuestionCircle } from 'react-icons/fa'
import { IoIosArrowDown, IoIosSend, IoMdArrowDropdownCircle, IoMdMenu } from 'react-icons/io';
import { TiArrowBack } from "react-icons/ti";
import { GrFormView } from "react-icons/gr";
import { FaArchive } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronDown,
} from 'lucide-react';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { IoArrowDown, IoLogOut, IoPerson } from 'react-icons/io5';
import Sidebar2 from '../Sidebar/Sidebar2';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import ReactQuill from 'react-quill';
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

const SidebarLink = ({ icon, text, to = "#", active = false }) => (
  <Link
    to={to}
    className={`flex items-center px-6 py-3 mt-2 ${active ? 'text-white bg-gray-700' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
  >
    <Icon name={icon} className="w-6 h-6" />
    <span className="ml-3">{text}</span>
  </Link>
);

const SidebarSection = ({ title, links }) => (
  <div className="mt-8">
    <span className="text-xs font-semibold text-gray-500 uppercase px-6">{title}</span>
    {links.map(link => <SidebarLink key={link.text} {...link} />)}
  </div>
);

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
  const sections = [
    {
      title: 'Account Settings',
      links: [
        { icon: 'credit-card', text: 'My Membership', to: '/myMembership', to: '/myMembership' },
        { icon: 'user', text: 'My Profile', to: '/myProfile', to: '/myProfile' },
        { icon: 'lock', text: 'Change Password', to: '/changePassword', to: '/changePassword' },

      ],
    },
    {
      title: 'Introductions',
      links: [
        { icon: 'inbox', text: 'Introduction Messages', active: true },
        { icon: 'users', text: 'My Contacts', to: '/myContacts' },
        { icon: 'mail', text: 'Email Templates', to: '/emailTemplate' },
        { icon: 'pen-square', text: 'Email Signature', to: '/emailSignature' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { icon: 'help-circle', text: 'App Help', to: '/appHelp' },
        { icon: 'thumbs-up', text: 'Feedback' },
        { icon: 'message-square', text: 'Contact Us', to: '/contact' },
        { icon: 'book-open', text: 'Networking 101', to: '/network' },
      ],
    },
  ];

  return (
    <>  {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity
        ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar Drawer */}
      <aside className={`
        fixed top-0 left-0 h-full bg-[#1a202c] w-64 z-50 transform transition-transform duration-300 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:relative lg:translate-x-0 lg:block
      `}>
        <div className="p-2 flex">
          <Link to="/" className="text-white text-2xl font-bold"><img src="https://tracsdev.apttechsol.com/public/uploads/website-images/logo-2024-09-05-10-18-08-4078.png" /></Link>
          {/* Close button in mobile view */}
          <button className="lg:hidden text-white ml-3 "
            onClick={() => setSidebarOpen(false)}>
            <Icon name="x" />
          </button>
        </div>


        <nav className="mt-6">
          {sections.map(section => <SidebarSection key={section.title} {...section} />)}
        </nav>
      </aside>
    </>
  );
};



const NewMessage = () => {
  const [showFolloup, setFollowUp] = useState(false);
  const [showShortBy, setShortBy] = useState(false);
  const [messageFilter, setMessageFilter] = useState("");
  const [sentMessages, setSentMessages] = useState([]);

  const [replyFilter, setReplyFilter] = useState("");

  const HandleFollowUp = () => {
    setFollowUp((prev) => !prev);
  };
  const handleShortBy = () => {
    setShortBy((prev) => !prev);
  };

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [name, setName] = useState("")
  const [subtitle, settitle] = useState("");
  const [Heading, setHeading] = useState("")
  const [userId, setUserId] = useState("")
  const [guideData, setGuideData] = useState("")
  const fetchProfile = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      const response = await axios.get("https://tracsdev.apttechsol.com/api/my-profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;

      setName(data.user.name || "");

      setImagePreview(
        data?.user?.image
          ? `https://tracsdev.apttechsol.com/public/${data.user.image}`
          : "https://tracsdev.apttechsol.com/public/uploads/user_avatar.jpeg"
      );

      settitle(data.helpnote.find(item => item.id === 7)?.description);
      setHeading(data.helpnote.find(item => item.id === 7)?.page_url);
      setUserId(data.user.id);
      sessionStorage.setItem("userId", data.user.id);

    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  const [filterType, setFilterType] = useState("all-intros");
  const [sortOrder, setSortOrder] = useState("latest");
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetchProfile();
  }, []);
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);
  useEffect(() => {
    const fetchMessages = async () => {
      const token = sessionStorage.getItem("authToken");

      const filterMap = {
        "all-intros": "",
        "messages-received": 1,
        "messages-sent": 2,
        "follow-up": 3,
        "archive": 4
      };

      const sortMap = {
        latest: "desc",
        oldest: "asc"
      };

      const filterValue = filterMap[filterType];
      const sortValue = sortMap[sortOrder];

      try {

        console.log("API PARAMS:", {
          subject_search: debouncedSearch,
          all_filter: filterValue,
          sort_order: sortValue
        });

        const response = await axios.get(
          "https://tracsdev.apttechsol.com/api/view-inbox-list-from-intro-api",
          {
            params: {
              subject_search: debouncedSearch,
              all_filter: filterValue,
              sort_order: sortValue
            },
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json"
            }
          }
        ); const mails = response.data.sentMails || [];
        setSentMessages(mails);
        setGuideData(response.data?.guidetips?.description)
        if (mails.length > 0) {
          setMessageDropdown(mails[0].id);
        }

      } catch (error) {
        console.error("Error fetching inbox data:", error.response?.data || error.message);
      }
    };

    fetchMessages();

  }, [filterType, sortOrder, debouncedSearch]);
  const cleanHTML = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]+>/g, ''); // remove all HTML tags
  };

  const [messageDropDown, setMessageDropdown] = useState(false);
  const handelMessageDropDown = (id) => {
    setMessageDropdown(prevId => (prevId === id ? null : id));
    
  }



  const [Heasderdropdown, setHeaderdropdown] = useState(null);
  const showDropDown = () => {
    setHeaderdropdown(prev => !prev)
  }
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userId")
    localStorage.removeItem("authToken")
    sessionStorage.removeItem("profileImageUrl")

    navigate("/"); // Redirect to login page
    window.location.reload();
  };
  const stripHtmlPreserveLines = (html) => {
    if (!html) return "";

    return html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n")
      .replace(/<\/div>/gi, "\n")
      .replace(/<\/li>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .trim();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSideNav(false); // close mobile sidebar
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [open, setOpen] = useState(false);

  const [showSideNav, setSideNav] = useState(false);
  const navigate2 = useNavigate();
  const [data3, setData3] = useState("")
  const [usedIntro, setUsedIntro] = useState("");
  const [totalIntro, setTotalIntro] = useState("")
  useEffect(() => {
    const fetchIntros = async () => {
      const token = sessionStorage.getItem("authToken");
      try {
        const response = await axios.get("https://tracsdev.apttechsol.com/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData3(response.data);
        setTotalIntro(response.data.totalIntro);
        setUsedIntro(response.data.usedIntro);

        console.log("totalIntros", totalIntro);
        console.log("usedIntro", usedIntro)
      } catch (err) {
        console.log(err.response)
      }
    }; fetchIntros();
  }, []);

  const handlemiNavigate = () => {
    const order = data3?.orders?.data?.[0]; // first order

    if (!order) {
      alert("No active package found");
      return;
    }

    const expiryDate = new Date(order.expired_date);
    const today = new Date();

    // Remove time part for accurate comparison
    today.setHours(0, 0, 0, 0);
    expiryDate.setHours(0, 0, 0, 0);

    // ✅ Check expiry first
    if (today > expiryDate) {
      alert("Your package has expired");
      return;
    }

    // ✅ Then check intro limit
    if (usedIntro > totalIntro) {
      alert("Introductions Limit is completed");
      return;
    }

    // ✅ Navigate only once
    navigate2("/newMakeIntro");
  };
  const handleArchive = async (replies_code, id) => {
    const token = sessionStorage.getItem("authToken");
    try {
      const response = await axios.post("https://tracsdev.apttechsol.com/api/update-close-status", {
        replies_code: replies_code,
        id: id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      window.location.reload();
    } catch (error) {
      console.log("Archive error:", error.response?.data || error.message)
    }

  }
  const getProfileLink = (userId, memberType) => {
    const type = Number(memberType);

    if (type === 1 || type === 2) {
      return `/test?userId=${userId}&memberType=${type}`;
    }

    if (type === 3) {
      return `/contactProfile?userId=${userId}&memberType=${type}`;
    }

    return "#";
  };
  const [guide, setGuide] = useState(false);
  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };
  const [quickreply,setQuickreply]=useState("");

  const [replyData,setReplyData]=useState("");
   const [template1, setTemplate1] = useState([]);
   const[replysCode,setRepliesCode]=useState("");
   const [activeQuickReplyId, setActiveQuickReplyId] = useState(null);
const handleQuickReply = async (item) => {
  setActiveQuickReplyId((prev) =>
    prev === item.id ? null : item.id
  );
 handelMessageDropDown(item.id);
  const token = sessionStorage.getItem("authToken");

  try {
    setRepliesCode(item.replies_code)
    const response = await axios.get(
      `https://tracsdev.apttechsol.com/api/view_user_inboxhistory_intro/${item.subject}/${item.user_id}/${item.replies_code}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  setTemplate1(response.data.normal_email_templates)
    setReplyData(response.data);
    console.log("replyData:",response.data)

  } catch (err) {
    console.error("Error fetching inbox history:", err);
  }
};
 const [messageBody, setMessageBody] = useState('');
    const handleTemplateChange = (e) => {
        const templateId = parseInt(e.target.value);
        const template = template1.find(t => t.id === templateId);

        if (!template) return;

        // ONLY set template body
        setMessageBody(template.email_body || "");
         setSelectedTemplate(templateId);
       
    };
     const simulateCancel = () => {
        setMessageBody('');
         setActiveQuickReplyId(false)
      
    };
      const [selectedTemplateId] = useState(null);
       const [selectedTemplate, setSelectedTemplate] = useState('');
       const [selectedRecipientEmails, setSelectedRecipientEmails] = useState([]);
       useEffect(() => {
  if (replyData?.usersData) {
    const emails = replyData.usersData.map((user) => user.email);
    setSelectedRecipientEmails(emails);
  }
}, [replyData]);
     const payload = {
        user_id: replyData.userInfo?.id,
        sent_mail_history_id: replyData.sentMailsfirst?.id,
        replies_code:replysCode,
        temp_id: selectedTemplateId,
        subject: replyData.sentMailsfirst?.subject,
        selected_emails: selectedRecipientEmails,
        redirect_to: "https://tracsdev.apttechsol.com/user/view-inbox-list-from-intro",
        is_bump: replyData.sentMailsfirst?.is_bump,
        cc_mail_id: null,
        emails: selectedRecipientEmails,
        email_template: selectedTemplate,
        message: messageBody,
        files: null
    };
    console.log("payload :", payload)
    const handleSendReply = async () => {
        const token = sessionStorage.getItem("authToken");
        try {
  if (!messageBody || messageBody.trim() === "") {
    alert("Message not sent: body is empty");
    return;
  }        
            const response = await axios.post(
                `https://tracsdev.apttechsol.com/api/sendReplyMailtomem_Api`,
                payload,
                { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
            );
            console.log("Mail Sent Successfully", response.data);
            alert("Mail Sent Successfully", response.data);
            window.location.reload()
            setQuickreply(false)
            console.log("payload", payload)

        } catch (error) {
            console.error("Error sending reply mail:",
                error.response?.data?.message || error.message
            );
            alert(error.response?.data?.message || error.message)
        }

    };
  return (
    <div style={{ display: "flex", height: "100vh", overflowY: "auto" }}>
      <div className="hidden lg:block fixed w-[17%]"><Sidebar2 /></div>{showSideNav && <div><Sidebar2 /></div>}
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


        <div className='containerFilter' >
          <div className="MessageIntroButt">
            <div><h2 className='intoHeading' style={{ color: "#334e6f" }}><div dangerouslySetInnerHTML={{ __html: Heading }} /></h2>
            </div>
            <p className='IntroPara'>{stripHtml(subtitle)}</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 mt-1 ">
            <div className='makeIntoButton'> <button onClick={handlemiNavigate}><div style={{ marginRight: "10px", marginTop: "3px" }}><FaPlus color='white' /></div>Make an Introduction</button></div>

            <button className='guideButton' onClick={() => setGuide((prev) => !prev)}><span style={{ marginTop: "2.5px", marginRight: "7px" }}><FaQuestionCircle /></span>Guide and Tips <span style={{ marginTop: "-4px", marginLeft: "5px" }}>{guide ? <RiArrowDropUpLine size={28} /> : <RiArrowDropDownLine size={28} />}</span></button>

          </div>
          {guide && <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md animate-fade-in mb-4">
            <div dangerouslySetInnerHTML={{ __html: guideData }} />


          </div>}


          <div className="mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mt-[30px]">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-end divdiff">
                {/* Search Bar */}
                <div className="divdiff1" >

                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      id="searchInput"
                      placeholder="Search introductions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />

                  </div>
                </div>


                {/* Filter for Status (Dropdown) */}
                <div className="w-full sm:w-auto divdiff2">


                  <div className='divdiff3'>
                    <div><button className={`px-4 py-2 text-xs font-bold rounded-full border transition-all shrink-0 ${filterType === "all-intros"
                      ? "bg-gradient-to-r from-indigo-500 to-blue-600 text-white border-blue-500"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                      }`} value="all-intros" onClick={(e) => setFilterType(e.target.value)}>All Intros</button></div>
                    <div><button className={`px-4 py-2 text-xs font-bold rounded-full border transition-all shrink-0 ${filterType === "follow-up"
                      ? "bg-gradient-to-r from-indigo-500 to-blue-600 text-white border-blue-500"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                      }`} value="follow-up" onClick={(e) => setFilterType(e.target.value)}>Needs Follow-up</button></div>
                    <div><button className={`px-4 py-2 text-xs font-bold rounded-full border transition-all shrink-0 ${filterType === "messages-sent"
                      ? "bg-gradient-to-r from-indigo-500 to-blue-600 text-white border-blue-500"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                      }`} value="messages-sent" onClick={(e) => setFilterType(e.target.value)}>Intros Sent</button></div>
                    <div><button className={`px-4 py-2 text-xs font-bold rounded-full border transition-all shrink-0 ${filterType === "messages-received"
                      ? "bg-gradient-to-r from-indigo-500 to-blue-600 text-white border-blue-500"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                      }`} value="messages-received" onClick={(e) => setFilterType(e.target.value)}>Intros Recevied</button></div>
                    <div><button className={`px-4 py-2 text-xs font-bold rounded-full border transition-all shrink-0 ${filterType === "archive"
                      ? "bg-gradient-to-r from-indigo-500 to-blue-600 text-white border-blue-500"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                      }`} value="archive" onClick={(e) => setFilterType(e.target.value)}>Archive</button></div>
                  </div>
                </div>

                {/* Sort by (Dropdown) */}

              </div>

            </div>

          </div>
        </div>

        <div style={{ paddingBottom: "60px" }} >
          {sentMessages.map((item, index) => {
            const allRecipientsReplied =
              Array.isArray(item.recipients_info) &&
              item.recipients_info.length > 0 &&
              item.recipients_info.every((rec) => Number(rec.replied_count) > 0);

            const noReplies =
              Array.isArray(item.recipients_info) &&
              item.recipients_info.length > 0 &&
              item.recipients_info.every((rec) => Number(rec.replied_count) === 0);

            const sentTime = new Date(item.created_at);
            const now = new Date();
            const hoursDiff = (now - sentTime) / (1000 * 60 * 60);

            const isFollowUp =
              noReplies &&
              item.first_sender_name?.toLowerCase() === name?.toLowerCase() &&
              hoursDiff >= 24;

            return (

              <div className='messagesContainer' key={index}>
                <div className='myDetails' >

                  <div className='Introsection'><div><h5 className="font-bold text-lg text-slate-900 mb-4 mt-1">
                    Intro:{" "}
                    {item.first_sender_name}
                    {" <> "}
                    {item.recipients_info && item.recipients_info.length > 0
                      ? item.recipients_info.map((rec, i) => (
                        <span key={i}>
                          {rec.name}
                          {i < item.recipients_info.length - 1 && " & "}
                        </span>
                      ))
                      : "No recipients"}
                  </h5></div>
                    <div>  {allRecipientsReplied ? (
                      <p className="textsim2">
                        Conversation Completed
                      </p>
                    ) : isFollowUp ? (
                      <p className="textsim">
                        Needs-FollowUp
                      </p>
                    ) : null}
                    </div>
                  </div>
                  <div style={{ display: "flex", marginBottom: "10px" }}>
                    <div><strong style={{ fontWeight: "600", fontSize: "14px" }}>Introduced by </strong> </div>&nbsp;&nbsp;
                    <div><img className='w-7 h-7 rounded-full object-cover border-2 border-white shadow' src={item.first_senderFullImage} />
                    </div>
                    <div className='awdhdivflex'>
                      <div style={{ marginRight: "5px", marginLeft: "5px" }}> <strong style={{ fontWeight: "700", fontSize: "14px", color: "rgb(99 102 241)" }}>
                        <Link to={getProfileLink(item.first_senderid, item.first_sendermembertype)}>{item.first_sender_name}</Link>
                      </strong></div>
                      <div style={{ display: "flex" }}>
                        <div><span>.</span>&nbsp;&nbsp;</div>
                        <div><span style={{ fontSize: "12px", fontWeight: "500", color: "grey" }}> {(() => {
                          const diffMs = Date.now() - new Date(item.created_at).getTime();
                          const diffMinutes = Math.floor(diffMs / (1000 * 60));
                          const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                          const diffDays = Math.floor(diffHours / 24);

                          if (diffMinutes < 60) {
                            return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
                          } else if (diffHours < 24) {
                            return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
                          } else {
                            return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
                          }
                        }
                        )
                          ()
                        }</span></div></div>
                    </div>



                  </div>
                </div>

                <div className='senderDetails'>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-10 pt-7 senderDetailspic1">
                    <div className='senderpicHolder'>
                      {item.recipients_info.map((recipient, idx) => (<Link to={getProfileLink(recipient.user_id, recipient.member_type)}>
                        <div className="flex items-center gap-3  senderpiccc">
                          <img src={
                            recipient?.profile_image
                              ? `https://tracsdev.apttechsol.com/public/${recipient.profile_image}`
                              : "https://tracsdev.apttechsol.com/public/uploads/user_avatar.jpeg"
                          } className="w-12 h-12  object-cover" />
                          <div>
                            <p className="redp font-semibold text-slate-800">{recipient.name}</p>
                          <p className="repsss2 text-sm text-slate-500">{recipient.replied_count === 0 ? "No" : recipient.replied_count} reply</p>
                        </div>
                      </div></Link>
                      )
                      )
                      }

                    </div>
                  </div>
                  <div className='flex justify-between mt-4 grtop' onClick={() => handelMessageDropDown(item.id)}>
                    <div><p className='ressp'>LATEST CONVERSATION RECORD</p></div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <strong style={{ fontSize: "12px" }}>
                        {messageDropDown === item.id ? "Collapse" : "Expand"}
                      </strong>

                      {messageDropDown === item.id ? (
                        <RiArrowDropUpLine size={30} />
                      ) : (
                        <RiArrowDropDownLine size={30} />
                      )}
                    </div>                  </div>
                  {/* Latest Message */}
                  {messageDropDown === item.id  && <div className="bg-slate-50 rounded-lg p-4 mt-2 border border-slate-200">

                    <div className="flex items-start gap-3">
                      <img src={item.sender_full_image || "https://tracsdev.apttechsol.com/public/uploads/user_avatar.jpeg"} alt="Latest message user avatar" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-slate-700 text-sm ">
                          <strong style={{ display: "flex" }} className='redp'><Link to={getProfileLink(item.senderFullid, item.sender_member_type)}>{item.sender_full_name}</Link></strong><div style={{ marginTop: "20px", whiteSpace: "pre-line" }}>

                          </div>


                        </p>
                        <span><p style={{ color: "gray", marginTop: "-20px", fontSize: "14px" }} className='redp56'>{(() => {
                          const diffMs = Date.now() - new Date(item.senderDate).getTime();
                          const diffMinutes = Math.floor(diffMs / (1000 * 60));
                          const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                          const diffDays = Math.floor(diffHours / 24);

                          if (diffMinutes < 60) {
                            return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
                          } else if (diffHours < 24) {
                            return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
                          } else {
                            return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
                          }
                        })()}</p></span>

                      </div>

                    </div>
                    <div className="mt-4 senderMessage" dangerouslySetInnerHTML={{ __html: item.senderMessage }} />
                  </div>}


                </div>
                {/* Action Buttons */}
                <div className="flex justify-between sm:justify-end sm:gap-3 mt-4 pt-4 ">
                 { /*  <Link to={`/replyMessage/${item.subject}/${item.user_id}/${item.replies_code}`} state={{ openComposer: false }}>  <button className="bg-white text-slate-700 border border-slate-300 font-medium py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors duration-200">View</button></Link>*/} 
                  <Link to={`/replyMessage/${item.subject}/${item.user_id}/${item.replies_code}`} state={{ openComposer: true }}> <button className="btn btn-primary btn-sm flex items-center gap-1 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white flex"> <div><FiMessageSquare /></div>View Thread</button></Link>
                  <button className="bg-white text-slate-700 border border-slate-300 font-medium py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors duration-200" onClick={(e) => handleQuickReply(item)} >Quick Reply</button>

                  {Array.isArray(item.recipients_info) &&
                    item.recipients_info.length > 0 &&
                    item.first_sender_name === name &&
                    item.recipients_info.every((rec) => Number(rec.replied_count) >= 1) && (
                    <div onClick={(e) => e.stopPropagation()}>  <button className="bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-cyan-700 transition-colors duration-200" onClick={() => handleArchive(item.replies_code, item.id)}>Archive</button></div>
                    )}





                </div>
                {
                 activeQuickReplyId === item.id  && <div className='quickReply-container'>
                  
                  <div className='quickReplyTemplate'><select
                     onChange={handleTemplateChange}>
                    <option value="">---- Choose a Template ----</option>
                      {template1.map(template => (
                                                    <option key={template.id} value={template.id}>
                                                        {template.template_name}

                                                    </option>
                                                ))}
                  </select>
                    </div>
                <div className="quill-wrapper2">
  <ReactQuill
    theme="snow"
    value={messageBody}
    onChange={setMessageBody}
    className="awdfontp"
    modules={{ toolbar: false }}
  />
</div>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
<div></div>
<div style={{display:"flex",marginTop:"20px"}}>
  <div><button onClick={simulateCancel} className="px-4 py-2 ml-[40px] text-xs font-bold rounded-full border transition-all shrink-0 bg-white text-black border-black-500">Cancel</button></div>
  <div><button  onClick={handleSendReply} className="px-4 py-2 ml-[40px] text-xs font-bold rounded-full border transition-all shrink-0 bg-gradient-to-r from-indigo-500 to-blue-600 text-white border-blue-500 flex"><div style={{marginRight:"7px"}}><IoIosSend /></div>Send Message</button></div>
</div>
                  </div>
                 </div>
                }
              </div>
            )
          })}</div>

      </div></div>
  )
}

export default NewMessage
