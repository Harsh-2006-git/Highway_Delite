import { useState, useEffect } from "react";

export default function Header({ searchQuery = "", onSearchChange }) {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Sync local search query with prop
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const handleSearchClick = () => {
    if (onSearchChange && localSearchQuery) {
      onSearchChange(localSearchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b-4 border-yellow-400 shadow-sm">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <div
            className="cursor-pointer flex-shrink-0"
            onClick={() => (window.location.href = "/")}
          >
            <img
              src="/assets/images/Yellow-logo.png"
              alt="Highway Delite Logo"
              className="w-25 h-25 sm:w-40 sm:h-40 object-contain"
            />
          </div>

          {/* Search Bar - Single row for both mobile and desktop */}
          <div className="flex items-center gap-3 flex-1 sm:flex-none justify-end">
            <input
              type="text"
              value={localSearchQuery}
              onChange={handleSearchInput}
              placeholder="Search experiences"
              className="w-full sm:w-64 md:w-80 px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:bg-white transition-all"
            />
            <button
              onClick={handleSearchClick}
              className="px-5 sm:px-6 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm whitespace-nowrap shadow-sm hover:shadow-md flex-shrink-0"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
