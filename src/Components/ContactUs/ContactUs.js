import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaHome } from 'react-icons/fa';
import { IoLogOut, IoPerson } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar2 from '../Sidebar/Sidebar2';
import { IoMdMenu } from 'react-icons/io';


export default function ContactUs() {



  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [name, setName] = useState("")


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



    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);


  // Renders the signature with line breaks for the preview
  const [email, setEmail] = useState("");
  const [userName,setUserName]=useState("")
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("")

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
          { icon: 'credit-card', text: 'My Membership', to: '/myMembership' },
          { icon: 'user', text: 'My Profile', to: '/myProfile' },
          { icon: 'lock', text: 'Change Password', to: '/changePassword' },

        ],
      },
      {
        title: 'Introductions',
        links: [
          { icon: 'inbox', text: 'Introduction Messages', to: '/dashboard' },
          { icon: 'users', text: 'My Contacts', to: '/myContacts' },
          { icon: 'mail', text: 'Email Templates', to: '/emailTemplate' },
          { icon: 'pen-square', text: 'Email Signature', to: "/emailSignature" },
        ],
      },
      {
        title: 'Resources',
        links: [
          { icon: 'help-circle', text: 'App Help', to: '/appHelp' },
          { icon: 'thumbs-up', text: 'Feedback' },
          { icon: 'message-square', text: 'Contact Us', to: '/contact', active: true },
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
  const [data, setData] = useState("");
  const [capVal, setCapVal] = useState("");
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("authToken");
      const formData = new FormData();
      formData.append("user_id", data.user?.id);
      formData.append("email", data.user?.email);
      formData.append("description", description);
      formData.append("subject", subject);
      formData.append("g-recaptcha-response", "test");

      const response = await axios.post("https://tracsdev.apttechsol.com/api/storeusercontactpage", formData, {
        headers: {
          Authorization: `Bearer ${token}`,

        },
      });

      alert("success");



    } catch (err) {
      console.log("message failed to send");

    }
  }
  const [subtitle, settitle] = useState("")
 useEffect(() => {
  const fetchdata = async () => {
    try {
      const token = sessionStorage.getItem("authToken");

      const response = await axios.get(
        "https://tracsdev.apttechsol.com/api/user-contact-us",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const resData = response.data;

      setData(resData);

      // ✅ FIX: use response data directly
      setEmail(resData.user?.email || "");
  setUserName(resData.user?.name || "");
      settitle(
        resData.helpnote?.find(item => item.id === 18)?.title || ""
      );

    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  fetchdata();
}, []);

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
  return (
    <div style={{ display: "flex" }}> <div className="hidden lg:block"><Sidebar2 /></div>{showSideNav && <div ><Sidebar2 /></div>}
      <div className="bg-gray-100 text-gray-800 min-h-screen font-sans" style={{ width: "100%" }}>
        <header className="bg-white shadow-sm flex items-center justify-between p-4 border-b">
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
        <div className="bg-gray-50 text-gray-800 font-sans p-4 sm:p-6 lg:p-8" style={{ width: "100%" }}>

          <div className="container mx-auto max-w-1xl">
            <div className="MessageIntroButt">
              <div><h2 className='intoHeading'style={{ color: "#334e6f" }}>Contact us</h2>
                <p className='IntroPara'>{subtitle} </p></div> </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              {/* Main Content Area */}
              <div >
                <div style={{}}>
                   <label style={{ marginBottom: "20px" }}>Name</label>   <br />

                  <input style={{ width: "80%", background: "rgb(233, 236, 239)", margin: "5px",height:"40px", padding: "5px" }} value={userName} /><br />
                  <label style={{ marginBottom: "20px" }}>Email</label>   <br />

                  <input style={{ width: "80%", background: "rgb(233, 236, 239)",height:"40px", margin: "5px", padding: "5px" }} value={email} /><br />
                  <label style={{ marginBottom: "20px", marginTop: "25px" }}>Subject</label>   <br />
                  <input style={{ width: "80%", margin: "5px",height:"40px", padding: "5px", border: "1px solid black" }} value={subject} onChange={(e) => setSubject(e.target.value)} /><br />
                  <label style={{ marginBottom: "10px" }}>Message</label>   <br />
                  <textarea value={description} style={{ border: "1px solid black", width: "80%", marginTop: "20px", height: "200px" }} onChange={(e) => setDescription(e.target.value)} />
                </div>

                {/* Action Buttons */}

              </div>
              <button style={{ background: "orange", padding: "10px 20px 10px 20px", marginTop: "40px", borderRadius: "10px" }} onClick={handleSave}>Submit</button>
            </div>

            {/* Success Message Toast */}


          </div>
        </div>
      </div>
    </div>
  );
}
