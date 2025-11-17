const IndustriesExpert = () => {
  const industries = [
    {
      icon: "/serveicons/10806958_4572220-removebg-preview (1).png",
      title: "Food Delivery",
    },
    {
      icon: "/serveicons/36242421_8401847-removebg-preview.png",
      title: "Fashion & Apparel",
    },
    {
      icon: "/serveicons/420193363_eec6280b-9857-4937-9ab2-96e23d22347b-removebg-preview.png",
      title: "Grocery Delivery",
    },
    {
      icon: "/serveicons/10806958_4572220-removebg-preview (1).png",
      title: "B2B Marketplaces",
    },
    {
      icon: "/serveicons/3297746_16544-removebg-preview.png",
      title: "DTC Brands",
    },
    {
      icon: "/serveicons/3455825_505458-PI4HD8-602-removebg-preview.png",
      title: "Subscription Commerce",
    },
  ];

  return (
    <div className="w-full mx-auto relative max-xl:pb-20 max-md:pb-10">
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
                  className="w-[120px]"
                />
              </div>
              <p className="text-[black]">{industry.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustriesExpert;
