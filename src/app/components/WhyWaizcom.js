import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const WhyWaizcom = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
  });
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    if (inView) {
      setBgLoaded(true);
    }
  }, [inView]);
  return (
    <section ref={ref} className="px-4 md:px-10 lg:px-16 mb-10 md:mb-20">
      <h2 className="text-center text-4xl font-bold mb-8 md:mb-12">
        WHY WAIZCOM
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-2 md:px-4">
        <div
          className={`${
            bgLoaded ? "bg-[url(/images/noise1.png)] opacity-100" : "opacity-0"
          } transition-opacity duration-100 bg-[#f4f5f6] p-6 md:p-8 shadow rounded-2xl `}
        >
          <h3 className="text-4xl font-bold mb-4">01</h3>
          <h4 className="text-2xl font-semibold mb-2">
            Fast launch and revenue
          </h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              We launch MVPs within 3 months and full-featured products within
              5+ months.
            </li>
            <li>
              100% of our projects are delivered strictly on deadlines and
              within budget.
            </li>
          </ul>
        </div>
        <div
          className={`bg-[#f4f5f6] p-6 md:p-8 shadow rounded-2xl ${
            bgLoaded ? "bg-[url(/images/noise1.png)] opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
        >
          <h3 className="text-4xl font-bold mb-4">02</h3>
          <h4 className="text-2xl font-semibold mb-2">Built for scalability</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>We use the most innovative development technologies.</li>
            <li>We help to scale your product after the launch.</li>
            <li>Free warranty period and SLA support.</li>
          </ul>
        </div>
        <div
          className={`bg-[#f4f5f6] p-6 md:p-8 shadow rounded-2xl ${
            bgLoaded ? "bg-[url(/images/noise1.png)] opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
        >
          <h3 className="text-4xl font-bold mb-4">03</h3>
          <h4 className="text-2xl font-semibold mb-2">Secure and safe</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Our apps comply with data protection and domain-specific
              regulations.
            </li>
            <li>
              You preserve all the IP rights according to the non-competition
              contract we sign.
            </li>
          </ul>
        </div>
        <div
          className={`bg-[#f4f5f6] p-6 md:p-8 shadow rounded-2xl ${
            bgLoaded ? "bg-[url(/images/noise1.png)] opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
        >
          <h3 className="text-4xl font-bold mb-4">04</h3>
          <h4 className="text-2xl font-semibold mb-2">
            Your One-Stop Digital Solution Provider
          </h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>App Development Excellence</li>
            <li> Creative Graphic Design & Branding</li>
            <li>Strategic Marketing Services</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WhyWaizcom;
