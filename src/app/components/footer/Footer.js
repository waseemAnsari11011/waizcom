"use client";
import React, { useState } from "react";
import { FaQuoteLeft, FaQuoteRight, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

import Link from "next/link";
import { FiPhoneCall } from "react-icons/fi";

import axios from "axios";

const Footer = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation checks
    if (!phone || !email || !message) {
      setErrorMessage("Please fill out all required fields.");
      return; // Stop the form submission if validation fails
    }

    // Optional: Validate phone number format (e.g., must be 10 digits)
    if (!/^\d{10}$/.test(phone)) {
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return; // Stop the form submission if the phone number is invalid
    }

    console.log("API call");

    const data = {
      name: phone,
      email,
      subject,
      message,
    };

    setLoading(true); // Set loading state to true when form is submitted
    setErrorMessage("");
    setSuccessMessage("");

    axios
      .post(
        "https://email-server-new.netlify.app/.netlify/functions/api/send-email",
        data
      )
      .then((response) => {
        if (window.gtag) {
          window.gtag("event", "conversion", {
            send_to: "AW-16527872688/w3d9CP-j06UZELCljck9",
            value: 1.0,
            currency: "INR",
          });
        }
        console.log("Email sent successfully:", response.data);
        setSuccessMessage("Email sent successfully!");
        // Reset form fields
        setPhone("");
        setEmail("");
        setSubject("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        setErrorMessage("Error sending email. Please try again later.");
      })
      .finally(() => {
        setLoading(false); // Set loading state to false after the request is complete (either success or error)
      });
  };

  return (
    <div id="Footer" className="bg-[#021b4b] w-full">
      <div className="w-full max-w-[1200px] py-32 px-5 mx-auto flex gap-[60px]">
        <div className="w-1/2 max-xl:w-full">
          <h1 className="text-[38px] font-black max-md:text-[24px] text-white uppercase max-xl:text-center max-xl:mb-[10px]">
            Got a project in mind?
          </h1>
          <p className="text-white my-[10px] max-xl:text-center">
            Fill the form and get a free consultation!
          </p>
          <p className="text-white my-[10px] flex items-center gap-2 max-md:justify-center md:justify-start">
            <a
              href="tel:+918882202176"
              className="flex items-center gap-2 text-[#fad171] hover:underline"
            >
              <FiPhoneCall className="text-[#fad171] text-xl animate-pulse" />
              +91-88822-02176
            </a>
          </p>

          {/* Display error message if present */}
          {errorMessage && (
            <div className="text-red-500 mb-[10px] max-xl:text-center">
              {errorMessage}
            </div>
          )}

          {/* Display success message if present */}
          {successMessage && (
            <div className="text-green-500 mb-[10px] max-xl:text-center">
              {successMessage}
            </div>
          )}

          <form className="mt-[40px] text-white flex flex-wrap gap-[30px] max-xl:justify-center max-md:flex-col max-md:items-center">
            <div className="w-[calc(50%-15px)] flex flex-col max-md:w-full">
              <label>Your Name</label>
              <input
                placeholder="e.g. John Doe"
                className="outline-none py-[16px] pr-[10px] bg-transparent border-b border-[#f0f0f133]"
              />
            </div>

            <div className="w-[calc(50%-15px)] flex flex-col max-md:w-full">
              <label>Your phone number</label>
              <input
                required
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                pattern="[0-9]{10}"
                title="Please enter a 10-digit phone number with only digits"
                placeholder="e.g. 8882202176"
                className="outline-none py-[16px] pr-[10px] bg-transparent border-b border-[#f0f0f133]"
              />
            </div>

            <div className="w-[calc(50%-15px)] flex flex-col max-md:w-full">
              <label>Your E-mail</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="e.g. j.b@example.com"
                className="outline-none py-[16px] pr-[10px] bg-transparent border-b border-[#f0f0f133]"
              />
            </div>

            <div className="w-[calc(50%-15px)] flex flex-col max-md:w-full">
              <label>Company</label>
              <input
                placeholder="ecarts"
                className="outline-none py-[16px] pr-[10px] bg-transparent border-b border-[#f0f0f133]"
              />
            </div>

            <div className="w-full flex flex-col">
              <label>How can we help you?</label>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="You are Interested in ola-like application"
                className="outline-none py-[16px] pr-[10px] bg-transparent border-b border-[#f0f0f133]"
              />
            </div>

            <button
              onClick={handleSubmit}
              type="submit"
              disabled={loading}
              className="bg-[#fad171] rounded-[50px] w-[162px] h-[49px] font-black text-black hover:opacity-80 max-sm:w-full"
            >
              {loading ? "Sending..." : "Let's build it!"}
            </button>
          </form>
        </div>

        <div className="flex justify-center flex-col item-center w-[calc(50%-60px)] cell bg-[#02215d] border relative border-[#0658f6] max-xl:hidden">
          <div className="flex justify-center mb-[40px]">
            <div className="flex items-center">
              <FaQuoteLeft className="text-[#fad171]" size={50} />
            </div>
          </div>
          <p className="mt-2 text-white text-center px-12">
            "I had a great experience working with ecarts on my project—their
            work quality was outstanding, they delivered on time, maintained
            smooth communication with clear progress tracking, solved complex
            problems efficiently, demonstrated impressive technical expertise,
            and provided excellent value for money."
          </p>
          <p className="text-[#fad171] flex gap-1 text-center mb-10 justify-center items-center mt-2">
            5.0
            <span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.62881 0.42434C7.76317 0.0897527 8.23683 0.0897521 8.37119 0.42434L10.234 5.06326C10.2913 5.20574 10.425 5.30289 10.5782 5.31328L15.5657 5.65146C15.9254 5.67585 16.0718 6.12633 15.7951 6.35751L11.9589 9.56269C11.8411 9.66114 11.79 9.81834 11.8275 9.96724L13.0471 14.8152C13.135 15.1648 12.7518 15.4432 12.4465 15.2515L8.21268 12.5935C8.08265 12.5119 7.91735 12.5119 7.78732 12.5935L3.55354 15.2515C3.24818 15.4432 2.86498 15.1648 2.95295 14.8152L4.17255 9.96724C4.21001 9.81834 4.15893 9.66114 4.0411 9.56269L0.204888 6.35751C-0.0718042 6.12633 0.0745631 5.67585 0.434295 5.65146L5.42182 5.31328C5.57501 5.30289 5.70873 5.20574 5.76595 5.06326L7.62881 0.42434Z"
                  fill="#fad171"
                ></path>
              </svg>
            </span>
            <span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.62881 0.42434C7.76317 0.0897527 8.23683 0.0897521 8.37119 0.42434L10.234 5.06326C10.2913 5.20574 10.425 5.30289 10.5782 5.31328L15.5657 5.65146C15.9254 5.67585 16.0718 6.12633 15.7951 6.35751L11.9589 9.56269C11.8411 9.66114 11.79 9.81834 11.8275 9.96724L13.0471 14.8152C13.135 15.1648 12.7518 15.4432 12.4465 15.2515L8.21268 12.5935C8.08265 12.5119 7.91735 12.5119 7.78732 12.5935L3.55354 15.2515C3.24818 15.4432 2.86498 15.1648 2.95295 14.8152L4.17255 9.96724C4.21001 9.81834 4.15893 9.66114 4.0411 9.56269L0.204888 6.35751C-0.0718042 6.12633 0.0745631 5.67585 0.434295 5.65146L5.42182 5.31328C5.57501 5.30289 5.70873 5.20574 5.76595 5.06326L7.62881 0.42434Z"
                  fill="#fad171"
                ></path>
              </svg>
            </span>
            <span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.62881 0.42434C7.76317 0.0897527 8.23683 0.0897521 8.37119 0.42434L10.234 5.06326C10.2913 5.20574 10.425 5.30289 10.5782 5.31328L15.5657 5.65146C15.9254 5.67585 16.0718 6.12633 15.7951 6.35751L11.9589 9.56269C11.8411 9.66114 11.79 9.81834 11.8275 9.96724L13.0471 14.8152C13.135 15.1648 12.7518 15.4432 12.4465 15.2515L8.21268 12.5935C8.08265 12.5119 7.91735 12.5119 7.78732 12.5935L3.55354 15.2515C3.24818 15.4432 2.86498 15.1648 2.95295 14.8152L4.17255 9.96724C4.21001 9.81834 4.15893 9.66114 4.0411 9.56269L0.204888 6.35751C-0.0718042 6.12633 0.0745631 5.67585 0.434295 5.65146L5.42182 5.31328C5.57501 5.30289 5.70873 5.20574 5.76595 5.06326L7.62881 0.42434Z"
                  fill="#fad171"
                ></path>
              </svg>
            </span>
            <span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.62881 0.42434C7.76317 0.0897527 8.23683 0.0897521 8.37119 0.42434L10.234 5.06326C10.2913 5.20574 10.425 5.30289 10.5782 5.31328L15.5657 5.65146C15.9254 5.67585 16.0718 6.12633 15.7951 6.35751L11.9589 9.56269C11.8411 9.66114 11.79 9.81834 11.8275 9.96724L13.0471 14.8152C13.135 15.1648 12.7518 15.4432 12.4465 15.2515L8.21268 12.5935C8.08265 12.5119 7.91735 12.5119 7.78732 12.5935L3.55354 15.2515C3.24818 15.4432 2.86498 15.1648 2.95295 14.8152L4.17255 9.96724C4.21001 9.81834 4.15893 9.66114 4.0411 9.56269L0.204888 6.35751C-0.0718042 6.12633 0.0745631 5.67585 0.434295 5.65146L5.42182 5.31328C5.57501 5.30289 5.70873 5.20574 5.76595 5.06326L7.62881 0.42434Z"
                  fill="#fad171"
                ></path>
              </svg>
            </span>
            <span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.62881 0.42434C7.76317 0.0897527 8.23683 0.0897521 8.37119 0.42434L10.234 5.06326C10.2913 5.20574 10.425 5.30289 10.5782 5.31328L15.5657 5.65146C15.9254 5.67585 16.0718 6.12633 15.7951 6.35751L11.9589 9.56269C11.8411 9.66114 11.79 9.81834 11.8275 9.96724L13.0471 14.8152C13.135 15.1648 12.7518 15.4432 12.4465 15.2515L8.21268 12.5935C8.08265 12.5119 7.91735 12.5119 7.78732 12.5935L3.55354 15.2515C3.24818 15.4432 2.86498 15.1648 2.95295 14.8152L4.17255 9.96724C4.21001 9.81834 4.15893 9.66114 4.0411 9.56269L0.204888 6.35751C-0.0718042 6.12633 0.0745631 5.67585 0.434295 5.65146L5.42182 5.31328C5.57501 5.30289 5.70873 5.20574 5.76595 5.06326L7.62881 0.42434Z"
                  fill="#fad171"
                ></path>
              </svg>
            </span>
          </p>
          <div className="flex gap-6 flex-col items-center">
            {/* <div>
              <img src="/images/avatar.avif" className="w-[90px]" />
            </div> */}
            <div className="flex flex-col gap-4">
              {/* <p className="text-white text-center font-black">Anna Harissis</p> */}
              <h2 className=" text-lg text-white">Ceo & Founder, Blue Kite</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#f0f0f133]"></div>
      <div className="w-full px-5 py-20 max-w-[1200px] mx-auto flex justify-between items-start max-xl:justify-start  max-xl:gap-20 max-md:flex-col  max-md:gap-10">
        <div className="flex flex-col gap-10 ">
          <div style={{ background: 'white', padding: '5px' }}>
            <img
              src="/ecarts.png"
              alt="ecarts Logo"
              style={{ width: "200px", height: "auto" }}
            />
          </div>

          <p className="text-white font-black text-[20px]">contact@ecarts.agency</p>
          <p className="text-white font-black text-[20px]">+91-88822-02176</p>

          <div className="flex gap-4 mt-2">
            <a
              href="https://www.facebook.com/profile.php?id=61584220782402"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#fad171] text-2xl transition-colors duration-300"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/ecarts.agency"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#fad171] text-2xl transition-colors duration-300"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/ecarts-agency"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#fad171] text-2xl transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>

          {/* <div>
            <img src="/images/star.svg" />
          </div> */}
        </div>
        <div className="flex flex-col text-white gap-[10px]  max-xl:hidden">
          <h1 className="mb-2 font-bold text-xl">Services</h1>

          <Link href="/services" className="cursor-pointer hover:text-[#fad171] duration-300">
            Mobile App development
          </Link>
          <Link href="/services" className="cursor-pointer hover:text-[#fad171] duration-300">
            Web development
          </Link>
        </div>
        <div className="flex flex-col text-white gap-[10px] max-xl:hidden">
          <h1 className="mb-2 font-bold text-xl">Company</h1>

          <Link
            href="/#IndustriesExpert" // Replace with the actual ID for the Expertise section
            className="cursor-pointer hover:text-[#fad171] duration-300"
          >
            Expertise
          </Link>

          <Link
            href="/projects" // Replace with the actual ID for the Portfolio section
            className="cursor-pointer hover:text-[#fad171] duration-300"
          >
            Portfolio
          </Link>

          <Link
            href="/about-us" // Ensure this matches the existing section ID
            className="cursor-pointer hover:text-[#fad171] duration-300"
          >
            About us
          </Link>

          <Link
            href="#Footer" // Replace with the actual ID for the Contact us section
            className="cursor-pointer hover:text-[#fad171] duration-300"
          >
            Contact us
          </Link>
        </div>
        <div className="flex flex-col text-white gap-[10px]  max-xl:mt-20 max-md:mt-0">
          <h1 className="mb-2 font-bold text-xl">Location</h1>
          <div className="max-xl:flex max-xl:items-start  max-xl:gap-20  max-xl:flex-wrap  max-md:flex-col max-md:gap-5">
            <div>
              <h2 className="mb-1 font-bold text-lg mt-1">India</h2>
              <p>
                sector -63, Noida
                <br /> Uttar Pradesh, 201301
              </p>
              <p>+91 88822-02176</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
