import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaHome, FaPlus } from 'react-icons/fa';
import { IoLogOut, IoPerson } from 'react-icons/io5';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar2 from '../Sidebar/Sidebar2';

// --- Main App Component ---
export default function EmailTemplate() {
  // State to manage which view is currently visible ('list' or 'add')
  const [view, setView] = useState('list');
  const [editTemplate, setEditTemplate] = useState(null);
  // State to hold the list of email templates
  const [templates, setTemplates] = useState([

  ]);
  useEffect(() => {
    let isCalled = false;
    const fetchTemplates = async () => {
      if (isCalled) return;
      isCalled = true;

      const token = sessionStorage.getItem("authToken");
      try {
        const response = await axios.get(`https://tracsdev.apttechsol.com/api/view-template-list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedTemplates = response.data.templates.data;
        setTemplates(fetchedTemplates);

        const initialStatuses = {};
        fetchedTemplates.forEach((template) => {
          initialStatuses[template.id] = template.status === "1";
        });

      } catch (err) {
        console.log(err.response?.data?.message || "Failed to fetch templates.");
      }
    };

    fetchTemplates();
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

      setImagePreview(`https://tracsdev.apttechsol.com/public/${data.user.image}`);


    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);


  // Function to toggle the status of a template
  // Function to toggle the status of a template
  const handleStatusToggle = (id) => {
    setTemplates((prevTemplates) =>
      prevTemplates.map((template) =>
        template.id === id
          ? {
            ...template,
            status: template.status === "1" ? "0" : "1", // toggle between "1" and "0"
          }
          : template
      )
    );
  };

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("authToken");

    try {
      await axios.get(
        `https://tracsdev.apttechsol.com/api/destroy-template/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedTemplates = templates.filter((template) => template.id !== id);
      setTemplates(updatedTemplates);


    } catch (err) {
      console.error("Delete failed:", err);


    }
  };
  const handleEditTemplate = (template) => {
    setEditTemplate(template);
    setView("edit");
  };

  // Function to handle form submission (for now, it just logs to console and switches view)
  const handleAddTemplate = (e) => {
    e.preventDefault();
    // In a real app, you would process form data here
    console.log("New template saved!");
    setView('list'); // Switch back to the list view
  };
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
          { icon: 'mail', text: 'Email Templates', active: true },
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
   const [showSideNav,setSideNav]=useState(true);
  return (
    <div style={{ display: 'flex' }}>{showSideNav &&<div><Sidebar2 /></div>}
      <div className="bg-gray-50 text-gray-800 font-sans" style={{ width: "100%" }}>
        <header className="bg-white shadow-sm flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <button onClick={()=>setSideNav((prev)=>!prev)} className="text-gray-600 lg:hidden">
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
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          {view === 'list' ? (
            <TemplateListView
              templates={templates}
              onAddNew={() => setView('add')}
              onStatusToggle={handleStatusToggle}
              onDelete={handleDelete}
              onEdit={handleEditTemplate}
            />
          ) : view === 'add' ? (
            <AddTemplateFormView
              onBack={() => setView('list')}
              onCancel={() => setView('list')}
            />
          ) : (
            <EditTemplateFormView
              template={editTemplate}          // 👈 Pass data here
              onBack={() => setView('list')}
              onCancel={() => setView('list')}
            />
          )}

        </div>
      </div></div>
  );
}

// --- Template List View Component ---
const TemplateListView = ({ templates, onAddNew, onStatusToggle, onDelete, onEdit }) => {

  return (
    <div>
      <div className="MessageIntroButt">
        <div><h1 style={{ color: "#334e6f" }}>Email Templates</h1>
          <p>Use templates to create and access customizable introduction emails. Send consistent, trust-building messages using your own or the app provided templates..
</p></div>

      </div>
      <div style={{ marginBottom: "20px",float:"right",display:"flex" }}>            <div className='makeIntoButton'> <button onClick={onAddNew}><div style={{ marginRight: "10px", marginTop: "3px" }}><FaPlus color='white' /></div>Add Email Template</button></div></div>
      <div className="bg-white p-6 rounded-xl shadow-md animate-fade-in mt-[90px]">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">

        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Body</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated On</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {templates.map(template => (
                <tr key={template.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{template.template_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{template.category_id === "5" ? "Reply-Email" : template.category_id === "1" ? "Introduction-Email" : template.category_id === "2" ? "Bump" : template.category_id === "3" ? "Follow-up" : template.category_id === "4" ? "Member-Email" : template.category_id?.toString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs" dangerouslySetInnerHTML={{ __html: template.email_body }}></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(() => {
                    const diffMs = Date.now() - new Date(template.created_at).getTime();
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
                  })()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        onClick={() => onStatusToggle(template.id)}
                        className={`cursor-pointer px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${template.status === "1"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                          }`}
                      >
                        {template.status === "1" ? "Active" : "Inactive"}
                      </span>
                    </td>

                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex mt-4">
                    <a href="#" className="text-green-600 hover:text-blue-900" onClick={() => onEdit(template)} ><MdModeEdit size={25} /></a>
                    <a href="#" className="text-red-600 hover:text-red-900 ml-4" onClick={() => onDelete(template.id)}><MdDelete size={25} /></a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div></div>
  );
};


// --- Add Template Form View Component ---
const AddTemplateFormView = ({ onBack, onCancel, onSubmit }) => {
  const [adminTemplates, setAdminTemplates] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [adminTemplate, setAdminTemplate] = useState("");

  useEffect(() => {
    const fetchAdminTemplates = async () => {
      const token = sessionStorage.getItem("authToken");
      try {
        const response = await axios.get(
          "https://tracsdev.apttechsol.com/api/create-template",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAdminTemplates(response.data.admintemplates || []);
      } catch (err) {
        console.error("Error fetching admin templates:", err);
      }
    };

    fetchAdminTemplates();
  }, []);

  // ✅ FIXED async handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !description || !adminTemplate) {
      alert("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category_id", category);
    formData.append("admin_template_id", adminTemplate);
    formData.append("description", description);

    const token = sessionStorage.getItem("authToken");

    try {
      const response = await axios.post(
        "https://tracsdev.apttechsol.com/api/store-template",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message || "Template added successfully!");
      onBack(); // Go back to the list view after success
      window.location.reload()
    } catch (error) {
      console.log(error.response?.data?.message || "Error adding the Template");
      alert("Error adding the Template");
    }
  };


  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New Template</h1>
        <button
          onClick={onBack}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          &larr; Back to list
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., Welcome Email"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select a category</option>
              <option value="1">Introduction-Email</option>
              <option value="2">Bump</option>
              <option value="3">Follow Up</option>
              <option value="4">Member-Email</option>
              <option value="5">Reply-Email</option>
            </select>
          </div>

          {/* Admin Templates */}
          <div>
            <label
              htmlFor="admin-templates"
              className="block text-sm font-medium text-gray-700"
            >
              Admin Templates <span className="text-red-500">*</span>
            </label>
            <select
              id="admin-templates"
              value={adminTemplate}
              onChange={(e) => {
                const selectedId = e.target.value;
                setAdminTemplate(selectedId);
                const selectedTemplate = adminTemplates.find(
                  (t) => t.id === parseInt(selectedId)
                );
                if (selectedTemplate) {
                  setDescription(selectedTemplate.email_body);
                }
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select an Admin Template</option>
              {adminTemplates.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.template_name}
                </option>
              ))}
            </select>
          </div>

          {/* Email Body */}
          <div>
            <label
              htmlFor="email-body"
              className="block text-sm font-medium text-gray-700"
            >
              Email Body <span className="text-red-500">*</span>
            </label>
            <textarea
              id="email-body"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="10"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your email content here"
              required
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Save Template
          </button>
        </div>
      </form>
    </div>
  );
};
//Edit Template




const EditTemplateFormView = ({ template, onBack, onCancel }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [adminTemplate, setAdminTemplate] = useState("");
  const [adminTemplates, setAdminTemplates] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Convert template.id to base64
  const base64Id = btoa(template?.id);
  const cleanHTML = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]+>/g, ""); // removes all HTML tags
  };
  useEffect(() => {
    let isCalled = false;

    const fetchTemplateById = async () => {
      if (isCalled || !base64Id) return;
      isCalled = true;

      const token = "Bearer 36|NUtJgD15eoKNZnQXYgYo5G3cbQdZe2PdeHD16Yy1";

      try {
        // ✅ Fetch selected template details
        const response = await axios.get(
          `https://tracsdev.apttechsol.com/api/edit-template/${base64Id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const data = response.data?.template;
        if (data) {
          setTitle(data.template_name || "");
          setCategory(data.category_id?.toString() || "");
          setDescription(cleanHTML(data.email_body || ""));

        }
      } catch (err) {
        console.error("Error fetching template:", err);
        setMessage(err.response?.data?.message || "Failed to fetch template.");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplateById();
  }, [base64Id]);
  useEffect(() => {
    const fetchTemplates = async () => {
      const token = "Bearer 36|NUtJgD15eoKNZnQXYgYo5G3cbQdZe2PdeHD16Yy1";

      try {
        const response = await axios.get(
          "https://tracsdev.apttechsol.com/api/create-template",
          {
            headers: { Authorization: token },
          }
        );

        const templates = response.data?.admintemplates || [];
        setAdminTemplates(templates);

        console.log("Fetched Admin Templates:", templates);
      } catch (err) {
        console.error("Error fetching admin templates:", err);
      }
    };

    fetchTemplates();
  }, []);
  // ✅ Fetch all admin templates for dropdown
  useEffect(() => {
    const fetchAdminTemplates = async () => {
      const token = "Bearer 36|NUtJgD15eoKNZnQXYgYo5G3cbQdZe2PdeHD16Yy1";

      try {
        const response = await axios.get(
          "https://tracsdev.apttechsol.com/api/admin-template-list",
          {
            headers: { Authorization: token },
          }
        );

        if (response.data?.adminTemplates) {
          setAdminTemplates(response.data.adminTemplates);
        }
      } catch (err) {
        console.error("Error fetching admin templates:", err);
      }
    };

    fetchAdminTemplates();
  }, []);

  // ✅ Handle update submit
  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = "Bearer 36|NUtJgD15eoKNZnQXYgYo5G3cbQdZe2PdeHD16Yy1";

    try {
      const response = await axios.post(
        "https://tracsdev.apttechsol.com/api/store-template",
        {
          title: title,
          category_id: category,
          description: description,
          id: atob(base64Id), // decoded ID for update
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Template updated successfully!");
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update template.");

    }
  };


  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Fetching template details...
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Edit Email Template</h2>

      {message && <div className="text-red-500 mb-3">{message}</div>}

      <form onSubmit={handleSubmit}>
        {/* Template Title */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Template Title</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter template title"
          />
        </div>

        {/* ✅ Category Dropdown */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Category</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="1">Introduction-Email</option>
            <option value="2">Bump</option>
            <option value="3">Follow Up</option>
            <option value="4">Member-Email</option>
            <option value="5">Reply-Email</option>
          </select>
        </div>

        {/* ✅ Admin Template Dropdown */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Admin Templates</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={adminTemplate}
            onChange={(e) => {
              const selectedValue = e.target.value;
              setAdminTemplate(selectedValue);

              const selectedTemplate = adminTemplates.find(
                (item) => item.id === parseInt(selectedValue)
              );

              if (selectedTemplate) {
                setDescription(selectedTemplate.email_body);
              }
            }}
          >
            <option value="">Select an Admin Template</option>
            {adminTemplates.map((item) => (
              <option key={item.id} value={item.id}>
                {item.template_name}
              </option>
            ))}
          </select>
        </div>

        {/* Email Body */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Email Body</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows="6"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter email body"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Template
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};


