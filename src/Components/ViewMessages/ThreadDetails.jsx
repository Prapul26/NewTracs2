import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Send, 
  MessageSquare, 
  User, 
  Clock, 
  CheckCircle2,
  Mail,
  Building
} from 'lucide-react';
import { FaHome, FaQuestionCircle } from 'react-icons/fa';
import { IoLogOut, IoPerson } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar2 from '../Sidebar/Sidebar2';
import { IoMdArrowDropdownCircle, IoMdMenu } from 'react-icons/io';
import ReactQuill from 'react-quill';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import axios from 'axios';

export default function ThreadDetails({ token, introId, setCurrentView, onViewProfile }) {
  const [intro, setIntro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [replying, setReplying] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [profile, setProfile] = useState(null);
 const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [name, setName] = useState("");
  const [Heasderdropdown, setHeaderdropdown] = useState(null);
  const showDropDown = () => {
    setHeaderdropdown(prev => !prev)
  }
  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userId")
    localStorage.removeItem("authToken")
    sessionStorage.removeItem("profileImageUrl")

    navigate("/"); // Redirect to login page
    window.location.reload();
  };
  const navigate = useNavigate();
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
  const fetchProfile = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      console.log("Token:", token)
      const response = await axios.get("https://tracsdev.apttechsol.com/api/my-profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;


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
  const fetchThreadData = async () => {
    setLoading(true);
    setError('');
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      
      // Fetch thread detail
      const res = await fetch(`http://localhost:5000/api/introductions/${introId}`, { headers });
      if (!res.ok) {
        throw new Error("Failed to load thread details.");
      }
      const data = await res.json();
      setIntro(data);

      // Fetch templates & profile
      const [tRes, pRes] = await Promise.all([
        fetch('http://localhost:5000/api/templates', { headers }),
        fetch('http://localhost:5000/api/profile', { headers })
      ]);
      
      if (tRes.ok) {
        const tData = await tRes.json();
        setTemplates(tData);
      }
      if (pRes.ok) {
        const pData = await pRes.json();
        setProfile(pData);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to load message thread.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (introId) {
      fetchThreadData();
    }
  }, [token, introId]);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;
    setReplying(true);

    try {
      const res = await fetch(`http://localhost:5000/api/introductions/${introId}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: replyMessage })
      });

      if (res.ok) {
        setReplyMessage('');
        // Reload thread data
        const updatedIntro = await res.json();
        setIntro(updatedIntro);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit reply.");
    } finally {
      setReplying(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/introductions/${introId}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setIntro(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading conversation thread...</div>;
  }

  if (error || !intro) {
    return (
      <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
        <p style={{ color: 'var(--danger)', marginBottom: '15px' }}>{error || 'Conversation not found.'}</p>
        <button className="btn btn-secondary btn-sm" onClick={() => setCurrentView('introductions')}>
          <ArrowLeft size={14} /> Back to Inbox
        </button>
      </div>
    );
  }

  const initialsForName = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
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
 
  return (
     <div style={{ display: "flex" ,height:"100vh"}}>
             <div className="hidden lg:block w-[20.4%]"><Sidebar2 />
             </div>{showSideNav && <div><Sidebar2 />
             </div>}
            <div className="bg-gray-100 text-gray-800 min-h-screen font-sans" style={{ width: "100%" }}>
                <header className="bg-white shadow-sm flex items-center justify-between p-1 border-b">
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
                <div className="bg-grey-50 text-gray-800 font-sans p-1 sm:p-6 lg:p-8" style={{ width: "100%",height:"90%",overflowY:"auto"}}>
                    
                    
                    
                    <div className="container1 mx-auto max-w-1xl mt-6 bg-white p-8 rounded-2xl shadow-lg " >


{}

 <div>
      {/* Header Back Button */}
      <div className="page-header" style={{ marginBottom: '25px' }}>
        <button 
          className="btn btn-secondary btn-sm"
          onClick={() => setCurrentView('introductions')}
        >
          <ArrowLeft size={14} /> Back to Introductions
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          {intro.status !== 'Archive' ? (
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => handleStatusChange('Archive')}
            >
              Archive Thread
            </button>
          ) : (
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => handleStatusChange('Active')}
            >
              Unarchive Thread
            </button>
          )}
        </div>
      </div>

      {/* Intro Context Card */}
      <div className="glass-panel" style={{ padding: '25px', marginBottom: '25px', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'var(--primary-gradient)'
        }} />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, color: 'var(--text-header)' }}>
              {intro.subject.replace(/&lt;&gt;/g, '<>').replace(/&amp;/g, '&')}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <User size={13} /> Created by{" "}
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (intro.sender === 'Shankar Vanga') {
                    onViewProfile({ type: 'self' });
                  } else {
                    onViewProfile({ name: intro.sender });
                  }
                }}
                className="profile-link"
                style={{ fontWeight: '700', color: 'var(--primary)', textDecoration: 'none' }}
              >
                {intro.sender}
              </a>
            </p>
          </div>
          <div>
            <span className={`badge ${
              intro.status === 'Needs Follow-up' ? 'badge-warning' : 
              intro.status === 'Archive' ? 'badge-info' : 'badge-success'
            }`}>
              {intro.status}
            </span>
          </div>
        </div>

        <div style={{ 
          marginTop: '20px', 
          paddingTop: '15px', 
          borderTop: '1px solid var(--border-color)', 
          display: 'flex', 
          gap: '15px', 
          flexWrap: 'wrap' 
        }}>
          {intro.receivers.map((rec, idx) => (
            <div 
              key={idx} 
              className="receiver-item clickable-receiver-item"
              onClick={() => {
                if (rec === 'Shankar Vanga' || rec === 'Shankar10 Vanga') {
                  onViewProfile({ type: 'self' });
                } else {
                  onViewProfile({ name: rec });
                }
              }}
              style={{ cursor: 'pointer' }}
              title={`View ${rec}'s Profile`}
            >
              <div className="receiver-avatar-placeholder">{initialsForName(rec)}</div>
              <div>
                <div className="receiver-info-name" style={{ fontSize: '0.85rem' }}>{rec}</div>
                <div className="receiver-info-sub" style={{ fontSize: '0.7rem' }}>Recipient {idx + 1}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Chain Log Timeline */}
      <div className="glass-panel" style={{ padding: '30px', marginBottom: '25px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MessageSquare size={18} style={{ color: 'var(--primary)' }} />
          Conversation History ({intro.messages?.length || 1})
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {intro.messages?.map((msg, index) => {
            const isSelfMessage = msg.sender === 'Shankar Vanga' || msg.sender === (profile?.name || 'Shankar Vanga');
            
            return (
              <div key={msg.id || index} style={{
                display: 'flex',
                gap: '15px',
                flexDirection: 'row',
                alignItems: 'flex-start'
              }}>
                {/* Avatar */}
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: isSelfMessage ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${isSelfMessage ? 'var(--primary)' : 'var(--border-color)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: isSelfMessage ? 'var(--primary)' : 'var(--text-secondary)',
                  flexShrink: 0
                }}>
                  {initialsForName(msg.sender)}
                </div>

                {/* Message Box */}
                <div style={{
                  flex: 1,
                  backgroundColor: isSelfMessage ? 'rgba(99, 102, 241, 0.03)' : 'rgba(255,255,255,0.01)',
                  border: `1px solid ${isSelfMessage ? 'rgba(99,102,241,0.15)' : 'var(--border-color)'}`,
                  borderRadius: '12px',
                  padding: '18px',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ fontWeight: '700', fontSize: '0.9rem', color: isSelfMessage ? 'var(--primary)' : '#fff' }}>
                      {isSelfMessage ? (
                        <span>{msg.sender} <span className="badge badge-success" style={{ marginLeft: '6px', fontSize: '0.65rem', padding: '2px 6px' }}>You</span></span>
                      ) : (
                        <a 
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            onViewProfile({ name: msg.sender });
                          }}
                          className="profile-link"
                          style={{ color: '#fff', textDecoration: 'none' }}
                        >
                          {msg.sender}
                        </a>
                      )}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} />
                      {msg.timeAgo || 'Just now'}
                    </div>
                  </div>

                  <div style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    color: 'var(--text-secondary)',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {msg.body}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reply Composer Card */}
      <div className="glass-panel" style={{ padding: '30px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '20px' }}>
          Reply to Conversation
        </h3>

        <form onSubmit={handleReplySubmit}>
          {/* Templates Selection */}
          {templates.length > 0 && (
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label className="form-label" style={{ fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span>Select email reply template (Optional)</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Auto-resolves [[name_1]] and [[name_2]]</span>
              </label>
              <select 
                className="form-control"
                style={{ fontSize: '0.85rem', padding: '8px 12px' }}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val) {
                    const tmpl = templates.find(t => t.id.toString() === val);
                    if (tmpl) {
                      let resolvedBody = tmpl.body;
                      const name1 = intro.receivers[0] || '';
                      const name2 = intro.receivers[1] || '';
                      
                      // Replace placeholders
                      resolvedBody = resolvedBody.replace(/\[\[name_1\]\]/g, name1);
                      resolvedBody = resolvedBody.replace(/\[\[name_2\]\]/g, name2);
                      
                      // Append signature
                      if (profile?.signature) {
                        resolvedBody += `\n\n${profile.signature}`;
                      }
                      
                      setReplyMessage(resolvedBody);
                    }
                  } else {
                    setReplyMessage('');
                  }
                }}
                defaultValue=""
              >
                <option value="">-- Choose a template to pre-fill --</option>
                {templates.map(t => (
                  <option key={t.id} value={t.id}>{t.title} ({t.subject})</option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <textarea
              className="form-control"
              rows="6"
              placeholder="Write your reply details here..."
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={replying}
              style={{ padding: '10px 24px' }}
            >
              <Send size={16} />
              {replying ? 'Sending...' : 'Send Reply Message'}
            </button>
          </div>
        </form>
      </div>
    </div>


  {}                      
                    </div>
                </div>
            </div></div>
    
  );
}
