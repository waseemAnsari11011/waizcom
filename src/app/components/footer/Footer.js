"use client";
import React, { useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";
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
    <div className="bg-[#021b4b] w-full">
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
                placeholder="waizcom"
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

        <div className="flex justify-center flex-col item-center w-[calc(50%-60px)] cell bg-[#02215d] border relative border-[#38434a] max-xl:hidden">
          <div className="flex justify-center mb-[40px]">
            <div className="flex items-center">
              <FaQuoteLeft className="text-[#fad171]" size={50} />
            </div>
          </div>
          <p className="mt-2 text-white text-center px-12">
            "I had a great experience working with Waizcom on my project—their
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
              <h2 className=" text-lg text-white">
                Ceo & Co-Founder, Blue Kite
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#f0f0f133]"></div>
      <div className="w-full px-5 py-20 max-w-[1200px] mx-auto flex justify-between items-start max-xl:justify-start  max-xl:gap-20 max-md:flex-col  max-md:gap-10">
        <div className="flex flex-col gap-10 ">
          <div>
            <img
              src="/waizcom_white.png"
              alt="Waizcom Logo"
              style={{ width: "200px", height: "auto" }}
            />
          </div>

          {/* <p className="text-white font-black text-[20px]">info@solveit.dev</p> */}
          <p className="text-white font-black text-[20px]">+91-88822-02176</p>

          {/* <div>
            <img src="/images/star.svg" />
          </div> */}
          {/* <div>
            <svg
              width="118"
              height="34"
              viewBox="0 0 118 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.4483 23.9388C21.7241 25.3265 19.3104 26.3673 16.8966 26.3673C11.3793 26.3673 7.58621 22.2041 7.58621 16.6531C7.58621 11.102 11.3793 7.28571 16.8966 7.28571C19.3104 7.28571 21.7241 7.97959 23.4483 9.71428L24.4828 10.7551L30 5.55102L28.6207 4.5102C25.5172 1.73469 21.3793 0 16.8966 0C7.24139 0 0 7.28571 0 17C0 26.7143 7.24139 34 16.8966 34C21.3793 34 25.5172 32.2653 28.6207 29.4898L30 28.449L24.4828 22.898L23.4483 23.9388Z"
                fill="white"
              ></path>
              <path
                d="M17 23C20.3137 23 23 20.3137 23 17C23 13.6863 20.3137 11 17 11C13.6863 11 11 13.6863 11 17C11 20.3137 13.6863 23 17 23Z"
                fill="#FF0200"
              ></path>
              <path
                d="M47.9941 1.33416C48.1972 0.888613 48.8028 0.888614 49.0059 1.33416L50.5424 4.70464C50.6242 4.88396 50.787 5.00781 50.9751 5.03377L54.512 5.52178C54.9795 5.5863 55.1667 6.18972 54.8246 6.52966L52.2376 9.10025C52.0999 9.23708 52.0377 9.43758 52.0722 9.63303L52.7217 13.3046C52.8076 13.7901 52.3176 14.163 51.9031 13.9275L48.7674 12.1461C48.6006 12.0513 48.3994 12.0513 48.2326 12.1461L45.0969 13.9275C44.6824 14.163 44.1924 13.7901 44.2783 13.3046L44.9278 9.63303C44.9623 9.43758 44.9001 9.23708 44.7624 9.10025L42.1754 6.52966C41.8333 6.18972 42.0205 5.5863 42.488 5.52178L46.0249 5.03377C46.213 5.00781 46.3758 4.88396 46.4576 4.70464L47.9941 1.33416Z"
                fill="#FAD171"
              ></path>
              <path
                d="M63.4551 1.33416C63.6739 0.888613 64.3261 0.888614 64.5449 1.33416L66.1995 4.70464C66.2876 4.88396 66.4629 5.00781 66.6655 5.03377L70.4744 5.52178C70.978 5.5863 71.1796 6.18972 70.8111 6.52966L68.0251 9.10025C67.8768 9.23708 67.8098 9.43758 67.847 9.63303L68.5465 13.3046C68.639 13.7901 68.1113 14.163 67.6649 13.9275L64.2879 12.1461C64.1083 12.0513 63.8917 12.0513 63.7121 12.1461L60.3351 13.9275C59.8887 14.163 59.361 13.7901 59.4535 13.3046L60.153 9.63303C60.1902 9.43758 60.1232 9.23708 59.9749 9.10025L57.1889 6.52966C56.8204 6.18972 57.022 5.5863 57.5256 5.52178L61.3345 5.03377C61.5371 5.00781 61.7124 4.88396 61.8005 4.70464L63.4551 1.33416Z"
                fill="#FAD171"
              ></path>
              <path
                d="M78.9941 1.33416C79.1972 0.888613 79.8028 0.888614 80.0059 1.33416L81.5424 4.70464C81.6242 4.88396 81.787 5.00781 81.9751 5.03377L85.512 5.52178C85.9795 5.5863 86.1667 6.18972 85.8246 6.52966L83.2376 9.10025C83.0999 9.23708 83.0377 9.43758 83.0722 9.63303L83.7217 13.3046C83.8076 13.7901 83.3176 14.163 82.9031 13.9275L79.7674 12.1461C79.6006 12.0513 79.3994 12.0513 79.2326 12.1461L76.0969 13.9275C75.6824 14.163 75.1924 13.7901 75.2783 13.3046L75.9278 9.63303C75.9623 9.43758 75.9001 9.23708 75.7624 9.10025L73.1754 6.52966C72.8333 6.18972 73.0205 5.5863 73.488 5.52178L77.0249 5.03377C77.213 5.00781 77.3758 4.88396 77.4576 4.70464L78.9941 1.33416Z"
                fill="#FAD171"
              ></path>
              <path
                d="M94.4551 1.33416C94.6739 0.888613 95.3261 0.888614 95.5449 1.33416L97.1995 4.70464C97.2876 4.88396 97.4629 5.00781 97.6655 5.03377L101.474 5.52178C101.978 5.5863 102.18 6.18972 101.811 6.52966L99.0251 9.10025C98.8768 9.23708 98.8098 9.43758 98.847 9.63303L99.5465 13.3046C99.639 13.7901 99.1113 14.163 98.6649 13.9275L95.2879 12.1461C95.1083 12.0513 94.8917 12.0513 94.7121 12.1461L91.3351 13.9275C90.8887 14.163 90.361 13.7901 90.4535 13.3046L91.153 9.63303C91.1902 9.43758 91.1232 9.23708 90.9749 9.10025L88.1889 6.52966C87.8204 6.18972 88.022 5.5863 88.5256 5.52178L92.3345 5.03377C92.5371 5.00781 92.7124 4.88396 92.8005 4.70464L94.4551 1.33416Z"
                fill="#FAD171"
              ></path>
              <path
                d="M110.455 1.33416C110.674 0.888613 111.326 0.888614 111.545 1.33416L113.2 4.70464C113.288 4.88396 113.463 5.00781 113.666 5.03377L117.474 5.52178C117.978 5.5863 118.18 6.18972 117.811 6.52966L115.025 9.10025C114.877 9.23708 114.81 9.43758 114.847 9.63303L115.546 13.3046C115.639 13.7901 115.111 14.163 114.665 13.9275L111.288 12.1461C111.108 12.0513 110.892 12.0513 110.712 12.1461L107.335 13.9275C106.889 14.163 106.361 13.7901 106.454 13.3046L107.153 9.63303C107.19 9.43758 107.123 9.23708 106.975 9.10025L104.189 6.52966C103.82 6.18972 104.022 5.5863 104.526 5.52178L108.334 5.03377C108.537 5.00781 108.712 4.88396 108.8 4.70464L110.455 1.33416Z"
                fill="#FAD171"
              ></path>
              <path
                d="M44.291 25.2012H45.0645C45.4434 25.2012 45.7559 25.1387 46.002 25.0137C46.252 24.8848 46.4375 24.7109 46.5586 24.4922C46.6836 24.2695 46.7461 24.0195 46.7461 23.7422C46.7461 23.4141 46.6914 23.1387 46.582 22.916C46.4727 22.6934 46.3086 22.5254 46.0898 22.4121C45.8711 22.2988 45.5938 22.2422 45.2578 22.2422C44.9531 22.2422 44.6836 22.3027 44.4492 22.4238C44.2188 22.541 44.0371 22.709 43.9043 22.9277C43.7754 23.1465 43.7109 23.4043 43.7109 23.7012H42.627C42.627 23.2676 42.7363 22.873 42.9551 22.5176C43.1738 22.1621 43.4805 21.8789 43.875 21.668C44.2734 21.457 44.7344 21.3516 45.2578 21.3516C45.7734 21.3516 46.2246 21.4434 46.6113 21.627C46.998 21.8066 47.2988 22.0762 47.5137 22.4355C47.7285 22.791 47.8359 23.2344 47.8359 23.7656C47.8359 23.9805 47.7852 24.2109 47.6836 24.457C47.5859 24.6992 47.4316 24.9258 47.2207 25.1367C47.0137 25.3477 46.7441 25.5215 46.4121 25.6582C46.0801 25.791 45.6816 25.8574 45.2168 25.8574H44.291V25.2012ZM44.291 26.0918V25.4414H45.2168C45.7598 25.4414 46.209 25.5059 46.5645 25.6348C46.9199 25.7637 47.1992 25.9355 47.4023 26.1504C47.6094 26.3652 47.7539 26.6016 47.8359 26.8594C47.9219 27.1133 47.9648 27.3672 47.9648 27.6211C47.9648 28.0195 47.8965 28.373 47.7598 28.6816C47.627 28.9902 47.4375 29.252 47.1914 29.4668C46.9492 29.6816 46.6641 29.8438 46.3359 29.9531C46.0078 30.0625 45.6504 30.1172 45.2637 30.1172C44.8926 30.1172 44.543 30.0645 44.2148 29.959C43.8906 29.8535 43.6035 29.7012 43.3535 29.502C43.1035 29.2988 42.9082 29.0508 42.7676 28.7578C42.627 28.4609 42.5566 28.123 42.5566 27.7441H43.6406C43.6406 28.041 43.7051 28.3008 43.834 28.5234C43.9668 28.7461 44.1543 28.9199 44.3965 29.0449C44.6426 29.166 44.9316 29.2266 45.2637 29.2266C45.5957 29.2266 45.8809 29.1699 46.1191 29.0566C46.3613 28.9395 46.5469 28.7637 46.6758 28.5293C46.8086 28.2949 46.875 28 46.875 27.6445C46.875 27.2891 46.8008 26.998 46.6523 26.7715C46.5039 26.541 46.293 26.3711 46.0195 26.2617C45.75 26.1484 45.4316 26.0918 45.0645 26.0918H44.291ZM54.8145 25.0547V26.3555C54.8145 27.0547 54.752 27.6445 54.627 28.125C54.502 28.6055 54.3223 28.9922 54.0879 29.2852C53.8535 29.5781 53.5703 29.791 53.2383 29.9238C52.9102 30.0527 52.5391 30.1172 52.125 30.1172C51.7969 30.1172 51.4941 30.0762 51.2168 29.9941C50.9395 29.9121 50.6895 29.7812 50.4668 29.6016C50.248 29.418 50.0605 29.1797 49.9043 28.8867C49.748 28.5938 49.6289 28.2383 49.5469 27.8203C49.4648 27.4023 49.4238 26.9141 49.4238 26.3555V25.0547C49.4238 24.3555 49.4863 23.7695 49.6113 23.2969C49.7402 22.8242 49.9219 22.4453 50.1562 22.1602C50.3906 21.8711 50.6719 21.6641 51 21.5391C51.332 21.4141 51.7031 21.3516 52.1133 21.3516C52.4453 21.3516 52.75 21.3926 53.0273 21.4746C53.3086 21.5527 53.5586 21.6797 53.7773 21.8555C53.9961 22.0273 54.1816 22.2578 54.334 22.5469C54.4902 22.832 54.6094 23.1816 54.6914 23.5957C54.7734 24.0098 54.8145 24.4961 54.8145 25.0547ZM53.7246 26.5312V24.873C53.7246 24.4902 53.7012 24.1543 53.6543 23.8652C53.6113 23.5723 53.5469 23.3223 53.4609 23.1152C53.375 22.9082 53.2656 22.7402 53.1328 22.6113C53.0039 22.4824 52.8535 22.3887 52.6816 22.3301C52.5137 22.2676 52.3242 22.2363 52.1133 22.2363C51.8555 22.2363 51.627 22.2852 51.4277 22.3828C51.2285 22.4766 51.0605 22.627 50.9238 22.834C50.791 23.041 50.6895 23.3125 50.6191 23.6484C50.5488 23.9844 50.5137 24.3926 50.5137 24.873V26.5312C50.5137 26.9141 50.5352 27.252 50.5781 27.5449C50.625 27.8379 50.6934 28.0918 50.7832 28.3066C50.873 28.5176 50.9824 28.6914 51.1113 28.8281C51.2402 28.9648 51.3887 29.0664 51.5566 29.1328C51.7285 29.1953 51.918 29.2266 52.125 29.2266C52.3906 29.2266 52.623 29.1758 52.8223 29.0742C53.0215 28.9727 53.1875 28.8145 53.3203 28.5996C53.457 28.3809 53.5586 28.1016 53.625 27.7617C53.6914 27.418 53.7246 27.0078 53.7246 26.5312Z"
                fill="white"
              ></path>
              <path
                d="M63.4621 25.8618C63.8094 25.8618 64.1154 25.8208 64.38 25.7389C64.6487 25.6529 64.872 25.5341 65.0498 25.3826C65.2317 25.227 65.3681 25.0427 65.4591 24.8297C65.5501 24.6167 65.5955 24.3812 65.5955 24.1232C65.5955 23.599 65.4219 23.2038 65.0746 22.9375C64.7273 22.6713 64.2063 22.5382 63.5117 22.5382H62.1969V25.8618H63.4621ZM67.5677 30.4017H66.501C66.2819 30.4017 66.1206 30.3177 66.0173 30.1498L63.7102 27.0044C63.6399 26.9061 63.5634 26.8365 63.4807 26.7956C63.4022 26.7505 63.2781 26.728 63.1086 26.728H62.1969V30.4017H61V21.5983H63.5117C64.074 21.5983 64.5598 21.6556 64.9691 21.7703C65.3785 21.8809 65.7154 22.0427 65.98 22.2556C66.2488 22.4686 66.4472 22.7266 66.5754 23.0297C66.7036 23.3287 66.7677 23.6645 66.7677 24.0372C66.7677 24.3485 66.7181 24.6392 66.6188 24.9096C66.5196 25.1799 66.3749 25.4235 66.1847 25.6406C65.9986 25.8536 65.7692 26.0358 65.4963 26.1874C65.2276 26.3389 64.9216 26.4536 64.5784 26.5314C64.7314 26.6174 64.8637 26.7423 64.9754 26.9061L67.5677 30.4017Z"
                fill="white"
              ></path>
              <path
                d="M74.631 29.4311L74.6248 30.4017H69.1486V21.5983H74.6248V22.5689H70.3517V25.4932H73.8123V26.427H70.3517V29.4311H74.631Z"
                fill="white"
              ></path>
              <path
                d="M83.9045 21.5983L80.2826 30.4017H79.2035L75.5817 21.5983H76.543C76.6505 21.5983 76.7373 21.6249 76.8034 21.6782C76.8696 21.7314 76.9192 21.799 76.9523 21.8809L79.4578 28.0918C79.5116 28.2311 79.5632 28.3826 79.6128 28.5464C79.6666 28.7102 79.7141 28.8823 79.7555 29.0625C79.7968 28.8823 79.8402 28.7102 79.8857 28.5464C79.9312 28.3826 79.9808 28.2311 80.0346 28.0918L82.5339 21.8809C82.5587 21.8113 82.6062 21.7478 82.6765 21.6904C82.751 21.629 82.8398 21.5983 82.9432 21.5983H83.9045Z"
                fill="white"
              ></path>
              <path
                d="M86.6489 30.4017H85.4457V21.5983H86.6489V30.4017Z"
                fill="white"
              ></path>
              <path
                d="M94.7766 29.4311L94.7704 30.4017H89.2942V21.5983H94.7704V22.5689H90.4974V25.4932H93.958V26.427H90.4974V29.4311H94.7766Z"
                fill="white"
              ></path>
              <path
                d="M108.342 21.5983L105.57 30.4017H104.49L102.239 23.687C102.219 23.6215 102.198 23.5519 102.177 23.4782C102.161 23.4044 102.142 23.3266 102.121 23.2447C102.101 23.3266 102.08 23.4044 102.059 23.4782C102.039 23.5519 102.018 23.6215 101.997 23.687L99.7337 30.4017H98.6546L95.8824 21.5983H96.8809C96.9884 21.5983 97.0773 21.6249 97.1475 21.6782C97.222 21.7314 97.2695 21.799 97.2902 21.8809L99.1259 27.9997C99.1549 28.1102 99.1817 28.229 99.2065 28.356C99.2355 28.4829 99.2624 28.6181 99.2872 28.7614C99.3161 28.6181 99.3451 28.4829 99.374 28.356C99.4071 28.2249 99.4422 28.1061 99.4794 27.9997L101.569 21.8809C101.594 21.8113 101.642 21.7478 101.712 21.6904C101.786 21.629 101.875 21.5983 101.979 21.5983H102.326C102.434 21.5983 102.52 21.6249 102.587 21.6782C102.653 21.7314 102.702 21.799 102.735 21.8809L104.819 27.9997C104.856 28.1061 104.889 28.2208 104.918 28.3437C104.951 28.4666 104.982 28.5956 105.011 28.7307C105.032 28.5956 105.055 28.4666 105.08 28.3437C105.104 28.2208 105.131 28.1061 105.16 27.9997L107.002 21.8809C107.023 21.8072 107.068 21.7416 107.139 21.6843C107.213 21.627 107.302 21.5983 107.405 21.5983H108.342Z"
                fill="white"
              ></path>
              <path
                d="M114.51 22.9744C114.473 23.0358 114.432 23.0829 114.386 23.1157C114.345 23.1444 114.293 23.1587 114.231 23.1587C114.161 23.1587 114.078 23.1239 113.983 23.0543C113.888 22.9846 113.768 22.9089 113.623 22.827C113.483 22.741 113.311 22.6631 113.108 22.5935C112.91 22.5239 112.668 22.4891 112.383 22.4891C112.114 22.4891 111.876 22.5259 111.67 22.5997C111.467 22.6693 111.295 22.7655 111.155 22.8884C111.018 23.0113 110.915 23.1567 110.845 23.3246C110.775 23.4884 110.739 23.6666 110.739 23.859C110.739 24.1048 110.799 24.3096 110.919 24.4734C111.043 24.6331 111.205 24.7703 111.403 24.885C111.606 24.9997 111.833 25.1 112.085 25.186C112.341 25.2679 112.602 25.3539 112.867 25.444C113.135 25.5341 113.396 25.6365 113.648 25.7512C113.904 25.8618 114.132 26.0031 114.33 26.1751C114.533 26.3471 114.694 26.558 114.814 26.8078C114.938 27.0577 115 27.3648 115 27.7294C115 28.1143 114.934 28.4768 114.802 28.8167C114.669 29.1526 114.475 29.4454 114.219 29.6952C113.966 29.9451 113.654 30.1416 113.282 30.285C112.914 30.4283 112.494 30.5 112.023 30.5C111.444 30.5 110.919 30.3976 110.448 30.1928C109.977 29.984 109.573 29.7034 109.239 29.3512L109.586 28.786C109.619 28.741 109.658 28.7041 109.704 28.6754C109.753 28.6427 109.807 28.6263 109.865 28.6263C109.919 28.6263 109.979 28.6488 110.045 28.6939C110.115 28.7348 110.194 28.7881 110.28 28.8536C110.367 28.9191 110.466 28.9908 110.578 29.0686C110.69 29.1464 110.816 29.2181 110.956 29.2836C111.101 29.3491 111.264 29.4044 111.446 29.4495C111.628 29.4904 111.833 29.5109 112.06 29.5109C112.346 29.5109 112.6 29.472 112.823 29.3942C113.046 29.3164 113.235 29.2078 113.388 29.0686C113.545 28.9253 113.665 28.7553 113.747 28.5587C113.83 28.3621 113.871 28.143 113.871 27.9014C113.871 27.6352 113.809 27.4181 113.685 27.2502C113.565 27.0782 113.406 26.9348 113.208 26.8201C113.009 26.7055 112.782 26.6092 112.525 26.5314C112.269 26.4495 112.009 26.3676 111.744 26.2857C111.479 26.1997 111.219 26.1014 110.963 25.9908C110.706 25.8802 110.479 25.7369 110.28 25.5608C110.082 25.3846 109.921 25.1655 109.797 24.9034C109.677 24.6372 109.617 24.3096 109.617 23.9205C109.617 23.6092 109.677 23.3082 109.797 23.0174C109.921 22.7266 110.099 22.4686 110.33 22.2433C110.566 22.0181 110.853 21.8379 111.192 21.7027C111.535 21.5676 111.928 21.5 112.37 21.5C112.867 21.5 113.317 21.5778 113.722 21.7334C114.132 21.8891 114.491 22.1143 114.802 22.4092L114.51 22.9744Z"
                fill="white"
              ></path>
            </svg>
          </div> */}
        </div>
        <div className="flex flex-col text-white gap-[10px]  max-xl:hidden">
          <h1 className="mb-2 font-bold text-xl">Services</h1>

          <a className="cursor-pointer hover:text-[#fad171] duration-300">
            Logo design
          </a>
          <a className="cursor-pointer hover:text-[#fad171] duration-300">
            Marketing
          </a>
          <a className="cursor-pointer hover:text-[#fad171] duration-300">
            Mobile App development
          </a>
          <a className="cursor-pointer hover:text-[#fad171] duration-300">
            Web development
          </a>
        </div>
        <div className="flex flex-col text-white gap-[10px] max-xl:hidden">
          <h1 className="mb-2 font-bold text-xl">Company</h1>

          <ScrollLink
            to="IndusteriesExpert" // Replace with the actual ID for the Expertise section
            smooth={true}
            className="cursor-pointer hover:text-[#fad171] duration-300"
            //onClick={() => setShowSidebar(false)} // If you want to close the sidebar on click
          >
            Expertise
          </ScrollLink>

          <ScrollLink
            to="projects-section" // Replace with the actual ID for the Portfolio section
            smooth={true}
            className="cursor-pointer hover:text-[#fad171] duration-300"
            //onClick={() => setShowSidebar(false)}
          >
            Portfolio
          </ScrollLink>

          {/* <ScrollLink
            to="blog-section" // Replace with the actual ID for the Blog section
            smooth={true}
            className="cursor-pointer hover:text-[#fad171] duration-300"
            //onClick={() => setShowSidebar(false)}
          >
            Blog
          </ScrollLink> */}

          <ScrollLink
            to="about-section" // Ensure this matches the existing section ID
            smooth={true}
            className="cursor-pointer hover:text-[#fad171] duration-300"
            //onClick={() => setShowSidebar(false)}
          >
            About us
          </ScrollLink>

          {/* <ScrollLink
            to="joinus-section" // Replace with the actual ID for the Join us section
            smooth={true}
            className="cursor-pointer hover:text-[#fad171] duration-300"
            //onClick={() => setShowSidebar(false)}
          >
            Join us
          </ScrollLink> */}

          <ScrollLink
            to="Footer" // Replace with the actual ID for the Contact us section
            smooth={true}
            className="cursor-pointer hover:text-[#fad171] duration-300"
            //onClick={() => setShowSidebar(false)}
          >
            Contact us
          </ScrollLink>
        </div>
        <div className="flex flex-col text-white gap-[10px]  max-xl:mt-20 max-md:mt-0">
          <h1 className="mb-2 font-bold text-xl">Location</h1>
          <div className="max-xl:flex max-xl:items-start  max-xl:gap-20  max-xl:flex-wrap  max-md:flex-col max-md:gap-5">
            {/* <div>
              <h2 className="mb-1 font-bold text-lg ">United States</h2>
              <p>
                1936 Folsom St, San
                <br /> Francisco, CA 94103
              </p>
              <p>+1 415 800-4406</p>
            </div> */}
            {/* <div>
              <h2 className="mb-1 font-bold text-lg mt-1">Poland</h2>
              <p>
                1936 Folsom St, San
                <br /> Francisco, CA 94103
              </p>
              <p>+1 415 800-4406</p>
            </div> */}
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
      {/* <div className="w-full h-[1px] bg-[#f0f0f133]"></div>
      <div className="w-full p-5 max-w-[1200px] mx-auto flex justify-between items-center max-xl:flex-col-reverse max-xl:items-start max-xl:gap-4">
        <p className="text-[#bbbbc3]">©2024 All Rights Reserved. Waizcom</p>
        <div className="flex gap-4 max-xl:flex-wrap">
          <img
            className="w-[40px] h-[40px] cursor-pointer"
            src="/images/linkdin.svg"
          />
          <img
            className="w-[40px] h-[40px] cursor-pointer"
            src="/images/instagram.svg"
          />
          <img
            className="w-[40px] h-[40px] cursor-pointer"
            src="/images/medium.svg"
          />
          <img
            className="w-[40px] h-[40px] cursor-pointer"
            src="/images/tweet.svg"
          />
          <img
            className="w-[40px] h-[40px] cursor-pointer"
            src="/images/facebook.svg"
          />
          <img
            className="w-[40px] h-[40px] cursor-pointer"
            src="/images/github.svg"
          />
          <img
            className="w-[40px] h-[40px] cursor-pointer"
            src="/images/clutch.svg"
          />
        </div>
      </div> */}
    </div>
  );
};

export default Footer;
