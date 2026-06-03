import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MessageSquare, 
  Clock, 
  Archive, 
  ArrowUpRight, 
  Send,
  User,
  CheckCircle2,
  RefreshCw
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
export default function Introductions({ token, onViewProfile, onViewThread }) {
  const [intros, setIntros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // all, needs-followup, active, archive
  const [expandedIntroId, setExpandedIntroId] = useState(null);
  
  // Reply State
  const [replyIntroId, setReplyIntroId] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [replying, setReplying] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [profile, setProfile] = useState(null);

  const fetchIntros = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/introductions', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setIntros(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIntros();
  }, [token]);

  useEffect(() => {
    const loadTemplatesAndProfile = async () => {
      try {
        const headers = { 'Authorization': `Bearer ${token}` };
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
        console.error("Error loading templates/profile inside Introductions", err);
      }
    };
    if (token) {
      loadTemplatesAndProfile();
    }
  }, [token]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/introductions/${id}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        // update local list
        setIntros(intros.map(i => i.id === id ? { ...i, status: newStatus } : i));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReplySubmit = async (e, id) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;
    setReplying(true);

    try {
      const res = await fetch(`http://localhost:5000/api/introductions/${id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: replyMessage })
      });

      if (res.ok) {
        setReplyMessage('');
        setReplyIntroId(null);
        await fetchIntros(); // Reload updated list
      }
    } catch (err) {
      console.error(err);
    } finally {
      setReplying(false);
    }
  };

  const handleQuickFollowUp = (intro) => {
    setReplyIntroId(intro.id);
    // Grab first name from receivers for dynamic feel
    const firstReceiver = intro.receivers[0] ? intro.receivers[0].split(' ')[0] : 'there';
    setReplyMessage(`Hi ${firstReceiver},\n\nJust following up on my introduction below. I would like to schedule a meeting with you next week. Please check my calendar and book a timeslot when convenient.\n\nThanks!\nShankar Vanga`);
    setExpandedIntroId(intro.id);
  };

  // Filter & Search Logic
  const filteredIntros = intros.filter(intro => {
    const matchesSearch = 
      intro.subject.toLowerCase().includes(search.toLowerCase()) || 
      intro.sender.toLowerCase().includes(search.toLowerCase()) ||
      intro.receivers.some(r => r.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeFilter === 'needs-followup') {
      return intro.status === 'Needs Follow-up';
    }
    if (activeFilter === 'active') {
      return intro.status === 'Active';
    }
    if (activeFilter === 'archive') {
      return intro.status === 'Archive';
    }
    // 'all' includes active, needs follow-up, etc. but typically hides archived items
    return intro.status !== 'Archive';
  });
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
      <div className="page-header">
        <div>
          <h2>Introduction Messages</h2>
          <p className="page-title-desc">Track and respond to referrals and mutual introductions</p>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={fetchIntros} disabled={loading}>
          <RefreshCw size={14} className={loading ? 'fa-spin' : ''} />
          Refresh Feed
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel" style={{ padding: '20px', marginBottom: '25px' }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="search-wrapper" style={{ flex: 1, marginBottom: 0, minWidth: '250px' }}>
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              className="form-control search-input" 
              placeholder="Search by subject, sender, or receiver..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="feed-filters" style={{ marginBottom: 0 }}>
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Intros
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'needs-followup' ? 'active' : ''}`}
              onClick={() => setActiveFilter('needs-followup')}
            >
              Needs Follow-up
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'active' ? 'active' : ''}`}
              onClick={() => setActiveFilter('active')}
            >
              Active
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'archive' ? 'active' : ''}`}
              onClick={() => setActiveFilter('archive')}
            >
              Archived
            </button>
          </div>
        </div>
      </div>

      {/* Introductions Feed List */}
      {loading && intros.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading introductions...</div>
      ) : filteredIntros.length === 0 ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          No introductions match the selected filters.
        </div>
      ) : (
        <div className="intro-feed">
          {filteredIntros.map((intro) => {
            const isExpanded = expandedIntroId === intro.id;
            const isReplyingActive = replyIntroId === intro.id;
            
            return (
              <div key={intro.id} className="intro-card glass-panel">
                
                {/* Card Header */}
                <div className="intro-card-header">
                  <div>
                    <h3 className="intro-card-title">
                      {intro.subject.replace(/&lt;&gt;/g, '<>').replace(/&amp;/g, '&')}
                    </h3>
                    <div className="intro-card-meta">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <User size={12} /> Introduced by{" "}
                        <a 
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (onViewProfile) {
                              if (intro.sender === 'Shankar Vanga') {
                                onViewProfile({ type: 'self' });
                              } else {
                                onViewProfile({ name: intro.sender });
                              }
                            }
                          }}
                          className="profile-link"
                          style={{ fontWeight: '700', color: 'var(--primary)', textDecoration: 'none' }}
                        >
                          {intro.sender}
                        </a>
                      </span>
                      <span>•</span>
                      <span>{intro.timeAgo}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className={`badge ${
                      intro.status === 'Needs Follow-up' ? 'badge-warning' : 
                      intro.status === 'Archive' ? 'badge-info' : 'badge-success'
                    }`}>
                      {intro.status}
                    </span>
                  </div>
                </div>

                {/* Receivers Strip */}
                <div className="receivers-strip">
                  {intro.receivers.map((rec, index) => {
                    const initials = rec.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                    return (
                      <div 
                        key={index} 
                        className="receiver-item clickable-receiver-item"
                        onClick={() => {
                          if (onViewProfile) {
                            if (rec === 'Shankar Vanga' || rec === 'Shankar10 Vanga') {
                              onViewProfile({ type: 'self' });
                            } else {
                              onViewProfile({ name: rec });
                            }
                          }
                        }}
                        style={{ cursor: 'pointer' }}
                        title={`View ${rec}'s Profile`}
                      >
                        <div className="receiver-avatar-placeholder">{initials}</div>
                        <div>
                          <div className="receiver-info-name">{rec}</div>
                          <div className="receiver-info-sub">Recipient</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Collapsible Latest Message Toggle */}
                <div 
                  onClick={() => setExpandedIntroId(isExpanded ? null : intro.id)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    padding: '8px 0',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    borderBottom: isExpanded ? '1px solid var(--border-color)' : 'none',
                    marginBottom: isExpanded ? '15px' : '0'
                  }}
                >
                  <span style={{ fontWeight: '600' }}>Latest Message Content</span>
                  <span style={{ fontSize: '0.75rem' }}>{isExpanded ? 'Collapse ▲' : 'Expand ▼'}</span>
                </div>

                {isExpanded && (
                  <div className="latest-msg-preview">
                    {intro.latestMessage}
                  </div>
                )}

                {/* Actions Row */}
                <div className="intro-card-actions">
                  <button 
                    onClick={() => onViewThread && onViewThread(intro.id)} 
                    className="btn btn-primary btn-sm"
                  >
                    <MessageSquare size={14} />
                    View Thread
                  </button>

                  {intro.status === 'Needs Follow-up' && (
                    <button 
                      onClick={() => handleQuickFollowUp(intro)} 
                      className="btn btn-secondary btn-sm"
                      style={{ backgroundColor: 'var(--warning)', color: '#000', border: 'none' }}
                    >
                      <Clock size={14} />
                      One-Click Follow-Up
                    </button>
                  )}

                  <button 
                    onClick={() => {
                      setReplyIntroId(isReplyingActive ? null : intro.id);
                      if (!isReplyingActive) {
                        setExpandedIntroId(intro.id);
                      }
                    }} 
                    className="btn btn-secondary btn-sm"
                  >
                    Quick Reply
                  </button>

                  {intro.status !== 'Archive' ? (
                    <button 
                      onClick={() => handleStatusChange(intro.id, 'Archive')} 
                      className="btn btn-secondary btn-sm"
                      title="Archive Thread"
                    >
                      <Archive size={14} />
                      Archive
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleStatusChange(intro.id, 'Active')} 
                      className="btn btn-secondary btn-sm"
                      title="Unarchive Thread"
                    >
                      <CheckCircle2 size={14} />
                      Unarchive
                    </button>
                  )}
                </div>

                {/* Inline Reply Form */}
                {isReplyingActive && (
                  <form onSubmit={(e) => handleReplySubmit(e, intro.id)} className="reply-box">
                    {/* Template Selector dropdown */}
                    {templates.length > 0 && (
                      <div className="form-group" style={{ marginBottom: '12px' }}>
                        <label className="form-label" style={{ fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <span>Use a Reply Template (Optional)</span>
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
                          <option value="">-- Choose a template --</option>
                          {templates.map(t => (
                            <option key={t.id} value={t.id}>{t.title} ({t.subject})</option>
                          ))}
                        </select>
                      </div>
                    )}
                    <div className="form-group" style={{ marginBottom: '10px' }}>
                      <textarea
                        className="form-control"
                        rows="6"
                        placeholder="Type your reply message here..."
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        required
                        autoFocus
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                      <button 
                        type="button" 
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          setReplyIntroId(null);
                          setReplyMessage('');
                        }}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="btn btn-primary btn-sm"
                        disabled={replying}
                      >
                        <Send size={14} />
                        {replying ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </form>
                )}

              </div>
            );
          })}
        </div>
      )}
    </div>


{}                    
                    </div>
                </div>
            </div></div>
  );
}
