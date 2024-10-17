"use client"
import React, { useState, useEffect } from 'react';
import ModalImage from 'react-modal-image';

const images = [
    "potrait_1.jpeg",
    "potrait_6.jpeg",
    "potrait_5.jpeg",
    "potrait_4.jpeg",
    "/landscape_6.png",
    "/landscape_4.png",
    "/landscape_3.png",
    "/landscape_5.png",
];

const Portfolio = () => {
    const [loadedImages, setLoadedImages] = useState([]);

    useEffect(() => {
        const handleScroll = () => {
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => {
                if (img.getBoundingClientRect().top <= window.innerHeight) {
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check immediately after mount

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section className="portfolio-section mb-10 md:mb-20">
            <div className='bg-white'>

                {/* Upper Section */}
                <div className="relative h-screen">
                    <img
                        src="/portfolio_clg.png"
                        alt="Background"
                        className="w-full h-full object-cover object-right sm:object-center"
                    />
                    {/* Gradient overlay for mobile */}
                    <div className="absolute inset-0 bg-black opacity-70 sm:hidden"></div>
                    {/* Gradient overlay for desktop */}
                    <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-black to-transparent opacity-70"></div>
                    <div className="absolute inset-0 flex items-center">
                        <div className="text-left text-white p-4 w-full sm:w-1/2">
                            <h1 className="text-3xl sm:text-5xl font-bold">Multi-Vendor E-Commerce</h1>
                            <p className="mt-2 sm:mt-4 text-base sm:text-lg">
                                Discover how we transformed our client's business with a cutting-edge multi-vendor e-commerce platform. Our custom-built solution delivers seamless features and robust functionalities, including:
                            </p>
                            <ul className="mt-4 list-disc list-inside">
                                <li className="mt-2 sm:mt-4 text-base font-medium sm:text-lg">Feature of Product Variation, Color, Weight, Size</li>
                                <li className="mt-2 sm:mt-4 text-base font-medium sm:text-lg">Real-time Order Status Tracking</li>
                                <li className="mt-2 sm:mt-4 text-base font-medium sm:text-lg">Dynamic Product Search</li>
                                <li className="mt-2 sm:mt-4 text-base font-medium sm:text-lg">Location-based Pricing</li>
                                <li className="mt-2 sm:mt-4 text-base font-medium sm:text-lg">Automatic current location Picking for shipping address</li>
                                <li className="mt-2 sm:mt-4 text-base font-medium sm:text-lg">OTP Authentication</li>
                                <li className="mt-2 sm:mt-4 text-base font-medium sm:text-lg">Invoice Pdf download</li>
                                <li className="mt-2 sm:mt-4 text-base font-medium sm:text-lg">Order Placement With & Without Chat</li>
                                <li className="mt-2 sm:mt-4 text-base font-medium sm:text-lg">Vendor Management Dashboard</li>
                                <li className="mt-2 sm:mt-4 text-base font-medium sm:text-lg">And more...</li>

                            </ul>
                        </div>
                    </div>
                </div>



                {/* Lower Section */}
                {/* <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((image, index) => (
                            <div key={index} className="relative group">
                                <img
                                    data-src={image}
                                    alt={`Portfolio ${index}`}
                                    className="w-full h-full object-cover"
                                    src={loadedImages.includes(image) ? image : '/placeholder.png'}
                                    onLoad={() => setLoadedImages(prev => [...prev, image])}
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ModalImage
                                        small={image}
                                        large={image}
                                        alt={`Portfolio ${index}`}
                                        hideDownload={true}
                                        hideZoom={true}
                                        className="text-white bg-gray-800 p-2 rounded"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>
        </section>
    );
};

export default Portfolio;
