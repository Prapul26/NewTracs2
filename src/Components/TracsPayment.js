import React, { useEffect, useState } from "react";
import axios from "axios";
import { data, useLocation, useNavigate } from "react-router-dom";
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
    final_payable: "",
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
  const [packageName, setpN] = useState("");
  const [packagePrice, setpp] = useState("");
  const [newPrice, setPrice] = useState("")
  // Fetch user profile
  const location = useLocation();



  const fetchProfile = async () => {
    try {

      const queryParams = new URLSearchParams(location.search);
      const planid = queryParams.get("id")
      const resp = await axios.get(
        `https://tracsdev.apttechsol.com/api/purchase-package/${planid}`,
        {
          headers: { Authorization: `Bearer ${userToken}` }
        }
      );

      const data = resp.data;
      const fullName = data.user?.name || "";
      const firstName = fullName.split(" ")[0] || "";
      const lastName = fullName.split(" ").slice(1).join(" ") || "";
      setStates(data.states || []);
      setPrice(data.package?.price)
      setpp(data.package_price)
      setpN(data.package?.package_name)

      console.log("userToken:", userToken,
        "packageName: ", packageName, packagePrice
      )
      setFormData((prev) => ({
        ...prev,
        firstName,
        lastName,
        final_payable: data.package_price,
        email: data.user.email || "",
        mobile: data.user.phone || ""
      }));
    } catch (err) {
      console.log("Profile fetch error:", err);
      alert(err.response?.data?.message)
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  const [data2, setData2] = useState([])
  const [oldPrice, setOldPrice] = useState("");
  const [purchaseDate, setPurchaceDate] = useState("");
  const [billingCycleDays, setBillingCycleDays] = useState("")
  const token = sessionStorage.getItem("authToken");
  useEffect(() => {
    const oldFetchDetails = async () => {
      try {

        const response = await axios.get("https://tracsdev.apttechsol.com/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const orders = response.data.orders?.data || [];

        if (orders.length > 0) {
          const latestOrder = orders.reduce((latest, current) =>
            new Date(current.purchase_date) >
              new Date(latest.purchase_date)
              ? current
              : latest
          );

          setOldPrice(latestOrder.amount_real_currency);
          setPurchaceDate(latestOrder.purchase_date);
          setBillingCycleDays(latestOrder.expired_day);

          // ✅ log from source
          console.log(
            "Latest Order amount →", latestOrder.amount_real_currency,
            "purchase date", latestOrder.purchase_date
          );
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    oldFetchDetails();
  }, []);
  const getUSToday = () => {
    const now = new Date();

    const usParts = now.toLocaleString("en-US", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    // Convert "MM/DD/YYYY, HH:MM:SS" → Date
    return new Date(usParts);
  };
  /*
  const calculateProratedAmount = () => {
    if (
      oldPrice == null ||
      newPrice == null ||
      !purchaseDate ||
      !billingCycleDays
    )
      return null;
  
    const purchase = new Date(purchaseDate);
    const expiry = new Date(purchase);
    expiry.setDate(expiry.getDate() + Number(billingCycleDays));
  
    const today = getUSToday();
  
    const remainingDays = Math.max(
      Math.floor((expiry - today) / (1000 * 60 * 60 * 24)),
      0
    );
  
    const totalDays = Number(billingCycleDays);
    const usedDays = totalDays - remainingDays;
  
    const perDayOld = Number(oldPrice) / totalDays;
    const perDayNew = Number(newPrice) / totalDays;
  
    let amount = 0;
    let type = "";
  
    // 🟢 Same plan
    if (Number(oldPrice) === Number(newPrice)) {
      amount = perDayOld * usedDays;
      type = "USED_AMOUNT";
    }
  
    // 🔺 Upgrade
    else if (Number(newPrice) > Number(oldPrice)) {
      amount = (perDayNew - perDayOld) * remainingDays;
      type = "UPGRADE_CHARGE";
    }
  
    // 🔻 Downgrade
    else {
      amount = (perDayOld - perDayNew) * remainingDays;
      type = "DOWNGRADE_REFUND";
    }
  
    return {
      amount: Number(amount.toFixed(2)),
      type,
      usedDays,
      remainingDays,
    };
  };
  
  
  useEffect(() => {
    const result = calculateProratedAmount();
  
    if (result) {
      setpp(result.amount);
  
      console.log("💰 Final Amount:", result.amount);
      console.log("📌 Type:", result.type);
      console.log("📆 Used Days:", result.usedDays);
      console.log("⏳ Remaining Days:", result.remainingDays);
      console.log(
        "🇺🇸 US Today:",
        new Date().toLocaleDateString("en-US", {
          timeZone: "America/New_York",
        })
      );
    }
  }, [oldPrice, newPrice, purchaseDate, billingCycleDays]); */


  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate()
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

      if (!result || result.error || !result.token) {
        alert(result?.error?.message || "Stripe token creation failed");
        setIsLoading(false);
        return;
      }

      const stripeToken = result.token.id;
      console.log("Stripe Token:", stripeToken);


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
      fd.append("stripeToken", stripeToken);

      fd.append("_token", authToken);
      fd.append("aid", formData.aid);
      fd.append("final_payable", formData.final_payable)
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
      const queryParams = new URLSearchParams(location.search);
      const packageId2 = queryParams.get("id");

      console.log("packageId", packageId2);

      const response = await axios.post(
        `https://tracsdev.apttechsol.com/api/stripe-payment/${packageId2}`,
        fd,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Payment Response:", response.data);
      if (response.data.status !== "success") {
        alert(response.data.message);
        navigate("/myMembership")
      } else {
        setShowModal(true);
          navigate("/myMembership")
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
  const handleCancle = () => {
    navigate("/pricing")
  }
  return (

    <div>
      <div style={{ background: "rgb(22, 59, 109)", padding: "1.5rem", display: "flex" }}>
        <div style={{ marginRight: "7px", marginTop: "8px" }}><FaLock color="white" size={20} /></div>  <h2 style={{ fontSize: "20px", color: "white", fontWeight: "600" }}>Secure Checkout</h2>
      </div>
      <form onSubmit={handlePayment} className="p-6 space-y-8">
        {/* Order Summary */}

        <div className="border-b pb-8">

          <h5 className="text-lg font-medium mb-4">Order Summary</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Package */}
            <div>
              <label>Package Name</label>
              <input
                name="packageName"
                value={packageName}
                readOnly
                className="w-full border px-3 py-2 rounded"
                style={{ background: "rgb(233, 236, 239)" }}
              />
            </div>

            {/* Price */}
            <div>
              <label>Price</label>
              <input
                name="price"
                value={packagePrice}
                readOnly
                className="w-full border px-3 py-2 rounded"
                style={{ background: "rgb(233, 236, 239)" }}
              />
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="border-b pb-8">
          <h5 className="text-lg font-medium mb-4">Customer Details</h5>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label>First Name *</label>
              <input
                name="firstName"
                value={formData.firstName}
                readOnly
                required
                style={{ background: "rgb(233, 236, 239)" }}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label>Last Name *</label>
              <input
                name="lastName"
                value={formData.lastName}
                readOnly
                style={{ background: "rgb(233, 236, 239)" }}
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
                readOnly
                style={{ background: "rgb(233, 236, 239)" }}
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
                onChange={(e) => {
                  const cleanValue = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                  handleChange({
                    target: { name: "city", value: cleanValue },
                  });
                }}
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
                  <option key={s.id} value={s.code}>
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
                onChange={(e) => {
                  const value = e.target.value;

                  // allow only numbers and max 5 digits
                  if (/^\d{0,5}$/.test(value)) {
                    handleChange(e);
                  }
                }}
                inputMode="numeric"
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div>
          <h5 className="text-lg font-medium mb-4">Payment Details</h5>
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
          <div><button onClick={handleCancle} style={{ color: "white", fontWeight: "600", background: "rgb(107, 114, 128)", padding: "8px 18px", borderRadius: "5px", marginRight: "30px" }}>Cancel</button></div>

          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-indigo-600 text-white rounded"
          >
            {isLoading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </form>

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

      <div></div></div>

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
  const [stripePromise, setStripePromise] = useState(null);
  const [loadingStripe, setLoadingStripe] = useState(true);

  useEffect(() => {
    const fetchStripeKey = async () => {
      try {
        const res = await axios.get(
          "https://tracsdev.apttechsol.com/api/purchase-package/3",
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );

        const publicKey = res.data?.stripe?.stripe_key;

        if (!publicKey) {
          throw new Error("Stripe public key missing");
        }

        setStripePromise(loadStripe(publicKey));
      } catch (err) {
        console.error("Stripe key load error:", err);
        alert("Unable to load payment gateway");
      } finally {
        setLoadingStripe(false);
      }
    };

    fetchStripeKey();
  }, [userToken]);

  return (
    <>
      <Header />
      <Navbar />
      <div className='ph1' style={{ marginTop: "2px", marginBottom: "20px" }}><div className='p1h1'><h1 style={{ fontSize: '35px' }}>Payment Page</h1></div></div>


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
