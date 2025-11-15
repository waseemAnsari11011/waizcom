"use client";
import Header from "../app/components/Header";

import IntroSection from "./components/Intro/IntroSection";

import Work from "./components/Work";

// import Portfolio from "./components/Portfolio";
import Clients from "./components/Clients";
import CompanyDetails from "./components/CompanyDetails";
import ContactUs from "./components/ContactUsArrow";
import WhyWaizcom from "./components/WhyWaizcom";
import TechStack from "./components/TechStack";
import Portfolio from "./components/Portfolio/Portfolio";
import Review from "./components/review/Review";
import ClientSuccess from "./components/ClientSuccess/ClientSuccess";
import Footer from "./components/footer/Footer";
import IndustriesExpert from "./components/IndusteriesExpert/IndusteriesExpert";

function MyApp() {
  return (
    <div className="bg-white">
      <Header />
      <div id="intro" className="section">
        <IntroSection />
      </div>
      <div id="clients" className="section">
        <Clients />
      </div>
      <div id="about-section" className="section">
        <CompanyDetails />
      </div>
      <div id="work" className="section">
        <Work />
      </div>
      <div id="ContactUs" className="section">
        <ContactUs />
      </div>
      <div id="WhyWaizcom" className="section">
        <WhyWaizcom />
      </div>
      <div id="TechStack" className="section">
        <TechStack />
      </div>

      <div id="projects-section" className="projects">
        <Portfolio />
      </div>
      <div id="Review" className="section">
        <Review />
      </div>

      <div id="IndustriesExpert" className="section">
        <IndustriesExpert />
      </div>
      <div id="Footer" className="section">
        <Footer />
      </div>
    </div>
  );
}

export default MyApp;
