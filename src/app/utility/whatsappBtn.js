"use client";
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = ({ phoneNumber }) => {
    const message = "I am interested in your e-commerce development services";
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;


    const handleClick = () => {

    };

    return (
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className='whatsappButton' onClick={handleClick} aria-label="Chat on WhatsApp">
            <FaWhatsapp className='whatsappIcon' />
        </a>
    );
};

export default WhatsAppButton;
