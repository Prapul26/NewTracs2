import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Lock,
  Shield,
  Box,
  DollarSign,
  Mail,
  Phone,
  CreditCard,
  Calendar,
  Check,
  Loader2,
  ChevronDown
} from 'lucide-react';
import Header from './Heaader/Header';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

export default function TracsPayment() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userToken = sessionStorage.getItem("authToken");
  const selectedTitle = params.get("title");
  const selectedPrice = params.get("price");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || "MISSING_KEY"
);
  const [formData, setFormData] = useState({
    packageName: selectedTitle,
    price: selectedPrice,
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  // --- Fetch Profile API ---
  const fetchProfile = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      const response = await axios.get("https://tracsdev.apttechsol.com/api/my-profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;
      if (data.user?.id) {
        sessionStorage.setItem("userId", data.user.id);
      }

      const fullName = data.user.name || "";
      const firstName = fullName.split(" ")[0] || "";
      const lastName = fullName.split(" ").slice(1).join(" ") || "";

      setFormData(prev => ({
        ...prev,
        firstName,
        lastName,
        email: data.user.email || "",
        mobile: data.user.phone || ""
      }));

    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Card Number Formatting (0000 0000 0000 0000)
    if (name === 'cardNumber') {
      const digits = value.replace(/\D/g, '');
      formattedValue = digits.replace(/(.{4})/g, '$1 ').trim();
    }

    // Expiry Formatting (MM/YY)
    if (name === 'expiry') {
      const digits = value.replace(/\D/g, '');
      if (digits.length >= 2) {
        formattedValue = digits.substring(0, 2) + '/' + digits.substring(2, 4);
      } else {
        formattedValue = digits;
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };


 const handlePayment = async () => {
  try {
    const stripe = await stripePromise;

    const [expMonth, expYear] = formData.expiry.split("/");

    const { token, error } = await stripe.createToken("card", {
      number: formData.cardNumber.replace(/\s/g, ""),
      exp_month: expMonth,
      exp_year: `20${expYear}`,
      cvc: formData.cvc,
    });

    if (error) {
      alert("Invalid card details");
      return;
    }

    const stripeToken = token.id;

    // --- Create FormData ---
    const fd = new FormData();
    fd.append("packageName", selectedTitle);
    fd.append("price", selectedPrice);
    fd.append("stripe_token", stripeToken);
    fd.append("user_token", userToken);

    fd.append("firstName", formData.firstName);
    fd.append("lastName", formData.lastName);
    fd.append("email", formData.email);
    fd.append("mobile", formData.mobile);
    fd.append("address", formData.address);
    fd.append("city", formData.city);
    fd.append("state", formData.state);
    fd.append("postal_code", formData.zip);

    console.log("FormData Sent:", fd);

    // --- Send to API ---
    const response = await axios.post(
      "https://tracsdev.apttechsol.com/api/stripe-payment/2",
      fd
    );

    alert("Payment Successful!");
    console.log(response.data);  // FIXED

  } catch (error) {
    console.error(error);
  
  }
};


  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? All entered data will be lost.")) {
      setFormData({
        packageName: selectedTitle,
        price: selectedPrice,
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData(prev => ({
      ...prev,
      packageName: selectedTitle, // Keep defaults
      price: selectedPrice,
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      cardNumber: '',
      expiry: '',
      cvc: ''
    }));
  };

  return (
    <div>
      <Header />
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-4 flex items-center justify-center font-sans text-gray-800">

        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

          {/* Header */}
          <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Lock className="w-5 h-5" /> Secure Checkout
            </h2>
            <div className="text-indigo-100 text-sm font-medium flex items-center gap-1">
              <Shield className="w-4 h-4" /> SSL Encrypted
            </div>
          </div>

          {/* Form Body */}
          <form onSubmit={handlePayment} className="p-6 md:p-8 space-y-8">

            {/* Section 1: Order Summary */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Package Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Package Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Box className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      name="packageName"
                      required
                      value={formData.packageName}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                      placeholder="e.g. Premium Subscription"
                    />
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <input
                      type="number"
                      name="price"
                      required
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Section 2: Customer Details */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName || ""}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName || ""}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email || ""}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                     
                      name="mobile"
                      required
                      
                      value={formData.mobile || ""}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange || ""}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange || ""}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="state"
                      required
                      value={formData.state || ""}
                      onChange={handleInputChange}
                      className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none bg-white"
                    >
                      <option value="" disabled>Select State</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="IL">Illinois</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                      <option value="WA">Washington</option>
                      <option value="OTHER">Other/International</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="zip"
                    required
                    value={formData.zip || ""}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Payment Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h3>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      name="cardNumber"
                      required
                      maxLength="19"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        name="expiry"
                        required
                        maxLength="5"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="MM/YY"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVC/CVV <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type="password"
                        name="cvc"
                        required
                        maxLength="4"
                        value={formData.cvc}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col-reverse md:flex-row gap-4 md:justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="w-full md:w-auto px-6 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto px-8 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-colors flex justify-center items-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" /> Pay Now
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Success Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 max-w-sm w-full text-center shadow-2xl transform transition-all scale-100">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <Check className="text-green-600 w-6 h-6" />
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
                Payment Successful!
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Your transaction has been processed successfully.
              </p>
              <button
                onClick={closeModal}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer /></div>
  );
}