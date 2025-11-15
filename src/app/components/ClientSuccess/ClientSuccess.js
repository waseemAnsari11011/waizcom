import React, { useState, useEffect } from 'react';
import './ClientSuccess.css';

const PortfolioShowcase = () => {
  const portfolioItems = [
    {
      category: "ENERGY & OIL",
      title: "ENERGY SAVING APP",
      type: "Native iOS & Android",
      categoryLabel: "Enterprise",
      services: [
        "iOS App Development",
        "Android App Development",
        "MVP Development",
        "Web Development",
        "UX/UI Design"
      ],
      result: "Proven 26% lower electricity bills",
      images: [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=600&fit=crop"
      ],
      Monitorimage: "/dash.png"
    },
    {
      category: "E-COMMERCE",
      title: "SHOPPING PLATFORM",
      type: "Progressive Web App",
      categoryLabel: "Retail",
      services: [
        "React Development",
        "Payment Integration",
        "Cloud Architecture",
        "Performance Optimization",
        "SEO Strategy"
      ],
      result: "150% increase in conversion rate",
      images: [
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=600&fit=crop"
      ],
      Monitorimage: "bluekite_Admin.png"
    }
  ];

  return (
    <div className="ps656-container">
      <div className="ps656-max-width">
        {/* Header */}
        <div className="ps656-header">
          <h1 className="ps656-title">
            Our Portfolio
          </h1>
          <p className="ps656-subtitle">
            Delivering exceptional digital solutions
          </p>
        </div>

        {/* Portfolio Items */}
        <div className="ps656-portfolio-grid">
          {portfolioItems.map((project, projectIndex) => (
            <PortfolioCard 
              key={projectIndex} 
              project={project} 
              index={projectIndex}
            />
          ))}
        </div>
      </div>

      {/* FontAwesome CDN */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </div>
  );
};

const PortfolioCard = ({ project, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMonitor, setShowMonitor] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMonitor(prev => !prev);
    }, showMonitor ? 3000 : 2000); // 3 seconds for monitor, 2 seconds for phones

    return () => clearInterval(interval);
  }, [showMonitor]);

  useEffect(() => {
    // Update phone images when monitor is not showing
    if (!showMonitor) {
      const imageInterval = setInterval(() => {
        setCurrentImageIndex((prev) => 
          (prev + 1) % project.images.length
        );
      }, 2000);

      return () => clearInterval(imageInterval);
    }
  }, [showMonitor, project.images.length]);

  return (
    <div className="ps656-card">
      {/* Starry Background */}
      <div className="ps656-stars">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="ps656-star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="ps656-content">
        {/* Left Side - Project Details */}
        <div className="ps656-details">
          {/* Category Badge */}
          <div className="ps656-badge">
            <i className="fas fa-bolt ps656-badge-icon"></i>
            <span className="ps656-badge-text">
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h2 className="ps656-project-title">
            {project.title}
          </h2>

          {/* Category */}
          <div className="ps656-info-block">
            <p className="ps656-info-label">Category:</p>
            <p className="ps656-info-value">
              {project.categoryLabel}
            </p>
          </div>

          {/* Type */}
          <div className="ps656-info-block">
            <p className="ps656-info-label">Type:</p>
            <p className="ps656-info-value">
              {project.type}
            </p>
          </div>

          {/* Services */}
          <div className="ps656-info-block">
            <p className="ps656-info-label">Services:</p>
            <p className="ps656-services-text">
              {project.services.join(', ')}
            </p>
          </div>

          {/* Result */}
          <div className="ps656-info-block">
            <p className="ps656-info-label">Result:</p>
            <p className="ps656-result-text">
              {project.result}
            </p>
          </div>
        </div>

        {/* Right Side - Images */}
        <div className="ps656-images-section">
          {/* Diagonal Red Accent */}
          <div className="ps656-diagonal-accent" />
          {/* Bottom Right Cut Corner Effect */}
          <div className="ps656-corner-accent"></div>

          {/* Phone Mockups Container */}
          <div className={`ps656-phones-container ${showMonitor ? 'ps656-phones-hide' : ''}`}>
            {/* Left Phone */}
            <div className="ps656-phone-left">
              <div className="ps656-phone">
                <div className="ps656-notch" />
                <img
                  src={project.images[currentImageIndex]}
                  alt="App preview"
                  className="ps656-phone-image"
                />
              </div>
            </div>

            {/* Right Phone */}
            <div className="ps656-phone-right">
              <div className="ps656-phone">
                <div className="ps656-notch" />
                <img
                  src={project.images[(currentImageIndex + 1) % project.images.length]}
                  alt="App preview"
                  className="ps656-phone-image"
                />
              </div>
            </div>
          </div>

          {/* Monitor Container */}
          <div className={`ps656-monitor-container-787 ${showMonitor ? 'ps656-monitor-show-787' : ''}`}>
            <div className="ps656-monitor-787">
              {/* Monitor Frame */}
              <div className="ps656-monitor-bezel-787">
                <div className="ps656-monitor-screen-787">
                  <img
                    src={project.Monitorimage}
                    alt="Monitor preview"
                    className="ps656-monitor-image-787"
                  />
                </div>
              </div>
              {/* Monitor Stand */}
              <div className="ps656-monitor-stand-787">
                <div className="ps656-monitor-stand-neck-787"></div>
                <div className="ps656-monitor-stand-base-787"></div>
              </div>
            </div>
          </div>

          {/* Image Indicators */}
          <div className="ps656-indicators">
            {project.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`ps656-indicator ${
                  idx === currentImageIndex 
                    ? 'ps656-indicator-active' 
                    : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioShowcase;