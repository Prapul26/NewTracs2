import React, { useEffect, useState } from 'react'
import "./ReplyMessage.css"
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { IoLogOut, IoPerson } from 'react-icons/io5';
import { FaHome } from 'react-icons/fa';
import { useLocation } from "react-router-dom";
import { TiArrowBack } from 'react-icons/ti';
import Sidebar2 from '../Sidebar/Sidebar2';

const ReplyMessage = () => {
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
                    { icon: 'inbox', text: 'Introduction Messages', active: true, to: '/dashboard' },
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


    // Mock data - in a real app, this would come from an API


    // State for the message body
    const [messageBody, setMessageBody] = useState('');

    // State for the include signature checkbox
    const [includeSignature, setIncludeSignature] = useState(true);

    // State for the selected template
    const [selectedTemplate, setSelectedTemplate] = useState('');

    // State for the modal
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Mock data for recipients and templates
    const recipients = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
    ];

    const templates = [
        { id: 1, name: 'Follow-up', content: 'Hi [Name],\n\nI hope this message finds you well.\n\n[Your message here]\n\nBest regards,' },
        { id: 2, name: 'Thank You', content: 'Dear [Name],\n\nThank you for your message. We appreciate your time and effort.\n\nBest regards,' },
        { id: 3, name: 'Reminder', content: 'Hi [Name],\n\nThis is a friendly reminder about [topic].\n\nPlease let me know if you have any questions.\n\nBest regards,' }
    ];

    // Mock data for previous messages
    const previousMessages = [
        { id: 1, subject: 'Project Update', date: '2023-05-15', sender: 'Team Lead' },
        { id: 2, subject: 'Meeting Reminder', date: '2023-05-10', sender: 'HR Department' },
        { id: 3, subject: 'Document Review', date: '2023-05-05', sender: 'Project Manager' }
    ];

    // Function to handle template selection
    const cleanHTML = (html) => {
        if (!html) return "";
        return html.replace(/<[^>]+>/g, ""); // removes all HTML tags
    };
    const handleTemplateChange = (e) => {
        const templateId = parseInt(e.target.value);
        const template = template1.find(t => t.id === templateId);

        if (!template) return;

        const cleanBody = stripHtml(template.email_body);
        const cleanSignature = stripHtml(signature);

        let finalBody = cleanBody;

        // ✅ append signature if checkbox is checked
        if (includeSignature && cleanSignature) {
            finalBody = `${cleanBody}\n\n${cleanSignature}`;
        }

        setMessageBody(finalBody);
        setSelectedTemplate(templateId);
    };


    // Function to simulate sending a message


    // Function to simulate canceling
    const simulateCancel = () => {
        setMessageBody('');
        setSelectedTemplate('');
        setModalMessage('Message draft cleared.');
        setShowModal(true);
        navigate("/dashboard")
    };

    // Function to simulate creating a new template
    const simulateCreateTemplate = () => {
        setModalMessage('Template creation feature would be implemented here.');
        setShowModal(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setShowModal(false);
    };

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const [name, setName] = useState("")

    const [user2, setUser2] = useState("")
    const fetchProfile = async () => {
        try {
            const token = sessionStorage.getItem("authToken");
            const response = await axios.get("https://tracsdev.apttechsol.com/api/my-profile", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = response.data;

            setName(data.user.name || "");

            setImagePreview(`https://tracsdev.apttechsol.com/public/${data.user.image}`);
            console.log("user2:", response.data.user?.id)
            setUser2(response.data.user?.id)
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };
    useEffect(() => {
        fetchProfile();
    }, []);
    const { subject, user_id, replies_code } = useParams();
    const [data, setData] = useState("");
    const [sentMail, setSentMails] = useState([]);
    const [signature, setSignature] = useState([]);
    const [template1, setTemplate1] = useState([])
    const [recivesmails, setrecivedmails] = useState([]);
    const [selectedTemplateId] = useState(null);
    const [subject2, setSubject] = useState("");
    const [userId, setUserId] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            const token = sessionStorage.getItem("authToken");
            try {
                const response = await axios.get(
                    `https://tracsdev.apttechsol.com/api/view_user_inboxhistory_intro/${subject}/${user_id}/${replies_code}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setData(response.data);
                setSentMails(response.data.sentMails?.data || [])
                setrecivedmails()
                setSignature(cleanHTML(response.data.authsignature?.name));
                setTemplate1(response.data.normal_email_templates)
                setSubject(response.data.sentMailsfirst?.subject)
                setUserId(response.data.userInfo?.id)
                console.log("subject", response.data.sentMailsfirst?.subject)
                console.log("userId", response.data.userInfo?.id)

            } catch (err) {
                console.error("Error fetching inbox history:", err);
            }
        };
        fetchData();
    }, [subject, user_id, replies_code]);


    useEffect(() => {
        if (data.usersData && data.usersData.length > 0) {
            // collect all recipient emails
            const emails = data.usersData.map(user => user.email);
            setSelectedRecipientEmails(emails);
        }
    }, [data.usersData]);

    useEffect(() => {
        if (!signature) return;

        if (includeSignature) {
            if (!messageBody.includes(signature)) {
                setMessageBody(prev => prev + "\n\n" + signature);
            }
        } else {
            setMessageBody(prev => prev.replace(signature, "").trim());
        }
    }, [includeSignature, signature]);


    const stripHtmlTags = (html) => {
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    };




    const [selectedRecipientEmails, setSelectedRecipientEmails] = useState([]);

    const payload = {
        user_id: data.userInfo?.id,
        sent_mail_history_id: data.sentMailsfirst?.id,
        replies_code,
        temp_id: selectedTemplateId,
        subject: data.sentMailsfirst?.subject,
        selected_emails: selectedRecipientEmails,
        redirect_to: "https://tracsdev.apttechsol.com/user/view-inbox-list-from-intro",
        is_bump: data.sentMailsfirst?.is_bump,
        cc_mail_id: null,
        emails: selectedRecipientEmails,
        email_template: selectedTemplate,
        message: messageBody,
        files: null
    };

    const handleSendReply = async () => {
        const token = sessionStorage.getItem("authToken");
        try {

            if (!selectedRecipientEmails || selectedRecipientEmails.length === 0) {
        alert("Please select at least one recipient email before sending.");
        return; // ⛔ stop execution
    }
            const response = await axios.post(
                `https://tracsdev.apttechsol.com/api/sendReplyMailtomem_Api`,
                payload,
                { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
            );
            console.log("Mail Sent Successfully", response.data);
              alert("Mail Sent Successfully", response.data);
            console.log("payload",payload)

        } catch (error) {
            console.error("Error sending reply mail:",
                error.response?.data?.message || error.message
            );
            alert(error.response?.data?.message || error.message)
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
    const location = useLocation();

    const [showReplyComposer, setShowReplyComposer] = useState(
        false
    );
    useEffect(() => {
        if (location.state?.openComposer === true) {
            setShowReplyComposer(true);
        } else {
            setShowReplyComposer(false);
        }
    }, [location.state]);


    const stripHtml = (html = "") => {
        const div = document.createElement("div");
        div.innerHTML = html;

        // convert <br> and <p> to line breaks
        div.querySelectorAll("br").forEach(br => br.replaceWith("\n"));
        div.querySelectorAll("p").forEach(p => {
            p.insertAdjacentText("afterend", "\n");
        });

        return div.textContent.trim();
    };

const [showSideNav,setSideNav]=useState(true);

    return (
        <div style={{ display: "flex" }}>
           {showSideNav &&<div><Sidebar2 /></div>}
            <div style={{ width: "100%" }}>
                <header className="bg-white shadow-sm flex items-center justify-between p-4 border-b">
                    <div className="flex items-center">
                        <button  onClick={()=>setSideNav((prev)=>!prev)} className="text-gray-600 lg:hidden">
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
                                    <div style={{ marginTop: "2px", marginRight: "6px" }}><IoLogOut
                                    /></div>
                                    <div>    <p>Logout</p></div>

                                </div>
                            </div>}
                        </div>
                    </div>
                </header>

                <div className="p-4 md:p-8" style={{ width: "100%" }}>
                    <div className="max-w-1xl mx-auto">
                        <div className="MessageIntroButt">
                            <div><h1 style={{ color: "#334e6f" }}>Message Details</h1>
                                <p>Respond to and manage the introduction conversations </p></div>

                        </div>
                        <div className='bg-blue-600 hover:bg-blue-500 mb-4' style={{ padding: "8px 18px", color: "white", width: "70px", borderRadius: "15px" }} onClick={() => navigate(-1)}><TiArrowBack size={30} /></div>


                        {/* Single Column Layout (Reply Composer & History Stacked) */}
                        <div className="space-y-8">
                            {!showReplyComposer && (
                                <div className="flex justify-end mb-6">
                                    <button
                                        onClick={() => setShowReplyComposer(true)}
                                        className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition duration-200 shadow-lg"
                                    >
                                        Reply
                                    </button>
                                </div>
                            )}

                            {/* Reply Composer (Full Width) */}
                            {showReplyComposer && (
                                <div className="bg-white p-6 rounded-xl message-box-shadow">

                                    {/* 1. Selectable Recipients (Checkboxes) */}
                                    <div className="mb-6 pb-4 border-b">
                                        <p className="text-sm font-medium text-gray-700 mb-2">Select recipients (excluding yourself):</p>
                                        <div id="recipient-checkbox-container" className=" gap-x-6 gap-y-3">
                                            {data.usersData?.map(recipient => (
                                                <div key={recipient.id} className="flex items-center">
                                                    <input
                                                        id={`recipient-${recipient.id}`}
                                                        type="checkbox"
                                                        checked={selectedRecipientEmails.includes(recipient.email)}
                                                        onChange={(e) => {
                                                            const checked = e.target.checked;
                                                            setSelectedRecipientEmails(prev =>
                                                                checked
                                                                    ? [...prev, recipient.email]
                                                                    : prev.filter(email => email !== recipient.email)
                                                            );
                                                        }}
                                                    />

                                                    <label
                                                        htmlFor={`recipient-${recipient.id}`}
                                                        className="ml-2 text-sm text-gray-700 cursor-pointer"
                                                    >
                                                        {recipient.email}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>

                                    </div>

                                    {/* 2. Email Template Selection & Creation */}
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 space-y-3 md:space-y-0">
                                        <label htmlFor="template-select" className="text-sm font-medium text-gray-700 w-full md:w-auto">Select Template:</label>
                                        <select
                                            id="template-select"
                                            value={selectedTemplate}
                                            onChange={handleTemplateChange}
                                            className="flex-grow md:max-w-xs p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                        >
                                            <option value="">-- Select a template --</option>
                                            {template1.map(template => (
                                                <option key={template.id} value={template.id}>
                                                    {template.template_name}
                                                </option>
                                            ))}
                                        </select>
                                           <Link to="/emailTemplate" state={{ view: "add" }}> <button
                                            onClick={simulateCreateTemplate}
                                            className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-600 transition duration-200 shadow-md whitespace-nowrap"
                                        >
                                            + Create New Template
                                        </button></Link>
                                    </div>

                                    {/* 3. Message Body */}
                                    <textarea
                                        id="message-body"
                                        rows="10"
                                        value={stripHtml(messageBody)}
                                        onChange={(e) => setMessageBody(e.target.value)}
                                        placeholder="Type your message here. The selected template content will populate this area."
                                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-gray-700 resize-y"
                                    />

                                    {/* 4. Include Signature Option */}
                                    <div className="flex items-center mt-3 mb-6">
                                        <input
                                            id="include-signature"
                                            type="checkbox"
                                            checked={includeSignature}
                                            onChange={(e) => setIncludeSignature(e.target.checked)}
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                        />
                                        <label htmlFor="include-signature" className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">
                                            Include my signature
                                        </label>
                                    </div>

                                    {/* 5. Send and Cancel Buttons */}
                                    <div className="flex justify-end space-x-4">
                                        <button
                                            onClick={simulateCancel}
                                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition duration-200 shadow-sm"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSendReply}
                                            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition duration-200 shadow-lg shadow-blue-200"
                                        >
                                            Send
                                        </button>
                                    </div>

                                </div>)}

                            {/* 6. Previous Messages List (Full Width, Stacked Below) */}


                            <div className="bg-white p-6 rounded-xl message-box-shadow" style={{ overflowY: "auto", height: "500px" }}>
                                <h2 className="text-xl font-semibold text-gray-700 mb-4">Previous Messages</h2>
                                <div><span style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px" }}>{subject}</span></div>

                                {sentMail.map((details, index) => (<div id="MessagesContainer" key={details.id}>
                                    <div id="MessagesContainer1">
                                        <div className="w-[45px] h-[45px] flex-shrink-0 flex items-center justify-center bg-gray-400 text-white rounded-full text-xs font-bold"><img className='newimg1' src={details.user_from.image ? `https://tracsdev.apttechsol.com/public/${details.user_from.image}` : "https://tracsdev.apttechsol.com/public/uploads/user_avatar.jpeg"} alt="image" /></div>
                                        <div className='ml-2'><strong> {Number(user2) === userId
                                            ? "You"
                                            : details.user_from.name}</strong>
                                            <p>
                                                {new Date(details.updated_at).toLocaleString("en-US", {
                                                    month: "short",
                                                    day: "2-digit",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true,
                                                })}
                                            </p>
                                        </div>

                                    </div>
                                    <div id="MessagesContainer2">
                                        <p>     {stripHtml(details.body)}  </p>
                                    </div>
                                </div>))}

                            </div>

                        </div>

                    </div>

                    {/* Custom Modal for Alerts */}
                    {showModal && (
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
                            <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification</h3>
                                <p className="text-gray-600 mb-6">{modalMessage}</p>
                                <div className="flex justify-end">
                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-200"
                                    >
                                        OK
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReplyMessage
