import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Leaf, Sparkles, Image as ImageIcon } from "lucide-react"; // 🔧 Added ImageIcon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2.5 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-black text-gray-900">
              Eco-Urbanist <span className="text-green-600">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                isActive("/")
                  ? "text-green-600 bg-green-50"
                  : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
              }`}
            >
              Home
            </Link>
            <Link
              to="/upload"
              className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                isActive("/upload")
                  ? "text-green-600 bg-green-50"
                  : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
              }`}
            >
              Upload
            </Link>
            {/* 🔧 NEW: Gallery Link */}
            <Link
              to="/gallery"
              className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                isActive("/gallery")
                  ? "text-green-600 bg-green-50"
                  : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Gallery
            </Link>
            <Link
              to="/upload"
              className="ml-4 group inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-7 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-3 rounded-xl hover:bg-gray-100 transition-all duration-300 transform active:scale-95"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-gray-100 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                onClick={toggleMenu}
                className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isActive("/")
                    ? "text-green-600 bg-green-50"
                    : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
                }`}
              >
                Home
              </Link>
              <Link
                to="/upload"
                onClick={toggleMenu}
                className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isActive("/upload")
                    ? "text-green-600 bg-green-50"
                    : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
                }`}
              >
                Upload
              </Link>
              {/* 🔧 NEW: Gallery Link Mobile */}
              <Link
                to="/gallery"
                onClick={toggleMenu}
                className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isActive("/gallery")
                    ? "text-green-600 bg-green-50"
                    : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                Gallery
              </Link>
              <Link
                to="/upload"
                onClick={toggleMenu}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-7 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-bold shadow-lg text-center"
              >
                <Sparkles className="w-4 h-4" />
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
