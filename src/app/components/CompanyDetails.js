"use client";
import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";

const AnimatedNumber = ({ value }) => {
  const [props, set] = useSpring(() => ({
    number: 0,
    config: { mass: 1, tension: 20, friction: 10 },
  }));

  useEffect(() => {
    set({ number: value, from: { number: 0 } });
  }, [value, set]);

  return <animated.span>{props.number.to((n) => n.toFixed(0))}</animated.span>;
};

const CompanyDetails = () => {
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
    <section
      ref={ref}
      className={`py-10 md:py-20 mb-10 md:mb-20 transition-opacity duration-100 ${
        bgLoaded ? "bg-[url(/images/bg1.png)] opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        <div className="flex flex-col items-center text-white">
          <span className="text-4xl md:text-5xl lg:text-6xl font-extrabold">
            {inView && <AnimatedNumber value={10} />}
            <span className="text-xl md:text-2xl lg:text-3xl font-extrabold ml-1">
              /10
            </span>
          </span>
          <span className="mt-2 text-base md:text-lg lg:text-xl">Quality</span>
        </div>
        <div className="flex flex-col items-center text-white">
          <span className="text-4xl md:text-5xl lg:text-6xl font-extrabold">
            {inView && <AnimatedNumber value={100} />}
            <span className="text-xl md:text-2xl lg:text-3xl font-extrabold ml-1">
              %
            </span>
          </span>
          <span className="mt-2 text-base md:text-lg lg:text-xl">
            Meeting Deadline
          </span>
        </div>
        <div className="flex flex-col items-center text-white">
          <span className="text-4xl md:text-5xl lg:text-6xl font-extrabold">
            {inView && <AnimatedNumber value={100} />}
            <span className="text-xl md:text-2xl lg:text-3xl font-extrabold ml-1">
              %
            </span>
          </span>
          <span className="mt-2 text-base md:text-lg lg:text-xl">
            Client Satisfaction Rate
          </span>
        </div>
        <div className="flex flex-col items-center text-white">
          <span className="text-4xl md:text-5xl lg:text-6xl font-extrabold">
            {inView && <AnimatedNumber value={5} />}
            <span className="text-xl md:text-2xl lg:text-3xl font-extrabold ml-1">
              /5
            </span>
          </span>
          <span className="mt-2 text-base md:text-lg lg:text-xl">
            Client Rating
          </span>
        </div>
      </div>
    </section>
  );
};

export default CompanyDetails;
