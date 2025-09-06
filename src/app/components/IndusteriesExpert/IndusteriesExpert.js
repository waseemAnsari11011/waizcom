const IndusteriesExpert = () => {
  return (
    <div className="w-full mx-auto my-8 relative max-xl:pb-20 max-md:pb-10">
      <div className="w-full px-5 py-20 max-w-[1200px] mx-auto flex justify-between items-center  max-xl:flex-col">
        <div className="px-5">
          <h1 className="text-[40px] font-black mb-[40px] max-xl:text-center">
            Industry <span className="block max-xl:inline-block">We Serve</span>
          </h1>
          {/* <button className="max-md:w-[90%] py-3 px-7 mt-16 group flex justify-center items-center text-[#1E2A2E] gap-2 border border-[#1E2A2E] rounded-[50px] hover:bg-[#1E2A2E] duration-400 max-xl:absolute  max-xl:left-1/2  max-xl:bottom-0 max-xl:-translate-x-1/2">
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
                fill="#1E2A2E"
                className=" duration-400 group-hover:fill-white"
              ></path>
            </svg>
          </button> */}
        </div>
        <div className="flex justify-between gap-4 flex-wrap w-[60%] max-xl:w-full">
          <div className="flex gap-5 items-center w-[46%]   max-md:flex-col max-md:items-start">
            <div>
              <img
                loading="lazy"
                src="/images/kaaba.png"
                className="w-[70px]"
              />
            </div>
            <p className="text-[#747e8b]">Hajj/Umrah Travel Agencies</p>
          </div>
          <div className="flex gap-5 items-center w-[46%]  max-md:flex-col max-md:items-start">
            <div>
              <img
                loading="lazy"
                src="/images/ecommerce.png"
                className="w-[70px]"
              />
            </div>
            <p className="text-[#747e8b]">E-commerce & Marketplaces</p>
          </div>
          <div className="flex gap-5 items-center w-[46%]  max-md:flex-col max-md:items-start">
            <div>
              <img
                loading="lazy"
                src="/images/management.png"
                className="w-[70px]"
              />
            </div>
            <p className="text-[#747e8b]">Management Software</p>
          </div>
          <div className="flex gap-5 items-center w-[46%]   max-md:flex-col max-md:items-start">
            <div>
              <img
                loading="lazy"
                src="/images/health.png"
                className="w-[70px]"
              />
            </div>
            <p className="text-[#747e8b]">Healthcare & Wellness</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndusteriesExpert;
