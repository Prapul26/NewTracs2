import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { FaHome } from 'react-icons/fa';
import { IoLogOut, IoPerson } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar2 from '../Sidebar/Sidebar2';
import { IoMdMenu } from 'react-icons/io';

// --- Icon Components ---
// Using inline SVGs for icons to avoid extra dependencies.
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);
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
                { icon: 'mail', text: 'Email Templates', to: '/emailTemplate' },
                { icon: 'pen-square', text: 'Email Signature', to: '/emailSignature' },
            ],
        },
        {
            title: 'Resources',
            links: [
                { icon: 'help-circle', text: 'App Help', active: true, to: '/appHelp' },
                { icon: 'thumbs-up', text: 'Feedback' },
                { icon: 'message-square', text: 'Contact Us',to:'/contact' },
                { icon: 'book-open', text: 'Networking 101',to:'/network' },
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
                                                        <Link to="/" className="text-white text-2xl font-bold"><img src="https://tracsdev.apttechsol.com/public/uploads/website-images/logo-2024-09-05-10-18-08-4078.png"/></Link>
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


// --- Data for the Guide ---
// All guide content is stored here to make it dynamic and filterable.
const guideSections = [
    {
        id: 'introduction',
        navTitle: 'I. Introduction',
        title: 'I. Introduction to TRACS',
        content: [
            { type: 'p', text: 'TRACS is envisioned as the "heartbeat of professional networking," fostering an environment where entrepreneurs and professionals can cultivate meaningful relationships. It serves as a hub for new collaborative opportunities through trust-building activities such as integrating your new connections with your existing network. This platform is tailored for entrepreneurs and other professionals who are in pursuit of high-quality networking experiences.' },
            { type: 'h3', text: 'Our Mission and Vision' },
            { type: 'p', text: '<strong class="font-semibold text-gray-900">Mission:</strong> To offer a platform where professionals can develop and sustain trusted-relationships utilizing the Connect, Serve, and Ask® methodology.' },
            { type: 'p', text: '<strong class="font-semibold text-gray-900">Vision:</strong> To be the cornerstone of global networking, empowering individuals and enterprises to expand their reach, exchange knowledge, and forge impactful partnerships.' },
            { type: 'h3', text: 'What TRACS Offers' },
            { type: 'p', text: 'TRACS delivers results by providing:' },
            {
                type: 'ul', items: [
                    '<strong class="font-semibold text-gray-900">Master the Art of Offering Valuable Help:</strong> Become an indispensable resource within your network. Discover practical strategies to effectively provide assistance and insights to your colleagues, establishing yourself as a go-to expert and trusted ally.',
                    '<strong class="font-semibold text-gray-900">Effortless Networking:</strong> Connect with like-minded professionals through an intuitive tool that supports your journey when networking to create meaningful relationships.',
                    '<strong class="font-semibold text-gray-900">Forge Meaningful Connections:</strong> Move beyond superficial interactions. Leveraging TRACS seamless digital introduction tool empowers you to engage in conversations that create deeper, more valuable relationships, fostering trust and mutual understanding with every new contact.'
                ]
            }
        ]
    },
    {
        id: 'make-introduction',
        navTitle: 'II. Make Introduction',
        title: 'II. Make Introduction Feature',
        content: [
            { type: 'p', text: 'The <strong class="font-semibold text-blue-600">Make Introduction</strong> feature is the core tool used for facilitating <strong class="font-semibold">referral-based introductions</strong>. It allows you to connect two people from your network by sending a single, mutual introduction.' },
            { type: 'h3', text: 'When to Use It' },
            { type: 'p', text: 'This feature is useful for facilitating valuable connections such as:' },
            {
                type: 'ul', items: [
                    '<strong>Professional Networking:</strong> Expanding connections and meaningful relationships in a specific industry.',
                    '<strong>Referrals/Recommendations:</strong> Facilitate the growth of new connections by introducing them to an existing, meaningful relationship—whether it\'s a vendor, referral partner, champion, or prospect—to mutually support mutual business development.'
                ]
            },
            { type: 'h3', text: 'How to Send an Introduction' },
            { type: 'p', text: 'The process is straightforward:' },
            {
                type: 'ol', items: [
                    'Select the <strong class="font-semibold">two individuals</strong> you want to connect.',
                    '<strong class="font-semibold">Select from our templates or write your own message.</strong> Be sure to explain <strong class="font-semibold">why</strong> you are connecting them, as this is the most important part.',
                    'Click <strong class="font-semibold">"Send"</strong>.'
                ]
            },
            { type: 'p', text: 'Once sent, both parties will receive your mutual message and can start communicating directly. The message will include the <strong class="font-semibold">names and contact details of both parties</strong>.' }
        ]
    },
    {
        id: 'selecting-members',
        navTitle: 'III. Selecting Members',
        title: 'III. Selecting Members and Drafting the Message',
        content: [
            { type: 'h3', text: 'Selecting Members from the Directory' },
            { type: 'p', text: 'On the TRACS introduction page, you can find and select the members you wish to connect.' },
            {
                type: 'ul', items: [
                    '<strong class="font-semibold">Selection Limit:</strong> You can select a <strong class="font-semibold">maximum of two members including your contacts</strong> for any introduction.',
                    '<strong class="font-semibold">Filtering:</strong> Use the directory dropdown menu to filter members by <strong class="font-semibold">member type</strong>.',
                    '<strong class="font-semibold">Quick Search:</strong> Find a specific member by searching their <strong class="font-semibold">Email, Name, or Business Name</strong>.',
                    '<strong class="font-semibold">Rearrange:</strong> You have the option to rearrange the sequence of the selected members if needed.'
                ]
            },
            { type: 'h3', text: 'Using Email Templates' },
            { type: 'p', text: '<strong class="font-semibold">Email templates</strong> are pre-designed layouts that allow you to create consistent emails quickly and consistently.' },
            {
                type: 'ul', items: [
                    '<strong class="font-semibold">Select a Template:</strong> You can choose a template from the <strong class="font-semibold">"Select Template"</strong> dropdown menu. The list includes both standard Admin-level templates and any templates you have created.',
                    '<strong class="font-semibold">Manage Templates:</strong> To create, edit, or delete your personal templates, click the <strong class="font-semibold">"Manage Templates"</strong> link located right next to the Select Template dropdown.'
                ]
            },
            { type: 'h3', text: 'The "Replace Tokens" Feature' },
            { type: 'p', text: 'When you select the <strong class="font-semibold">"Replace Tokens"</strong> button, the names of the selected members are <strong class="font-semibold">automatically substituted</strong> with their corresponding tokens in the email content.' },
            { type: 'alert', text: '<strong class="font-semibold">Mandatory Step:</strong> You <strong class="font-semibold">must replace the tokens</strong> before sending the email. If you try to send the message without doing so, an error message will appear, prompting you to complete the token replacement first.' },
            { type: 'h3', text: 'Email Signature' },
            { type: 'p', text: 'You can include your personalized signature when sending an introduction. To set up or customize your signature, navigate to: <strong class="font-semibold">My Account, Introductions Signature</strong>.' }
        ]
    },
    {
        id: 'managing-introductions',
        navTitle: 'IV. Managing Introductions',
        title: 'IV. Managing Introductions (Messages Page)',
        content: [
            { type: 'p', text: 'After submitting the Make Introduction form, you are automatically directed to the <strong class="font-semibold">Messages</strong> page. This is where you can view and reference <strong class="font-semibold">all</strong> of your current and past introductions.' },
            { type: 'h3', text: 'Filtering Options' },
            { type: 'p', text: 'The Messages page includes useful filters to help you manage your introductions and follow-ups:' },
            {
                type: 'table', headers: ['Filter Option', 'Description'], rows: [
                    ['Filter for Replies', '<p class="mb-2"><strong class="font-semibold text-gray-900">Non-Reply:</strong> View introductions that have <strong class="font-semibold">not</strong> yet received a reply.</p><p class="mb-0"><strong class="font-semibold text-gray-900">Bump:</strong> View introductions prioritized for follow-up.</p>'],
                    ['Filter for Messages', '<p class="mb-2">Introductions <strong class="font-semibold text-gray-900">you\'ve sent.</strong></p><p class="mb-0">Introductions <strong class="font-semibold text-gray-900">you\'ve received.</strong></p>']
                ]
            },
            { type: 'p', text: '<strong class="font-semibold text-gray-900">Export to Sheets</strong>' },
            { type: 'h3', text: 'Replying to a Message' },
            { type: 'p', text: 'To send a message in Introductions, use the <strong class="font-semibold">Reply</strong> button:' },
            {
                type: 'ol', items: [
                    'Click <strong class="font-semibold">Reply</strong> on the message. This opens the message details page.',
                    '<strong class="font-semibold">Choose the Recipient</strong> from the dropdown menu.',
                    '<strong class="font-semibold">Select an Email Template</strong> from the template menu.',
                    '<strong class="font-semibold">Edit the Message</strong> as needed in the message box to personalize it before sending.'
                ]
            },
            { type: 'h3', text: 'Sending a Follow-Up ("Bump")' },
            { type: 'p', text: 'If members haven\'t responded, you can send a follow-up using the <strong class="font-semibold">Bump</strong> button.' },
            { type: 'p', text: '<strong class="font-semibold">Availability:</strong> The <strong class="font-semibold">Bump</strong> button is enabled <strong class="font-semibold">only when there are no replies</strong> to the message.' },
            { type: 'p', text: '<strong class="font-semibold">Process:</strong> Clicking <strong class="font-semibold">Bump</strong> takes you to the message details page, where you can choose recipient(s) from the "To" dropdown, select a message template, and edit the message before sending.' }
        ]
    },
    {
        id: 'contacts',
        navTitle: 'V. Contacts & Profile',
        title: 'V. Contacts Management and Profile',
        content: [
            { type: 'h3', text: 'My Contacts' },
            { type: 'p', text: 'You can manage and organize your network using the <strong class="font-semibold">My Contacts</strong> section, found under the <strong class="font-semibold">Introductions</strong> menu. From here, you can:' },
            {
                type: 'ul', items: [
                    '<strong class="font-semibold">Add new contacts</strong> individually.',
                    '<strong class="font-semibold">Import multiple contacts</strong> at once using the <strong class="font-semibold">Import</strong> feature.',
                    '<strong class="font-semibold">Edit or delete</strong> existing contacts as needed.'
                ]
            },
            { type: 'h3', text: 'Importing Contacts into TRACS' },
            { type: 'p', text: 'To import a list of contacts in bulk:' },
            {
                type: 'ol', items: [
                    'Go to the sidebar and click <strong class="font-semibold">My Contacts</strong>.',
                    'Click <strong class="font-semibold">Download Template</strong> to get the sample file.',
                    '<strong class="font-semibold">Fill in your contact details</strong> in the downloaded file, maintaining the original format.',
                    'Click <strong class="font-semibold">Attach File</strong> to upload your completed file.',
                    'Click <strong class="font-semibold">Import</strong> to add your contacts to TRACS.'
                ]
            },
            { type: 'h3', text: 'My Profile View' },
            {
                type: 'ul', items: [
                    '<strong class="font-semibold">View Profile:</strong> Your profile page displays your <strong class="font-semibold">contact details</strong> and a personal <strong class="font-semibold">"About" section</strong>.',
                    '<strong class="font-semibold">Make Updates:</strong> To update your profile, go to <strong class="font-semibold">Account Settings</strong> and click <strong class="font-semibold">My Profile</strong>.',
                    '<strong class="font-semibold">Preview:</strong> The <strong class="font-semibold">My Profile View</strong> page shows you exactly how your profile looks to other members, allowing you to ensure all details are accurate.'
                ]
            }
        ]
    },
    {
        id: 'referral-support',
        navTitle: 'VI. Referral Support',
        title: 'VI. Referral Support and Affiliation',
        content: [
            { type: 'h3', text: 'Referral Support' },
            // This was the line with the error. Corrected 'type:warning: 'p'' to 'type: 'p''.
            { type: 'p', text: '<strong class="font-semibold text-gray-900">Referral Support</strong> is designed to connect members with the collective expertise of the director network, providing guidance and referrals.' },
            {
                type: 'ul', items: [
                    '<strong class="font-semibold">Post a Topic:</strong> As a member, you share a question, request, or challenge.',
                    '<strong class="font-semibold">Directors Respond:</strong> Directors comment, offering advice, solutions, or referrals to the right people.',
                    '<strong class="font-semibold">Broader Reach:</strong> Director engagement helps your topic reach more directors, increasing the chances of valuable support.'
                ]
            },
            { type: 'h3', text: 'Affiliation Program (H7 Members Only)' },
            { type: 'p', text: 'The Affiliation feature is <strong class="font-semibold">only applicable to H7 members</strong>. It allows members to earn commission by promoting TRACS services to others.' },
            {
                type: 'ul', items: [
                    '<strong class="font-semibold">Unique Link:</strong> You receive a <strong class="font-semibold">unique affiliate link</strong> with a tracking code to promote the services.',
                    '<strong class="font-semibold">Commission:</strong> When someone clicks your link and makes a <strong class="font-semibold">Package purchase</strong>, the sale is automatically tracked, and you earn a commission (percentage).',
                    '<strong class="font-semibold">Tracking:</strong> The TRACS application handles all commission calculations and reporting.'
                ]
            }
        ]
    }
];

// --- Helper function to get text content for searching ---
const getTextContent = (content) => {
    if (typeof content === 'string') {
        return content.replace(/<[^>]+>/g, ' '); // Strip HTML tags
    }
    if (Array.isArray(content)) {
        return content.map(getTextContent).join(' ');
    }
    if (typeof content === 'object' && content !== null) {
        return Object.values(content).map(getTextContent).join(' ');
    }
    return '';
};

// --- Child Components ---

/**
 * Renders the left-side navigation.
 * @param {Array} sections - Array of section objects.
 * @param {string} activeSectionId - The ID of the currently active section.
 */
const SideNav = ({ sections, activeSectionId }) => (
    <nav className="w-full lg:w-1/4 mb-8 lg:mb-0">
        <div className="sticky top-8">
            <h4 className="font-bold text-xl text-gray-900 mb-4">Sections</h4>
            <nav className="flex flex-col space-y-1">
                {sections.map(section => (
                    <a
                        key={section.id}
                        href={`#${section.id}`}
                        className={`
                            block px-3 py-2 rounded-md text-sm font-medium
                            ${activeSectionId === section.id
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }
                        `}
                    >
                        {section.navTitle}
                    </a>
                ))}
            </nav>
        </div>
    </nav>
);

/**
 * Renders a single content section.
 * @param {Object} section - The section object.
 * @param {React.Ref} sectionRef - The ref to be attached to the section element.
 */
const ContentSection = ({ section, sectionRef }) => (
    <section ref={sectionRef} id={section.id} className="mb-10 pt-6 -mt-6"> {/* Padding for scroll offset */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-blue-600 pl-3">
            {section.title}
        </h2>
        {/* Render dynamic content based on type */}
        {section.content.map((item, index) => {
            const key = `${section.id}-${item.type}-${index}`;

            switch (item.type) {
                case 'p':
                    return <p key={key} className="text-gray-700 leading-relaxed mb-4 text-justify" dangerouslySetInnerHTML={{ __html: item.text }} />;
                case 'h3':
                    return <h3 key={key} className="text-xl font-semibold text-gray-800 mt-6 mb-3" dangerouslySetInnerHTML={{ __html: item.text }} />;
                case 'ul':
                    return (
                        <ul key={key} className="list-disc list-outside mb-4 pl-6 text-gray-700 space-y-3 text-justify">
                            {item.items.map((li, i) => <li key={i} dangerouslySetInnerHTML={{ __html: li }} />)}
                        </ul>
                    );
                case 'ol':
                    return (
                        <ol key={key} className="list-decimal list-outside mb-4 pl-6 text-gray-700 space-y-3 text-justify">
                            {item.items.map((li, i) => <li key={i} dangerouslySetInnerHTML={{ __html: li }} />)}
                        </ol>
                    );
                case 'alert':
                    return (
                        <div key={key} className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-r-md my-4" role="alert"
                            dangerouslySetInnerHTML={{ __html: item.text }} />
                    );
                case 'table':
                    return (
                        <div key={key} className="overflow-x-auto rounded shadow-sm border my-4">
                            <table className="w-full align-middle">
                                <thead className="bg-gray-100">
                                    <tr>
                                        {item.headers.map((h, i) => (
                                            <th key={i} scope="col" className="p-3 text-left text-sm font-medium text-gray-700">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.rows.map((row, i) => (
                                        <tr key={i} className="border-t border-gray-200">
                                            {row.map((cell, j) => (
                                                <td key={j} className="p-3 text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: cell }} />
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    );
                default:
                    return null;
            }
        })}
    </section>
);

// --- Main App Component ---
export default function AppHelp() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSections, setFilteredSections] = useState(guideSections);
    const [activeSectionId, setActiveSectionId] = useState(guideSections[0]?.id || '');

    // Refs for each section to be used by IntersectionObserver
    const sectionRefs = useRef({});
    sectionRefs.current = guideSections.reduce((acc, section) => {
        acc[section.id] = acc[section.id] || React.createRef();
        return acc;
    }, {});

    // --- Search Filtering Effect ---
    useEffect(() => {
        const lowerSearchTerm = searchTerm.toLowerCase().trim();

        if (lowerSearchTerm === '') {
            setFilteredSections(guideSections);
            return;
        }

        const filtered = guideSections.filter(section => {
            const titleMatch = section.title.toLowerCase().includes(lowerSearchTerm);
            // Combine all content text for a comprehensive search
            const contentMatch = getTextContent(section.content).toLowerCase().includes(lowerSearchTerm);
            return titleMatch || contentMatch;
        });

        setFilteredSections(filtered);
    }, [searchTerm]);

    // --- ScrollSpy Effect (IntersectionObserver) ---
    useEffect(() => {
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px 0px -40% 0px', // Triggers when section is in the top 60% of the viewport
            threshold: 0,
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSectionId(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Attach observer to all section refs
        const currentRefs = sectionRefs.current;
        Object.values(currentRefs).forEach(ref => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        // Cleanup on unmount
        return () => {
            Object.values(currentRefs).forEach(ref => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, []); // Runs only on mount

    const handleSearch = (e) => {
        e.preventDefault();
        // The filtering happens via the useEffect, but we can
        // keep this in case we want to change it to "on-submit"
    };
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const [name, setName] = useState("")


    const fetchProfile = async () => {
        try {
            const token = "Bearer 36|NUtJgD15eoKNZnQXYgYo5G3cbQdZe2PdeHD16Yy1";
            const response = await axios.get("https://tracsdev.apttechsol.com/api/my-profile", {
                headers: { Authorization: token },
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

  const [showSideNav,setSideNav]=useState(false);

    return (
        <div style={{ display: "flex" }}>
        <div className="hidden lg:block"><Sidebar2 /></div>{showSideNav &&<div><Sidebar2 /></div>}
      <div className="bg-gray-100 text-gray-800 min-h-screen font-sans" style={{ width: "100%" }}>
        <header className="bg-white shadow-sm flex items-center justify-between p-4 border-b">
  <div className="flex items-center gap-2">
    {/* MOBILE MENU BUTTON */}
    <button
      onClick={() => setSideNav(prev=>!prev)}
      className="lg:hidden p-2 rounded-md bg-gray-100 hover:bg-gray-200"
    >
      <IoMdMenu className="w-6 h-6 text-gray-700" />
    </button>
                        <h1 className="text-2xl font-semibold text-gray-800 ml-4 lg:ml-0"></h1>
                    </div>

                    <div className="flex items-center space-x-4">
                          <div style={{marginRight:"15px"}}><Link to="/"><FaHome size={28} /></Link></div>
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

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Left Side Navigation */}
                        <SideNav sections={guideSections} activeSectionId={activeSectionId} />

                        {/* Right Side Content */}
                        <div className="w-full lg:w-3/4">
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                {/* Header */}
                                <header className="bg-blue-600 p-4 sm:p-5 text-white">
                                    <h1 className="text-2xl font-bold">User Guide</h1>
                                </header>

                                <main className="p-4 sm:p-6">
                                    {/* Search Bar */}
                                    <form onSubmit={handleSearch} className="mb-6">
                                        <div className="relative flex">
                                            <input
                                                type="search"
                                                id="guideSearch"
                                                className="block w-full px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Search this guide..."
                                                aria-label="Search this guide"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                            <button
                                                className="inline-flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                type="submit"
                                            >
                                                <SearchIcon />
                                            </button>
                                        </div>
                                    </form>

                                    {/* No results message */}
                                    {filteredSections.length === 0 && (
                                        <div className="bg-blue-100 border border-blue-300 text-blue-800 px-4 py-3 rounded-md" role="alert">
                                            No sections found matching your search.
                                        </div>
                                    )}

                                    {/* Sections */}
                                    <div className="space-y-6">
                                        {filteredSections.map(section => (
                                            <ContentSection
                                                key={section.id}
                                                section={section}
                                                sectionRef={sectionRefs.current[section.id]}
                                            />
                                        ))}
                                    </div>
                                </main>
                            </div>
                        </div>
                    </div>
                </div>
            </div> </div>
    );
}