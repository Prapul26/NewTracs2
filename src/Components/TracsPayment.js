import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import {
  Lock,
  Shield,
  Box,
  DollarSign,
  Mail,
  Phone,
  Calendar,
  Check,
  Loader2,
  CreditCard,
  ChevronDown
} from "lucide-react";  

import Header from "./Heaader/Header";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { FaLock } from "react-icons/fa";

const stripePromise = loadStripe(
 "pk_test_51JU61aF56Pb8BOOX5ucAe5DlDwAkCZyffqlKMDUWsAwhKbdtuY71VvIzr0NgFKjq4sOVVaaeeyVXXnNWwu5dKgeq00kMzCBUm5" || "MISSING_KEY"
);

// ======================================================================
//                    PAYMENT FORM COMPONENT
// ======================================================================
function PaymentForm({ selectedTitle, selectedPrice, userToken }) {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    packageName: selectedTitle,
    price: selectedPrice,
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    aid: "",
    address: "",
    city: "",
    state: "",
    zip: ""
  });
  const [states, setStates] = useState([]);

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      const resp = await axios.get(
        "https://tracsdev.apttechsol.com/api/my-profile",
        {
          headers: { Authorization: `Bearer ${userToken}` }
        }
      );

      const data = resp.data;
      const fullName = data.user?.name || "";
      const firstName = fullName.split(" ")[0] || "";
      const lastName = fullName.split(" ").slice(1).join(" ") || "";
            setStates(data.states || []);

console.log("userToken:",userToken)
      setFormData((prev) => ({
        ...prev,
        firstName,
        lastName,
        email: data.user.email || "",
        mobile: data.user.phone || ""
      }));
    } catch (err) {
      console.log("Profile fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  // ======================================================================
  //                        HANDLE PAYMENT
  // ======================================================================
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);
try {
  const card = elements.getElement(CardElement);

  const result = await stripe.createToken(card);
  if (result.error) {
    alert(result.error.message);
    setIsLoading(false);
    return;
  }

  const token = result.token;

  // USE ONE AUTH TOKEN FOR BOTH PLACES
  const authToken = sessionStorage.getItem("authToken");
// Convert package name to numeric ID
const packageId =
  selectedTitle === "Trail" ? 1 :
  selectedTitle === "Basic Package" ? 2 :
  selectedTitle === "Standard Package" ? 3 :
  0; // default if nothing matches

  const fd = new FormData();
  fd.append("packageName", selectedTitle);
  fd.append("price", selectedPrice);
  fd.append("stripeToken", token.id);
  fd.append("_token", authToken);   
  fd.append("aid", formData.aid);

  fd.append("first_name", formData.firstName);
  fd.append("last_name", formData.lastName);
  fd.append("email", formData.email);
  fd.append("mobile_number", formData.mobile);
  fd.append("street_address", formData.address);
    fd.append("commission", "20");
  fd.append("city", formData.city);
  fd.append("state", formData.state);
  fd.append("postal_code", formData.zip);
// 🔥 Console log FormData properly
console.log("------ FORM DATA BEING SENT ------");
for (let pair of fd.entries()) {
  console.log(pair[0] + ": ", pair[1]);
}

console.log("----------------------------------");
  const response = await axios.post(
    `https://tracsdev.apttechsol.com/api/stripe-payment/${packageId}`,
    fd,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  console.log("Payment Response:", response.data);
  if (response.data.status !== "success") {
    alert( response.data.message);
  } else {
    setShowModal(true);
  }
} catch (err) {
  console.error("Payment Error:", err.response?.data || err.message);
  alert("Payment failed: " + (err.response?.data?.message || err.message));
}

    setIsLoading(false);
  };

  const closeModal = () => setShowModal(false);

  // ======================================================================
  //                        RENDER FORM
  // ======================================================================
  return (

    <div>
      <div style={{background:"#4f46e5",padding:"1.5rem" ,display:"flex"}}>
        <div style={{marginRight:"7px",marginTop:"4px"}}><FaLock color="white" size={19}/></div>  <lable style={{fontSize:"20px",color:"white",fontWeight:"600"}}>Secure Checkout</lable>
        </div>
    <form onSubmit={handlePayment} className="p-6 space-y-8">
      {/* Order Summary */}
       
      <div className="border-b pb-8">
       
        <h3 className="text-lg font-medium mb-4">Order Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Package */}
          <div>
            <label>Package Name</label>
            <input
              name="packageName"
              value={formData.packageName}
              readOnly
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Price */}
          <div>
            <label>Price</label>
            <input
              name="price"
              value={formData.price}
              readOnly
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>
      </div>

      {/* Customer Details */}
      <div className="border-b pb-8">
        <h3 className="text-lg font-medium mb-4">Customer Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label>First Name *</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label>Last Name *</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label>Email *</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label>Mobile *</label>
            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div className="mb-4">
          <label>Address *</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label>City *</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label>State *</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select</option>
                {states.map((s) => (
        <option key={s.id} value={s.name}>
          {s.code}
        </option>
      ))}
            </select>
          </div>

          <div>
            <label>Postal Code *</label>
            <input
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>
      </div>

      {/* Payment Section */}
      <div>
        <h3 className="text-lg font-medium mb-4">Payment Details</h3>
        <div className="p-4 border rounded bg-gray-50">
         <CardElement
  options={{
    hidePostalCode: true,
    style: {
      base: {
        fontSize: "16px",
        color: "#32325d",
        "::placeholder": {
          color: "#a0aec0",
        },
      },
    },
  }}
  className="p-3 border rounded bg-white"
/>

        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-indigo-600 text-white rounded"
        >
          {isLoading ? "Processing..." : "Pay Now"}
        </button>
      </div>

      {/* SUCCESS MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow text-center">
            <Check className="mx-auto text-green-600 w-10 h-10 mb-3" />
            <h2 className="text-xl font-semibold">Payment Successful!</h2>
            <button
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </form></div>
  );
}

// ======================================================================
//                          MAIN COMPONENT
// ======================================================================
export default function TracsPayment() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const selectedTitle = params.get("title");
  const selectedPrice = params.get("price");
  const userToken = sessionStorage.getItem("authToken");

  return (
    <>
      <Header />
      <Navbar />
                  <div className='ph1'style={{marginTop:"2px",marginBottom:"20px"}}><div className='p1h1'><h1 style={{fontSize:'35px'}}>Payment Page</h1></div></div>


      <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
        <div className="max-w-3xl w-full bg-white rounded shadow">
          <Elements stripe={stripePromise}>
            <PaymentForm
              selectedTitle={selectedTitle}
              selectedPrice={selectedPrice}
              userToken={userToken}
            />
          </Elements>
        </div>
      </div>

      <Footer />
    </>
  );
}
