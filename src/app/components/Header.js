"use client";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiHome, FiBriefcase } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
import { sendGAEvent } from "@next/third-parties/google";
import SideBar from "../utility/sideBar";
import { Link as ScrollLink } from "react-scroll";
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

  return (
    <header
      className="bg-white fixed top-0 left-0 right-0 backdrop-filter backdrop-blur-lg px-5 md:px-10 lg:px-16 py-5"
      style={{ zIndex: 2 }}
    >
      <div className="flex justify-between items-center ">
        <div className="brand-text text-2xl font-bold">
          {/* {isMobile === true && (<Link href="/"><span className="text-linkedin">Q</span> <span>D</span> </Link>)}
          {isMobile === false && (<Link href="/"><span className="text-linkedin">Quality</span> <span>Driven</span> </Link>)} */}
          <Image
            src="/waizcom.png"
            alt="Brand Image"
            width={160}
            height={100}
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
              <ScrollLink
                to="intro-section" // Replace with the ID of the home section
                smooth={true}
                onClick={() => setShowSidebar(false)} // Close sidebar on click
                className="text-header block  flex items-center cursor-pointer"
              >
                <p>Home</p>
              </ScrollLink>
              <ScrollLink
                to="about-section" // Replace with the ID of the home section
                smooth={true}
                offset={-120}
                onClick={() => setShowSidebar(false)} // Close sidebar on click
                className="text-header block  flex items-center cursor-pointer"
              >
                <p>About us</p>
              </ScrollLink>
              <ScrollLink
                to="services-section" // Replace with the ID of the home section
                offset={-100}
                smooth={true}
                onClick={() => setShowSidebar(false)} // Close sidebar on click
                className="text-header block  flex items-center cursor-pointer"
              >
                <p>Services</p>
              </ScrollLink>
              <ScrollLink
                to="projects-section" // Replace with the ID of the home section
                smooth={true}
                onClick={() => setShowSidebar(false)} // Close sidebar on click
                className="text-header block  flex items-center cursor-pointer"
              >
                <p>Projects</p>
              </ScrollLink>
              <ScrollLink
                to="TechStack" // Replace with the ID of the home section
                smooth={true}
                onClick={() => setShowSidebar(false)} // Close sidebar on click
                className="text-header block flex items-center cursor-pointer"
              >
                <p>Tech</p>
              </ScrollLink>

              <ScrollLink
                to="contact-section" // Replace with the ID of the home section
                smooth={true}
                onClick={() => setShowSidebar(false)} // Close sidebar on click
                className="get-in-touch-btn cursor-pointer"
              >
                <p className="text-header-white">Get App Cost</p>
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
