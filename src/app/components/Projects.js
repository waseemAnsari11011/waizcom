"use client"
import Image from "next/image";
import { sendGAEvent } from '@next/third-parties/google'

const Projects = () => {
  const videotrigerEvent = () => {
    window.open('https://youtu.be/yAMhN1fhrWA', '_blank');
    sendGAEvent('event', 'video_demo_clicked', { value: 'video_demo' })

  }
  const sourcecodetrigerEvent = () => {
    window.open('https://drive.google.com/file/d/1zT73_TPPaNdTTBzUjHGInarvHrvM3Ivm/view?usp=drive_link', '_blank');
    sendGAEvent('event', 'source_code_clicked', { value: 'source_code' })

  }
  return (
    <div
      id="projects-section"
      className="p-5 md:p-10 lg:p-16 relative bg-white"
      style={{ zIndex: 1 }}
    >
      <h1 className="text-2xl md:text-4xl lg:text-3xl font-semibold my-10">
        PROJECTS
      </h1>

      <div className="flex flex-col lg:flex-row justify-between bg-slate-100 p-5 lg:p-10 border-b border-gray-300 ">
        <div className="mb-5 lg:mb-0 lg:mr-8 lg:w-1/4">
          <Image src="/grocery_app.png" alt="My Image" width={500} height={500} />
        </div>
        <div className="w-full lg:w-3/4">
          <h2 className="font-bold text-xl mb-2">Grocery App</h2>
          {/* <h3 className="text-sm text-slate-600 mb-4">
            July 2022 - Aug 2022
          </h3> */}
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
          Here's the prototype of the grocery buying app we've developed for a client.          </p>
          <div className="flex flex-row mt-5">
            <div className="flex items-center mr-3">
              <button onClick={sourcecodetrigerEvent} className="bg-linkedin-blue hover:bg-linkedin-blue-dark text-white font-medium py-2 px-4 text-sm whitespace-nowrap">
                Download Apk
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between bg-slate-100 p-5 lg:p-10 ">
        <div className="mb-5 lg:mb-0 lg:mr-8 lg:w-1/4">
          <Image src="/tally_sync_clg.png" alt="My Image" width={500} height={800} />
        </div>
        <div className="w-full lg:w-3/4">
          <h2 className="font-bold text-xl mb-2">Accounting Data Extraction from Tally Software</h2>
          <h3 className="text-sm text-slate-600 mb-4">
            July 2023 - April 2024
          </h3>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            The project aimed to automate the extraction and storage of accounting data from Tally software, improving efficiency and scalability. This project comprised two primary processes designed to streamline data retrieval and storage seamlessly:
            <br />
            <span className="text-black font-semibold">Process 1: Tally Data Extraction</span>
            <br />
            Developed an API to interface with Tally software for data extraction.
            Implemented logic to count and extract essential accounting elements like groups, ledgers, and vouchers.
            Generated and sent Tally request XMLs to a frontend utility for data extraction.
            <br />
            <span className="text-black font-semibold">Process 2: Data Storage and Processing</span>
            <br />
            Utilized RabbitMQ for efficient XML data queue management.
            Parsed and stored accounting data in MongoDB for structured access.
            Created reporting APIs for financial metrics using MongoDB’s features to enhance performance and scalability.
          </p>
          <div className="flex flex-row mt-5">
            <div className="flex items-center mr-3">
              <button onClick={videotrigerEvent} className="bg-linkedin-blue hover:bg-linkedin-blue-dark text-white font-medium py-2 px-4 text-sm whitespace-nowrap">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </div>

     



    </div>
  );
};

export default Projects;
