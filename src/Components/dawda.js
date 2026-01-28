
import React from 'react'
import { useState, useEffect } from 'react';
import '../../App.css';
import "./MakeIntroduction.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoLogOut, IoPerson } from 'react-icons/io5';
const Adad = () => {

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
          { icon: 'inbox', text: 'Introduction Messages', active: true, to: '/dashboard' },
          { icon: 'users', text: 'My Contacts', to: '/myContacts' },
          { icon: 'mail', text: 'Email Templates', to: '/emailTemplate' },
          { icon: 'pen-square', text: 'Email Signature', to: '/emailSignature' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { icon: 'help-circle', text: 'App Help',to:'/appHelp' },
          { icon: 'thumbs-up', text: 'Feedback' },
          { icon: 'message-square', text: 'Contact Us' },
          { icon: 'book-open', text: 'Networking 101' },
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
                <div className="p-6">
                    <Link to="/" className="text-white text-2xl font-bold">TRACS</Link>
                    {/* Close button in mobile view */}
                    <button className="lg:hidden text-white ml-20 "
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

  // State for member directory filter
  const [recepientType, setRecipientType] = useState("h7_members");

  const [directoryFilter, setDirectoryFilter] = useState('All');
  // State for member search query
  const [searchText, setSearchText] = useState("");
  const searchQuery = useState("")
  // State for selected members
  const [selectedMembers, setSelectedMembers] = useState([]);
  // State for member search results
  const [memberResults, setMemberResults] = useState([]);
  // State for templates
  const [templates, setTemplates] = useState([]);
  // State for selected template
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [emailBody, setEmailBody] = useState("");
  const [ggText, setGGText] = useState("")
  const [signature, setSignature] = useState(false);
  const [msg, setMsg] = useState("")
  const [validationError, setValidationError] = useState("");
  const [message, setMessage] = useState("")
  const [subject, setSubject] = useState("");

  // State for showing template modal
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  // State for error message visibility
  const [showSelectionError, setShowSelectionError] = useState(false);

  // Mock data for members (would normally come from API)
  const allMembers = [
    // This would be populated with actual member data
    // { id: 1, name: 'John Doe', email: 'john@example.com', type: 'H7', business: 'Tech Corp' },
    // { id: 2, name: 'Jane Smith', email: 'jane@example.com', type: 'Tracs', business: 'Design Inc' }
  ];

  // Mock data for templates (would normally come from API)
  const templateOptions = [
    {}
  ];


  // Filter members based on directory and search query
  const filterMembers = () => {
    let results = [...allMembers];

    // Apply directory filter
    if (directoryFilter !== 'All') {
      results = results.filter(member => member.type === directoryFilter);
    }

    // Apply search query filter
    if (searchText) {
      const query = searchText.toLowerCase();
      results = results.filter(member =>
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        (member.business && member.business.toLowerCase().includes(query))
      );
    }

    setMemberResults(results);
  };

  // Handle member selection
  const handleMemberSelect = (member) => {
    if (selectedMembers.length < 2 && !selectedMembers.find((m) => m.id === member.id)) {
      const numberedMember = {
        ...member,
        indexNumber: selectedMembers.length + 1, // assign permanent number (1 or 2)
      };
      setSelectedMembers([...selectedMembers, numberedMember]);
    }
  };


  // Handle member removal
  const handleMemberRemove = (memberId) => {
    setSelectedMembers(selectedMembers.filter(m => m.id !== memberId));
  };

  // Interchange selected members
  const interchangeMembers = () => {
    if (selectedMembers.length === 2) {
      // Swap their positions, but not their numbers
      setSelectedMembers([selectedMembers[1], selectedMembers[0]]);
    }
  };



  // Load template content
  // ✅ Load template email body into textarea when selected
  const loadTemplate = (templateId) => {
    setSelectedTemplate(templateId);

    const template = data.templates?.find(
      (temp) => temp.id.toString() === templateId
    );

    if (template) {
      // email_body may contain HTML, so convert it to plain text if needed
      const parser = new DOMParser();
      const decodedHTML = parser.parseFromString(template.email_body, "text/html")
        .body.textContent;
      setEmailBody(decodedHTML);
    } else {
      setEmailBody("");
    }
  };

  // Toggle template modal
  const toggleTemplateModal = () => {
    setShowTemplateModal(!showTemplateModal);
  };
  const adjustInternalHtml = (html) => {
    const container = document.createElement("div");
    container.innerHTML = html;
    return container.innerHTML;
  };
  function stripHtml(html) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  // Initialize component
  useEffect(() => {
    // Load members and templates from API in a real app
    setTemplates(templateOptions);
    filterMembers();
  }, []);

  // Re-filter members when directory or search changes
  useEffect(() => {
    filterMembers();
  }, [directoryFilter, searchQuery]);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [name, setName] = useState("")
  const [contacts, setContacts] = useState([])


  const fetchProfile = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      const response = await axios.get("https://tracsdev.apttechsol.com/api/my-profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;

      setName(data.user.name || "");

      setImagePreview(`https://tracsdev.apttechsol.com/public/${data.user.image}`);


    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        const response = await axios.get(
          `https://tracsdev.apttechsol.com/api/sendmailintro/introduction_email`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Image URL:", data.partners?.image);
        setData(response.data);

        console.log(response.data);

      } catch (err) {
        console.log(err.response?.data?.message || "Something went wrong.");
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (selectedMembers.length > 0 && data?.userInfo?.name) {
      const businessNames = selectedMembers
        .map((user) => user.name)
        .filter(Boolean)
        .join("  &  ");

      const userName = data.userInfo.name;

      setSubject(`Introduction : ${userName} <> ${businessNames}`);
    } else {
      setSubject("");
    }
  }, [selectedMembers, data?.userInfo]);
  const handleSendIntroduction = async () => {
  // Basic validation
  if (selectedMembers.length === 0) {
    setValidationError("Please select at least one member before sending.");
    setShowSelectionError(true);
    return;
  }

  if (!subject || !emailBody) {
    setValidationError("Subject and message body are required.");
    return;
  }

  try {
    const token = sessionStorage.getItem("authToken");

    // 🔹 Create FormData
    const formData = new FormData();
   
    formData.append("subject", subject);
    formData.append("message", emailBody);
    formData.append("template_id", selectedTemplate || "");
    formData.append("signature", signature ? data?.signature?.name || "" : "");

    // 🔹 Append all selected member emails like mail_id[]
    selectedMembers.forEach((user) => {
      if (user.email) {
        formData.append("mail_id[]", user.email);
      }
    });

    console.log("📤 Sending form data:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    // 🔹 API POST request
    const response = await axios.post(
      "https://tracsdev.apttechsol.com/api/sendmailintrotointromem",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.success) {
      alert("✅ Introduction email sent successfully!");
      setSelectedMembers([]);
      setEmailBody("");
      setSubject("");
      setSelectedTemplate("");
    } else {
      alert("⚠️ Failed to send introduction. Please try again.");
    }
  } catch (error) {
    console.error("❌ Error sending introduction:", error);
    alert(error.response?.data?.message || "Something went wrong.");
  }
};

const[Heasderdropdown,setHeaderdropdown]=useState(null);
const showDropDown=()=>{
  setHeaderdropdown(prev=>!prev)
}
const navigate=useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("userId")

    sessionStorage.removeItem("profileImageUrl")

    navigate("/"); // Redirect to login page
    window.location.reload();
  };
  return (
    <div style={{ display: 'flex' }}><div><Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} /></div>
      <div style={{ width: "100%" }}>
        <header className="bg-white shadow-sm flex items-center justify-between p-4 border-b">
                  <div className="flex items-center">
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-gray-600 lg:hidden">
                      <Icon name="menu" className="w-6 h-6" />
                    </button>
                    <h1 className="text-2xl font-semibold text-gray-800 ml-4 lg:ml-0"></h1>
                  </div>
        
                  <div className="flex items-center space-x-4">
                    <Link to="/test"className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full font-semibold text-sm">
                      View Profile
                    </Link>
                    <div className="relative">
                      <button className="flex items-center space-x-2"onClick={showDropDown}>
                        <img src={imagePreview} alt="User Avatar" className="h-10 w-10 rounded-full" />
                        <span className="hidden md:block">{name}</span>
                        <Icon name="chevron-down" className="w-4 h-4" />
                      </button>
                      {Heasderdropdown &&  <div className="dropDown3" >
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
    
        <div className="bg-gray-100 min-h-screen p-4 md:p-8 font-sans" style={{ width: "100%" }}>

          <div className="max-w-1xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                Introduction Composer
              </h1>
              <p className="text-gray-500 mt-2 text-sm md:text-base">
                Effortlessly connect members with personalized email introductions.
              </p>
            </header>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 gap-6">
              {/* Left Column: Member Search and Selection */}
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg h-fit">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                  1. Select Members
                </h2>

                {/* Member Directory Dropdown */}
                <div className="mb-4">
                  <label
                    htmlFor="memberDirectory"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Members Directory
                  </label>
                  <select
                    id="memberDirectory"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
                    value={recepientType}
                    onChange={(e) => setRecipientType(e.target.value)}
                  >
                    <option value="">Select Members</option>
                    <option value="h7_members">H7 Members</option>
                    <option value="tracs_members">TRACS Members</option>
                    <option value="contacts">My Contact</option>
                  </select>
                </div>

                {/* Member Search */}
                <div className="mb-4">
                  <label
                    htmlFor="memberSearch"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Search Members (Name, Email, Business)
                  </label>
                  <input
                    type="text"
                    id="memberSearch"
                    placeholder="Type to search..."
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>

                {/* Member Search Results */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Search Results{' '}
                    <span className="text-xs text-gray-500">({memberResults.length})</span>
                  </p>
                  <div
                    id="memberSearchResults"
                    className="scrollable-list border border-gray-200 rounded-lg divide-y divide-gray-100 bg-surface p-2 max-h-64 overflow-y-auto"
                  >
                    {(
                      (recepientType === "contacts" ? contacts : data?.userslist) || []
                    )
                      .filter((user) => {
                        // Convert search text once for efficiency
                        const search = searchText.toLowerCase();

                        // Match against name, email, or listing title
                        const searchMatch =
                          user.name?.toLowerCase().includes(search) ||
                          user.email?.toLowerCase().includes(search) ||
                          user.listings?.[0]?.title?.toLowerCase().includes(search);

                        // If no directory selected, show all that match search
                        if (!recepientType) return searchMatch;

                        // Filter based on selected member type
                        const typeMatch =
                          (recepientType === "h7_members" && user.member_type === "1") ||
                          (recepientType === "tracs_members" && user.member_type === "2") ||
                          (recepientType === "contacts" && user.member_type === "3");

                        return searchMatch && typeMatch;
                      })
                      .map((member) => (
                        <div
                          key={member.id}
                          className="flex p-2 hover:bg-gray-50 cursor-pointer rounded justify-between"
                          onClick={() => handleMemberSelect(member)}
                        >
                          {/* Member Left Section */}
                          <div className="flex items-center" style={{overflow:"hidden"}}>
                            <img
                              src={
                                member?.image && member.image !== "null" && member.image !== ""
                                  ? `https://tracsdev.apttechsol.com/public/${member.image}`
                                  : "https://tracsdev.apttechsol.com/public/uploads/user_avatar.jpeg"
                              }
                              alt={member.name}
                              className="rounded-full mr-3"
                              style={{ width: "40px", height: "40px", objectFit: "cover" }}
                            />
                            <div>
                              <div className="flex font-medium items-center">
                                {member.name}
                                <span className="ml-2 text-gray-600">
                                  (
                                  {member.member_type === "1"
                                    ? "H7"
                                    : member.member_type === "2"
                                      ? "Tracs"
                                      : member.member_type === "3"
                                        ? "Contacts"
                                        : ""}
                                  )
                                </span>
                              </div>
                              <div className="text-sm text-gray-500">{member.email}</div>
                              {member.listings?.[0]?.title && (
                                <div className="text-xs text-gray-400">
                                  {member.listings[0].title}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Select Button */}
                          <button
                            style={{
                              background: "#4f46e5",
                              padding: "4px 8px",
                              borderRadius: "12px",
                              color: "white",
                              height: "fit-content",
                            }}
                          >
                            Select
                          </button>
                        </div>
                      ))}

                  </div>
                </div>

                {/* Selected Members */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                      Selected Members (Min 2)
                    </h3>
                    <button
                      id="interchangeBtn"
                      className={`px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded-full transition ${selectedMembers.length !== 2
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-yellow-600'
                        }`}
                      onClick={interchangeMembers}
                      disabled={selectedMembers.length !== 2}
                    >
                      Interchange
                    </button>

                  </div>

                  <div
                    id="selectedMembersList"
                    className="min-h-[100px] border border-gray-200 rounded-lg p-3 space-y-3"
                  >
                    {selectedMembers.length > 0 ? (
                      selectedMembers.map((member, index) => (
                        <div
                          key={member.id}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm"
                        >
                          <div className="flex items-start">
                            {/* Index Bubble */}
                            <div
                              className="flex items-center justify-center w-7 h-7 rounded-full text-white font-semibold mr-3"
                              style={{
                                background: member.indexNumber === 1 ? "blue" : "red",
                              }}
                            >
                              {member.indexNumber}
                            </div>

                            {/* Member Info */}
                            <div>
                              <div className="font-semibold text-gray-800">{member.name}</div>
                              <div className="text-sm text-gray-700">{member.phone}</div>
                              <div className="text-sm text-gray-500">{member.email}</div>
                            </div>
                          </div>

                          {/* Remove Button */}
                          <button
                            className="text-red-500 hover:text-red-700 text-lg font-bold"
                            onClick={() => handleMemberRemove(member.id)}
                          >
                            ×
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 italic">
                        Select members from the list above.
                      </p>
                    )}
                  </div>
                  {showSelectionError && (
                    <p id="selectionError" className="text-red-500 text-sm mt-2">
                      ⚠️ Please select exactly two members (Receiver 1 and Receiver 2).
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column: Email Composition */}
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                  2. Compose Email
                </h2>

                {/* Template Selection */}
                <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                  <div className="sm:col-span-2">
                    {/* Template Dropdown */}
                    <label
                      htmlFor="templateSelect"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Select Template
                    </label>
                    <select
                      id="templateSelect"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
                      value={selectedTemplate}
                      onChange={(e) => {
                        const selected = e.target.value;
                        setSelectedTemplate(selected);

                        const selectedTemplateObj = data.templates.find(
                          (t) => t.id === parseInt(selected)
                        );

                        if (selectedTemplateObj) {
                          // convert HTML email body to plain text for textarea
                          const plainText = stripHtml(selectedTemplateObj.email_body);
                          setEmailBody(plainText);
                          setMessage(plainText);
                          setGGText(selectedTemplateObj.email_body); // keep HTML version if needed
                        } else {
                          setEmailBody("");
                          setMessage("");
                          setGGText("");
                        }
                      }}
                    >
                      <option value="">Select Template</option>
                      {data.templates?.map((temp) => (
                        <option key={temp.id} value={temp.id}>
                          {temp.template_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  className="w-full sm:w-auto p-2  text-white font-medium rounded-lg hover:bg-green-600 transition"
                  onClick={toggleTemplateModal}
                  style={{ background: "green" }}
                >
                  + Create New Template
                </button>
              </div>
              {/* Subject */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <input
                  className="mt-1 bg-green-50 border border-black pr-2 pl-2 pt-2 pb-2 w-full rounded"
                  placeholder="subject will populate automatically"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <p className="text-[13px] mt-2">
                  **Subject structure:** [Introducer Name] connecting [Receiver 1 Name] & [Receiver 2 Name]
                </p>
              </div>

              {/* Message Body */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">Message Body</label>
                <textarea
                  className="w-full h-[200px] border border-black mt-2 rounded p-2"
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                />
                <p className="text-[13px] mt-2">
                  *Available Tokens:* **[INT_NAME]**, **[R1_NAME]**, **[R1_EMAIL]**, **[R2_NAME]**, **[R2_EMAIL]**.
                </p>
              </div>

              {/* Replace Tokens Button */}
              <div className="flex items-center justify-between mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => {
                    if (selectedMembers.length < 2) {
                      setValidationError("Please select at least two users to replace tokens.");
                      return;
                    }

                    const [user1, user2] = selectedMembers;

                    // Replace tokens in both plain text and HTML versions
                    const replacedBody = emailBody
                      .replace(/\[\[name_1\]\]/gi, user1.name)
                      .replace(/\[\[name_2\]\]/gi, user2.name)
                      .replace(/\[\[R1_NAME\]\]/gi, user1.name)
                      .replace(/\[\[R2_NAME\]\]/gi, user2.name)
                      .replace(/\[\[R1_EMAIL\]\]/gi, user1.email)
                      .replace(/\[\[R2_EMAIL\]\]/gi, user2.email);

                    setEmailBody(replacedBody);
                    setMessage(replacedBody);
                    setGGText(replacedBody);
                    setValidationError("");
                  }}
                >
                  Replace Tokens
                </button>

                <label className="flex items-center space-x-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={signature}
                      onChange={(e) => {
                        const checked = e.target.checked;

                        if (!data?.signature?.name) {
                          setMsg("No signature found. Please add one first.");
                          return;
                        }

                        const sigText = `\n\n${data.signature.name}`; // add some spacing before signature

                        if (checked) {
                          // Add signature to the bottom of textarea
                          setEmailBody((prev) => prev + sigText);
                          setSignature(true);
                        } else {
                          // Remove signature text if already present
                          setEmailBody((prev) => prev.replace(sigText, "").trim());
                          setSignature(false);
                        }
                      }}
                    />
                    <span>Signature</span>
                  </label>

                 
                </label>
              </div>

            </div>
            <div className='dicvd2'>  <div><button id="but2">Cancle</button></div>
              <div><button id="but1"  onClick={handleSendIntroduction}>Send Introduction</button> </div>
            </div>
          </div> {/* end of Right Column */}
        </div> {/* end of grid */}
      </div> {/* end of page container */}
    </div>

  )
}

export default Adad
