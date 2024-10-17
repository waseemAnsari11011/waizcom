import React, { useState, useEffect, useRef } from 'react';

const Carousel = () => {
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);
  const totalItems = 4; // Adjust according to the number of unique items
  const intervalTimeMobile = 2800; // Time in milliseconds for mobile view
  const intervalTimeDesktop = 1000; // Time in milliseconds for desktop view

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    handleResize(); // Initialize
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const intervalTime = isMobile ? intervalTimeMobile : intervalTimeDesktop;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalItems;
      carouselRef.current.scrollTo({
        left: carouselRef.current.clientWidth * currentIndex,
        behavior: 'smooth',
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <div className="carousel-container my-5 md:my-10 px-5 md:px-0">
      <div className="carousel" ref={carouselRef}>
        {[...Array(2)].map((_, i) => (
          <React.Fragment key={i}>
            <div className="carousel-item">
              <picture>
                <source media="(max-width: 767px)" srcSet="/multi_vendor_mobile.jpg" />
                <source media="(min-width: 768px)" srcSet="/multi_vendor_desktop.jpg" />
                <img src="/multi_vendor_desktop.jpg" alt={`Image 1-${i}`} width="400" height="300" />
              </picture>
            </div>
            <div className="carousel-item">
              <picture>
                <source media="(max-width: 767px)" srcSet="/bluekite_mobile.png" />
                <source media="(min-width: 768px)" srcSet="/bluekite_desktop.png" />
                <img src="/bluekite_desktop.png" alt={`Image 1-${i}`} width="400" height="300" />
              </picture>
            </div>
            <div className="carousel-item">
              <picture>
                <source media="(max-width: 767px)" srcSet="/yos_mobile.png" />
                <source media="(min-width: 768px)" srcSet="/yos_desktop.png" />
                <img src="/yos_desktop.png" alt={`Image 1-${i}`} width="400" height="300" />
              </picture>
            </div>
            
            <div className="carousel-item">
              <picture>
                <source media="(max-width: 767px)" srcSet="/laundry_service_mobile.jpg" />
                <source media="(min-width: 768px)" srcSet="/laundry_desktop.jpg" />
                <img src="/laundry_desktop.jpg" alt={`Image 2-${i}`} width="400" height="300" />
              </picture>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
