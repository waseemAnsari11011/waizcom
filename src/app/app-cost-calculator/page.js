import React from "react";
import CalculatorView from "../components/Calculator/CalculatorView";

export const metadata = {
  title: "Ecommerce App Cost Calculator | Build Your Store - Ecarts",
  description:
    "Calculate the cost of building your custom ecommerce mobile app. Get an instant estimate for features like cart, payment gateway, and inventory management with Ecarts.",
  keywords: [
    "ecommerce app cost",
    "build online store app",
    "shopping app development cost",
    "ecarts calculator",
    "m-commerce pricing",
    "app development cost estimator",
    "custom ecommerce app price",
  ],
  openGraph: {
    title: "Ecommerce App Cost Calculator | Build Your Store - Ecarts",
    description:
      "Planning an ecommerce store? Get a detailed cost and timeline estimate for your custom Ecarts solution in less than a minute.",
    type: "website",
  },
};

export default function AppCostCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow pt-28 pb-20 px-4">
        {/* SEO Header Section */}
        <div className="max-w-4xl mx-auto mb-12 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Calculate Your <span className="text-blue-600">Ecommerce App</span> Development Cost
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transparent pricing for your dream online store. Whether you need a simple catalog app or a full-fledged multi-vendor marketplace, use our calculator to get an instant estimate tailored to your business needs.
          </p>
        </div>

        {/* Calculator Component */}
        <CalculatorView />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto mt-20 space-y-12 text-gray-700">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Design</h3>
              <p className="text-sm">
                Tailored UI/UX that aligns perfectly with your brand identity, not just a template.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Scalable Backend</h3>
              <p className="text-sm">
                Built to handle thousands of products and high traffic volumes seamlessly.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Payments</h3>
              <p className="text-sm">
                Integration with top payment gateways ensuring safe and smooth transactions.
              </p>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use the Ecarts App Cost Calculator?</h2>
            <p className="mb-4">
              Building an ecommerce app involves various variables—from the platform (iOS, Android, or both) to complexity (features like AI recommendations, AR try-on, or complex delivery logic). Our calculator demystifies the pricing model, giving you a ballpark figure to help you plan your budget effectively.
            </p>
            <p>
              At <strong>Ecarts</strong>, we specialize in crafting high-performance ecommerce mobile applications that drive sales and engage customers. By answering a few simple questions, you'll gain clarity on the investment required to bring your vision to life.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
