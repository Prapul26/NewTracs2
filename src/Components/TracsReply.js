import React, { useState, useRef, useEffect } from 'react';
import Header from './Heaader/Header';
import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

/**
 * Main application component.
 * This component loads all necessary assets (Bootstrap CSS/JS, Google Fonts)
 * and manages the messaging form and its validation modal.
 */
export default function TracsReply() {

    // Refs for DOM elements we need to interact with directly
    const modalRef = useRef(null);
    const receiver1Ref = useRef(null);
    const receiver2Ref = useRef(null);

    // Ref to store the Bootstrap modal instance
    const modalInstanceRef = useRef(null);

    // SVG Icons for the modal, converted to JSX
    const successIcon = (
        <svg className="h-6 w-6 text-success" style={{ height: '1.75rem', width: '1.75rem' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
    );

    const errorIcon = (
        <svg className="h-6 w-6 text-danger" style={{ height: '1.75rem', width: '1.75rem' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
    );

    // State to manage the modal's content
    const [modalConfig, setModalConfig] = useState({
        title: 'Message Sent!',
        text: 'Your secure message has been sent (simulation).',
        icon: successIcon,
        iconBg: 'bg-success-subtle'
    });

    /**
     * Effect to load external assets (CSS, Fonts, JS) and initialize
     * the Bootstrap modal instance.
     */
    useEffect(() => {
        // 1. Add Bootstrap CSS
        const bsCss = document.createElement('link');
        bsCss.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
        bsCss.rel = 'stylesheet';
        bsCss.integrity = 'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH';
        bsCss.crossOrigin = 'anonymous';
        document.head.appendChild(bsCss);

        // 2. Add Google Font
        const gFont = document.createElement('link');
        gFont.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
        gFont.rel = 'stylesheet';
        document.head.appendChild(gFont);

        // 3. Add Custom CSS
        const customStyle = document.createElement('style');
        customStyle.innerHTML = `
            body { font-family: 'Inter', sans-serif; }
            .form-control-lg { padding: 0.75rem 1rem; font-size: 0.95rem; }
            .form-label { font-weight: 500; }
            .card-main { max-width: 42rem; }
            .modal-icon-wrapper { width: 3.5rem; height: 3.5rem; }
        `;
        document.head.appendChild(customStyle);

        // 4. Add Bootstrap JS
        const bsJs = document.createElement('script');
        bsJs.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
        bsJs.integrity = 'sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz';
        bsJs.crossOrigin = 'anonymous';
        bsJs.async = true;

        // 5. Initialize Modal *after* script loads
        bsJs.onload = () => {
            if (modalRef.current && window.bootstrap && !modalInstanceRef.current) {
                const modal = new window.bootstrap.Modal(modalRef.current);
                modalInstanceRef.current = modal;
            }
        };
        document.body.appendChild(bsJs);

        // 6. Cleanup function
        return () => {
            try {
                document.head.removeChild(bsCss);
                document.head.removeChild(gFont);
                document.head.removeChild(customStyle);
                document.body.removeChild(bsJs);
                if (modalInstanceRef.current) {
                    // modalInstanceRef.current.dispose();
                }
            } catch (error) {
                console.warn("Error cleaning up assets:", error);
            }
        };
    }, []); // Empty dependency array ensures this runs only once

    /**
     * Handles the form submission.
     * Validates input and shows the appropriate modal.
     */




    const [messageBody, setMessageBody] = useState('');

    // State for the include signature checkbox
    const [includeSignature, setIncludeSignature] = useState(true);

    // State for the selected template
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const cleanHTML = (html) => {
        if (!html) return "";
        return html.replace(/<[^>]+>/g, ""); // removes all HTML tags
    };
    const handleTemplateChange = (e) => {
        const templateId = parseInt(e.target.value);
        const template = template1.find(t => t.id === templateId);
        if (template) {
            const cleanHTML = (html) => {
                if (!html) return "";
                return html.replace(/<[^>]+>/g, ""); // removes all HTML tags
            };

            // then:
            setMessageBody(cleanHTML(template.email_body));
            setSelectedTemplate(templateId);
        }
    };



    const location = useLocation();
    const [data, setData] = useState({});
    const [sentMail, setSentMails] = useState({});
    const [signature, setSignature] = useState([]);
    const [template1, setTemplate1] = useState([]);
    const [recivesmails, setrecivedmails] = useState([]);

    const [userDetails, setUserDetails] = useState([]);

    const searchParams = new URLSearchParams(location.search);

    const user_id = searchParams.get("user_id");
    const subject = searchParams.get("subject");
    const replies_code = searchParams.get("replies_code");

    const femail = searchParams.get("femail");
    const auemail = searchParams.get("auemail");

    useEffect(() => {
        const fetchData = async () => {




            try {
                const token = sessionStorage.getItem("authToken");

                const response = await axios.get(
                    `https://tracsdev.apttechsol.com/api/IntroMessageReply-plans?user_id=${user_id}&replies_code=${replies_code}&subject=${encodeURIComponent(subject)}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );


                setData(response.data);
                setSentMails(response.data?.data?.sentMailsfirst);
                setrecivedmails(response.data?.data?.recivedMailsfirst || []);
                setSignature(response.data?.signature?.name);
                setTemplate1(response.data?.templates || []);
                setUserDetails(response.data?.data?.usersData || []);
                console.log("userId :", user_id, "subject :", subject, "messageCode:", replies_code)
                if (response.data?.data?.sentMailsfirst?.body) {
                    let clean = cleanHTML(response.data.data.sentMailsfirst.body);
                    setMessageBody(clean);
                }
                console.log("Fetched From URL Params:", { user_id, subject, replies_code });

                console.log("API response:", response.data);
            } catch (err) {
                console.error("Error fetching inbox history:", err);
            }
        };

        fetchData();
    }, [subject, user_id, replies_code]);



    const stripHtmlTags = (html) => {
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    };




    const [selectedRecipientEmails, setSelectedRecipientEmails] = useState([]);



   const handleSendReply = async (emails) => {
  const payload = {
    user_id: data.userInfo?.id,
    sent_mail_history_id: sentMail?.id,
    replies_code: sentMail?.replies_code,
    temp_id: selectedTemplate || null,
    subject: sentMail?.subject,
    selected_emails: JSON.stringify(emails),
    redirect_to: null,
    is_bump: sentMail?.is_bump,
    femail,
    contact_check_from_website_url: "1",
    emails: emails,
    message: messageBody,
    files: null,
    source: "api",
  };

  console.log("FINAL PAYLOAD:", payload);

  try {
    const response = await axios.post(
      "https://tracsdev.apttechsol.com/api/ReplysendMailtomemapi",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Reply Sent Successfully:", response.data);

    setModalConfig({
      title: "Reply Sent!",
      text: "Your reply has been sent successfully.",
      icon: successIcon,
      iconBg: "bg-success-subtle",
    });

    modalInstanceRef.current?.show();

  } catch (error) {
    console.error("Error sending reply:", error);

    setModalConfig({
      title: "Sending Failed",
      text: "Unable to send your reply. Try again.",
      icon: errorIcon,
      iconBg: "bg-danger-subtle",
    });

    modalInstanceRef.current?.show();
  }
};

    const handleSubmit = (e) => {
        e.preventDefault();

        // Collect selected emails
        const emails = [];
        userDetails.forEach((user, i) => {
            const checkbox = document.getElementsByName("receivers")[i];
            if (checkbox?.checked) emails.push(user.email);
        });

        if (emails.length === 0) {
            setModalConfig({
                title: "Selection Required",
                text: "Please select at least one receiver.",
                icon: errorIcon,
                iconBg: "bg-danger-subtle"
            });
            modalInstanceRef.current?.show();
            return;
        }

        // Call POST API with actual selected emails
        handleSendReply(emails);
    };



    return (
        <div className="bg-light text-dark">
            <div><Header /></div>
            <div><Navbar /></div>

            <div className="container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center p-4">

                {/* Main Messaging Card */}
                <div className="card card-main shadow-lg rounded-4 w-100">

                    {/* Card Header */}
                    <div className="card-header bg-dark text-white p-3 p-sm-4 d-flex justify-content-between align-items-center">
                        <h1 className="h3 mb-0 fw-bold">
                            {/* Title was previously removed */}
                        </h1>

                        {/* a) Message History Button */}
                        <button className="btn btn-primary btn-sm d-flex align-items-center py-2 px-2 px-sm-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 me-0 me-sm-2" style={{ height: '1.25rem', width: '1.25rem' }} viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            <Link to="/tracsSignIn"><span className="d-none d-sm-inline">Message History</span></Link>
                        </button>
                    </div>

                    {/* Message Form */}
                    <form id="message-form" className="card-body p-3 p-sm-4" onSubmit={handleSubmit}>

                        {/* b) Subject Line (as read-only info) */}
                        <div className="mb-4">
                            <label htmlFor="subject" className="form-label">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                value={sentMail?.subject || ""}

                                className="form-control form-control-lg bg-light"
                                readOnly
                            />
                        </div>

                        {/* c) "To" Selection (Checkboxes) */}
                        <div className="mb-4">
                            <label className="form-label">
                                To
                            </label>
                            <div className="border rounded-3 p-3 shadow-sm mt-2" style={{textOverflow:"hidden"}}>
                                {/* Receiver 1 */}
                                {userDetails.map((user, index) => (<div className="form-check mb-2" key={index}>
                                    <input ref={receiver1Ref} id="receiver1" name="receivers" type="checkbox" className="form-check-input" />
                                    <label htmlFor="receiver1" className="form-check-label ms-2">
                                        {user.name} <span className="text-muted fw-normal">( {user.email})</span>
                                    </label>
                                </div>))}
                                {/* Receiver 2 */}

                            </div>
                        </div>

                        {/* d) Message Body (Textarea) */}
                        <div className="mb-4">
                            <label htmlFor="message-body" className="form-label">
                                Message Body
                            </label>
                            <textarea
                                rows="8"
                                value={messageBody}
                                onChange={(e) => setMessageBody(e.target.value)}
                                className="form-control form-control-lg mt-1"
                                placeholder="Write your message here..."
                            ></textarea>

                        </div>

                        {/* e) Send Button */}
                        <div className="d-flex justify-content-end">
                            <button type="submit" id="send-button" className="btn btn-success fw-semibold py-2 px-4">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>

                {/* f) and g) Auth/Info Links */}
                <div className="text-center text-muted small mt-4 d-sm-flex justify-content-center">
                    <p className="mb-1 mb-sm-0 me-sm-4">
                        Not Signed into TRACS?
                        <Link to="/tracsSignIn">      <a href="#" className="fw-medium text-decoration-none">Sign In</a></Link>
                    </p>
                    <p className="mb-0">
                        New to TRACS?
                        <Link to="/faqIem">  <a href="#" className="fw-medium text-decoration-none">Learn more.</a></Link>
                    </p>
                </div>

            </div>

            {/* Bootstrap Modal */}
            <div ref={modalRef} className="modal fade" id="alert-modal" tabIndex="-1" aria-labelledby="modal-title" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content rounded-4 shadow-lg">
                        <div className="modal-body p-4 text-center">
                            {/* Icon */}
                            <div className={`modal-icon-wrapper mx-auto d-flex align-items-center justify-content-center rounded-circle ${modalConfig.iconBg}`}>
                                {modalConfig.icon}
                            </div>
                            <h5 className="modal-title fs-4 mt-3" id="modal-title">{modalConfig.title}</h5>
                            <p className="text-muted mt-2" id="modal-text">{modalConfig.text}</p>
                            <button type="button" className="btn btn-primary w-100 mt-3" data-bs-dismiss="modal">
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div><Footer /></div>
        </div>
    );
}