

export default function ClientSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#02215d] mb-4">
            Client Success Stories
          </h1>
          <div className="w-24 h-1 bg-[#fad171] mx-auto rounded-full"></div>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Delivering exceptional results through innovative solutions
          </p>
        </div>

        {/* Client Cards */}
        <div className="flex flex-col gap-8 lg:gap-12">
          
          {/* First Client - Mobile App */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-[#02215d] to-[#041e52] p-8 text-white">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                     <img
                  src="/bluekiteProfile.png"
                  className="w-[54px] rounded-full"
                  loading="lazy"
                />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    Blue Kite
                  </h2>
                  <p className="text-white/90 text-lg">Multi-Vendor E-commerce Mobile App</p>
                </div>
              </div>
            </div>

            {/* Achievements Grid */}
            <div className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-2 border-gray-100 hover:border-[#fad171] transition-all duration-300 hover:shadow-lg">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#fad171] to-[#f5c563] rounded-lg flex items-center justify-center mb-4">
                      <i className="fas fa-download text-[#02215d] text-xl"></i>
                    </div>
                    <div className="text-3xl font-bold text-[#02215d] mb-2">
                      3,000+
                    </div>
                    <div className="text-gray-600 text-sm font-medium">
                      App Installs
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-2 border-gray-100 hover:border-[#fad171] transition-all duration-300 hover:shadow-lg">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#fad171] to-[#f5c563] rounded-lg flex items-center justify-center mb-4">
                      <i className="fas fa-star text-[#02215d] text-xl"></i>
                    </div>
                    <div className="text-3xl font-bold text-[#02215d] mb-2">
                      4.8
                    </div>
                    <div className="text-gray-600 text-sm font-medium">
                      Average Rating
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-2 border-gray-100 hover:border-[#fad171] transition-all duration-300 hover:shadow-lg">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#fad171] to-[#f5c563] rounded-lg flex items-center justify-center mb-4">
                      <i className="fas fa-users text-[#02215d] text-xl"></i>
                    </div>
                    <div className="text-3xl font-bold text-[#02215d] mb-2">
                      150+
                    </div>
                    <div className="text-gray-600 text-sm font-medium">
                      Active Vendors
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-2 border-gray-100 hover:border-[#fad171] transition-all duration-300 hover:shadow-lg">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#fad171] to-[#f5c563] rounded-lg flex items-center justify-center mb-4">
                      <i className="fas fa-shopping-cart text-[#02215d] text-xl"></i>
                    </div>
                    <div className="text-3xl font-bold text-[#02215d] mb-2">
                      12,000+
                    </div>
                    <div className="text-gray-600 text-sm font-medium">
                      Orders Completed
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Second Client - Website */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-[#02215d] to-[#041e52] p-8 text-white">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <img
                  src="/coslomart.jpg"
                  className="w-[54px] rounded-full"
                  loading="lazy"
                />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    coslomart
                  </h2>
                  <p className="text-white/90 text-lg">Multi-Vendor E-commerce Website</p>
                </div>
              </div>
            </div>

            {/* Achievements Grid */}
            <div className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-2 border-gray-100 hover:border-[#fad171] transition-all duration-300 hover:shadow-lg">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#fad171] to-[#f5c563] rounded-lg flex items-center justify-center mb-4">
                      <i className="fas fa-search text-[#02215d] text-xl"></i>
                    </div>
                    <div className="text-3xl font-bold text-[#02215d] mb-2">
                      50+
                    </div>
                    <div className="text-gray-600 text-sm font-medium">
                      Top SEO Rankings
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-2 border-gray-100 hover:border-[#fad171] transition-all duration-300 hover:shadow-lg">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#fad171] to-[#f5c563] rounded-lg flex items-center justify-center mb-4">
                      <i className="fas fa-chart-line text-[#02215d] text-xl"></i>
                    </div>
                    <div className="text-3xl font-bold text-[#02215d] mb-2">
                      250%
                    </div>
                    <div className="text-gray-600 text-sm font-medium">
                      Traffic Increase
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-2 border-gray-100 hover:border-[#fad171] transition-all duration-300 hover:shadow-lg">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#fad171] to-[#f5c563] rounded-lg flex items-center justify-center mb-4">
                      <i className="fas fa-trophy text-[#02215d] text-xl"></i>
                    </div>
                    <div className="text-3xl font-bold text-[#02215d] mb-2">
                      #1
                    </div>
                    <div className="text-gray-600 text-sm font-medium">
                      Category Position
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-2 border-gray-100 hover:border-[#fad171] transition-all duration-300 hover:shadow-lg">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#fad171] to-[#f5c563] rounded-lg flex items-center justify-center mb-4">
                      <i className="fas fa-clock text-[#02215d] text-xl"></i>
                    </div>
                    <div className="text-3xl font-bold text-[#02215d] mb-2">
                      1.2s
                    </div>
                    <div className="text-gray-600 text-sm font-medium">
                      Page Load Time
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Call to Action */}
        {/* <div className="mt-16 text-center">
          <div className="inline-block bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-[#02215d] mb-4">
              Ready to achieve similar results?
            </h3>
            <button className="bg-gradient-to-r from-[#fad171] to-[#f5c563] text-[#02215d] font-bold py-3 px-8 rounded-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Get Started Today
            </button>
          </div>
        </div> */}
      </div>

      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </div>
  );
}