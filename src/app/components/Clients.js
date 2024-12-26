import React from "react";

const Clients = () => {
  return (
    <div className="px-5 md:px-10 lg:px-16 mb-10 md:mb-20">
      <div className="flex flex-col md:flex-row items-center justify-between my-10 md:my-20">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold leading-none md:leading-tight mb-6 md:mb-0 md:w-2/5">
          SATISFIED CLIENTS
        </h2>

        {/* Container for images */}
        <div className="flex gap-x-8 gap-y-6 md:w-3/5 md:flex md:justify-between md:items-center max-md:flex-wrap">
          <div className="w-[calc(25%-8px)] max-md:w-[calc(50%-16px)]">
            <img
              src="/clients/5-Grey.png"
              alt="sevaBazar"
              className="h-8 md:h-10"
              loading="lazy"
            />
          </div>
          <div className="w-[calc(25%-8px)] max-md:w-[calc(50%-16px)] flex justify-end">
            <img
              src="/clients/bluekite_grey.png"
              alt="bluekite"
              className="h-14 md:h-16"
              loading="lazy"
            />
          </div>
          <div className="w-[calc(25%-8px)] max-md:w-[calc(50%-16px)]">
            <img
              src="/clients/yos_grey.png"
              alt="yos"
              className="h-14 md:h-16"
              loading="lazy"
            />
          </div>
          <div className="w-[calc(25%-8px)] max-md:w-[calc(50%-16px)] flex justify-end">
            <img
              src="/clients/giftezee_grey.png"
              alt="giftezee"
              className="h-14 md:h-16"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
