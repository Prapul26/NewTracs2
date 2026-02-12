
import React from 'react'
import { useState, useEffect } from 'react';
import '../../App.css';
import "./MakeIntroduction.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoLogOut, IoMail, IoPerson } from 'react-icons/io5';
import { FaHome, FaPlus } from 'react-icons/fa';
import { TiArrowBack } from "react-icons/ti";
import { BsBriefcaseFill } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import Sidebar2 from '../Sidebar/Sidebar2';
import { IoMdArrowDropdownCircle, IoMdMenu } from 'react-icons/io';
import { AiFillQuestionCircle } from 'react-icons/ai';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const MakeIntroduction = () => {

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

  }
  // State for member directory filter
  const [recepientType, setRecipientType] = useState("h7_members");

  const [directoryFilter, setDirectoryFilter] = useState('All');
  // State for member search query
  const [searchText, setSearchText] = useState("");

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

  const [msg, setMsg] = useState("")
  const [validationError, setValidationError] = useState("");
  const [message, setMessage] = useState("");
  const [signature] = useState(true);

  const [subject, setSubject] = useState("");
  const [availableTokens, setAvailableTokens] = useState([]);
  const [adminTemplates, setAdminTemplates] = useState(true)
  const [myTemplates, setMyTemplates] = useState(true)
  const extractTokens = (text = "") => {
    const regex = /\[\[[^\]]+\]\]/g;
    const matches = text.match(regex);
    return matches ? [...new Set(matches)] : []; // remove duplicates
  };
  const cleanQuillHtml = (html) => {
    if (!html) return "";

    // Replace multiple empty paragraphs with a single <p>&nbsp;</p>
    let cleaned = html.replace(/<p>(\s|&nbsp;)*<\/p>/gi, "<p>&nbsp;</p>");

    // Ensure double <br> for extra gaps
    cleaned = cleaned.replace(/(<br\s*\/?>){2,}/gi, "<br><br>");

    return cleaned.trim();
  };
  const convertTextToHtmlWithGaps = (text) => {
    return text
      .split(/\n+/)
      .map(line => line.trim() ? `<p>${line}</p>` : `<p>&nbsp;</p>`)
      .join("");
  };


  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
  ];

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
      const plainText = stripHtml(template.email_body);
      const finalBody = appendSignatureIfNeeded(plainText);

      setEmailBody(finalBody);
      setMessage(finalBody);
      setGGText(template.email_body);
    } else {
      setEmailBody("");
      setMessage("");
      setGGText("");
    }
  };


  // Toggle template modal
  const toggleTemplateModal = () => {

  };
  const adjustInternalHtml = (html) => {
    const container = document.createElement("div");
    container.innerHTML = html;
    return container.innerHTML;
  };
  function stripHtml(html) {
    if (!html) return "";

    // 1️⃣ Decode escaped HTML (&lt;, &gt;, &quot;, etc.)
    const textarea = document.createElement("textarea");
    textarea.innerHTML = html;
    let decoded = textarea.value;

    // 2️⃣ Remove Word/Office junk styles
    decoded = decoded.replace(/style="[^"]*"/gi, "");

    // 3️⃣ Convert <br> and </p> to line breaks
    decoded = decoded
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n");

    // 4️⃣ Strip remaining HTML tags
    const div = document.createElement("div");
    div.innerHTML = decoded;

    return div.textContent || div.innerText || "";
  }


  // Initialize component
  useEffect(() => {
    // Load members and templates from API in a real app
    setTemplates(templateOptions);
    filterMembers();
  }, []);

  // Re-filter members when directory or search changes
  useEffect(() => {
    filterMembers();
  }, [directoryFilter, searchText]);


  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [name, setName] = useState("")
  const [contacts, setContacts] = useState([])
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
        console.log("tracsMembers", data.userslist?.member_type === "1")
        console.log(response.data);

      } catch (err) {
        console.log(err.response?.data?.message || "Something went wrong.");
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

  useEffect(() => {
    if (selectedMembers.length > 0 && data?.userInfo?.name) {
      const businessNames = selectedMembers
        .map((user) => user.name)
        .filter(Boolean)
        .join("  &  ");

      const userName = data.userInfo.name;

      setSubject(`Intro : ${userName} <> ${businessNames}`);
    } else {
      setSubject("");
    }
  }, [selectedMembers, data?.userInfo]);
  const handleSendIntroduction = async () => {
  if (selectedMembers.length === 0) {
    setValidationError("Please select at least one member before sending.");
    setShowSelectionError(true);
    return;
  }

  if (!subject?.trim() || !emailBody?.trim()) {
    setValidationError("Subject and message body are required.");
    return;
  }

  if (!recepientType) {
    alert("Recipient type is missing.");
    return;
  }

  try {
    const token = sessionStorage.getItem("authToken");

    const formData = new FormData();

    formData.append("subject", subject);
    formData.append("message", convertTextToHtmlWithGaps(emailBody));
    formData.append("template_id", selectedTemplate || "");
    formData.append(
      "signature",
      signature ? data?.signature?.name || "" : ""
    );

    // ✅ Filter valid members
    const validMembers = selectedMembers.filter(
      (user) => user?.email
    );

    if (validMembers.length === 0) {
      alert("No valid recipients found.");
      return;
    }

    validMembers.forEach((user) => {
      formData.append("mail_id[]", user.email);
      formData.append("mail_type[]", recepientType);
    });

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
      setSelectedMembers([]);
      setEmailBody("");
      setSubject("");
      setSelectedTemplate("");
      navigate("/dashboard");
    } else {
      alert("⚠️ Failed to send introduction.");
    }
  } catch (error) {
    console.error("❌ Error:", error);
    alert(error.response?.data?.message || "Something went wrong.");
  }
};

  const [tracsMembers, setTracsMembers] = useState([]);
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
  const isMemberSelected = (memberId) => {
    return selectedMembers.some((m) => m.id === memberId);
  };
  const sourceUsers =
    recepientType === "contacts"
      ? contacts
      : recepientType === "tracs_members"
        ? tracsMembers
        : data?.userslist || [];

  const filteredUsers = sourceUsers.filter((user) => {
    const search = searchText.toLowerCase();

    const searchMatch =
      user.name?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search) ||
      user.listings?.[0]?.title?.toLowerCase().includes(search);

    if (!recepientType) return searchMatch;

    const typeMatch =
      (recepientType === "h7_members" && user.member_type === "1") ||
      (recepientType === "tracs_members" && user.member_type === "2") ||
      (recepientType === "contacts" && user.member_type === "3");

    return searchMatch && typeMatch;
  });

  const appendSignatureIfNeeded = (html) => {
    if (!html) return html;

    let signatureHtml = "";

    // 1️⃣ Prefer saved signature (HTML)
    if (data?.signature?.name) {
      signatureHtml = `${data.signature.name}`;
    }

    // 2️⃣ Fallback to user info
    else if (data?.userInfo) {
      const parts = [
        data.userInfo.name,
        data.userInfo.email,
        data.userInfo.phone,
      ].filter(Boolean);

      if (parts.length) {
        signatureHtml = `<br/><br/>${parts.join("<br/>")}`;
      }
    }

    // 3️⃣ No signature → return original
    if (!signatureHtml) return html;

    // 4️⃣ Prevent duplicate signature
    if (html.includes(signatureHtml.replace(/<br\/?>/g, ""))) {
      return html;
    }

    // 5️⃣ Append signature
    return html + signatureHtml;
  };



  const [addContacts, setAddContacts] = useState(false);
  const [contactForm, setContactForm] = useState(false)
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

        setContactForm(false);

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
  const [showSideNav, setSideNav] = useState(false);
  const handleBack = () => {
    navigate("/dashboard")
  }
  const filteredTemplates = (data.templates || []).filter((template) => {
    // My Templates unchecked → hide user_type = 1
    if (!myTemplates && template.user_type === "1") {
      return false;
    }

    // Admin Templates unchecked → hide admin_id = null
    if (!adminTemplates && template.admin_id === "4") {
      return false;
    }

    return true;
  });
  const [hoverData, setHoverData] = useState(false);
  const [hoverData2, setHoverData2] = useState(false);
  const [hoverData3, setHoverData3] = useState(false);


  const [open, setOpen] = useState(false);
  return (
    <div>
      {contactForm &&
        <div className='overlay'>
          <div className='contactsForm2'>

            <div className='contactsHeading'>
              <h3>Add New Contact</h3>
              <RxCross2 onClick={() => setContactForm(false)} />
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
                    onClick={() => setContactForm(false)}
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
        </div>
      }

      <div style={{ display: "flex", height: "100vh", overflowY: "auto" }} className='photosad'>
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

          <div className="bg-gray-100 m p-4 md:p-8 ml-0 md:ml-[17%] w-full md:w-[83%] h-[100vh]  overflow-y-auto md:overflow-y-visible ">

            <div className="max-w-1xl mx-auto">
              {/* Header */}
              <div className="MessageIntroButt">
                <div><h1 style={{ color: "#334e6f" }}>Make Introduction Page</h1>
                </div>
                <div className='inrodrop'>
                  <div className={`inrodrop1 ${open ? "open" : ""}`}>
                    <p className='IntroPara'>{subtitle}
                    </p>
                  </div>
                  <div className='inrodrop2' onClick={() => setOpen(!open)}><IoMdArrowDropdownCircle /></div>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 gap-6">
                {/* Left Column: Member Search and Selection */}
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg h-fit">

                  <div
                    className="bg-blue-600 hover:bg-blue-500"
                    style={{ padding: "8px 18px", color: "white", width: "70px", borderRadius: "15px" }}
                    onClick={handleBack}
                  >
                    <TiArrowBack size={30} />
                  </div>

                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 mt-4">
                    1. Select Members
                    <label className="block text-sm font-medium text-gray-700">
                      Choose 2 members from the directory
                    </label>
                  </h2>

                  {/* Member Directory Dropdown */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Members Directory
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={recepientType}
                      onChange={(e) => {
                        const value = e.target.value;
                        setRecipientType(value);

                        if (value === "contacts") {
                          setAddContacts(true);
                          fetchContacts();
                        } else if (value === "tracs_members") {
                          setAddContacts(false);

                          fetchTracsMembers();
                        } else {
                          setAddContacts(false);
                        }
                      }}
                    >
                      <option value="">Select Members</option>
                      <option value="h7_members">H7 Members</option>
                      <option value="tracs_members">TRACS Members</option>
                      <option value="contacts">My Contact</option>
                    </select>
                  </div>

                  {/* Member Search */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Search Members (Name, Email, Business)
                    </label>

                    <div className="inputIB">
                      <div className="addI">
                        <input
                          type="text"
                          placeholder="Type to search..."
                          className="w-full p-2 border border-gray-300 rounded-lg h-12"
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
                        />
                      </div>

                      {addContacts && (
                        <div className="addB">
                          <button
                            onClick={() => setContactForm(true)}
                            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded"
                          >
                            <FaPlus className="mr-2" />
                            Add Contacts
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Member Search Results */}
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Search Results{" "}
                      <span className="text-xs text-gray-500">
                        ({filteredUsers.length})
                      </span>
                    </p>

                    <div className="border border-gray-200 rounded-lg p-2 max-h-64 overflow-y-auto">
                      {filteredUsers.map((member) => (
                        <div
                          key={member.id}
                          className="flex justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                          onClick={() => handleMemberSelect(member)}
                        >
                          {/* Left */}
                       <div className="flex items-center overflow-hidden">
                            <img
                              src={
                                member.image && member.image !== "null"
                                  ? `https://tracsdev.apttechsol.com/public/${member.image}`
                                  : "https://tracsdev.apttechsol.com/public/uploads/user_avatar.jpeg"
                              }
                              alt={member.name}
                              className="w-10 h-10 rounded-full mr-3 object-cover"
                            />
                            <div>
                                 <Link to={`/test?userId=${member.id}&memberType=${member.member_type}`}> <div className="font-medium">{member.name}</div></Link>
                              <div className="text-sm text-gray-500 flex items-center">
                                <IoMail className="mr-1" />
                                {member.email}
                              </div>
                              {member.listings?.[0]?.title && (
                                <div className="text-xs text-gray-400 flex items-center">
                                  <BsBriefcaseFill className="mr-1" />
                                  {member.listings[0].title}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Right */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // prevent parent click
                              if (!isMemberSelected(member.id)) {
                                handleMemberSelect(member);
                              }
                            }}
                            style={{
                              background: isMemberSelected(member.id) ? "green" : "#4f46e5",
                              padding: "4px 10px",
                              borderRadius: "12px",
                              color: "white",
                              height: "fit-content",
                              cursor: isMemberSelected(member.id) ? "default" : "pointer",
                            }}
                            disabled={isMemberSelected(member.id)}
                          >
                            {isMemberSelected(member.id) ? "Selected" : "Select"}
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

                              {/* Member Info */}
                              <div>
                                <div className="font-semibold text-gray-800 flex">{member.name}<span style={{ background: "white", marginLeft: "5px", padding: "2px 10px" }}>{
                                  member.member_type === "1"
                                    ? "H7"
                                    : member.member_type === "2"
                                      ? "Tracs"
                                      : member.member_type === "3"
                                        ? "Contacts"
                                        : ""
                                }
                                </span></div>
                                <div className="text-sm text-gray-500 flex"><div style={{ marginTop: "3px", marginRight: "4px" }}><IoMail /></div><div>{member.email}</div></div>
                                {member.listings?.[0]?.title && (
                                  <div className="text-xs text-gray-400 flex">
                                    <div style={{ marginTop: "3px", marginRight: "4px" }}><BsBriefcaseFill /></div><div>{member.listings[0].title}</div>
                                  </div>
                                )}                            </div>
                            </div>

                            {/* Remove Button */}
                            <button style={{ border: "1px solid red", padding: "1px 10px", borderRadius: "10px", fontSize: "20px" }}
                              className="text-red-500 hover:text-red-700 text-lg font-bold hover:bg-white"
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
                  <div style={{ display: "flex" }}>
                    <div> <button
                      id="interchangeBtn" style={{ background: "rgb(245, 158, 11)", fontWeight: "600", fontSize: "14px", padding: "8px 18px", color: "white", marginTop: "25px", borderRadius: "12px" }}

                      onClick={interchangeMembers}
                      disabled={selectedMembers.length !== 2}
                    >
                      Interchange
                    </button></div>
                    <div style={{ marginTop: "28px", marginLeft: "10px" }}><p className='prdasefed'>(Swap the selected individuals for the introduction)</p></div>
                  </div>


                </div>


                {/* Right Column: Email Composition */}
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                    2. Compose Email
                  </h2>

                  <div className='mikanfe'>
                    <div className='flex flex-col   w-fit whitespace-nowrap pr-4  border-r border-grey-900 mb-4'>

                      <div className="flex  space-x-2 ">
                        <input
                          type="checkbox"
                          checked={adminTemplates}
                          onChange={(e) => setAdminTemplates(e.target.checked)}
                        />
                        <span className="text-[18px] font-semibold">System Templates</span>

                        <div style={{ marginTop: "4px", marginLeft: "25px" }}><AiFillQuestionCircle color='blue' onMouseEnter={(e) => setHoverData(true)} onMouseLeave={(e) => setHoverData(false)} /> {hoverData && <div className="tooltip-boxd">
                          App provided template which are common for all users
                        </div>} </div>
                      </div>

                      <div className="flex  space-x-2 border-b border-gray-600 py-b-4">
                        <input
                          type="checkbox"
                          checked={myTemplates}
                          onChange={(e) => setMyTemplates(e.target.checked)}
                        />
                        <span className="text-[18px] font-semibold">My Templates</span>
                        <div style={{ marginLeft: "104px", marginTop: "4px" }}><AiFillQuestionCircle color='blue' onMouseEnter={(e) => setHoverData2(true)} onMouseLeave={(e) => setHoverData2(false)} />{hoverData2 && <div className="tooltip-boxd2" >
                          User-defined Template
                        </div>} </div>
                      </div>
                      <div style={{ display: "flex" }}>
                        <button
                          type="button"
                          className="w-max px-[18px] py-[8px] bg-blue-600 mt-4 text-white rounded hover:bg-blue-700"
                          onClick={() => {
                            if (selectedMembers.length < 2) {
                              alert("Please select two members to replace tokens.");
                              return;
                            }

                            let updatedHtml = ggText; // 🔥 IMPORTANT: use ORIGINAL template

                            selectedMembers.forEach((member, i) => {
                              const index = i + 1;

                              updatedHtml = updatedHtml
                                .replace(
                                  new RegExp(`\\[\\[name_${index}\\]\\]`, "gi"),
                                  member.name || ""
                                )
                                .replace(
                                  new RegExp(`\\[\\[email_${index}\\]\\]`, "gi"),
                                  member.email || ""
                                );
                            });

                            // Convert HTML → plain text AFTER replacement
                            const finalText = appendSignatureIfNeeded((updatedHtml));

                            setEmailBody(finalText);
                            setMessage(finalText);
                            setGGText(updatedHtml);
                          }}
                        >
                          Replace Tokens
                        </button><div style={{ marginLeft: "85px", marginTop: "24px" }}><AiFillQuestionCircle color='blue' size={19} /></div>
                      </div>

                    </div>
                    {/* Template Selection */}
                    <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 w-full gap-4 items-end ml-[-5px] md:ml-5">


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
                          className="w-full p-2 border border-gray-300 rounded-lg"
                          value={selectedTemplate}
                          onChange={(e) => {
                            const selected = e.target.value;
                            setSelectedTemplate(selected);

                            const selectedTemplateObj = data.templates?.find(
                              (t) => t.id === parseInt(selected)
                            );

                            if (selectedTemplateObj) {

                              const finalBody = appendSignatureIfNeeded(selectedTemplateObj.email_body)



                              // ✅ extract tokens from ORIGINAL template body
                              const tokens = extractTokens(selectedTemplateObj.email_body);
                              setAvailableTokens(tokens);

                              setEmailBody(finalBody);
                              setMessage(finalBody);
                              setGGText(selectedTemplateObj.email_body);
                            } else {
                              setEmailBody("");
                              setMessage("");
                              setGGText("");
                              setAvailableTokens([]); // clear tokens
                            }
                          }}
                        >

                          <option value="">Select Template</option>
                          {filteredTemplates.map((temp) => (
                            <option key={temp.id} value={temp.id}>
                              {temp.template_name}
                            </option>

                          ))}
                        </select>


                      </div>
                      <Link to="/emailTemplate" state={{ view: "add" }}><button
                        className="w-full sm:w-auto p-2  text-white font-medium rounded-lg hover:bg-green-600 transition"

                        style={{ background: "green" }}
                      >
                        + Create New Template
                      </button></Link>
                    </div>

                  </div>
                  {/* Subject */}
                  <div className="mt-4">
                    <label className="block text-m font-medium text-gray-700">Subject</label>

                    <input
                      className="mt-1 bg-green-50 border border-black pr-2 pl-2 pt-2 pb-2 w-full rounded"
                      placeholder="subject will populate automatically"
                      value={subject || "subject will populate automatically"}
                      onChange={(e) => setSubject(e.target.value)}
                      readOnly
                    />

                  </div>
                  {/* Message Body */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700">Message Body</label>
                    <ReactQuill
                      theme="snow"
                      value={emailBody}
                      onChange={(content) => {
                        setEmailBody(content);   // HTML content
                        setMessage(content);     // keep in sync if needed
                      }}
                      modules={{ toolbar: false }}
                      formats={quillFormats}
                      className="mt-2 bg-white"
                    />


                  </div>
                  {availableTokens.length > 0 && (
                    <div className="mt-2 text-sm text-gray-600">
                      <strong>Available Tokens:</strong>{" "}
                      {availableTokens.map((token, index) => (
                        <span key={index} className="mr-2 text-blue-600">
                          {token}
                        </span>
                      ))}
                    </div>
                  )}


                  {/* Replace Tokens Button */}
                  <div className="flex items-center justify-between mt-4">
                    <div></div>





                  </div>

                  <div className='dicvd2'>  <div><button id="but2" onClick={handleBack}>Cancel</button></div>
                    <div><button id="but1" onClick={handleSendIntroduction}>Send Introduction</button> </div>
                  </div>

                </div>





              </div>

            </div> {/* end of Right Column */}
          </div> {/* end of grid */}
        </div>
      </div>
    </div>

  )
}

export default MakeIntroduction
