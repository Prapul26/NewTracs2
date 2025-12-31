import React, { useEffect } from 'react';
import Header from './Heaader/Header';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

// Define the contact information data structure
const contactData = [
    {
        title: "Call Us",
        value: "513.371.5299",
        link: "tel:5133715299",
        icon: (
            <svg className="h-10 w-10 mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72a12.84 12.84 0 0 0 .7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45a12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
        ),
        type: 'link'
    },
    {
        title: "Send an Email",
        value: "info@tracs.app",
        link: "mailto:info@tracs.app",
        icon: (
            <svg className="h-10 w-10 mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
        ),
        type: 'link'
    }
    
];

// Reusable Contact Card Component
const ContactCard = ({ title, value, link, icon, type }) => {
    // Custom style for consistent color/font (text-xl font-semibold text-gray-800)
    const contentClasses = "text-xl font-semibold text-gray-800 leading-relaxed";
    const hoverClasses = type === 'link' ? "hover:text-indigo-600 transition duration-150" : "";

    return (
        <div className="contact-card bg-white border border-gray-200 rounded-xl p-6 text-center hover:bg-indigo-50 shadow-sm
            transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
            
            <div className="text-indigo-500 mx-auto mb-4">
                {icon}
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>

            {/* Content Display: Link or Plain Text */}
            {type === 'link' ? (
                <a href={link} className={`${contentClasses} ${hoverClasses} block break-all`}>
                    {value}
                </a>
            ) : (
                <p className={contentClasses}>{value}</p>
            )}
        </div>
    );
};

// Main App Component
const TracsContactUS = () => {
    // Fix: Use useEffect to inject the global font link without using non-standard style attributes.
    useEffect(() => {
        // Only run once on mount
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
        
        // Cleanup function (optional but good practice)
        return () => {
            document.head.removeChild(fontLink);
        };
    }, []);

    return (
        <div> <Header />
        <Navbar />
        <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4 font-sans">
            {/* The font family 'Inter' is now applied globally via the link tag added in useEffect */}
           
            
            <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-6 sm:p-10">
                {/* Header */}
                <header className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">Get in Touch</h1>
                    <p className="text-lg text-gray-500">We'd love to hear from you. Find our contact details below.</p>
                </header>

                {/* Contact Cards Grid (Responsive) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {contactData.map((item, index) => (
                        <ContactCard key={index} {...item} />
                    ))}
                </div>
            </div>
        </div>
        <Footer /></div>
    );
};

export default TracsContactUS;