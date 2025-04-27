// src/components/Navbar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="w-full bg-red-900 text-white p-4 shadow-md flex justify-center space-x-6">
      <Link
        to="/login"
        className={`hover:text-red-400 transition ${
          location.pathname === '/login' ? 'text-red-400 font-bold' : ''
        }`}
      >
        Login
      </Link>
      <Link
        to="/game"
        className={`hover:text-red-400 transition ${
          location.pathname === '/game' ? 'text-red-400 font-bold' : ''
        }`}
      >
        Jogo
      </Link>
    </nav>
  );
};

export default Navbar;
