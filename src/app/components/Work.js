import Image from "next/image"; // Import Image from Next.js for optimized loading

const Work = () => {
  return (
    <div
      id="services-section"
      className="px-5 md:px-10 lg:px-16 relative bg-white mb-10 md:mb-20"
      style={{ zIndex: 1 }}
    >
      <style jsx>{`
        :root {
          --box-scale: 100%; /* Default box scale */
        }

        @media (max-width: 768px) {
          :root {
            --box-scale: 50%; /* Decrease box size on smaller screens */
          }
        }

        .service-box {
          transform: scale(var(--box-scale));
          transform-origin: top left;
        }
      `}</style>
      <h1 className="text-3xl md:text-4xl font-bold leading-none md:leading-tight mb-6 md:mb-0">
        WHAT WE OFFER
      </h1>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div className="p-5 brand-light group hover:bg-[#021b4b] hover:text-white rounded-2xl service-box">
          <Image
            src="/offer/phone_icon.png"
            alt="Phone Icon"
            width={100}
            height={100}
            className="mb-5"
            loading="lazy"
          />
          <div>
            <h2 className="font-semibold text-lg lg:text-xl">
              Mobile app consulting & development
            </h2>
            <p className="text-sm mt-2">
              From concept validation to successful launch, we develop
              high-quality mobile apps designed to generate profit.
            </p>
          </div>
        </div>
        <div className="p-5 brand-light group hover:bg-[#021b4b] hover:text-white rounded-2xl service-box">
          <Image
            src="/offer/laptop_icon.png"
            alt="Laptop Icon"
            width={100}
            height={100}
            className="mb-5"
            loading="lazy"
          />
          <div>
            <h2 className="font-semibold text-lg lg:text-xl">
              Web app consulting & development
            </h2>
            <p className="text-sm mt-2">
              Delivering any type of web solutions to cover your needs: from
              simple websites to engaging complex applications.
            </p>
          </div>
        </div>
        <div className="p-5 brand-light group hover:bg-[#021b4b] hover:text-white rounded-2xl service-box">
          <Image
            src="/offer/graphic.png"
            alt="Laptop Icon"
            width={100}
            height={100}
            className="mb-5"
            loading="lazy"
          />
          <div>
            <h2 className="font-semibold text-lg lg:text-xl">Graphic Design</h2>
            <p className="text-sm mt-2">
              Crafting visually appealing designs, including logo design and
              branding, to effectively communicate your brand's identity and
              engage your audience across various platforms.
            </p>
          </div>
        </div>
        <div className="p-5 brand-light group hover:bg-[#021b4b] hover:text-white rounded-2xl service-box">
          <Image
            src="/offer/marketing.png"
            alt="Laptop Icon"
            width={100}
            height={100}
            className="mb-5"
            loading="lazy"
          />
          <div>
            <h2 className="font-semibold text-lg lg:text-xl">Marketing</h2>
            <p className="text-sm mt-2">
              Offering comprehensive marketing solutions, including paid
              campaigns on Google, Meta, and Instagram, as well as organic SEO
              strategies to boost your online presence and reach.
            </p>
          </div>
        </div>
        <div className="p-5 brand-light group hover:bg-[#021b4b] hover:text-white rounded-2xl service-box">
          <Image
            src="/offer/support_icon.png"
            alt="Support Icon"
            width={100}
            height={100}
            className="mb-5"
            loading="lazy"
          />
          <div>
            <h2 className="font-semibold text-lg lg:text-xl">
              3-mo maintenance, 12-mo hosting.
            </h2>
            <p className="text-sm mt-2">
              Get peace of mind with our complimentary support package, included
              with your project.
            </p>
          </div>
        </div>
        <div className="p-5 brand-light group hover:bg-[#021b4b] hover:text-white rounded-2xl service-box">
          <Image
            src="/offer/exclamation_icon.png"
            alt="Exclamation Icon"
            width={100}
            height={100}
            className="mb-5 rotate-180"
            loading="lazy"
          />
          <div>
            <h2 className="font-semibold text-lg lg:text-xl">
              5% Penalty Enforcement
            </h2>
            <p className="text-sm mt-2">
              If we fail to deliver your project within the agreed-upon
              timeline, we'll incur a penalty of 5% of the total project value.
            </p>
          </div>
        </div>
        <div className="p-5 brand-light group hover:bg-[#021b4b] hover:text-white rounded-2xl service-box">
          <Image
            src="/offer/tag_icon.png"
            alt="Tag Icon"
            width={100}
            height={100}
            className="mb-5"
            loading="lazy"
          />
          <div>
            <h2 className="font-semibold text-lg lg:text-xl">Fixed Priced</h2>
            <p className="text-sm mt-2">
              We provide a single, fixed price for your project, covering all
              the development work.
            </p>
          </div>
        </div>
        <div className="p-5 brand-light group hover:bg-[#021b4b] hover:text-white rounded-2xl service-box">
          <Image
            src="/offer/shield_icon.png"
            alt="Shield Icon"
            width={100}
            height={100}
            className="mb-5"
            loading="lazy"
          />
          <div>
            <h2 className="font-semibold text-lg lg:text-xl">
              Copyrights & IPR + Complete Source Code
            </h2>
            <p className="text-sm mt-2">
              We transfer 100% ownership of the source code to you, giving you
              complete control and flexibility. You receive all copyrights and
              intellectual property rights (IPR) related to your project. No
              licensing fees, no dependencies - you own it all.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
