"use client";
import { useState, useEffect } from "react";
import Script from "next/script";
import Image from "next/image";
import { sendGAEvent } from "@next/third-parties/google";
import WhatsAppButton from "../../utility/whatsappBtn";
import Carousel from "./Carousel";
import { montserrat, rubik } from "@/app/fonts";

const IntroSection = () => {
  const [isMobile, setIsMobile] = useState(null);
  const trigerEvent = () => {
    sendGAEvent("event", "contact_me_intro_sec_clicked", {
      value: "contact_me_intro",
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();

    // Add event listener to handle resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-white">
      <WhatsAppButton phoneNumber={"918882202176"} />

      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=AW-16527872688"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-16527872688');
    `}
      </Script>
      {/* Intro Content */}
      <div
        id="intro-section"
        className="bg-white flex justify-between px-5 md:px-10 lg:px-16"
      >
        <div className="flex-1 mt-20 md:mt-20">
          <div className="">
            <h1
              className={`${rubik.className} font-bold text-3xl md:text-7xl font-black text-black py-1.5 lg:py-2 h0`}
            >
              Creating
              <div className="ml-2 inline-block">
                <div className="relative">
                  <Image
                    alt="My Image"
                    src="/best_quality.png"
                    priority={true}
                    width={100}
                    height={100}
                    sizes="(max-width: 768px) 64px, (max-width: 1024px) 96px, 128px"
                    className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
                    style={{ color: "transparent" }}
                  />
                </div>
              </div>
              <br />
              E-commerce Apps
            </h1>

            <p className="text-xl md:text-xl font-medium py-1.5 lg:py-2">
              Your partner for e-commerce growth! 🚀
            </p>
            {/* <div className="flex items-center">
              <div className="w-70"> 
                <p className="text-base md:text-lg font-medium text-zinc-500 py-1.5 lg:py-2 mr-3">
                  Monthly installments as low as ₹15,000.
                  <br />
                  The total development time remains unaffected by your installment plan.
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <Carousel />
    </div>
  );
};

export default IntroSection;
