import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useInView } from "react-intersection-observer";

const ContactUs = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
  });
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    if (inView) {
      setBgLoaded(true);
    }
  }, [inView]);
  return (
    <section
      ref={ref}
      className={`${
        bgLoaded ? "bg-[url(/images/bg1.png)] opacity-100" : "opacity-0"
      } transition-opacity duration-500  text-white flex flex-col items-center py-20 px-5 mb-20`}
    >
      <div className="relative w-full max-w-6xl">
        {/* Desktop Image */}
        <img
          src="/improved.png"
          alt="Card"
          className="hidden md:block w-full h-[350px]  rounded-lg"
          loading="lazy"
        />

        {/* Mobile Image */}
        <img
          src="/framex.png"
          alt="Card"
          className="md:hidden w-full rounded-lg"
          loading="lazy"
        />
        <div className="absolute inset-0 top-10 md:top-20 flex flex-col md:flex-row md:justify-between  items-center text-left p-5 md:p-20">
          <div className="flex flex-col items-center mb-5 md:mb-0">
            <h2 className="text-2xl mt-5 md:mt-0 md:text-5xl font-bold text-center md:text-left">
              HAVE A GREAT IDEA?
              <br />
              KNOW YOUR APP COST
            </h2>
          </div>
          <ScrollLink
            to="Footer" // Replace with the ID of the home section
            smooth={true}
            className="bg-[#fad171] hover:bg-[#fad171] font-bold py-3 px-8 rounded-full"
          >
            <p className="text-black">Contact us</p>
          </ScrollLink>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
