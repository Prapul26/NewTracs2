import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaEye, FaHome } from 'react-icons/fa';
import { IoLogOut, IoPerson, IoSearchSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar2 from '../Sidebar/Sidebar2';
import { IoIosSend, IoMdArrowDropdownCircle, IoMdMenu } from 'react-icons/io';
import "./NewMakeIntroduction.css"
import { MdCancel, MdPersonAddAlt1 } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import ReactQuill from 'react-quill';
const NewMakeIntroduction = () => {
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
  const [imagePreview, setImagePreview] = useState("");
  const [name, setName] = useState("")

  const [subtitle, settitle] = useState("")
  const fetchProfile = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      const response = await axios.get("https://tracsdev.apttechsol.com/api/my-profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;

      setName(data.user.name || "");
      settitle(data.helpnote.find(item => item.id === 7)?.title);

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
  const [open, setOpen] = useState(false);

  const [showContactsForm, setContactsForm] = useState(false);

  const [contactFormData, setContactFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    group_name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveContact = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (
      !contactFormData.first_name ||
      !contactFormData.last_name ||
      !contactFormData.email
    ) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const token = sessionStorage.getItem("authToken");

      const response = await axios.post(
        "https://tracsdev.apttechsol.com/api/contact_store_form", // 🔁 replace if endpoint differs
        contactFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("✅ Contact added successfully");

        // reset form
        setContactFormData({
          first_name: "",
          last_name: "",
          email: "",
          group_name: "",
        });

        setContactsForm(false);

        // 🔁 optional: refresh contacts list
        // fetchContacts();

      } else {
        setError(response.data.message || "Failed to add contact");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const [cardDetails, setCardDetails] = useState(null);
  const [firstPersonDetails, setFirstPersonDetails] = useState(null);
  const [secondPersonDetails, setSecondPersonDetails] = useState(null);


  useEffect(() => {
    if (showContactsForm) {
      setFirstPersonDetails(null);
      setSecondPersonDetails(null);
    }
  }, [showContactsForm]);

  const [firstSelected, setFirstSelected] = useState(true);
  const [firstSelecteddata, setFirstSelectedData] = useState(null);
  const [secondSelected, setSecondSelected] = useState(true);
  const [secondSelectedData, setSecondSelectedData] = useState(null)

  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [emailBody, setEmailBody] = useState("");

  const [data, setData] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [tracsMembers, setTracsMembers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("authToken");


        const response = await axios.get(
          "https://tracsdev.apttechsol.com/api/sendmailintro/introduction_email",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );




        setData(response.data);
        console.log("RESPONSE DATA:", data);
      } catch (err) {
        console.log("ERROR:", err.response || err.message);
      }
    };

    fetchData();
  }, []);
  const fetchContacts = async () => {
    try {
      const token = sessionStorage.getItem("authToken");

      const response = await axios.get(
        "https://tracsdev.apttechsol.com/api/getContactsEmails",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Normalize contacts to match userslist structure
        const formattedContacts = response.data.users.map((c) => ({
          id: c.id,
          name: c.name,
          email: c.email,
          image: c.image,
          member_type: "3", // 👈 important (contacts)
          listings: c.business_name
            ? [{ title: c.business_name }]
            : [],
        }));

        setContacts(formattedContacts);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const fetchTracsMembers = async () => {
    try {
      const token = sessionStorage.getItem("authToken");

      const response = await axios.get(
        "https://tracsdev.apttechsol.com/api/getTracsMembers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const formattedMembers = response.data.users.map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          image: u.image,
          member_type: "2", // 👈 TRACS members
          listings: u.business_name
            ? [{ title: u.business_name }]
            : [],
        }));

        setTracsMembers(formattedMembers);
      }
    } catch (error) {
      console.error("Error fetching TRACS members:", error);
    }
  };
  useEffect(() => {
  fetchContacts();
  fetchTracsMembers();
}, []);

  const [recepientType, setRecepientType] = useState("");
  const [recepierntType2, setRecepientType2] = useState("");
 const handleFirstPersonSelect = (e) => {
  const value = e.target.value;

  if (!value) {
    setFirstPersonDetails(null);
    return;
  }

  if (value === "h7_members") {
    const h7Members = data?.userslist?.filter(
      (user) => user.member_type === "1"
    );
    setFirstPersonDetails(h7Members || []);
  }

  else if (value === "tracs_members") {
    setFirstPersonDetails(tracsMembers); // ✅ already preloaded
  }

  else if (value === "contacts") {
    setFirstPersonDetails(contacts); // ✅ already preloaded
  }
};


  const handleSecondPersonSelect = (e) => {
  const value = e.target.value;

  if (!value) {
    setSecondPersonDetails(null);
    return;
  }

  if (value === "h7_members") {
    const h7Members = data?.userslist?.filter(
      (user) => user.member_type === "1"
    );
    setSecondPersonDetails(h7Members || []);
  }

  else if (value === "tracs_members") {
    setSecondPersonDetails(tracsMembers);
  }

  else if (value === "contacts") {
    setSecondPersonDetails(contacts);
  }
};

  const [subject, setSubject] = useState("");
  useEffect(() => {
    if (firstSelecteddata && secondSelectedData) {
      setSubject(
        `Intro: ${name} <> ${firstSelecteddata.name} & ${secondSelectedData.name}`
      );
    } else if (firstSelecteddata) {
      setSubject(`Intro: ${name} <> ${firstSelecteddata.name}`);
    } else if (secondSelectedData) {
      setSubject(`Intro: ${name} <> ${secondSelectedData.name}`);
    } else {
      setSubject("");
    }
  }, [firstSelecteddata, secondSelectedData, name]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const filteredMembers = firstPersonDetails?.filter((member) => {
    const search = searchTerm.toLowerCase();

    return (
      member.name?.toLowerCase().includes(search) ||
      member.email?.toLowerCase().includes(search) ||
      member.business_name?.toLowerCase().includes(search)
    );
  });
  const filteredMembers2 = secondPersonDetails?.filter((member) => {
    const search = searchTerm2.toLowerCase();

    return (
      member.name?.toLowerCase().includes(search) ||
      member.email?.toLowerCase().includes(search) ||
      member.business_name?.toLowerCase().includes(search)
    );
  });
  const [adminTemplates, setAdminTemplates] = useState(true)
  const [myTemplates, setMyTemplates] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const filteredTemplates = (data?.templates || []).filter((template) => {

    // Show My Templates (user_type === "1")
    if (!myTemplates && template.user_type === "1") {
      return false;
    }

    // Show System Templates (admin_id !== null)
    if (!adminTemplates && template.admin_id !== null) {
      return false;
    }

    return true;
  });
  const handleTemplateChange = (e) => {
    const id = e.target.value;
    setSelectedTemplateId(id);

    const selected = data?.templates?.find(
      (template) => template.id.toString() === id
    );

    if (selected) {
      setEmailBody(selected.email_body + data.signature?.name || "");
    }
  };

  const handleReplaceTokens = () => {
    if (!firstSelecteddata || !secondSelectedData) {
      alert("Please select both persons before replacing tokens.");
      return;
    }

    let updatedBody = emailBody;

    updatedBody = updatedBody.replaceAll(
      "[[name_1]]",
      firstSelecteddata.name
    );

    updatedBody = updatedBody.replaceAll(
      "[[name_2]]",
      secondSelectedData.name
    );

    setEmailBody(updatedBody);
  };
  console.log("selectedTemplateId :", selectedTemplateId)
  const handleSendInroduction = async () => {
    if (!firstSelecteddata?.email || !secondSelectedData?.email) {
      alert("Please select valid users with email.");
      return;
    }

    if (!subject?.trim() || !emailBody?.trim()) {
      alert("Subject and message body are required.");
      return;
    }

    try {
      const token = sessionStorage.getItem("authToken");

      const formData = new FormData();

      formData.append("subject", subject);
      formData.append("message", emailBody);
      formData.append("template_id", selectedTemplateId || "");
      formData.append("signature", data?.signature?.name || "");

      // ✅ FORCE ARRAY STRUCTURE
      const mailIds = [
        firstSelecteddata.email,
        secondSelectedData.email,
      ].filter(Boolean);

      const mailTypes = [
        firstSelecteddata.member_type,
        secondSelectedData.member_type,
      ].filter(Boolean);

      // 🚨 IMPORTANT: Prevent empty array
      if (mailIds.length === 0 || mailTypes.length === 0) {
        alert("Recipients missing.");
        return;
      }

      mailIds.forEach((id) => {
        formData.append("mail_id[]", id);
      });

      mailTypes.forEach((type) => {
        formData.append("mail_type[]", type);
      });

      // Debug
      console.log("📤 Final Payload:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axios.post(
        "https://tracsdev.apttechsol.com/api/sendmailintrotointromem",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("✅ Introduction email sent successfully!");
        navigate("/dashboard");
      } else {
        alert("⚠️ Failed: " + response.data.message);
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert(error.response?.data?.message || "Something went wrong.");
    }
  };
const [previeMode,setPreviewMode]=useState(false);
const handlePreviewMode=()=>{
 
  setPreviewMode(true);
     setFirstPersonDetails(null);
                    setSecondPersonDetails(null);
}
const cancelPreviewMode=()=>{
setPreviewMode(false)
}
const stripHtml = (html) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};
 const adjustInternalHtml = (html) => {
  const container = document.createElement("div");
  container.innerHTML = html;
  return container.innerHTML;
};
  return (

    <div className='newmakaidhadbn'>
      {showContactsForm &&
        <div className='overlay'>
          <div className='contactsForm2'>

            <div className='contactsHeading'>
              <h3>Add New Contact</h3>
              <RxCross2 size={23} style={{ color: "rgb(156, 163, 175)", fontWeight: "700" }} onClick={() => setContactsForm(false)} />
            </div>

            <div className='contactData'>
              <form onSubmit={handleSaveContact}>

                <label>First Name <span style={{ color: "red" }}>*</span></label><br />
                <input
                  name="first_name"
                  value={contactFormData.first_name}
                  onChange={handleContactChange}
                  required
                /><br />

                <label>Last Name <span style={{ color: "red" }}>*</span></label><br />
                <input
                  name="last_name"
                  value={contactFormData.last_name}
                  onChange={handleContactChange}
                  required
                /><br />

                <label>Email <span style={{ color: "red" }}>*</span></label><br />
                <input
                  name="email"
                  value={contactFormData.email}
                  onChange={handleContactChange}
                  required
                /><br />

                <label>Group Name</label><br />
                <input
                  name="group_name"
                  value={contactFormData.group_name}
                  onChange={handleContactChange}
                /><br />

                {error && <p style={{ color: "red" }}>{error}</p>}

                <div className='conButtons' style={{ display: "flex" }}>
                  <button
                    type="button"
                    onClick={() => setContactsForm(false)}
                    style={{ background: "#6c757d", color: "white", borderRadius: "5px", padding: "5px 10px" }}
                  >
                    Close
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{ background: "#163b6d", color: "white", borderRadius: "5px", padding: "5px 10px", marginLeft: "20px" }}
                  >
                    {loading ? "Saving..." : "Save Contact"}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>}
           {previeMode &&
        <div className='overlay'>
          <div className='contactsForm2'>

            <div style={{display:"flex",padding:"16px"}}>
              <div style={{marginTop:"2px",color:"rgb(79, 70, 229)"}}><FaEye size={25}/></div><h3 style={{marginLeft:"20px",fontWeight:"700"}}>Preview</h3>
            
            </div>

            <div className='contactData'>
              
               <div className='sunawwfhiawh'>
                <h2>Subject</h2>
                <p style={{marginTop:"15x"}}>{subject}</p>
               </div>
               <div className='messdatayk'>
                <h2>Message</h2>
                <div className='messdsprip'  style={{marginTop:"15px"}}>
                  <div className='messdsprip' dangerouslySetInnerHTML={{ __html: adjustInternalHtml(emailBody) }} />
                </div>
               </div>

              

                <div className='conButtonstt' style={{ display: "flex" }}>
                  <button
                    type="button"
                    onClick={() => setPreviewMode(false)}
                    style={{ background: "#6c757d", color: "white", borderRadius: "5px", padding: "5px 10px" }}
                  >
                    Looks Good
                  </button>

                  
                </div>

             
            </div>
          </div>
        </div>}

      <div style={{ display: "flex", height: "100vh", overflowY: "auto" }}>
        <div className="hidden lg:block fixed w-[17%]"><Sidebar2 /></div>{showSideNav && <div><Sidebar2 /></div>}
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
          <div className="bg-gray-100 m p-4 md:p-8 ml-0 md:ml-[17%] w-full md:w-[83%] h-[100vh]  overflow-y-auto md:overflow-y-visible " >
            <div className="container mx-auto max-w-1xl">
              <div className="MessageIntroButt">
                <div><h2 className='intoHeading' style={{ color: "#334e6f" }}>Make Introduction</h2>
                </div>
                <div className='inrodrop'>
                  <div className={`inrodrop1 ${open ? "open" : ""}`}>
                    <p className='IntroPara'>{subtitle}
                    </p>
                  </div>
                  <div className='inrodrop2' onClick={() => setOpen(!open)}><IoMdArrowDropdownCircle /></div></div> </div>
              <div className='awdawd-t' style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className='addacon'
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "black",
                    background: "rgb(255, 255, 255)",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    padding: "8px 14px",
                    border: "none",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    setContactsForm(true);
                    setFirstPersonDetails(null);
                    setSecondPersonDetails(null);
                  }}
                >
                  <span style={{ marginRight: "5px" }} className='addiconBu'>
                    <MdPersonAddAlt1 size={18} />
                  </span>
                  Add New Contact
                </button>
              </div>

              <div className="bg-white p-2 rounded-2xl shadow-lg md:p-14">
                {/* Main Content Area */}
                <div className="gap-8">

                  <div className="selectionBoxes2">
                    <div className='selectionbox1'>
                      { }
                      <div className='peronaa'>
                        <div style={{ background: "rgb(79, 70, 229)", width: "24px", textAlign: "center", height: "24px", borderRadius: "50%" }}><h3 style={{ color: "white" }}>1</h3></div>
                        <div style={{ marginLeft: "20px" }}><h2>First Person</h2></div>
                      </div>
                      {firstSelecteddata && <div className='fspd'>
                        <div style={{ display: "flex" }}>
                          <div className='fspdpic'><img
                            src={
                              firstSelecteddata.image && firstSelecteddata.image !== "null"
                                ? `https://tracsdev.apttechsol.com/public/${firstSelecteddata.image}`
                                : "https://tracsdev.apttechsol.com/public/uploads/user_avatar.jpeg"
                            }
                            alt={firstSelecteddata.name} style={{ width: "100%", height: "100%" }}
                            className="w-10 h-10 rounded-full mr-3 object-cover"
                          /></div>
                          <div className='"fspdData' >
                          <Link to={`/test?userId=${firstSelecteddata.id}&memberType=${firstSelecteddata.member_type}`}>   <p className='awdapp1'>{firstSelecteddata.name}</p></Link>
                            <p className='awdapp2'>{firstSelecteddata.email}</p>
                            <span className='fspp'>{firstSelecteddata.member_type === "1"
                              ? "H7 Member"
                              : firstSelecteddata.member_type === "2"
                                ? "Tracs Member"
                                : firstSelecteddata.member_type === "3"
                                  ? "Contacts"
                                  : ""}</span>
                          </div>
                        </div>
                        <div><MdCancel style={{ color: "rgb(156, 163, 175)" }} size={18} onClick={() => {
                          setFirstSelected(true);
                          setFirstSelectedData(null);
                        }} /></div> </div>}
                      {firstSelected && <div><label style={{ marginTop: "10px" }}>Member Type</label><br />
                        <select onChange={handleFirstPersonSelect}>
                          <option value="">Select Members</option>
                          <option value="h7_members">H7 Members</option>
                          <option value="tracs_members">TRACS Members</option>
                          <option value="contacts">My Contact</option>
                        </select>

                        <br />
                        <label >Search Contact</label><br />
                        <div className='searchContactkk'>
                          <div style={{ marginTop: "3.5px", marginRight: "9px" }}><IoSearchSharp /></div><div><input
                            placeholder="Name, email or business name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          </div>
                        </div></div>}

                      {firstPersonDetails && (
                        <div className='cardInfooContainer'>
                          {filteredMembers?.map((member) => (
                            <div
                              className='cardInfoo'
                              key={member.id}
                              onClick={() => {
                                setFirstSelectedData(member);   // ✅ save clicked member
                                setFirstSelected(false);
                                setFirstPersonDetails(null);
                              }}
                            >
                              <div className='cardnamepic'>
                                <div className='cdpic'>
                                  <img style={{ width: "100%", height: "100%" }}
                                    src={
                                      member.image && member.image !== "null"
                                        ? `https://tracsdev.apttechsol.com/public/${member.image}`
                                        : "https://tracsdev.apttechsol.com/public/uploads/user_avatar.jpeg"
                                    }
                                    alt={member.name}
                                    className="w-10 h-10 rounded-full mr-3 object-cover"
                                  />
                                </div>
                                <div style={{ marginLeft: "10px" }}>
                                  <h3>{member.name}</h3>

                                  <p className='pkomn0'>{member.email}</p>
                                </div>
                              </div>

                              <div>

                                <span className='cardmemcc'>{member.member_type === "1" ? "H7 Member" : member.member_type === "2" ? "Tracs Member" : member.member_type === "3" ? "Contacts" : ""}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}



                    </div>
                    <div className='selectionbox2'>
                      <div className='peronaa'>
                        <div style={{ background: "rgb(79, 70, 229)", width: "24px", textAlign: "center", height: "24px", borderRadius: "50%" }}><h3 style={{ color: "white" }}>2</h3></div>
                        <div style={{ marginLeft: "20px" }}><h2>Second Person</h2></div>

                      </div>
                      {
                        secondSelectedData && <div className='sspd'>
                          <div style={{ display: "flex" }}>
                            <div className='sspdpic'> <img
                              src={
                                secondSelectedData.image && secondSelectedData.image !== "null"
                                  ? `https://tracsdev.apttechsol.com/public/${secondSelectedData.image}`
                                  : "https://tracsdev.apttechsol.com/public/uploads/user_avatar.jpeg"
                              }
                              alt={secondSelectedData.name} style={{ width: "100%", height: "100%" }}
                              className="w-10 h-10 rounded-full mr-3 object-cover"
                            /></div>
                            <div className='sspddata'>
                              <Link to={`/test?userId=${secondSelectedData.id}&memberType=${secondSelectedData.member_type}`}> <p className='awdapp1'>{secondSelectedData.name}</p></Link>
                              <p className='awdapp2'>{secondSelectedData.email}</p>
                              <span className='fspp'>{secondSelectedData.member_type === "1"
                                ? "H7 Member"
                                : secondSelectedData.member_type === "2"
                                  ? "Tracs Member"
                                  : secondSelectedData.member_type === "3"
                                    ? "Contacts"
                                    : ""}</span>
                            </div>
                          </div>
                          <div><MdCancel style={{ color: "rgb(156, 163, 175)" }} size={18} onClick={() => { setSecondSelectedData(null); setSecondSelected(true) }} /></div>
                        </div>
                      }
                      {secondSelected && <div> <label style={{ marginTop: "10px" }}>Member Type</label><br />
                        <select onChange={handleSecondPersonSelect}>
                          <option value="">Select Members</option>
                          <option value="h7_members">H7 Members</option>
                          <option value="tracs_members">TRACS Members</option>
                          <option value="contacts">My Contact</option>
                        </select>
                        <br />
                        <label >Search Contact</label><br />
                        <div className='searchContactkk'>
                          <div style={{ marginTop: "3.5px", marginRight: "9px" }}><IoSearchSharp /></div><div><input
                            placeholder="Name, email or business name"
                            value={searchTerm2}
                            onChange={(e) => setSearchTerm2(e.target.value)}
                          /></div>
                        </div></div>}
                      {secondPersonDetails && (
                        <div className='cardInfooContainer'>
                          {

                            filteredMembers2?.map((member) => (
                              <div className='cardInfoo' onClick={() => { setSecondSelectedData(member); setSecondSelected(false); setSecondPersonDetails(null) }}>
                                <div className='cardnamepic'>
                                  <div className='cdpic'>
                                    <img style={{ width: "100%", height: "100%" }}
                                      src={
                                        member.image && member.image !== "null"
                                          ? `https://tracsdev.apttechsol.com/public/${member.image}`
                                          : "https://tracsdev.apttechsol.com/public/uploads/user_avatar.jpeg"
                                      }
                                      alt={member.name}
                                      className="w-10 h-10 rounded-full mr-3 object-cover"
                                    />
                                  </div>
                                  <div style={{ marginLeft: "10px" }}>
                                    <h3>{member.name}</h3>
                                    <p className='pkomn0'>{member.email}</p>
                                  </div>
                                </div>
                                <div>
                                  <span className='cardmemcc'>{member.member_type === "1" ? "H7 Member" : member.member_type === "2" ? "Tracs Member" : member.member_type === "3" ? "Contacts" : ""}</span>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}

                    </div>
                  </div>

                </div>
              </div>
              <div className="bg-white p-2 rounded-2xl shadow-lg mt-8 md:p-14">
                <div className="gap-8">
                  <div className='draftHeading'>
                    <div style={{ background: "rgb(79, 70, 229)", width: "24px", textAlign: "center", height: "24px", borderRadius: "50%" }}><h3 style={{ color: "white" }}>3</h3></div>
                    <div style={{ marginLeft: "20px" }}><h2>Draft Introduction</h2></div>
                  </div>
                  <div className='templatesSelection'>
                    <div className='templatesno'>
                      <div><input type="checkbox"
                        checked={adminTemplates}
                        onChange={(e) => setAdminTemplates(e.target.checked)} /><span style={{ marginLeft: "8px", fontWeight: "600" }}>System Templates</span></div>
                      <div style={{ marginLeft: "25px" }}><input type="checkbox"
                        checked={myTemplates}
                        onChange={(e) => setMyTemplates(e.target.checked)} /><span style={{ marginLeft: "8px", fontWeight: "600" }}>My Templates</span></div>
                    </div>
                    <select value={selectedTemplateId} onChange={handleTemplateChange}>
                      <option value="">Select Templates</option>
                      {filteredTemplates.map((template) => (
                        <option key={template.id} value={template.id}>
                          {template.template_name}
                        </option>
                      ))}
                    </select>


                    <div>

                    </div>
                  </div>
                  <div className='sublable'><label>Subject</label></div>
                  <div className='subinput'><input
                    value={subject}

                    placeholder="subject will populate automatically"
                  />
                  </div>
                  <div className='emailbodyc'>
                    <div className='emailBodyHead'>
                      <div><label>EMAIL BODY</label></div>
                      <div><button type="button" onClick={handleReplaceTokens}>
                        <span style={{ marginTop: "2px", marginRight: "7px" }}>
                          <FaWandMagicSparkles />
                        </span>
                        Replace Tokens
                      </button>
                      </div>

                    </div>
                    <div style={{ marginTop: "15px" }}><ReactQuill value={emailBody}
                      onChange={setEmailBody} /></div>
                      <div className='perxvid'><div><p>
                        Tokens <span>{" [[name_1]]"}</span> and <span>{" [[name_2]]"}</span> will be replaced with real names.</p></div>
                      <div><buttton className="previewButton" onClick={handlePreviewMode}>Preview mode</buttton></div></div>
                    <div className='senintobuttonnn'>
                      <button onClick={handleSendInroduction}>Send Introduction <span style={{ marginTop: "4px", marginLeft: "6px" }}><IoIosSend /></span></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default NewMakeIntroduction
