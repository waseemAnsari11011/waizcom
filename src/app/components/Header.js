"use client";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiHome, FiBriefcase } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
import { sendGAEvent } from "@next/third-parties/google";
import SideBar from "../utility/sideBar";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();

    // Add event listener to handle resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    sendGAEvent("event", "contact_sidebar_clicked", { value: "contact" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className="bg-white fixed top-0 left-0 right-0 backdrop-filter backdrop-blur-lg px-5 md:px-10 lg:px-16 py-5"
      style={{ zIndex: 100 }}
    >
      <div className="flex justify-between items-center">
        <div
          className="brand-text text-2xl font-bold cursor-pointer"
          onClick={scrollToTop}
        >
          <Image
            src="/ecarts.png"
            alt="Brand Image"
            width={120}
            height={60}
            priority={true}
          />
        </div>

        {/* Conditionally render based on device size */}
        <div className="text-white text-xl">
          {isMobile === true && (
            <button
              className="focus:outline-none focus:text-white"
              onClick={toggleSidebar}
            >
              {showSidebar ? (
                <FiX className="h-6 w-6 fill-current text-black" />
              ) : (
                <AiOutlineMenu className="h-6 w-6 fill-current text-black" />
              )}
            </button>
          )}
          {isMobile === false && (
            <div className="flex justify-between items-center space-x-10">
              <Link
                href="/"
                onClick={() => setShowSidebar(false)}
                className="text-header block flex items-center cursor-pointer"
              >
                <p>Home</p>
              </Link>
              <Link
                href="/about-us"
                onClick={() => setShowSidebar(false)}
                className="text-header block flex items-center cursor-pointer"
              >
                <p>About us</p>
              </Link>
              <Link
                href="/services"
                onClick={() => setShowSidebar(false)}
                className="text-header block flex items-center cursor-pointer"
              >
                <p>Services</p>
              </Link>
              <Link
                href="/projects"
                onClick={() => setShowSidebar(false)}
                className="text-header block flex items-center cursor-pointer"
              >
                <p>Projects</p>
              </Link>
              <Link
                href="/tech"
                onClick={() => setShowSidebar(false)}
                className="text-header block flex items-center cursor-pointer"
              >
                <p>Tech</p>
              </Link>

              <ScrollLink
                to="Footer"
                smooth={true}
                onClick={() => setShowSidebar(false)}
                className="get-in-touch-btn cursor-pointer"
              >
                <p className="text-header-black font-bold">Get App Cost</p>
              </ScrollLink>
            </div>
          )}
        </div>

        {/* Sidebar component */}
        <SideBar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          toggleSidebar={toggleSidebar}
        />
      </div>
    </header>
  );
};

export default Header;
