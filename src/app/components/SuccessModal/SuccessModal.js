"use client";
import React from 'react';
import { FaTimes } from 'react-icons/fa';

/**
 * SuccessModal Component
 *
 * @param {boolean} isOpen - Controls visibility of the modal
 * @param {function} onClose - Function to close the modal
 * @param {string} message - Success message to display
 */
const SuccessModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl animate-fade-in-up">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close modal"
        >
          <FaTimes size={20} />
        </button>

        <div className="flex flex-col items-center p-8 text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 mb-4 flex items-center justify-center bg-green-100 rounded-full">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>

          {/* Heading */}
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Success!</h2>

          {/* Message */}
          <p className="mb-6 text-gray-600">{message}</p>

          {/* OK Button */}
          <button
            onClick={onClose}
            className="px-6 py-2.5 min-w-[120px] font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
