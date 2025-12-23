import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./NewMessage.css"
import { FaHome, FaPlus } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io';
import { TiArrowBack } from "react-icons/ti";
import { GrFormView } from "react-icons/gr";
import { FaArchive } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronDown,
} from 'lucide-react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { IoLogOut, IoPerson } from 'react-icons/io5';
import Sidebar2 from '../Sidebar/Sidebar2';
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

  const [userId, setUserId] = useState("")
  const fetchProfile = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      const response = await axios.get("https://tracsdev.apttechsol.com/api/my-profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;

      setName(data.user.name || "");

      setImagePreview(`https://tracsdev.apttechsol.com/public/${data.user.image}`);

      setUserId(data.user.id);
      sessionStorage.setItem("userId", data.user.id);

    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  useEffect(() => {
    const fetchMessages = async () => {
      const token = sessionStorage.getItem("authToken");
      try {
        const response = await axios.get(
          "https://tracsdev.apttechsol.com/api/view-inbox-list-from-intro-api",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
            params: {
              bump: replyFilter || "",      // only add if filter selected
              all_filter: messageFilter || ""
            },
          }
        );

        const mails = response.data.sentMails || [];
        setSentMessages(mails);

        // ✅ Open first message by default
        if (mails.length > 0) {
          setMessageDropdown(mails[0].id); // or use index 0 if no id exists
        }
      } catch (error) {
        console.error("Error fetching inbox data:", error.response?.data || error.message);
      }
    };

    fetchMessages();
  }, [replyFilter, messageFilter]); // 👈 refetch when filter changes
  const cleanHTML = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]+>/g, ''); // remove all HTML tags
  };

  const [messageDropDown, setMessageDropdown] = useState(false);
  const handelMessageDropDown = (id) => {
    setMessageDropdown(prevId => (prevId === id ? null : id))
  }
  const [filterType, setFilterType] = useState("all-intros");
  const [sortOrder, setSortOrder] = useState("latest");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMessages = sentMessages.filter((item) => {
    if (filterType === "all-intros") return true;

    // Messages Sent → when the logged-in user (name/email) matches sender
    if (filterType === "messages-sent") {
      return (
        item.first_sender_name?.toLowerCase() === name?.toLowerCase()
      );
    }


    // Messages Received → when the logged-in user is in the recipient list
    if (filterType === "messages-received") {
      return (


        Number(item.user_id) !== Number(userId)
      );
    }
    // Future placeholders
    if (filterType === "follow-up") {
      return (
        Array.isArray(item.recipients_info) &&
        item.recipients_info.length > 0 &&
        item.recipients_info.every((rec) => Number(rec.replied_count) === 0)
      );
    }
    if (filterType === "archive") {
      return (
        Array.isArray(item.recipients_info) &&
        item.recipients_info.length > 0 &&
        item.recipients_info.every((rec) => Number(rec.replied_count) >= 1)
      );
    };

    return true;
  }).filter((item) => {
    // ✅ Search filter
    if (!searchTerm.trim()) return true;

    const term = searchTerm.toLowerCase();

    // Match sender name or any recipient name
    const senderMatch = item.first_sender_name?.toLowerCase().includes(term);
    const recipientMatch = item.recipients_info?.some((rec) =>
      rec.name?.toLowerCase().includes(term)
    );

    return senderMatch || recipientMatch;
  }).sort((a, b) => {
    // 🕒 Sort messages by date
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);

    if (sortOrder === "latest") {
      return dateB - dateA; // newest first
    } else {
      return dateA - dateB; // oldest first
    }
  });;
  const [Heasderdropdown, setHeaderdropdown] = useState(null);
  const showDropDown = () => {
    setHeaderdropdown(prev => !prev)
  }
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userId")

    sessionStorage.removeItem("profileImageUrl")

    navigate("/"); // Redirect to login page
    window.location.reload();
  };
  const stripHtml = (html) => {
    if (!html) return "";
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const [showSideNav, setSideNav] = useState(true);
  return (
    <div style={{ display: 'flex' }}>{showSideNav && <div><Sidebar2 /></div>}
      <div style={{ background: "#f4f7f9", width: "100%" }}>
        <header className="bg-white shadow-sm flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <button onClick={() => setSideNav((prev) => !prev)} className="text-gray-600 lg:hidden">
              <Icon name="menu" className="w-6 h-6" />
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
            <div><h1 style={{ color: "#334e6f" }}>Messages</h1>
              <p>Manage your introductions and build trust. See who's connected and get reminders to follow up on those who haven't</p></div>

          </div>                <div className='makeIntoButton'> <Link to="/make-Introduction"><button><div style={{ marginRight: "10px", marginTop: "3px" }}><FaPlus color='white' /></div>Make an Introduction</button></Link></div>

          <div className="mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mt-[90px]">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
                {/* Search Bar */}
                <div className="w-full sm:flex-grow">
                  <label htmlFor="searchInput" className="block text-sm font-medium text-slate-600 mb-1">
                    Search
                  </label>
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
                <div className="w-full sm:w-auto">
                  <label htmlFor="statusFilter" className="block text-sm font-medium text-slate-600 mb-1">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      id="statusFilter"
                      className="w-full sm:w-52 appearance-none bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <option value="all-intros">All Introductions</option>
                      <option value="messages-sent">Intros Sent</option>
                      <option value="messages-received">Intros Received</option>
                      <option value="follow-up">Needs Follow-up</option>
                      <option value="archive">Archive</option>
                    </select>

                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>

                {/* Sort by (Dropdown) */}
                <div className="w-full sm:w-auto">
                  <label htmlFor="sortFilter" className="block text-sm font-medium text-slate-600 mb-1">
                    Sort by
                  </label>
                  <div className="relative">
                    <select
                      id="sortFilter"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="w-full sm:w-48 appearance-none bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    >
                      <option value="latest">Latest</option>
                      <option value="oldest">Oldest</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>


        {filteredMessages.map((item, index) => (<div className='messagesContainer' key={index}>
          <div className='myDetails' >
            <div style={{ display: "flex" }}>
              <div><img className='w-7 h-7 rounded-full object-cover border-2 border-white shadow' src={item.first_senderFullImage} />
              </div>
              <div style={{ marginRight: "5px", marginLeft: "5px" }}> <span style={{ fontWeight: "600" }}>
                {Number(item.user_id) === userId ? "You" : item.first_sender_name}
              </span></div>
              <div><span>.</span></div>
              <div><span style={{ fontSize: "14px" }}> {(() => {
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
              })()}</span></div>
              {Array.isArray(item.recipients_info) &&
                item.recipients_info.length > 0 &&
                item.recipients_info.every((rec) => Number(rec.replied_count) === 0) && (
                  <p className="text-sm text-red-500 font-semibold ml-2 bg-yellow">Needs-FollowUp</p>
                )}


            </div>
            <div><h2 className="font-bold text-lg text-slate-900 mb-4">
              Intro:{" "}
              {Number(item.user_id) === userId ? "You" : item.first_sender_name}
              {" <> "}
              {item.recipients_info && item.recipients_info.length > 0
                ? item.recipients_info.map((rec, i) => (
                  <span key={i}>
                    {rec.name}
                    {i < item.recipients_info.length - 1 && " & "}
                  </span>
                ))
                : "No recipients"}
            </h2>

            </div>
          </div>

          <div className='senderDetails'>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-200 pt-4">
              <div className='senderpicHolder'>
                {item.recipients_info.map((recipient, idx) => (<div className="flex items-center gap-3 ml-50">
                  <img src={
                    recipient?.profile_image
                      ? `https://tracsdev.apttechsol.com/public/${recipient.profile_image}`
                      : "https://tracsdev.apttechsol.com/public/uploads/user_avatar.jpeg"
                  } className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-slate-800">{recipient.name}</p>
                    <p className="text-sm text-slate-500">{recipient.replied_count} reply</p>
                  </div>
                </div>))}

              </div>
            </div>
            <div className='flex justify-between mt-4'>
              <div><p>Latest Message</p></div>
              <div onClick={() => handelMessageDropDown(item.id)}><RiArrowDropDownLine size={30} /></div>
            </div>
            {/* Latest Message */}
            {messageDropDown === item.id && <div className="bg-slate-50 rounded-lg p-4 mt-4 border border-slate-200">

              <div className="flex items-start gap-3">
                <img src={item.sender_full_image || "https://tracsdev.apttechsol.com/public/uploads/user_avatar.jpeg"} alt="Latest message user avatar" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-slate-700 text-sm ">
                    <strong style={{ display: "flex" }}>{item.sender_full_name}<span><p style={{ color: "gray", marginLeft: "10px", fontSize: "14px" }}>{(() => {
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
                    })()}</p></span></strong><div style={{ marginTop: "20px", whiteSpace: "pre-line" }}>
                      {stripHtml(item.senderMessage)}
                    </div>


                  </p>

                </div>
              </div>
            </div>}


          </div>
          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-200">
            <Link to={`/replyMessage/${item.subject}/${item.user_id}/${item.replies_code}`} state={{ openComposer: false }}>  <button className="bg-white text-slate-700 border border-slate-300 font-medium py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors duration-200">View</button></Link>
            <Link to={`/replyMessage/${item.subject}/${item.user_id}/${item.replies_code}`} state={{ openComposer: true }}> <button className="bg-cyan-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-cyan-700 transition-colors duration-200">Reply</button></Link>

            {Array.isArray(item.recipients_info) &&
              item.recipients_info.length > 0 &&
              item.recipients_info.every((rec) => Number(rec.replied_count) >= 1) && (
                <button className="bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-cyan-700 transition-colors duration-200">Archive</button>
              )}





          </div>
        </div>))}

      </div></div>
  )
}

export default NewMessage
