import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoLogOut, IoPerson } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import "./MyMembership.css"


// Sub-component for individual info cards
const InfoCard = ({ title, value, isHighlighted = false }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="text-sm font-semibold text-gray-500 mb-1">{title}</h3>
    <p className={`text-lg font-medium ${isHighlighted ? 'text-indigo-600 font-bold' : ''}`}>{value}</p>
  </div>
);

// Sub-component for invoice history rows
// ✅ Sub-component for invoice history rows
const InvoiceRow = ({ id, date, packageName, amount }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">{date}</td>
      <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">{packageName}</td>
      <td className="px-6 py-4 whitespace-nowrap">{amount}</td>

      {/* ✅ Replace Download with a Button */}
      <td className="px-6 py-4 whitespace-nowrap flex">
        <Link
          to={`/invoice/${id}`}
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          <button style={{ background: "#10B981", color: "white", padding: "8px 18px", borderRadius: "10px" }}>Invoice</button>
        </Link>
        <div style={{ marginLeft: "10px" }}><Link to={`/historyDetails/${id}`}><button style={{ background: "#2563EB", color: "white ", padding: "8px 18px", borderRadius: "10px" }}>History Details</button></Link></div>
      </td>
    </tr>
  );
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
        { icon: 'credit-card', text: 'My Membership', active: true },
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
        <div className="p-6">
          <Link to="/" className="text-white text-2xl font-bold">TRACS</Link>
          {/* Close button in mobile view */}
          <button className="lg:hidden text-white ml-20 "
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




export default function MyMembership() {
  // Data for the invoiAppce history can be managed with state or props in a real app
  const invoiceHistory = [
    { id: 1, date: "Oct 15, 2025", package: "Standard (1 Year)", amount: "$80.00" },
    { id: 2, date: "Oct 15, 2024", package: "Standard (1 Year)", amount: "$80.00" },
    { id: 3, date: "Oct 15, 2023", package: "Standard (1 Year)", amount: "$80.00" },
  ];

  const [data, setData] = useState([]);
  const [msg, setMsg] = useState("");
  const token = sessionStorage.getItem("authToken");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://tracsdev.apttechsol.com/api/dashboard`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("API response:", response.data);
        setData(response.data.orders.data);
      } catch (error) {
        setMsg("Failed to fetch data.");
        console.error("Error fetching membership data:", error);
      }
    };

    fetchData();
  }, []);
  const latestOrder = data.length > 0
    ? data.reduce((latest, current) => {
      return new Date(current.purchase_date) > new Date(latest.purchase_date)
        ? current
        : latest;
    }, data[0])
    : null;


  function formatDate(dateString) {
    if (!dateString) return "";
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  // Usage:
  formatDate("2025-02-27"); // "Feb 27, 2025"

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
  return (
    <div style={{ display: "flex" }}><div> <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} /></div>
      <div className="bg-gray-50 text-gray-800 font-sans" style={{ width: "100%" }}>
        <header className="bg-white shadow-sm flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-gray-600 lg:hidden">
              <Icon name="menu" className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-800 ml-4 lg:ml-0"></h1>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/test" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full font-semibold text-sm">
              View Profile
            </Link>
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
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Membership</h1>
          </header>

          {/* Current Membership Card */}
          <main>
            <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200">
              <div className='activeMeme'>
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Active Membership</h2>
                    <span className="inline-block bg-green-100 text-green-800 text-sm font-medium mt-2 px-3 py-1 rounded-full">
                      {latestOrder ? "Active" : "No Active Membership"}
                    </span>
                  </div>

                </div>
                <div><Link to="/pricing"><button style={{ background: "#F59E0B", padding: "8px 18px", fontWeight: "600", color: "white", borderRadius: "7px" }}>Pricing Plan</button></Link></div>
              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <InfoCard
                  title="Package Name"
                  value={latestOrder ?
                    latestOrder.listing_package_id === "2"
                      ? "Basic"
                      : latestOrder.listing_package_id === "1"
                        ? "Trail"
                        : latestOrder.listing_package_id === "3"
                          ? "Standard"
                          : "Unknown"
                    : "-"
                  }
                  isHighlighted={true}
                />
                <InfoCard
                  title="Purchase Date"
                  value={latestOrder ? formatDate(latestOrder.purchase_date) : "-"}
                />
                <InfoCard
                  title="Expires On"
                  value={latestOrder ? formatDate(latestOrder.expired_date) : "-"}
                />
                <InfoCard
                  title="Price"
                  value={latestOrder ? `$${latestOrder.amount_usd} / year` : "-"}
                />
              </div>
            </section>

            {/* Invoice and History Details Section */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Invoice & History</h2>
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">Package</th>
                        <th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">Invoice</th>


                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {data.map(order => (
                        <InvoiceRow
                          key={order.id}
                          id={order.id}
                          date={formatDate(order.purchase_date)}
                          packageName={
                            order.listing_package_id === "2"
                              ? "Basic"
                              : order.listing_package_id === "1"
                                ? "Trail"
                                : order.listing_package_id === "3"
                                  ? "Standard"
                                  : "Unknown"
                          }
                          amount={`$${order.amount_usd}`}
                        />
                      ))}
                    </tbody>


                  </table>

                </div>
              </div>
              <div>
                <h1 style={{ marginTop: '35px', marginBottom: "25px" }} className="text-2xl font-bold text-gray-900 mb-4">Usage per package</h1>
                <div className='QuotaHolder'>
                  <div className='IntroQuota'>
                    <p style={{fontWeight:"700",marginBottom:"12px"}}>Introduction Quota</p>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div><p >Limit Count</p></div>
                      <div><p>$1</p></div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div><p>Used Count</p></div>
                      <div><p>$1</p></div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div><p>Available Count</p></div>
                      <div><p>$1</p></div>
                    </div>

                  </div>
                  <div className='ContactsStorage'>
                    <p style={{fontWeight:"700",marginBottom:"12px"}}>Contacts Storage</p>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div><p>Limit Count</p></div>
                      <div><p>$1</p></div>
                    </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div><p>Used Count</p></div>
                      <div><p>$1</p></div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div><p>Available Count</p></div>
                      <div><p>$1</p></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>

      </div></div>
  );
}
