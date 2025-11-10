import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Upload, Target, LayoutDashboard, Calendar, Sparkles } from 'lucide-react';
import clsx from 'clsx';

/**
 * Premium Navigation Bar - Recrutix
 */
const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Brain },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/upload', label: 'Upload', icon: Upload },
    { path: '/match', label: 'AI Match', icon: Target },
    { path: '/interviews', label: 'Interviews', icon: Calendar },
  ];

  return (
    <nav className="bg-white shadow-lg border-b-2 border-indigo-100 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Premium Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-xl group-hover:scale-110 transition-transform shadow-lg">
              <Sparkles className="h-7 w-7 text-white animate-pulse-glow" />
            </div>
            <div>
              <span className="text-2xl font-black">
                <span className="gradient-text">Recrutix</span>
              </span>
              <p className="text-xs text-gray-500 font-medium">AI-Powered Recruitment</p>
            </div>
          </Link>

          {/* Premium Navigation Links */}
          <div className="flex space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    'flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5',
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Premium User Section */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">John Recruiter</p>
              <p className="text-xs text-gray-500 font-medium">Senior HR Manager</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg ring-4 ring-indigo-100 hover:scale-110 transition-transform cursor-pointer">
              JR
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
