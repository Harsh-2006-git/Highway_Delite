import { useState, useEffect } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);

  // Load booking details from sessionStorage
  useEffect(() => {
    const pendingBooking = sessionStorage.getItem("pendingBooking");

    if (!pendingBooking) {
      // No booking data found, redirect to home
      navigate("/home");
      return;
    }

    try {
      const bookingData = JSON.parse(pendingBooking);

      // Validate timestamp (booking data should be recent - within 30 minutes)
      const thirtyMinutes = 30 * 60 * 1000;
      if (Date.now() - bookingData.timestamp > thirtyMinutes) {
        sessionStorage.removeItem("pendingBooking");
        alert("Booking session expired. Please start over.");
        navigate("/home");
        return;
      }

      // Validate all required fields exist
      if (
        !bookingData.experienceId ||
        !bookingData.price ||
        !bookingData.quantity
      ) {
        sessionStorage.removeItem("pendingBooking");
        alert("Invalid booking data. Please start over.");
        navigate("/home");
        return;
      }

      setBookingDetails(bookingData);
    } catch (error) {
      console.error("Error parsing booking data:", error);
      sessionStorage.removeItem("pendingBooking");
      navigate("/home");
    }
  }, [navigate]);

  // If no booking details, show loading
  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  const subtotal = bookingDetails.price * bookingDetails.quantity;
  const taxes = subtotal * 0.06;

  const calculateDiscount = () => {
    if (!appliedPromo) return 0;

    if (appliedPromo.discount_type === "percentage") {
      return subtotal * (parseFloat(appliedPromo.discount_value) / 100);
    } else {
      return parseFloat(appliedPromo.discount_value);
    }
  };

  const discount = calculateDiscount();
  const total = subtotal + taxes - discount;

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/promo/get-all");
      const data = await response.json();

      if (data.success) {
        // Convert both to uppercase for case-insensitive comparison
        const promoCodeUpper = promoCode.toUpperCase().trim();

        const promo = data.data.find(
          (p) =>
            p.code.toUpperCase() === promoCodeUpper &&
            p.is_active &&
            new Date(p.valid_until) >= new Date() &&
            subtotal >= parseFloat(p.min_order_amount)
        );

        if (promo) {
          setAppliedPromo(promo);
          setPromoError("");
        } else {
          const matchedPromo = data.data.find(
            (p) => p.code.toUpperCase() === promoCodeUpper
          );

          if (!matchedPromo) {
            setPromoError("Invalid promo code");
          } else if (!matchedPromo.is_active) {
            setPromoError("This promo code is inactive");
          } else if (new Date(matchedPromo.valid_until) < new Date()) {
            setPromoError("This promo code has expired");
          } else if (subtotal < parseFloat(matchedPromo.min_order_amount)) {
            setPromoError(
              `Minimum order amount ₹${parseFloat(
                matchedPromo.min_order_amount
              ).toFixed(0)} required`
            );
          }
        }
      }
    } catch (error) {
      console.error("Error fetching promo codes:", error);
      setPromoError("Failed to apply promo code");
    }
  };

  const generateBookingRef = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let ref = "";
    for (let i = 0; i < 8; i++) {
      ref += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return ref;
  };

  const handlePayment = () => {
    if (!fullName.trim() || !email.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    if (!agreedToTerms) {
      alert("Please agree to the terms and safety policy");
      return;
    }

    // Generate booking reference
    const ref = generateBookingRef();
    setBookingRef(ref);

    // Clear the pending booking from sessionStorage
    sessionStorage.removeItem("pendingBooking");

    // Show success popup
    setShowSuccess(true);

    // Redirect after 2 seconds
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Booking Confirmed
            </h1>
            <p className="text-gray-600 text-lg">Ref ID: {bookingRef}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Checkout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Section - Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promo code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value.toUpperCase());
                      setPromoError("");
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-6 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-red-500 text-sm mt-2">{promoError}</p>
                )}
                {appliedPromo && (
                  <p className="text-green-600 text-sm mt-2">
                    ✓ Promo code "{appliedPromo.code}" applied! You saved ₹
                    {discount.toFixed(0)}
                  </p>
                )}
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the terms and safety policy
                </label>
              </div>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-4">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium text-gray-900">
                    {bookingDetails.experience}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium text-gray-900">
                    {bookingDetails.date}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Time</span>
                  <span className="font-medium text-gray-900">
                    {bookingDetails.time}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Qty</span>
                  <span className="font-medium text-gray-900">
                    {bookingDetails.quantity}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes</span>
                  <span className="text-gray-900">₹{taxes.toFixed(0)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Discount</span>
                    <span className="text-green-600">
                      -₹{discount.toFixed(0)}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{total.toFixed(0)}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Pay and Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
