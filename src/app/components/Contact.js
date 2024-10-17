"use client";
import React, { useState } from "react";
import { FaMap } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlinePhone } from "react-icons/ai";
import axios from "axios";
import { sendGAEvent } from '@next/third-parties/google'
const Contact = () => {
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
    console.log("api call");

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
      .post("https://email-server-new.netlify.app/.netlify/functions/api/send-email", data)
      .then((response) => {
        if (window.gtag) {
          window.gtag('event', 'conversion', {
            'send_to': 'AW-16527872688/w3d9CP-j06UZELCljck9',
            'value': 1.0,
            'currency': 'INR'
          });

        }
        // sendGAEvent({ event: 'buttonClicked', value: 'contact button' })
        console.log("Email sent successfully:", response.data);
        setSuccessMessage("Email sent successfully!");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setPhone("");
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
    <div
      id="contact-section"
      className="bg-white p-5 md:p-10 lg:p-16 bg-stone-50 relative"
      style={{ zIndex: 1 }}
    >
      <h1 className="text-2xl md:text-4xl lg:text-3xl font-semibold mb-10">
        Clear Costs, Defined Timeline
      </h1>

      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="p-5 md:p-10 bg-slate-100 mb-5 md:mb-0 md:w-1/2 md:mr-10">
          {/* <h2 className="font-bold text-xl lg:text-2xl">Clear Documentation, Clear Costs: Feature-by-Feature</h2> */}

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4 flex flex-col md:flex-row md:justify-between">
              <div className="md:mr-3 mb-3 md:mb-0">
                {/* <label htmlFor="name" className="block font-bold text-slate-600">
                  Name
                </label> */}
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border rounded p-2 w-full focus:border-blue-500"
                  placeholder="Your Phone Number (e.g., 1234567890)"
                  pattern="[0-9]{10}"
                  title="Please enter a 10-digit phone number with only digits"
                  required
                />
              </div>

              <div>
                {/* <label
                  htmlFor="email"
                  className="block font-bold text-slate-600"
                >
                  Email
                </label> */}
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded p-2 w-full"
                  placeholder="Your Email"
                  required
                />
              </div>
            </div>


            <div className="mb-4">

              <textarea
                id="How Can I Help You"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border rounded p-2 w-full h-32"
                placeholder="Your Requirements"
                required
              />
            </div>
            {/* Show success message if it's not empty */}
            {successMessage && (
              <p className="text-green-600 text-center mt-4">
                {successMessage}
              </p>
            )}
            {/* Show error message if it's not empty */}
            {errorMessage && (
              <p className="text-red-600 text-center mt-4">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="button"
              disabled={loading}
            >
              {loading ? "Sending..." : "Get Free Quote Now!"}
            </button>
          </form>
        </div>

        <div className="p-5 md:p-10 bg-slate-100 md:w-1/2">
          <h2 className="font-bold text-xl lg:text-2xl">Let's Connect!</h2>
          <p className="mt-3 text-base text-slate-600">
            Embracing invigorating challenges is our forte. With a profound
            commitment to excellence, We are eager to contribute our professional
            expertise to help you accomplish your objectives. If you have a
            project that demands the best, feel free to reach out; We are readily
            available to collaborate.
          </p>
          <div className="mt-5">
            <div className="flex">
              <FaMap size="24" />
              <p className="font-semibold text-lg ml-3">
                sector-63, Noida, Uttar Pradesh 201301, India
              </p>
            </div>

            <div className="flex my-2">
              <AiOutlineMail size="24" />
              <p className="font-semibold text-lg ml-3">
                waseemahm11011@gmail.com
              </p>
            </div>

            <div className="flex">
              <AiOutlinePhone size="24" />
              <p className="font-semibold text-lg ml-3">+91-888-2202-176</p>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Contact;
