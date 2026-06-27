// client/src/components/Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#f6f6f9]/85 border-b border-zinc-300 backdrop-blur-sm font-mono text-xs">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-bold text-zinc-900 tracking-tight flex items-center">
            CYBR_URL<span className="text-purple-600 animate-pulse">_</span>
          </Link>
          <span className="hidden md:inline text-zinc-300">|</span>
          <span className="hidden md:inline px-2 py-0.5 border border-zinc-200 text-[9px] text-zinc-400 bg-zinc-100/50 rounded-sm">
            NODE.ACTIVE
          </span>
        </div>
        
        <div className="flex items-center">
          <ul className="flex items-center gap-5 sm:gap-6 list-none m-0 p-0 font-semibold tracking-wider">
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/dashboard" className="text-[11px] text-zinc-500 hover:text-purple-600 transition-colors uppercase">
                    /dashboard
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={handleLogout} 
                    className="px-3 py-1.5 bg-zinc-950 text-white font-bold text-[10px] rounded-none hover:bg-zinc-800 transition-all cursor-pointer shadow-[2px_2px_0px_0px_#7c3aed] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#7c3aed] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                  >
                    LOGOUT ↗
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="text-[11px] text-zinc-500 hover:text-purple-600 transition-colors uppercase">
                    /login
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/register" 
                    className="px-3 py-1.5 bg-zinc-950 text-white font-bold text-[10px] rounded-none hover:bg-zinc-800 transition-all shadow-[2px_2px_0px_0px_#7c3aed] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#7c3aed] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                  >
                    REGISTER ↗
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;