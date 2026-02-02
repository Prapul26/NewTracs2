import axios from 'axios';
import * as XLSX from "xlsx";

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoLogOut, IoPerson } from 'react-icons/io5';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { FaDownload, FaFileImport, FaHome, FaPlus } from 'react-icons/fa';
import { RiExportFill } from 'react-icons/ri';
import Sidebar2 from '../Sidebar/Sidebar2';
import { IoMdMenu } from 'react-icons/io';
import { AiFillQuestionCircle } from 'react-icons/ai';
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
        { icon: 'users', text: 'My Contacts', active: true },
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





// Single contact row
const ContactRow = ({ contact, onDelete, onEdit }) => (
  <tr className="divide-x divide-gray-200">
    <td className="px-6 py-4 whitespace-nowrap">{contact.lastName}</td>
    <td className="px-6 py-4 whitespace-nowrap">{contact.email}</td>
    <td className="px-6 py-4 whitespace-nowrap">{contact.groupName}</td>
    <td className="px-6 py-4 whitespace-nowrap">{contact.updatedOn}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      <button
        onClick={onEdit}
        className="text-indigo-600 hover:text-indigo-900 mr-4"
        aria-label="Edit contact"
      >
        <i className="fas fa-edit"></i>
      </button>
      <button
        onClick={onDelete}
        className="text-red-600 hover:text-red-900"
        aria-label="Delete contact"
      >
        <i className="fas fa-trash"></i>
      </button>
    </td>
  </tr>
);

// Add new contact form
const AddContactForm = ({ onSave, onCancel }) => {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    groupName: '',
  });



  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, groupName } = contact;

    if (!firstName || !lastName || !email) {
      setMessage("All fields are required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const token = sessionStorage.getItem("authToken");

      const response = await axios.post(
        `https://tracsdev.apttechsol.com/api/contact_store_form`,
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          group_name: groupName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Contact added successfully!");
      setContact({ firstName: "", lastName: "", email: "", groupName: "" });
      window.location.reload()
      // Notify parent component if needed


    } catch (error) {
      setMessage(error.response?.data?.message || "Error adding the contact.");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="bg-white p-6 rounded-lg shadow-lg mb-8 animate-fade-in-down">

      <h2 className="text-2xl font-bold mb-4">Add New Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name*</label>
            <input
              type="text"
              name="firstName"
              value={contact.firstName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name*</label>
            <input
              type="text"
              name="lastName"
              value={contact.lastName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email*</label>
            <input
              type="email"
              name="email"
              value={contact.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Group Name</label>
            <input
              type="text"
              name="groupName"
              value={contact.groupName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"

            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

//Edit Component
const EditContact = ({ contactToEdit, onSave2, onCancel2 }) => {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    groupName: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (contactToEdit) {
      setContact({
        firstName: contactToEdit.first_name || "",
        lastName: contactToEdit.last_name || "",
        email: contactToEdit.email || "",
        groupName: contactToEdit.group_name || "",
      });
    }
  }, [contactToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, groupName } = contact;

    if (!firstName || !lastName || !email) {
      setMessage("All fields are required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const token = sessionStorage.getItem("authToken");
      await axios.post(
        `https://tracsdev.apttechsol.com/api/contact_edit_form/${contactToEdit.id}`,
        {
          first_name: firstName,
          last_name: lastName,
          email,
          group_name: groupName,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Contact updated successfully!");
      onSave2();
    } catch (error) {
      setMessage(error.response?.data?.message || "Error updating contact.");
    } finally {
      setLoading(false);
    }
  };
  const requiredFields = ["firstName", "lastName", "email"];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4">Edit Contact</h2>

      {message && <p className="text-sm text-red-500 mb-2">{message}</p>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["firstName", "lastName", "email", "groupName"].map((field) => {
            const isRequired = requiredFields.includes(field);

            return (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                  {isRequired && <span className="text-red-500"> *</span>}
                </label>

                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={contact[field] || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required={isRequired}
                />
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel2}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>

  );
};


// Main Component
const MyContacts = () => {
  const initialContacts = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      groupName: 'Linkedin',
      updatedOn: '2023-10-26',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      groupName: 'Gmail',
      updatedOn: '2023-10-25',
    },
  ];

  const [contacts, setContacts] = useState(initialContacts);
  const [showForm, setShowForm] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "");
    setSelectedFile(file);
  };
  const handleSaveContact = (newContact) => {
    const updatedContact = {
      ...newContact,
      id: Date.now(),
      updatedOn: new Date().toISOString().split('T')[0],
    };
    setContacts((prev) => [updatedContact, ...prev]);
    setShowForm(false);
  };

  const handleDeleteContact = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setContacts((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleEditContact = (id) => {
    alert(`Editing contact ID: ${id}`);
  };
  const [contactss, setContactss] = useState([]);
  const [error, setError] = useState("");
  const [subtitle, settitle] = useState("")
  const fetchContacts = async () => {
    const token = sessionStorage.getItem("authToken");
    try {
      const response = await axios.get(
        `https://tracsdev.apttechsol.com/api/view-introduction-email-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setContactss(response.data.template.data);
      settitle(response.data?.helpnote?.find(item => item.id === 4)?.title);
    } catch (error) {
      setError("Failed to fetch contacts.");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);



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
  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("authToken");

    try {
      await axios.get(
        `https://tracsdev.apttechsol.com/api/destroy-contact-from-intro/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContactss((prev) => prev.filter((contact) => contact.id !== id));

    } catch (err) {
      console.error("Delete failed:", err);

    }
  };
  const [editingContact, setEditingContact] = useState(null);

  const [showEdit, setEdit] = useState(false);
  const handleEdit = (contact) => {
    setEditingContact(contact); // store contact details in state
    setEdit(true); // show edit form
  };
  const handleDownloadTemplate = () => {
    // Define the header row
    const headers = [["First Name", "Last Name", "Email", "Group Name"]];

    // Create a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(headers);

    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template");

    // Trigger download
    XLSX.writeFile(workbook, "contacts_template.xlsx");


  };
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImport = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const token = sessionStorage.getItem("authToken");

    const reader = new FileReader();

    reader.onload = async (evt) => {
      const fileExt = selectedFile.name.split(".").pop().toLowerCase();
      let data = evt.target.result;
      let workbook;

      if (fileExt === "csv") {
        workbook = XLSX.read(data, { type: "string" });
      } else {
        workbook = XLSX.read(data, { type: "binary" });
      }

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      if (!rows.length) {
        alert("No data found in file.");
        return;
      }

      let imported = 0;
      let skipped = 0;
      let failed = 0;
      let duplicates = 0;

      const existingEmails = new Set(contacts.map(c => c.email?.toLowerCase()));

      for (let row of rows) {
        const firstName = row["First Name"];
        const lastName = row["Last Name"];
        const email = row["Email"];
        const groupName = row["Group Name"];

        if (!firstName || !lastName || !email || !groupName) {
          skipped++;
          continue;
        }

        if (existingEmails.has(email.toLowerCase())) {
          duplicates++;
          continue;
        }

        try {
          await axios.post(
            `https://tracsdev.apttechsol.com/api/contact_store_form`,
            {
              first_name: firstName,
              last_name: lastName,
              email,
              group_name: groupName,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          imported++;
          existingEmails.add(email.toLowerCase());
        } catch (err) {
          console.error("Failed row:", row, err.response?.data);
          failed++;
        }
      }

      alert(
        `✅ Imported: ${imported}\n⚠ Duplicates: ${duplicates}\n⚠ Skipped: ${skipped}\n❌ Failed: ${failed}`
      );

      fetchContacts(); // ✅ Refresh table
    };

    // ✅ Detect correct reader type
    if (selectedFile.name.endsWith(".csv")) {
      reader.readAsText(selectedFile);
    } else {
      reader.readAsBinaryString(selectedFile);
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

  const [showSideNav, setSideNav] = useState(false);
  const [hoverData2, setHoverData2] = useState(false);
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

    <div style={{ display: "flex", height: "100vh", overflowY: "auto" }} className='md:h-[100vh] h-[100vh]'>
      <div className="hidden lg:block fixed w-[17%]"><Sidebar2 /></div>{showSideNav && <div ><Sidebar2 /></div>}
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
          <header className="mb-8">
            <div className="MessageIntroButt">
              <div><h2 className='intoHeading' style={{ color: "#334e6f" }}>My Contacts</h2>
                <p className='IntroPara'>{subtitle}
                </p></div>

            </div>
            <div className="flex flex-wrap items-center gap-4">

              <div className='flex'><button className="bg-#F59E0B-600 hover:bg-#F59E0B-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 flex" onClick={handleDownloadTemplate} style={{ background: "#F59E0B " }}>
                <div><FaDownload /></div><i className="fas fa-download mr-2"></i>Download Template
              </button>
                <div style={{ marginLeft: "10px", marginTop: '10px' }}><AiFillQuestionCircle color='blue' onMouseEnter={(e) => setHoverData2(true)} onMouseLeave={(e) => setHoverData2(false)} />{hoverData2 && <div className="tooltip-boxd0=7y" >
                  Download the contact import Template hereh
                </div>}</div>
              </div>
              <div className="relative">
                <input type="file" id="file-upload" className="hidden" accept=".xlsx, .xls" onChange={handleFileChange} />
                <label
                  htmlFor="file-upload"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer"
                >
                  <i className={`fas ${fileName ? 'fa-check-circle' : 'fa-upload'} mr-2`}></i>
                  {fileName || 'Choose File'}
                </label>
              </div>
              <button onClick={handleImport} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105" style={{ background: "#2563EB" }}>
                <div style={{ marginTop: "0px" }}><RiExportFill size={20} /></div><i className="fas fa-file-import mr-2"></i>Import
              </button>
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 ml-auto flex"
              >
                <div style={{ marginTop: "3px" }}><FaPlus /></div>
                <i className={`fas ${showForm ? 'fa-minus-circle' : 'fa-plus-circle'} mr-2`}></i>
                {showForm ? 'Hide Form' : 'Add Contact'}
              </button>
            </div>
          </header>

          {showForm && <AddContactForm onSave={handleSaveContact} onCancel={() => setShowForm(false)} />}
          {showEdit && (
            <EditContact
              contactToEdit={editingContact}
              onCancel2={() => setEdit(false)}
              onSave2={() => {
                setEdit(false);
                fetchContacts(); // refresh list after saving
              }}
            />
          )}

          <main className="bg-white rounded-lg shadow-lg overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['First Name', 'Last Name', 'Email', 'Group Name', 'Updated On', 'Action'].map(
                    (header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {contactss.length > 0 ? (
                  contactss.map((contact) => (
                    <tr key={contact.id} className="divide-x divide-gray-200">
                      <td className="px-6 py-4 whitespace-nowrap">{contact.first_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{contact.last_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{contact.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{contact.group_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(contact.created_at).toLocaleString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",

                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex">
                        <div onClick={() => handleEdit(contact)}><MdModeEdit size={22} color='green' style={{ marginRight: "10px" }} /></div>
                        <div onClick={() => handleDelete(contact.id)}><MdDelete size={22} color='red' /></div>



                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-500">
                      No contacts found. Add one!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </main>
        </div>
      </div>

    </div>
  );
};

export default MyContacts;
