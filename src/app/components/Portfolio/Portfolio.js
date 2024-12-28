import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import {
  FaMapMarkerAlt,
  FaSearch,
  FaMap,
  FaFilePdf,
  FaHandshake,
} from "react-icons/fa";
import { MdPattern, MdNotifications, MdFilterList } from "react-icons/md";
import { MdUpdate } from "react-icons/md";
import { AiOutlineShop, AiOutlineFilter } from "react-icons/ai";
// import { AiOutlineShop } from "react-icons/ai";

const Portfolio = () => {
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
    <section ref={ref} className="w-full mx-auto relative ">
      <div className="w-full px-5 py-8 max-w-[1200px] mx-auto">
        <h1 className="text-[40px] font-black mb-[40px] max-xl:text-center">
          Portfolio
        </h1>
        <div className="w-full flex flex-col gap-5">
          <div className="w-full flex border border-[#747e8b80] rounded-2xl max-xl:flex-col">
            <div className="w-[50%] max-xl:w-full">
              <img
                className="w-full rounded-2xl"
                src="carousel_mobile/multi_vendor_mobile.jpg"
                loading="lazy"
              />
            </div>
            <div className="p-[40px] max-xl:p-5">
              <h1 className="text-[24px] font-black">Seva Bazar</h1>
              <p className="uppercase text-[#747e8b]">Business</p>
              <div className="mt-[40px] flex gap-6 max-xl:hidden">
                <div>
                  <div
                    className={`w-[170px] mb-2 p-4 flex justify-center border-[0.5px] border-[#747e8b80] items-center font-black text-[40px] rounded-[75px] overflow-hidden shadow-[inset 0 0 10px 0 #2a2929] uppercase bg-no-repeat bg-cover ${
                      bgLoaded
                        ? "bg-[url(/images/btn.png)] opacity-100"
                        : "opacity-0"
                    } transition-opacity duration-100  text-[#fad171]`}
                  >
                    <FaMapMarkerAlt />
                  </div>

                  <p className="font-medium w-[170px]">
                    Location-Based Services
                  </p>
                </div>
                <div>
                  <div
                    className={`w-[170px] mb-2 p-4 flex justify-center border-[0.5px] border-[#747e8b80] items-center font-black text-[40px] rounded-[75px] overflow-hidden shadow-[inset 0 0 10px 0 #2a2929] uppercase bg-no-repeat bg-cover ${
                      bgLoaded
                        ? "bg-[url(/images/btn.png)] opacity-100"
                        : "opacity-0"
                    } transition-opacity duration-100  text-[#fad171]`}
                  >
                    <MdPattern />
                  </div>
                  <p className="font-medium w-[170px]">
                    Sell Wide Variety of products
                  </p>
                </div>
                <div>
                  <div
                    className={`w-[170px] mb-2 p-4 flex justify-center border-[0.5px] border-[#747e8b80] items-center font-black text-[40px] rounded-[75px] overflow-hidden shadow-[inset 0 0 10px 0 #2a2929] uppercase bg-no-repeat bg-cover ${
                      bgLoaded
                        ? "bg-[url(/images/btn.png)] opacity-100"
                        : "opacity-0"
                    } transition-opacity duration-100  text-[#fad171]`}
                  >
                    <MdNotifications />
                  </div>
                  <p className="font-medium w-[170px]">
                    Order Notifications & Invoices
                  </p>
                </div>
              </div>
              {/* <div className="flex justify-center items-center md:justify-start mt-5 md:mt-10">
                <a href="https://play.google.com/store/apps/details?id=com.sevabazarapp&pcampaignid=web_share">
                  <img
                    src="carousel_mobile//images/google_play.webp"
                    alt="Google Play"
                    className="h-16"
                  />
                </a>
              </div> */}
            </div>
          </div>

          <div className="w-full flex   border border-[#747e8b80]  rounded-2xl max-xl:flex-col">
            <div className="w-[50%] max-xl:w-full">
              <img
                className="w-full rounded-2xl"
                src="carousel_mobile/bluekite_mobile.png"
                loading="lazy"
              />
            </div>
            <div className="p-[40px] max-xl:p-5">
              <h1 className="text-[24px] font-black ">Blue Kite</h1>
              <p className="uppercase text-[#747e8b]">Business</p>
              <div className="mt-[40px] flex gap-6 max-xl:hidden">
                <div>
                  <div
                    className={`w-[170px] mb-2 p-4 flex justify-center border-[0.5px] border-[#747e8b80] items-center font-black text-[40px] rounded-[75px] overflow-hidden shadow-[inset 0 0 10px 0 #2a2929] uppercase bg-no-repeat bg-cover ${
                      bgLoaded
                        ? "bg-[url(/images/btn.png)] opacity-100"
                        : "opacity-0"
                    } transition-opacity duration-100  text-[#fad171]`}
                  >
                    <AiOutlineShop />
                  </div>
                  <p className=" font-medium w-[170px]">
                    Multi-Vendor Marketplace app
                  </p>
                </div>
                <div>
                  <div
                    className={`w-[170px] mb-2 p-4 flex justify-center border-[0.5px] border-[#747e8b80] items-center font-black text-[40px] rounded-[75px] overflow-hidden shadow-[inset 0 0 10px 0 #2a2929] uppercase bg-no-repeat bg-cover ${
                      bgLoaded
                        ? "bg-[url(/images/btn.png)] opacity-100"
                        : "opacity-0"
                    } transition-opacity duration-100  text-[#fad171]`}
                  >
                    <FaSearch />
                  </div>
                  <p className="font-medium w-[170px]">
                    browse, search, and filter products
                  </p>
                </div>
                <div>
                  <div
                    className={`w-[170px] mb-2 p-4 flex justify-center border-[0.5px] border-[#747e8b80] items-center font-black text-[40px] rounded-[75px] overflow-hidden shadow-[inset 0 0 10px 0 #2a2929] uppercase bg-no-repeat bg-cover ${
                      bgLoaded
                        ? "bg-[url(/images/btn.png)] opacity-100"
                        : "opacity-0"
                    } transition-opacity duration-100  text-[#fad171]`}
                  >
                    <FaMap />
                  </div>
                  <p className=" font-medium w-[170px]">
                    {" "}
                    Google Maps to pick current location
                  </p>
                </div>
              </div>
              {/* <div className="flex justify-center items-center md:justify-start mt-5 md:mt-10">
                <a href="https://play.google.com/store/apps/details?id=com.bluekiteapp&pcampaignid=web_share">
                  <img
                    src="carousel_mobile//images/google_play.webp"
                    alt="Google Play"
                    className="h-16"
                  />
                </a>
              </div> */}
              {/* <button className="max-xl:hidden py-3 px-7 mt-20 group flex justify-center items-center gap-2 text-[#1E2A2E] border border-[#1E2A2E] rounded-[50px] hover:bg-[#1E2A2E] duration-400">
                <span className=" duration-400 group-hover:text-white">
                  Read full case
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M2 11.25C1.58579 11.25 1.25 11.5858 1.25 12C1.25 12.4142 1.58579 12.75 2 12.75V11.25ZM22.5303 12.5303C22.8232 12.2374 22.8232 11.7626 22.5303 11.4697L17.7574 6.6967C17.4645 6.40381 16.9896 6.40381 16.6967 6.6967C16.4038 6.98959 16.4038 7.46447 16.6967 7.75736L20.9393 12L16.6967 16.2426C16.4038 16.5355 16.4038 17.0104 16.6967 17.3033C16.9896 17.5962 17.4645 17.5962 17.7574 17.3033L22.5303 12.5303ZM2 12.75L22 12.75V11.25L2 11.25V12.75Z"
                    fill="black"
                    className=" duration-400 group-hover:fill-white"
                  ></path>
                </svg>
              </button> */}
            </div>
          </div>
          <div className="w-full flex   border border-[#747e8b80]  rounded-2xl max-xl:flex-col">
            <div className="w-[50%] max-xl:w-full">
              <img
                className="w-full rounded-2xl"
                src="carousel_mobile/yos_mobile.png"
                loading="lazy"
              />
            </div>
            <div className="p-[40px] max-xl:p-5">
              <h1 className="text-[24px] font-black ">Yos</h1>
              <p className="uppercase text-[#747e8b]">Business</p>
              <div className="mt-[40px] flex gap-6 max-xl:hidden">
                <div>
                  <div
                    className={`w-[170px] mb-2 p-4 flex justify-center border-[0.5px] border-[#747e8b80] items-center font-black text-[40px] rounded-[75px] overflow-hidden shadow-[inset 0 0 10px 0 #2a2929] uppercase bg-no-repeat bg-cover ${
                      bgLoaded
                        ? "bg-[url(/images/btn.png)] opacity-100"
                        : "opacity-0"
                    } transition-opacity duration-100  text-[#fad171]`}
                  >
                    <AiOutlineFilter />
                  </div>
                  <p className=" font-medium w-[170px]">
                    Advanced filtering to search products by category, price
                    range, etc.
                  </p>
                </div>
                <div>
                  <div
                    className={`w-[170px] mb-2 p-4 flex justify-center border-[0.5px] border-[#747e8b80] items-center font-black text-[40px] rounded-[75px] overflow-hidden shadow-[inset 0 0 10px 0 #2a2929] uppercase bg-no-repeat bg-cover ${
                      bgLoaded
                        ? "bg-[url(/images/btn.png)] opacity-100"
                        : "opacity-0"
                    } transition-opacity duration-100  text-[#fad171]`}
                  >
                    <FaFilePdf />
                  </div>
                  <p className="font-medium w-[170px]">
                    Catalog Creation & downloading pdf
                  </p>
                </div>
                <div>
                  <div
                    className={`w-[170px] mb-2 p-4 flex justify-center border-[0.5px] border-[#747e8b80] items-center font-black text-[40px] rounded-[75px] overflow-hidden shadow-[inset 0 0 10px 0 #2a2929] uppercase bg-no-repeat bg-cover ${
                      bgLoaded
                        ? "bg-[url(/images/btn.png)] opacity-100"
                        : "opacity-0"
                    } transition-opacity duration-100  text-[#fad171]`}
                  >
                    <FaHandshake />
                  </div>
                  <p className=" font-medium w-[170px]">
                    Brand Collaboration Showcase
                  </p>
                </div>
              </div>
              {/* <div className="flex justify-center items-center md:justify-start mt-5 md:mt-10">
                <a href="https://www.apple.com/app-store/">
                  <img
                    src="carousel_mobile//images/app_store.png"
                    alt="Google Play"
                    className="h-16"
                  />
                </a>
              </div> */}
              {/* <button className="max-xl:hidden py-3 px-7 mt-20 group flex justify-center items-center gap-2 text-[#1E2A2E] border border-[#1E2A2E] rounded-[50px] hover:bg-[#1E2A2E] duration-400">
                <span className=" duration-400 group-hover:text-white">
                  Read full case
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M2 11.25C1.58579 11.25 1.25 11.5858 1.25 12C1.25 12.4142 1.58579 12.75 2 12.75V11.25ZM22.5303 12.5303C22.8232 12.2374 22.8232 11.7626 22.5303 11.4697L17.7574 6.6967C17.4645 6.40381 16.9896 6.40381 16.6967 6.6967C16.4038 6.98959 16.4038 7.46447 16.6967 7.75736L20.9393 12L16.6967 16.2426C16.4038 16.5355 16.4038 17.0104 16.6967 17.3033C16.9896 17.5962 17.4645 17.5962 17.7574 17.3033L22.5303 12.5303ZM2 12.75L22 12.75V11.25L2 11.25V12.75Z"
                    fill="black"
                    className=" duration-400 group-hover:fill-white"
                  ></path>
                </svg>
              </button> */}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          {/* <button className="max-md:w-full py-3 px-7 mt-20 group flex justify-center items-center gap-2 text-[#1E2A2E] border border-[#1E2A2E] rounded-[50px] hover:bg-[#1E2A2E] duration-400">
            <span className=" duration-400 group-hover:text-white">
              Explore more our works
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M2 11.25C1.58579 11.25 1.25 11.5858 1.25 12C1.25 12.4142 1.58579 12.75 2 12.75V11.25ZM22.5303 12.5303C22.8232 12.2374 22.8232 11.7626 22.5303 11.4697L17.7574 6.6967C17.4645 6.40381 16.9896 6.40381 16.6967 6.6967C16.4038 6.98959 16.4038 7.46447 16.6967 7.75736L20.9393 12L16.6967 16.2426C16.4038 16.5355 16.4038 17.0104 16.6967 17.3033C16.9896 17.5962 17.4645 17.5962 17.7574 17.3033L22.5303 12.5303ZM2 12.75L22 12.75V11.25L2 11.25V12.75Z"
                fill="black"
                className=" duration-400 group-hover:fill-white"
              ></path>
            </svg>
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
