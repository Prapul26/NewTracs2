import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaHome } from 'react-icons/fa';
import { IoLogOut, IoPerson, IoSearchSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar2 from '../Sidebar/Sidebar2';
import { IoIosSend, IoMdArrowDropdownCircle, IoMdMenu } from 'react-icons/io';
import "./NewMakeIntroduction.css"
import { MdPersonAddAlt1 } from 'react-icons/md';
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

  const handleFirstPersonSelect = (e) => {
    const value = e.target.value;

    if (!value) {
      setFirstPersonDetails(null);
      return;
    }

    const selectedMember = {
      name: value === "1" ? "John Doe" : "Alice Smith",
      email: value === "1" ? "john@email.com" : "alice@email.com",
      type: "Member"
    };

    setFirstPersonDetails(selectedMember);
  };

  const handleSecondPersonSelect = (e) => {
    const value = e.target.value;

    if (!value) {
      setSecondPersonDetails(null);
      return;
    }

    const selectedMember = {
      name: value === "1" ? "David Miller" : "Emma Watson",
      email: value === "1" ? "david@email.com" : "emma@email.com",
      type: "Member"
    };

    setSecondPersonDetails(selectedMember);
  };
  useEffect(() => {
    if (showContactsForm) {
      setFirstPersonDetails(null);
      setSecondPersonDetails(null);
    }
  }, [showContactsForm]);

  const [firstSelected, setFirstSelected] = useState(true);
  const [seconsdSelected, setSecondSelected] = useState(true);
  const templates = [
    {
      id: 1,
      name: "Introduction Template",
      body: `
      <p>Hi {{recipient_name}},</p>
      <p>I would like to introduce you to {{contact_name}}.</p>
      <p>{{contact_name}} is a professional in {{industry}}.</p>
      <p>Hope this helps you connect.</p>
      <p>Best Regards,<br/>{{sender_name}}</p>
    `
    },
    {
      id: 2,
      name: "Follow Up Template",
      body: `
      <p>Hello {{recipient_name}},</p>
      <p>Just checking in regarding the introduction.</p>
      <p>Please let me know if you connected.</p>
      <p>Thanks,<br/>{{sender_name}}</p>
    `
    }
  ];
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const handleTemplateChange = (e) => {
    const id = e.target.value;
    setSelectedTemplateId(id);

    const selected = templates.find(
      (template) => template.id.toString() === id
    );

    if (selected) {
      setEmailBody(selected.body);
    }
  };

  return (

    <div>
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
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
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

              <div className="bg-white p-2 rounded-2xl shadow-lg md:p-8">
                {/* Main Content Area */}
                <div className="gap-8">

                  <div className="selectionBoxes2">
                    <div className='selectionbox1'>
                      { }
                      <div className='peronaa'>
                        <div style={{ background: "rgb(79, 70, 229)", width: "30px", textAlign: "center", height: "30px", borderRadius: "50%" }}><h3 style={{ color: "white" }}>1</h3></div>
                        <div style={{ marginLeft: "20px" }}><h2>First Person</h2></div>
                      </div>
                      <label style={{ marginTop: "10px" }}>Member Type</label><br />
                      <select onChange={handleFirstPersonSelect}>
                        <option value="">Select Member</option>
                        <option value="1">John Doe</option>
                        <option value="2">Alice Smith</option>
                      </select>

                      <br />
                      <label >Search Contact</label><br />
                      <div className='searchContactkk'>
                        <div style={{ marginTop: "3.5px", marginRight: "9px" }}><IoSearchSharp /></div><div><input placeholder='Name or email' /></div>
                      </div>

                      {firstPersonDetails && (
                        <div className='cardInfooContainer'>
                          <div className='cardInfoo' >
                            <div className='cardnamepic'>
                              <div className='cdpic'>
                                {firstPersonDetails.name?.charAt(0)}
                              </div>
                              <div style={{ marginLeft: "10px" }}>
                                <h3>{firstPersonDetails.name}</h3>
                                <p>{firstPersonDetails.email}</p>


                              </div>
                            </div>
                            <div >
                              <p className='cardmemcc'>{firstPersonDetails.type}</p>
                            </div>
                          </div>
                        </div>
                      )}


                    </div>
                    <div className='selectionbox2'>
                      <div className='peronaa'>
                        <div style={{ background: "rgb(79, 70, 229)", width: "30px", textAlign: "center", height: "30px", borderRadius: "50%" }}><h3 style={{ color: "white" }}>2</h3></div>
                        <div style={{ marginLeft: "20px" }}><h2>Second Person</h2></div>

                      </div>
                      <label style={{ marginTop: "10px" }}>Member Type</label><br />
                      <select onChange={handleSecondPersonSelect}>
                        <option value="">Select Member</option>
                        <option value="1">David Miller</option>
                        <option value="2">Emma Watson</option>
                      </select>
                      <br />
                      <label >Search Contact</label><br />
                      <div className='searchContactkk'>
                        <div style={{ marginTop: "3.5px", marginRight: "9px" }}><IoSearchSharp /></div><div><input placeholder='Name or email' /></div>
                      </div>
                      {secondPersonDetails && (
                        <div className='cardInfooContainer'>
                          <div className='cardInfoo'>
                            <div className='cardnamepic'>
                              <div className='cdpic'>
                                <span style={{marginTop:"6px"}}>{secondPersonDetails.name?.charAt(0)}</span>
                              </div>
                              <div style={{ marginLeft: "10px" }}>
                                <h3>{secondPersonDetails.name}</h3>
                                <p>{secondPersonDetails.email}</p>
                              </div>
                            </div>
                            <div>
                              <p className='cardmemcc'>{secondPersonDetails.type}</p>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                </div>
              </div>
              <div className="bg-white p-2 rounded-2xl shadow-lg mt-8 md:p-8">
                <div className="gap-8">
                  <div className='draftHeading'>
                    <div style={{ background: "rgb(79, 70, 229)", width: "30px", textAlign: "center", height: "30px", borderRadius: "50%" }}><h3 style={{ color: "white" }}>3</h3></div>
                    <div style={{ marginLeft: "20px" }}><h2>Draft Introduction</h2></div>
                  </div>
                  <div className='templatesSelection'>
                    <div className='templatesno'>
                      <div><input type='checkbox' /><span style={{ marginLeft: "8px", fontWeight: "600" }}>System Templates</span></div>
                      <div style={{ marginLeft: "25px" }}><input type='checkbox' /><span style={{ marginLeft: "8px", fontWeight: "600" }}>My Templates</span></div>
                    </div>
                    <select value={selectedTemplateId} onChange={handleTemplateChange}>
                      <option value="">Select Templates</option>
                      {templates.map((template) => (
                        <option key={template.id} value={template.id}>{template.name}</option>
                      ))}
                    </select>

                    <div>

                    </div>
                  </div>
                  <div className='sublable'><label>Subject</label></div>
                  <div className='subinput'><input placeholder='subject will populate automatically' /></div>
                  <div className='emailbodyc'>
                    <div className='emailBodyHead'>
                      <div><label>EMAIL BODY</label></div>
                      <div><button><span style={{ marginTop: "2px", marginRight: "7px" }}><FaWandMagicSparkles /></span>Replace Tokens</button></div>

                    </div>
                    <div style={{ marginTop: "20px" }}><ReactQuill value={emailBody}
                      onChange={setEmailBody} /></div>
                    <div className='senintobuttonnn'>
                      <button>Send Introduction <span style={{ marginTop: "4px", marginLeft: "6px" }}><IoIosSend /></span></button>
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
