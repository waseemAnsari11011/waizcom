"use client";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiHome, FiBriefcase } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
import { sendGAEvent } from "@next/third-parties/google";
import axios from "axios";
import SideBar from "../utility/sideBar";
import CalculatorModal from "./Calculator/CalculatorModal";

import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [isMobile, setIsMobile] = useState(null);
  const [calculatorConfig, setCalculatorConfig] = useState(null);
  const [calculatorCurrency, setCalculatorCurrency] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();

    // Add event listener to handle resize
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Pre-load calculator data (Config + Location)
  useEffect(() => {
    // Only pre-load if NOT on admin pages
    if (pathname?.startsWith("/admin")) return;

    const loadData = async () => {
        try {
            // Parallel fetch for speed
            const [configRes, locationRes] = await Promise.allSettled([
                axios.get("/api/calculator/config"),
                axios.get("/api/utility/location")
            ]);

            if (configRes.status === 'fulfilled' && configRes.value.data.success) {
                setCalculatorConfig(configRes.value.data.data);
            }

            if (locationRes.status === 'fulfilled') {
                const country = locationRes.value.data.country_code;
                setCalculatorCurrency(country === "IN" ? "INR" : "USD");
            } else {
                 setCalculatorCurrency("USD"); // Default fallback
            }

        } catch (error) {
            console.error("Background pre-load failed", error);
        }
    };
    
    loadData();
  }, []);

  // Auto-open calculator logic
  useEffect(() => {
    // Only run auto-open if NOT on admin pages (double check, though return null handles display)
    if (pathname?.startsWith("/admin") || pathname === "/app-cost-calculator") return;

    const hasSeen = sessionStorage.getItem("hasSeenCalculator");
    if (!hasSeen) {
        const timer = setTimeout(() => {
            setShowCalculator(true);
            sessionStorage.setItem("hasSeenCalculator", "true");
        }, 6000); // 6 seconds delay
        return () => clearTimeout(timer);
    }
  }, [pathname]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    sendGAEvent("event", "contact_sidebar_clicked", { value: "contact" });
  };

  if (pathname?.startsWith("/admin")) return null;



  return (
    <header
      className="bg-white fixed top-0 left-0 right-0 backdrop-filter backdrop-blur-lg px-5 md:px-10 lg:px-16 py-5"
      style={{ zIndex: 100 }}
    >
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="brand-text text-2xl font-bold cursor-pointer"
        >
          <Image
            src="/ecarts.png"
            alt="Brand Image"
            width={120}
            height={60}
            priority={true}
          />
        </Link>

        {/* Conditionally render based on device size */}
        <div className="text-white text-xl">
          {isMobile === true && (
            <button
              className="focus:outline-none focus:text-white"
              onClick={toggleSidebar}
              aria-label="Toggle Menu"
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

              <button
                onClick={() => {
                    setShowSidebar(false);
                    setShowCalculator(true);
                    sessionStorage.setItem("hasSeenCalculator", "true");
                }}
                className="get-in-touch-btn cursor-pointer"
              >
                <p className="text-header-black font-bold">Get App Cost</p>
              </button>
            </div>
          )}
        </div>

        {/* Sidebar component */}
        <SideBar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          toggleSidebar={toggleSidebar}
        />
        
        <CalculatorModal 
            isOpen={showCalculator} 
            onClose={() => setShowCalculator(false)} 
            config={calculatorConfig}
            currency={calculatorCurrency}
        />
      </div>
    </header>
  );
};

export default Header;
