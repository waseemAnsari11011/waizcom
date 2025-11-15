const IndustriesExpert = () => {
  const industries = [
    {
      icon: "/images/ecommerce.png",
      title: "E-commerce & Marketplaces",
    },
    {
      icon: "/images/fashion.png",
      title: "Fashion & Apparel",
    },
    {
      icon: "/images/grocery.png",
      title: "Grocery Delivery",
    },
    {
      icon: "/images/b2b.png",
      title: "B2B Marketplaces",
    },
    {
      icon: "/images/dtc.png",
      title: "DTC Brands",
    },
    {
      icon: "/images/subscription.png",
      title: "Subscription Commerce",
    },
  ];

  return (
    <div className="w-full mx-auto my-8 relative max-xl:pb-20 max-md:pb-10">
      <div className="w-full px-5 py-20 max-w-[1200px] mx-auto flex justify-between items-center max-xl:flex-col">
        <div className="px-5">
          <h1 className="text-[40px] font-black mb-[40px] max-xl:text-center">
            Industries{" "}
            <span className="block max-xl:inline-block">We Serve</span>
          </h1>
        </div>
        <div className="flex justify-between gap-4 flex-wrap w-[60%] max-xl:w-full">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="flex gap-5 items-center w-[46%] max-md:flex-col max-md:items-start"
            >
              <div>
                <img
                  loading="lazy"
                  src={industry.icon}
                  alt={industry.title}
                  className="w-[70px]"
                />
              </div>
              <p className="text-[#747e8b]">{industry.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustriesExpert;
