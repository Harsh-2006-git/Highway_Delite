import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Define the Experience type
interface Experience {
  id: number;
  title: string;
  description: string;
  image_url: string;
  about: string;
  price: string;
  createdAt: string;
  updatedAt: string;
}

// Props for Header component
interface HeaderProps {
  isDarkMode?: boolean;
  toggleTheme?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

import Header from "../components/header";

export default function ExperiencesHomepage() {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState("Oct 22");
  const [selectedTime, setSelectedTime] = useState("07:00 am");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all experiences
  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:3001/experiences/experiences"
      );
      const data = await response.json();
      if (data.success) {
        setExperiences(data.data);
        setFilteredExperiences(data.data);
      }
    } catch (error) {
      console.error("Error fetching experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch single experience details
  const fetchExperienceDetails = async (experienceId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3001/experiences/experiences/${experienceId}`
      );
      const data = await response.json();
      if (data.success) {
        setSelectedExperience(data.data);
        setShowModal(true);
        setQuantity(1);
      }
    } catch (error) {
      console.error("Error fetching experience details:", error);
    }
  };

  const handleViewDetails = (experienceId: number) => {
    fetchExperienceDetails(experienceId);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedExperience(null);
  };

  const handleConfirmBooking = () => {
    if (!selectedExperience) return;

    // Format date to YYYY-MM-DD
    const dateMap: { [key: string]: string } = {
      "Oct 22": "2025-10-22",
      "Oct 23": "2025-10-23",
      "Oct 24": "2025-10-24",
      "Oct 25": "2025-10-25",
      "Oct 26": "2025-10-26",
    };

    const formattedDate = dateMap[selectedDate] || "2025-10-22";

    // Create booking data object
    const bookingData = {
      experienceId: selectedExperience.id,
      experience: selectedExperience.title,
      date: formattedDate,
      time: selectedTime,
      quantity: quantity,
      price: parseFloat(selectedExperience.price),
      timestamp: Date.now(), // Add timestamp for validation
    };

    // Store in sessionStorage (cleared when browser tab closes)
    sessionStorage.setItem("pendingBooking", JSON.stringify(bookingData));

    // Navigate to checkout page
    navigate("/book");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredExperiences(experiences);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = experiences.filter(
      (exp) =>
        exp.title.toLowerCase().includes(lowercaseQuery) ||
        exp.description.toLowerCase().includes(lowercaseQuery) ||
        exp.about.toLowerCase().includes(lowercaseQuery)
    );
    setFilteredExperiences(filtered);
  };

  const calculateTotal = () => {
    if (!selectedExperience) return 0;
    const price = parseFloat(selectedExperience.price);
    const subtotal = price * quantity;
    const taxes = subtotal * 0.06;
    return subtotal + taxes;
  };

  const dates = ["Oct 22", "Oct 23", "Oct 24", "Oct 25", "Oct 26"];
  const times = [
    { time: "07:00 am", slots: "6 left" },
    { time: "9:00 am", slots: "2 left" },
    { time: "11:00 am", slots: "5 left" },
    { time: "1:00 pm", slots: "Sold out" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Replace this with your actual Header component */}
      <Header searchQuery={searchQuery} onSearchChange={handleSearch} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          {searchQuery && (
            <p className="text-sm text-gray-600">
              Found {filteredExperiences.length} result
              {filteredExperiences.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
          </div>
        ) : filteredExperiences.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-2">No experiences found</p>
            <p className="text-sm text-gray-500">Try adjusting your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredExperiences.map((experience) => (
              <div
                key={experience.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={experience.image_url}
                    alt={experience.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-3.5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base font-bold text-gray-900 line-clamp-1">
                      {experience.title}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      Udupi
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                    {experience.description}
                  </p>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-gray-500">From</span>
                      <span className="text-lg font-bold text-gray-900">
                        ₹{parseFloat(experience.price).toFixed(0)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleViewDetails(experience.id)}
                      className="px-3.5 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-xs"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && selectedExperience && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Details</h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Left Section - Image and Details */}
                <div className="md:col-span-2">
                  <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-6">
                    <img
                      src={selectedExperience.image_url}
                      alt={selectedExperience.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {selectedExperience.title}
                  </h3>

                  <p className="text-gray-600 mb-6">
                    {selectedExperience.description}
                  </p>

                  {/* Choose Date */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      Choose date
                    </h4>
                    <div className="flex gap-2 flex-wrap">
                      {dates.map((date) => (
                        <button
                          key={date}
                          onClick={() => setSelectedDate(date)}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            selectedDate === date
                              ? "bg-yellow-400 border-yellow-400 text-black"
                              : "bg-white border-gray-300 text-gray-700 hover:border-yellow-400"
                          }`}
                        >
                          {date}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Choose Time */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      Choose time
                    </h4>
                    <div className="flex gap-2 flex-wrap">
                      {times.map((timeSlot) => (
                        <button
                          key={timeSlot.time}
                          onClick={() => setSelectedTime(timeSlot.time)}
                          disabled={timeSlot.slots === "Sold out"}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            timeSlot.slots === "Sold out"
                              ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                              : selectedTime === timeSlot.time
                              ? "bg-yellow-400 border-yellow-400 text-black"
                              : "bg-white border-gray-300 text-gray-700 hover:border-yellow-400"
                          }`}
                        >
                          <div>{timeSlot.time}</div>
                          <div className="text-xs">{timeSlot.slots}</div>
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      All times are in IST (GMT +5:30)
                    </p>
                  </div>

                  {/* About */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      About
                    </h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                      {selectedExperience.about}
                    </p>
                  </div>
                </div>

                {/* Right Section - Price Summary */}
                <div className="md:col-span-1">
                  <div className="bg-white border-2 border-teal-400 rounded-2xl p-6 sticky top-24">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Starts at</span>
                        <span className="text-xl font-bold text-gray-900">
                          ₹{parseFloat(selectedExperience.price).toFixed(0)}
                        </span>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm text-gray-600">
                            Quantity
                          </span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                setQuantity(Math.max(1, quantity - 1))
                              }
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="text-sm font-medium w-8 text-center">
                              {quantity}
                            </span>
                            <button
                              onClick={() => setQuantity(quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-sm mb-2">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="text-gray-900">
                            ₹
                            {(
                              parseFloat(selectedExperience.price) * quantity
                            ).toFixed(0)}
                          </span>
                        </div>

                        <div className="flex justify-between items-center text-sm mb-4">
                          <span className="text-gray-600">Taxes</span>
                          <span className="text-gray-900">
                            ₹
                            {(
                              parseFloat(selectedExperience.price) *
                              quantity *
                              0.06
                            ).toFixed(0)}
                          </span>
                        </div>

                        <div className="border-t border-gray-200 pt-4 mb-4">
                          <div className="flex justify-between items-center">
                            <span className="text-base font-semibold text-gray-900">
                              Total
                            </span>
                            <span className="text-xl font-bold text-gray-900">
                              ₹{calculateTotal().toFixed(0)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={handleConfirmBooking}
                          className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
