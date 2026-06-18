import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Leaf,
  TrendingUp,
  Shield,
  Image as ImageIcon,
} from "lucide-react";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 overflow-hidden min-h-screen flex items-center py-12 lg:py-0">
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-300 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-300 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container-custom relative z-10 py-12 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT: Content */}
          <div className="space-y-6 sm:space-y-8 text-left">
            <div className="inline-flex items-center bg-white shadow-md border border-green-200 px-5 py-2.5 rounded-full hover:shadow-lg transition-shadow select-none">
              <Sparkles className="w-4 h-4 mr-2 text-green-600" />
              <span className="text-sm font-bold text-green-700">
                AI-Powered Urban Planning
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 leading-tight tracking-tight">
              Transform Cities Into
              <br />
              <span className="text-green-600">Green Havens</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-xl">
              Upload satellite images and let AI instantly visualize green
              spaces. Analyze vegetation coverage and plan sustainable urban
              development in minutes.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              {["Free Forever", "No Signup", "Results in 60s"].map(
                (benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                      {benefit}
                    </span>
                  </div>
                ),
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                to="/upload"
                className="group inline-flex items-center justify-center gap-3 bg-green-600 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-green-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <Sparkles className="w-6 h-6" />
                <span>Start Free Now</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 bg-white text-green-700 border-2 border-green-600 px-8 py-4 sm:px-10 sm:py-5 rounded-xl hover:bg-green-50 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                See How It Works
              </a>
            </div>

            <p className="text-sm text-gray-600 flex items-center gap-2 pt-2">
              <Shield className="w-4 h-4 text-green-600 shrink-0" />
              Your images are processed securely and never stored
            </p>
          </div>

          {/* RIGHT: Visual Demo Dashboard */}
          {/* Added 'group' class to parent wrapper for responsive badge triggers */}
          <div className="group relative mt-8 lg:mt-0 max-w-xl mx-auto lg:max-w-none w-full">
            <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 transform hover:scale-[1.02] transition-all duration-500 border border-gray-100">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="group">
                  <div className="bg-gray-100 rounded-xl p-4 h-40 flex flex-col items-center justify-center border-2 border-gray-200 transition-all group-hover:border-gray-400 group-hover:shadow-lg">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                      <ImageIcon className="w-6 h-6 text-gray-600" />
                    </div>
                    <p className="text-xs font-bold text-gray-700">
                      Original Image
                    </p>
                  </div>
                </div>

                <div className="group">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl p-4 h-40 flex flex-col items-center justify-center border-2 border-green-300 transition-all group-hover:border-green-500 group-hover:shadow-lg">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2 animate-pulse">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs font-bold text-green-700">
                      AI Enhanced
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 p-5 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-bold text-gray-700">
                      Green Coverage
                    </span>
                  </div>
                  <span className="text-3xl font-black text-green-600">
                    72%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all duration-1000 shadow-lg"
                    style={{ width: "72%" }}
                  ></div>
                </div>
                <p className="text-xs text-green-700 font-semibold mt-2">
                  +38% improvement detected
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Shield className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <p className="text-xs font-bold text-blue-700">Secure</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <Sparkles className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                  <p className="text-xs font-bold text-purple-700">
                    AI-Powered
                  </p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Leaf className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <p className="text-xs font-bold text-green-700">
                    Eco-Friendly
                  </p>
                </div>
              </div>
            </div>

            {/* Fixed: Badge lifts up super smooth when the dashboard card is hovered */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-black shadow-2xl border-4 border-white text-xs sm:text-sm select-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-3">
              ✨ 100% FREE
            </div>

            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 bg-green-500 text-white px-4 sm:px-5 py-2 rounded-full font-bold shadow-xl text-xs select-none">
              🌱 Eco-Friendly
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
