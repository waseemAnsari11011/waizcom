"use client"
import Image from "next/image";
const About = () => {

  return (
    <>
      <h1 className="text-2xl md:text-4xl lg:text-3xl font-semibold px-5 md:px-10 lg:px-16 bg-white py-10">
        ABOUT US
      </h1>
      <div
        id="about-section"
        className="flex flex-col lg:flex-row items-center relative bg-white px-5 md:px-10 lg:px-16"
        style={{ zIndex: 1 }}
      >
        <div className="flex-1 ">
          <Image src="/about_us.jpeg" alt="My Image" className="" width={450} height={450} />
        </div>

        <div className="flex-1 mt-5 lg:mt-0">



          <p className="text-base font-light mt-5">
            We are a team of experts passionate about innovation and delivering tailored solutions. By leveraging state-of-the-art technology, we develop standout applications for web and mobile platforms that not only meet but exceed our clients’ expectations, enhancing their online influence. <span className="gradient-text font-bold">  Reach out to know the Development time and cost for your app</span>      </p>

        </div>
      </div>
    </>

  );
}

export default About;
