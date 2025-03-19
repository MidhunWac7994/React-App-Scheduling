import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/userAtoms';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  // Ensure user state persists on refresh
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, [setUser]);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user from storage
    setUser(null); // Clear Jotai state
    navigate('/'); // Redirect to home
  };

  return (
    <nav className="shadow-md relative">
      {/* Background Design */}
      <div className="absolute inset-0">
        <div className="h-full w-1/2 bg-black float-left"></div>
        <div className="h-full w-1/2 bg-white float-right"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between h-16">
          
          {/* Left Side - Logo */}
          <div className="flex items-center w-1/2">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="text-gray-500 text-4xl font-bold">wac Cave</div>
            </Link>
          </div>

          {/* Right Side - Navigation & Profile */}
          <div className="hidden md:flex items-center justify-end w-1/2 space-x-3">
            <Link to="/home" className="px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-gray-100 transition duration-150">
              Home
            </Link>
            <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-gray-100 transition duration-150">
              About
            </Link>
            <Link to="/services" className="px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-gray-100 transition duration-150">
              Services
            </Link>

            {user ? (
              // User Profile Dropdown
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                >
                  <img
                    src={user.picture || "https://via.placeholder.com/40"}
                    alt="User"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="text-black font-medium">{user.name}</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-black shadow-lg rounded-lg">
                    <div className="p-3 border-b border-gray-700">
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-800"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/signin" className="px-4 py-2 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition duration-150">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-200 focus:outline-none"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden relative z-10 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/home" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-100 transition duration-150">
              Home
            </Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-100 transition duration-150">
              About
            </Link>
            <Link to="/services" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-100 transition duration-150">
              Services
            </Link>

            {user ? (
              <>
                <div className="px-4 py-3 border-t">
                  <p className="text-sm font-medium text-black">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-100 transition duration-150">
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-base text-red-600 hover:bg-gray-100 transition duration-150"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/signin" className="block px-3 py-2 rounded-md text-base font-medium bg-black text-white hover:bg-gray-800 transition duration-150">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;