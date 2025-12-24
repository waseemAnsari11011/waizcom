"use client";
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = ({ phoneNumber }) => {
    const whatsappLink = `https://wa.me/message/6ZHRHY6SXHAKG1`;


    const handleClick = () => {
        if (typeof window.gtag_report_conversion === 'function') {
            window.gtag_report_conversion();
        } else if (window.gtag) {
            window.gtag('event', 'conversion', {
                'send_to': 'AW-17813249829/B1xyCILN5NMbEKW-gq5C'
            });
        }
    };

    return (
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className='whatsappButton' onClick={handleClick} aria-label="Chat on WhatsApp">
            <FaWhatsapp className='whatsappIcon' />
        </a>
    );
};

export default WhatsAppButton;
