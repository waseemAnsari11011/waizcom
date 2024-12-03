const TechMenu = ({ img, title, subTitle }) => {
  return (
    <div className="backdrop-blur-sm cursor-pointer min-w-[180px] w-[180px] h-[130px] border-[0.5px] bg-[#021b4b] border-[#747e8b80] py-[10px] px-[20px] rounded-xl group hover:bg-gradient-to-b from-white/30 to-transparent max-md:min-w-[150px] max-md:w-[150px] ">
      <div className="relative">
        {/* Image container with transition */}
        <div className="filter grayscale group-hover:grayscale-0 group-hover:backdrop-blur-none transition-all duration-300">
          <img src={img} alt="tech-stack" />
        </div>
        <h1 className="mt-2 font-bold text-white">{title}</h1>
        <p className="text-[#8d9091]">{subTitle}</p>
      </div>
    </div>
  );
};

const TechStack = () => {
  const Tech = [
    {
      img: "/images/tech-1.svg",
      title: "Swift",
      subTitle: "Mobile",
    },
    {
      img: "/images/tech-2.svg",
      title: "HTML5",
      subTitle: "Web",
    },
    {
      img: "/images/tech-3.svg",
      title: "React Redux",
      subTitle: "Web",
    },
    {
      img: "/images/react.svg",
      title: "React Native",
      subTitle: "Mobile",
    },
    {
      img: "/images/tech-4.svg",
      title: "Node JS",
      subTitle: "Backend",
    },
    {
      img: "/images/tech-1.svg",
      title: "Swift",
      subTitle: "Mobile",
    },
    {
      img: "/images/tech-2.svg",
      title: "HTML5",
      subTitle: "Web",
    },
    {
      img: "/images/react.svg",
      title: "React",
      subTitle: "Web",
    },
    {
      img: "/images/tech-4.svg",
      title: "Node JS",
      subTitle: "Backend",
    },
    {
      img: "/images/tech-1.svg",
      title: "Swift",
      subTitle: "Mobile",
    },
    {
      img: "/images/tech-2.svg",
      title: "HTML5",
      subTitle: "Web",
    },
    {
      img: "/images/react.svg",
      title: "React",
      subTitle: "Web",
    },
    {
      img: "/images/tech-4.svg",
      title: "Node JS",
      subTitle: "Backend",
    },
  ];

  return (
    <div className="w-full mx-auto my-5 relative bg-[url(/images/bg1.png)] bg-cover bg-no-repeat effect">
      <div className="w-full px-5 flex items-center justify-between max-w-[1200px] mx-auto max-xl:max-w-full max-xl:flex-col max-xl:py-12  max-xl:px-0">
        <h1 className="text-[42px] font-black text-white pb-20 leading-[50px] max-xl:pb-8 max-md:text-[28px] max-md:text-center max-md:px-5">
          Modern
          <span className="block max-xl:inline">Tech stack</span>
        </h1>
        <div className="h-[430px] overflow-hidden flex gap-5 mr-8 max-xl:w-full max-xl:overflow-hidden max-xl:flex-col max-xl:h-auto  max-xl:m-0 ">
          <div className="flex flex-col animate-downMove gap-4 max-xl:flex-row max-xl:w-full max-xl:animate-rightMove">
            {Tech.map((tech, index) => (
              <TechMenu
                img={tech.img}
                title={tech.title}
                subTitle={tech.subTitle}
                key={index}
              />
            ))}
          </div>
          <div className="flex flex-col animate-upMove gap-4  max-xl:flex-row max-xl:w-full max-xl:animate-leftMove">
            {Tech.map((tech, index) => (
              <TechMenu
                img={tech.img}
                title={tech.title}
                subTitle={tech.subTitle}
                key={index}
              />
            ))}
          </div>
          <div className="flex flex-col animate-downMove gap-4 max-xl:hidden max-xl:flex-row">
            {Tech.map((tech, index) => (
              <TechMenu
                img={tech.img}
                title={tech.title}
                subTitle={tech.subTitle}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
