import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = ({ phoneNumber }) => {
    const whatsappLink = `https://wa.me/message/6ZHRHY6SXHAKG1`;
    

    const handleClick = () => {
        if (window.gtag) {
            window.gtag('event', 'conversion', {
              'send_to': 'AW-16527872688/w3d9CP-j06UZELCljck9',
              'value': 1.0,
              'currency': 'INR'
            });
            
          }
    };

    return (
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className='whatsappButton' onClick={handleClick}>
            <FaWhatsapp className='whatsappIcon' />
        </a>
    );
};

export default WhatsAppButton;
