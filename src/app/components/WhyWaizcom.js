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
          className={`bg-[#f4f5f6] p-6 md:p-8 shadow rounded-2xl ${
            bgLoaded
              ? "bg-[url(/bg/noise1.png)] w-full mx-auto my-5 relative  bg-cover bg-no-repeat  opacity-100"
              : "opacity-0"
          } transition-opacity duration-500`}
        >
          <h3 className="text-4xl font-bold mb-4">01</h3>
          <h4 className="text-2xl font-semibold mb-2">Development</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Build fully functional Android, iOS, and web apps tailored to your
              business needs.
            </li>
            <li>
              Proactive updates, bug fixes, and technical support to keep your
              apps running smoothly.
            </li>
            <li>
              Future-proof your business with adaptable technology that grows
              with your goals.
            </li>
          </ul>
        </div>
        <div
          className={`bg-[#f4f5f6] p-6 md:p-8 shadow rounded-2xl ${
            bgLoaded
              ? "bg-[url(/bg/noise1.png)] w-full mx-auto my-5 relative  bg-cover bg-no-repeat  opacity-100"
              : "opacity-0"
          } transition-opacity duration-500`}
        >
          <h3 className="text-4xl font-bold mb-4">02</h3>
          <h4 className="text-2xl font-semibold mb-2">Risk-Free</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li> Cancel anytime before 30 days for a full refund.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WhyWaizcom;
