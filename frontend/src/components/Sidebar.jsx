import { Link, useLocation } from "react-router-dom";
import React from "react";

function Sidebar() {
  const location = useLocation(); // Get the current path

  return (
    <div className="w-70 h-screen bg-gray-900 text-white p-9 shadow-lg fixed">
      {/* Title */}
      <h2 className="text-2xl font-extrabold mb-6 text-center tracking-wide">
        🔒 Encryption App
      </h2>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        <SidebarLink to="/encrypt" activePath={location.pathname}>
          🔐 Encrypt
        </SidebarLink>
        <SidebarLink to="/decrypt" activePath={location.pathname}>
          🔓 Decrypt
        </SidebarLink>
      </nav>
    </div>
  );
}

// Sidebar Link Component with animation
function SidebarLink({ to, activePath, children }) {
  const isActive = activePath === to;

  return (
    <Link
      to={to}
      className={`block py-3 px-4 text-lg rounded-lg transition-all duration-300
        ${
          isActive
            ? "bg-blue-600 shadow-md shadow-blue-400 scale-105"
            : "hover:bg-gray-700 hover:scale-105 hover:shadow-md hover:shadow-gray-500"
        }`}
    >
      {children}
    </Link>
  );
}

export default Sidebar;
