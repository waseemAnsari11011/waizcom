"use client";
import IntroSection from "./components/Intro/IntroSection";
import Work from "./components/Work";
import Clients from "./components/Clients";
import CompanyDetails from "./components/CompanyDetails";
import ContactUs from "./components/ContactUsArrow";
import WhyWaizcom from "./components/WhyWaizcom";
import TechStack from "./components/TechStack";
import Portfolio from "./components/Portfolio/Portfolio";
import IndusteriesExpert from "./components/IndusteriesExpert/IndusteriesExpert";
import Review from "./components/review/Review";
import ClientSuccess from "./components/ClientSuccess/ClientSuccess";
import BlogList from "./components/Blog/BlogList";

function MyApp() {
  return (
    <div className="bg-white">
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
      <div id="ClientSuccess" className="section">
        <ClientSuccess />
      </div>
      <div id="TechStack" className="section">
        <TechStack />
      </div>
      <div id="WhyWaizcom" className="section">
        <WhyWaizcom />
      </div>

      <div id="Review" className="section">
        <Review />
      </div>

      <div id="IndusteriesExpert" className="section">
        <IndusteriesExpert />
      </div>

      <div id="Blog" className="section">
        <BlogList limit={3} />
      </div>
    </div>
  );
}

export default MyApp;
