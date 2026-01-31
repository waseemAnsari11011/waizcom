"use client";
import React from "react";
import Image from "next/image";
import { FiCheckCircle, FiClock, FiSmartphone, FiLayout, FiTrendingUp, FiBox } from "react-icons/fi";
import Review from "../components/review/Review";

const GroceryAppLaunch = () => {
  return (
    <div className="min-h-screen bg-white">
        
      {/* Hero Section */}
      <div className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 opacity-50 z-0"></div>
        <div className="container mx-auto px-5 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-bold mb-6">
                Limited Time Offer
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
                Launch Your <span className="text-green-600">15-Minute</span> Delivery App
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 mb-8 font-medium">
                Profit aapka. Customers aapke. Growth aapki.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://wa.me/918882202176?text=I%20am%20interested%20in%20your%20e-commerce%20development%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-green-600 text-white font-bold rounded-lg text-lg shadow-lg hover:bg-green-700 transition-all transform hover:-translate-y-1 text-center"
                >
                  Start at ₹45,000
                </a>
                <a 
                  href="#features"
                  className="px-8 py-4 bg-white text-slate-800 border-2 border-slate-200 font-bold rounded-lg text-lg hover:border-green-600 hover:text-green-600 transition-all text-center"
                >
                  View Features
                </a>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                *Complete Setup: Customer App + Delivery App + Vendor App + Admin Panel
              </p>
            </div>
            <div className="w-full md:w-1/2 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-1 hover:rotate-0 transition-all duration-500">
                    <Image 
                        src="/images/grocery-launch-banner.jpg" 
                        alt="15 Minute Delivery App" 
                        width={800} 
                        height={600}
                        className="w-full h-auto object-cover"
                    />
                     {/* Overlay gradient for text readability if needed, but image is strong */}
                </div>
                {/* Floating Elements */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg animate-bounce hidden md:block">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-full">
                            <FiClock className="text-green-600 text-xl" />
                        </div>
                        <div>
                            <p className="font-bold text-slate-800">Fast Delivery</p>
                            <p className="text-xs text-slate-500">15-30 Mins Logic</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Value Proposition Strip */}
      <div className="bg-slate-900 py-12">
        <div className="container mx-auto px-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6">
                    <h3 className="text-white text-4xl font-black mb-2">₹45k</h3>
                    <p className="text-slate-400 font-medium uppercase tracking-wider">Unbeatable Price</p>
                </div>
                <div className="p-6 border-l-0 md:border-l border-r-0 md:border-r border-slate-700">
                    <h3 className="text-white text-4xl font-black mb-2">15 Days</h3>
                    <p className="text-slate-400 font-medium uppercase tracking-wider">Go Live Fast</p>
                </div>
                <div className="p-6">
                    <h3 className="text-white text-4xl font-black mb-2">100%</h3>
                    <p className="text-slate-400 font-medium uppercase tracking-wider">Ownership</p>
                </div>
            </div>
        </div>
      </div>

      {/* What You Get Section */}
      <div id="features" className="py-20 bg-slate-50">
        <div className="container mx-auto px-5">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Everything You Need to Run Your Business</h2>
                <p className="text-lg text-slate-600">We provide a complete technology stack to manage your grocery delivery business efficiently.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Card 1 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all">
                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                        <FiSmartphone className="text-blue-600 text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Customer App</h3>
                    <ul className="space-y-3">
                        {['User-friendly Interface', 'Real-time Order Tracking', 'Multiple Payment Options', 'Push Notifications'].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-600 text-sm">
                                <FiCheckCircle className="text-green-500 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all relative overflow-hidden border-2 border-green-500">
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">CORE</div>
                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                        <FiLayout className="text-green-600 text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Delivery App</h3>
                    <ul className="space-y-3">
                        {['Easy Order Acceptance', 'Route Navigation', 'Earnings Dashboard', 'Status Toggle'].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-600 text-sm">
                                <FiCheckCircle className="text-green-500 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Card 3 - Vendor App (New) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all">
                    <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                        <FiBox className="text-orange-600 text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Vendor App</h3>
                    <ul className="space-y-3">
                        {['Manage Products/Menu', 'Accept/Reject Orders', 'Business Insights', 'Store Settings'].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-600 text-sm">
                                <FiCheckCircle className="text-green-500 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Card 4 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all">
                    <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                        <FiTrendingUp className="text-purple-600 text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Admin Panel</h3>
                    <ul className="space-y-3">
                        {['Manage Inventory', 'Track Orders & Sales', 'Manage Users', 'Detailed Analytics'].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-600 text-sm">
                                <FiCheckCircle className="text-green-500 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <Review />

      {/* CTA Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-5 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">Ready to Scale Your Business?</h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                Don't let technology hold you back. Get the same tech stack as the big players at a fraction of the cost.
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12 text-left">
                 <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                    <p className="font-bold text-green-800 text-lg mb-2">What happens next?</p>
                    <ol className="list-decimal list-inside space-y-2 text-green-700">
                        <li>Fill out the form below</li>
                        <li>Our expert will call you within 24 hours</li>
                        <li>We schedule a live demo</li>
                        <li>We will make live your app in 15 days</li>
                    </ol>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-slate-500 mb-2 font-bold">Limited Time Offer</p>
                        <p className="text-4xl font-black text-slate-900">₹45,000</p>
                        <p className="text-sm text-green-600 font-bold mt-2">Everything Included</p>
                    </div>
                </div>
            </div>
            
            <a 
                href="https://wa.me/918882202176?text=I%20am%20interested%20in%20your%20e-commerce%20development%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-12 py-5 bg-green-600 text-white font-bold text-xl rounded-full shadow-xl hover:bg-green-700 hover:shadow-2xl transition-all transform hover:-translate-y-1 animate-pulse"
            >
                Get Started Now
            </a>

        </div>
      </div>

    </div>
  );
};

export default GroceryAppLaunch;
