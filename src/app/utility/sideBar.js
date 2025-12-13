import React from "react";
import { Transition } from "@headlessui/react";
import { FiFileText, FiMessageSquare } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";


import { FiMenu, FiX, FiHome, FiBriefcase } from "react-icons/fi";

const SideBar = ({ showSidebar, setShowSidebar, toggleSidebar }) => {
  return (
    <Transition
      show={showSidebar}
      enter="transition-all duration-300 transform"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leave="transition-all duration-300 transform"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
      className="fixed top-0 left-0 h-screen w-screen bg-white flex flex-col"
    >
      {/* Sidebar content */}
      <div>
        <div className="flex justify-between items-center p-4 px-6">
          <Image
            src="/ecarts.png"
            alt="Brand Image"
            width={160}
            height={100}
            priority={true}
          />
          <button
            className="focus:outline-none focus:text-white"
            onClick={toggleSidebar}
          >
            <FiX className="h-8 w-8 fill-current" />
          </button>
        </div>
        <div className="mt-19" style={{ marginTop: '40px' }}>
          <Link
            href="/"
            onClick={() => setShowSidebar(false)} // Close sidebar on click
            className="block px-5 py-3 flex items-center cursor-pointer"
          >
            <p className="side-bar-text">Home</p>
          </Link>
          <Link
            href="/about-us"
            onClick={() => setShowSidebar(false)} // Close sidebar on click
            className="block px-5 py-3 flex items-center cursor-pointer"
          >
            <p className="side-bar-text">About</p>
          </Link>
          <Link
            href="/services"
            onClick={() => setShowSidebar(false)} // Close sidebar on click
            className="block px-5 py-3 flex items-center cursor-pointer"
          >
            <p className="side-bar-text">Services</p>
          </Link>
          <Link
            href="/tech"
            onClick={() => setShowSidebar(false)} // Close sidebar on click
            className="block px-5 py-3 flex items-center cursor-pointer"
          >
            <p className="side-bar-text">Tech</p>
          </Link>
          <Link
            href="/projects"
            onClick={() => setShowSidebar(false)} // Close sidebar on click
            className="block px-5 py-3 flex items-center cursor-pointer"
          >
            <p className="side-bar-text">Projects</p>
          </Link>

          <Link
            href="#Footer" // Replace with the ID of the home section
            onClick={() => setShowSidebar(false)} // Close sidebar on click
            className="block px-5 py-3 flex items-center cursor-pointer"
          >
            <p className="side-bar-text">Contact</p>
          </Link>
        </div>
      </div>
    </Transition>
  );
};

export default SideBar;
