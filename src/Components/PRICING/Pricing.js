   import React from 'react';
import { Check } from 'lucide-react';
import Header from '../Heaader/Header';
import Navbar from '../Navbar/Navbar';
import './Pricing.css'
import Footer from '../Footer/Footer';
import { IoMail } from 'react-icons/io5';
import { Link } from 'react-router-dom';

// --- Reusable Pricing Card Component ---
// This component takes props to display a pricing plan
const PricingCard = ({ plan }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 relative flex flex-col">
      <div className="flex-grow">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2"  >{plan.title}</h3>
       
        <p className="text-sm font-medium text-indigo-600 mb-6">
         
        </p>
        
        <div className="mb-6">
          <span className="text-5xl font-bold text-gray-900" style={{    fontSize: "3rem",fontWeight: "700",color: "#27479e"}}>${plan.price}</span>
          <span className="text-lg text-gray-500" style={{fontSize: "1.25rem",
    color:"#6b7280"}}>  {plan.trail}</span>
        </div>

        <ul className="space-y-3 text-gray-700 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-1" />
              <span>
                {feature.name}
                {feature.note && (
                  <br />
                )}
                {feature.note && (
                  <span className="text-xs text-gray-500">{feature.note}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
      
      <Link
       to={`/tracsPayment?title=${plan.title}&price=${plan.price}`}
        className="w-full text-center bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
      >
        Get Started
      </Link>
    </div>
  );
};

// --- Page Header Component ---
const PricingHeader = () => {
  return (
    <header className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Choose the Plan That's Right for You
      </h1>
      <p className="text-lg text-gray-600">
        Simple, transparent pricing. No hidden fees.
        Start free and upgrade when you're ready.
      </p>
    </header>
  );
};

// --- Main App Component ---
// This holds the data for the plans and renders the page
export default function App() {
  
  // Data for the pricing plans
  const plans = [
     {
      title: "Trail",
      description: "Perfect for getting started with networking.",
      price: 0,
      trail:" / Includes a 14-day trial.",
      features: [
        { name: "Make up to 5 Introductions" },
        { name: "Manage Previous Introductions" },
        { name: "Use Our Templates or your own" },
        { name: "Networking Resources Available" },
       
        { name: "Networking Events" },
        {name :"Can Add Upto 10 Contacts"},
       
      ]
    },
    {
      title: "Basic Package",
      description: "Perfect for getting started with networking.",
      price: 80,
      features: [
        { name: "Make up to 30 Introductions" },
        { name: "Manage Previous Introductions" },
        { name: "Use Our Templates or your own" },
        { name: "Networking Resources Available" },
        { 
          name: "Allows CRM Integrations", 
          note: "(Additional Charges for Integration)" 
        },
        { name: "Networking Events" },
          {name :"Can Add Upto 100 Contacts"}
      ]
    },
    {
      title: "Standard Package",
      description: "For growing teams and professionals.",
      price: 150,
      features: [
        { name: "Unlimited Introductions per month" },
        { name: "Manage Previous Introductions" },
        { name: "Use Our Templates or your own" },
        { name: "Networking Resources Available" },
        { 
          name: "Allows CRM Integrations", 
          note: "(Additional Charges for Integration)" 
        },
        { name: "Networking Events" },
        { name: "Customise your Templates" },
        { name: "Easy Follow Up" },
          {name :"Can Add Upto 1000 Contacts"}
      ]
    }
  ];

  return (
    <div className="font-sans bg-slate-50 min-h-screen">
      <Header />
      <Navbar />
        <div className='ph1'style={{marginTop:"2px",marginBottom:"20px"}}><div className='p1h1'><h1 style={{fontSize:'35px'}}>Pricing</h1></div></div>
      <div className="container mx-auto px-6 py-16 md:py-24">
        
        <PricingHeader />

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PricingCard plan={plans[0]} />
          <PricingCard plan={plans[1]} />
           <PricingCard plan={plans[2]} />
        </div>

      </div>
       <div className="pricingSearch">
          <div className="priceData">
            <h1 style={{fontSize:"30px"}}>Subscribe to Newsletter</h1>
            <p>
              Subscribe to get update and information. Don't worry, we won't
              send spam!
            </p>
          </div>
          <div className="priceSearch">
            <div className="searchdiv">
              <div style={{marginTop:"7px",marginLeft:"8px"}}><IoMail size={24} color='#007bff'/></div>
              <input type="text" placeholder="Email" />
            </div>
            <div className="ppbutton">
              <button style={{color:"#007bff",marginTop:"-2px",fontWeight:"800",background:"white"}}>Subscribe Here</button>
            </div>
          </div>
        </div>
      <Footer />
    </div>
  );
}
