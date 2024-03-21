// External
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle menu

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            />
          </button>
        </div>

        <ul
          className={`md:flex md:space-x-4 md:justify-center md:items-center ${isOpen ? "flex" : "hidden"} flex-col absolute md:relative bg-gray-800 w-full left-0`}
        >
          <li className="md:ml-6">
            <Link
              to="/users"
              className="hover:bg-gray-700 px-3 py-2 rounded block users-link"
            >
              Users
            </Link>
          </li>
          <li className="md:ml-6">
            <Link
              to="/transactions"
              className="hover:bg-gray-700 px-3 py-2 rounded block"
            >
              Transactions
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
