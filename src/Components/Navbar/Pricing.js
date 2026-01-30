import React, { useEffect, useState } from "react";
import axios from "axios";
import { Check } from "lucide-react";
import Header from "../Heaader/Header";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Pricing.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
/* ---------------- Pricing Card ---------------- */
const PricingCard = ({ plan }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = sessionStorage.getItem("authToken"); // or your actual token key

    if (!token) {
      // No token → redirect to TRACS login
      navigate("/tracsSignIn"); 
      // or: window.location.href = "https://tracsdev.apttechsol.com/login";
      return;
    }

    // Token exists → go to payment
    navigate(
      `/tracsPayment?title=${plan.title}&price=${plan.price}&id=${plan.id}`
    );
  };
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 relative flex flex-col">
      <div className="flex-grow">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          {plan.title}
        </h3>

        <div className="mb-6">
          <span
            className="text-5xl font-bold"
            style={{ fontSize: "3rem", fontWeight: 700, color: "#27479e" }}
          >
            ${plan.price}
          </span>
          <span
            className="text-lg"
            style={{ fontSize: "1.25rem", color: "#6b7280" }}
          >
            {plan.trail}
          </span>
        </div>

        <ul className="space-y-3 text-gray-700 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-5 h-5 text-green-500 mr-2 mt-1 shrink-0" />
              <span>
                {feature.name}
                {feature.note && (
                  <>
                    <br />
                    <span className="text-xs text-gray-500">
                      {feature.note}
                    </span>
                  </>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button Logic */}
      <button
        onClick={handleGetStarted}
        className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
      >
        Get Started
      </button>
      
    </div>
  );
};

/* ---------------- Header ---------------- */
const PricingHeader = ({heading}) => (

  <header className="text-center max-w-4xl mx-auto mb-12">
   
   
  </header>
);

/* ---------------- Main Page ---------------- */
export default function Pricing() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heading,setHeading]=useState("")

  /* Fetch API */
  useEffect(() => {
    axios
      .get("https://tracsdev.apttechsol.com/api/pricing-plan")
      .then((res) => {
        const activePlans =
          res.data?.listingPackages?.filter(
            (p) => p.status === "1"
          ) || [];

        setPlans(activePlans);
        setHeading(res.data?.seo_text?.meta_description)
        setLoading(false);
      })
      .catch((err) => {
        console.error("Pricing API Error:", err);
        setLoading(false);
      });
  }, []);

  /* Map API → UI */
  const mapPlanToUI = (plan) => ({
    id: plan.id,
    title: plan.package_name,
    price: Number(plan.price),
    trail:
      plan.price === "0"
        ? ` / Includes ${plan.number_of_days}-day trial`
        : " / Year",
    features: [
      { name: `Make up to ${plan.introductions_per_month} Introductions ${plan.id === 1 ? "":"Per Year"}` },
    
      plan.use_our_templates === "1" && { name: "Use Our Templates on your own" },
      plan.network_resources === "1" && {
        name: "Networking Resources Available",
      },
      plan.crm_integrations === "1" && plan.id !== 1 &&{
        name: "Allows CRM Integrations",
        note: "(Additional Charges)",
      },
      plan.network_resources === "1" &&{name:"Networking Events"},
      plan.manage_mail_templates === "1" &&{name:"Customise your Templates "},
      plan.easy_follow_up === "1" && plan.id !== 1  &&{ name: "Easy Follow Up" },
      { name: `Can Add Up to ${plan.no_of_contacts} Contacts` },
    ].filter(Boolean),
  });

  return (
    <div className="font-sans bg-slate-50 min-h-screen">
      <Header />
      <Navbar />

      <div
        className="curb"
        style={{ marginTop: "2px", marginBottom: "20px" }}
      >
        <div className="curbData2">
          <h1 style={{ fontSize: "35px" }}>Pricing</h1>
          <p>{heading}</p>
          <p></p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <PricingHeader heading={heading} />

        {loading ? (
          <p className="text-center text-lg">Loading plans...</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans
              .sort((a, b) => Number(a.price) - Number(b.price))
              .map((plan) => (
                <PricingCard
                  key={plan.id}
                  plan={mapPlanToUI(plan)}
                />
              ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
