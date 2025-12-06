import CompanyDetails from "../components/CompanyDetails";

export const metadata = {
  title: "About Us - Ecarts",
  description: "Learn more about Ecarts, our mission, and our team of expert developers building high-quality ecommerce solutions.",
};

export default function AboutUs() {
  return (
    <div className="bg-white pt-24">
      <div className="container mx-auto px-5 md:px-10 lg:px-16 mb-10">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="text-lg text-gray-700 leading-relaxed max-w-4xl">
          At Ecarts, we build systems. Since our founding, we have been dedicated to transforming ideas into robust e-commerce realities. We specialize in creating scalable, high-performance applications that drive growth and success for our clients.
        </p>
      </div>
      <CompanyDetails />
    </div>
  );
}
