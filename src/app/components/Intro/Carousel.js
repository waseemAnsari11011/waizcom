import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

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
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const intervalTime = isMobile ? intervalTimeMobile : intervalTimeDesktop;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalItems;
      if (carouselRef.current) {
        carouselRef.current.scrollTo({
          left: carouselRef.current.clientWidth * currentIndex,
          behavior: "smooth",
        });
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isMobile]);

  const carouselItems = [
    {
      mobile: "/carousel_mobile/multi_vendor_mobile.jpg",
      desktop: "/carousel_desktop/multi_vendor_desktop.jpg",
      alt: "Multi Vendor E-commerce",
    },
    {
      mobile: "/carousel_mobile/bluekite_mobile.png",
      desktop: "/carousel_desktop/bluekite_desktop.png",
      alt: "Blue Kite Food Delivery",
    },
    {
      mobile: "/carousel_mobile/yos_mobile.png",
      desktop: "/carousel_desktop/yos_desktop.png",
      alt: "YOS E-commerce",
    },
    {
      mobile: "/carousel_mobile/laundry_service_mobile.jpg",
      desktop: "/carousel_desktop/laundry_desktop.jpg",
      alt: "Laundry Service App",
    },
  ];

  return (
    <div className="carousel-container my-5 md:my-10 px-5 md:px-0">
      <div className="carousel" ref={carouselRef}>
        {[...Array(2)].map((_, loopIndex) => (
          <React.Fragment key={loopIndex}>
            {carouselItems.map((item, index) => (
              <div className="carousel-item relative w-full" key={`${loopIndex}-${index}`}>
                {/* Mobile Image */}
                <div className="block md:hidden w-full h-auto relative aspect-[4/3]">
                  <Image
                    src={item.mobile}
                    alt={item.alt}
                    fill
                    sizes="100vw"
                    className="object-cover rounded-[30px]"
                    priority={loopIndex === 0 && index === 0} // Priority for the very first image
                  />
                </div>

                {/* Desktop Image */}
                <div className="hidden md:block w-full h-auto relative aspect-[16/9]">
                  <Image
                    src={item.desktop}
                    alt={item.alt}
                    fill
                    sizes="33vw"
                    className="object-cover rounded-[50px]"
                    priority={loopIndex === 0 && index === 0} // Priority for the very first image
                  />
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
