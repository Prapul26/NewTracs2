import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from './Heaader/Header';
import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';
import { FaEnvelope, FaPhone, FaGlobe, FaBriefcase } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { TiArrowBack } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';


// --- Icon Components (using Font Awesome classes) ---
// In a real React app, you'd typically use a library like `react-icons`
const Icon = ({ className }) => <i className={className}></i>;

// --- Gallery Component ---


const ImageModal = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  if (currentIndex === null) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
      
      {/* Close */}
      <button
        className="absolute top-5 right-5 text-white text-2xl"
        onClick={onClose}
      >
        <FaTimes />
      </button>

      {/* Previous */}
      {images.length > 1 && (
        <button
          className="absolute left-5 text-white text-3xl"
          onClick={onPrev}
        >
          <FaChevronLeft />
        </button>
      )}

      {/* Image */}
      <img
        src={`https://tracsdev.apttechsol.com/public/${images[currentIndex].image}`}
        alt="Gallery Preview"
        className="max-h-[85vh] max-w-[90vw] rounded-lg shadow-lg"
        style={{height:"70%",width:"50%"}}
      />

      {/* Next */}
      {images.length > 1 && (
        <button
          className="absolute right-5 text-white text-3xl"
          onClick={onNext}
        >
          <FaChevronRight />
        </button>
      )}
    </div>
  );
};


const Gallery = ({ profile }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const openModal = (index) => setActiveIndex(index);
  const closeModal = () => setActiveIndex(null);

  const prevImage = () =>
    setActiveIndex((prev) =>
      prev === 0 ? profile.gallery.length - 1 : prev - 1
    );

  const nextImage = () =>
    setActiveIndex((prev) =>
      prev === profile.gallery.length - 1 ? 0 : prev + 1
    );

  return (
    <div className="p-6 md:p-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Gallery</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {profile.gallery && profile.gallery.length > 0 ? (
          profile.gallery.map((photo, index) => (
            <img
              key={index}
              src={`https://tracsdev.apttechsol.com/public/${photo.image}`}
              alt={`Gallery ${index}`}
              onClick={() => openModal(index)}
              className="cursor-pointer rounded-lg shadow-md w-full h-auto object-cover aspect-square hover:scale-105 transition-transform duration-300"
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No gallery images available
          </p>
        )}
      </div>

      {/* Modal */}
      <ImageModal
        images={profile.gallery}
        currentIndex={activeIndex}
        onClose={closeModal}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </div>
  );
};




// --- Reusable Profile and Contact Info Components ---


const AboutSection = ({profile}) => (
     <div className="p-6 md:p-8 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-black-900 dark:text-black mb-4">About</h2>
        <p className="text-gray-600 dark:text-black-300 leading-relaxed">
            {profile.about}
        </p>
    </div>
);


// --- Layout Switcher Component ---

// --- Layout 1: Card Layout Component ---
const CardLayout = ({profile}) => (
    <div className="max-w-1xl mx-auto">
        <div className="bg-white dark:bg-white-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <img className="h-24 w-24 md:h-28 md:w-28 rounded-full object-cover shadow-md border-4 border-white dark:border-gray-700" src={profile.imagePreview1} alt="Profile Picture" />
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-black">{profile.name1}</h1>
                        <p className="text-md text-indigo-500 dark:text-indigo-400 font-semibold">{profile.membertype}  Member</p>
                        <p style={{color:"black"}}>{profile.business_name}</p>
                    </div>
                </div>
            </div>
            <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact items */}
                  <ContactItem icon={FaBriefcase} label="Business Name" value={profile.business_name} />
<ContactItem icon={FaEnvelope} label="Email" value={profile.email1} />
<ContactItem icon={FaPhone} label="Phone" value={profile.phone} />
<ContactItem
  icon={FaGlobe}
  label="Website"
  value={profile.website}
  href={profile.website.startsWith("http")
    ? profile.website
    : `https://${profile.website}`}
  isExternal
/>







                    <div className="md:col-span-1">
<ContactItem
  icon={FaLinkedin}
  label="LinkedIn"
  value={profile.linkedin}
  href={profile.linkedin.startsWith("http")
    ? profile.linkedin
    : `https://${profile.linkedin}`}
  isExternal
/>

                    </div>
                </div>
            </div>
            <AboutSection profile={profile}/>
            <Gallery profile={profile}/>
        </div>
    </div>
);

const ContactItem = ({ icon: Icon, label, value, href, isExternal = false }) => (
  <div className="flex items-center space-x-3 p-4 bg-gray-100 rounded-lg">
    <Icon className="text-indigo-500 text-xl w-6" />
    <div>
      <h3 className="text-sm font-semibold text-gray-500">{label}</h3>
      {href ? (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-gray-900 hover:text-indigo-600"
        >
          {value}
        </a>
      ) : (
        <p className="text-gray-900">{value}</p>
      )}
    </div>
  </div>
);


// --- Layout 2: Two-Column Layout Component ---





// --- Main App Component ---
export default function Test() {
    const [activeLayout, setActiveLayout] = useState('card');

    const renderLayout = () => {
    
                return <CardLayout profile={profile}/>;
        
    };
 









    const [imagePreview, setImagePreview] = useState("");
      const[name,setName]=useState("")   ;
                  const cleanHTML = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, ''); // remove all HTML tags
};
     const [membertype, setMembertype] = useState("");
    const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    linkedin: "",
    about: "",
    imagePreview: "",
    membertype: "",
    gallery: [],
  });
  const fetchProfile = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      const response = await axios.get("https://tracsdev.apttechsol.com/api/my-profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;
     
      setName(data.user.name || "");

      setImagePreview(`https://tracsdev.apttechsol.com/public/${data.user.image}`);

       const name9 = data.user.member_type;
          if (name9 === "1") {
            setMembertype("H7")
          }
          else if (name9 === "2") {
            setMembertype("Tracs")
          }

                setProfile({
        name1: data.user.name || "",
        email1: data.user.email || "",
        phone: data.user.phone || "",
        website: data.user.website || "",
        linkedin: data.user.linkedin || "",
        
        about: cleanHTML(data.user.about || ""),
        imagePreview1: `https://tracsdev.apttechsol.com/public/${data.user.image}`,
        membertype: data.user.member_type === "1" ? "H7" : "Tracs",
        gallery: data.total_photos || [],
        business_name: data.user.business_name || "",
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
useEffect(() => {
  fetchProfile();
}, [fetchProfile]);
const navigate=useNavigate()
 const handleBack=()=>{
  navigate(-1)
 }
    return (
      <div>
        <Header />
        <Navbar />
        <div style={{display:"flex"}}><div ></div>
        <div style={{width:"100%"}}>
            <div>  </div>
        <div className="bg-white-100 dark:bg-white-900 text-gray-800 dark:text-gray-200 min-h-screen font-sans" style={{width:"100%"}}>
             {/* In a real React project, Google Fonts and Font Awesome would be included 
                in your main `index.html` file or imported in your main CSS file.
            */}
            
            <div className="container mx-auto p-4 md:p-8 max-w-1xl">
                                 <div className='bg-blue-600 hover:bg-blue-500 mb-5' style={{ padding: "8px 18px", color: "white", width: "70px", borderRadius: "15px" }} onClick={handleBack}><TiArrowBack size={30} /></div>

                {renderLayout()}
            </div>
        </div></div></div>
        <Footer /></div>
    );
}
