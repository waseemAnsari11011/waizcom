"use client";
import React, { useState, useEffect } from "react";
import "./ClientSuccess.css";

const PortfolioShowcase = () => {
  const portfolioItems = [
    {
      category: "Food Delivery",
      title: "BLUEKITE",
      about: [
        "Food delivery app",
        "Seamless ordering experience",
        "Real-time order tracking",
      ],
      results: [
        { emoji: "🚀", value: "1.4K+", label: "App Installs", sublabel: "" },
        { emoji: "💹", value: "800+", label: "Monthly Orders", sublabel: "" },
        { emoji: "💰", value: "₹1.3L+", label: "Monthly Sales", sublabel: "" },
      ],
      images: ["bluekite1.jpeg", "bluekite2.jpeg"],
      Monitorimage: "bluekite_Admin.png",
    },
    {
      category: "Hybrid E-Commerce",
      title: "COSLOMART",
      about: [
        "India's First Hybrid E-Commerce Platform",
        "Real Estate, Products and Services",
        "B2B and B2C in single platform",
      ],
      results: [
        {
          emoji: "🚀",
          value: "5K+",
          label: "Monthly Impressions",
          sublabel: "",
        },
        {
          emoji: "💹",
          value: "150",
          label: "Monthly Clicks",
          sublabel: "",
        },
        {
          emoji: "💰",
          value: "2+",
          label: "Daily Property leads",
          sublabel: "",
        },
      ],
      images: ["coslomart1.jpeg", "coslomart2.jpeg"],
      Monitorimage: "/dash.png",
    },
  ];

  return (
    <div className="ps656-container">
      <div className="ps656-max-width">
        {/* Header */}
        <div className="ps656-header">
          <h1 className="ps656-title">Our Portfolio</h1>
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
    const interval = setInterval(
      () => {
        setShowMonitor((prev) => !prev);
      },
      showMonitor ? 3000 : 2000
    );

    return () => clearInterval(interval);
  }, [showMonitor]);

  useEffect(() => {
    if (!showMonitor) {
      const imageInterval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      }, 2000);

      return () => clearInterval(imageInterval);
    }
  }, [showMonitor, project.images.length]);

  const [stars, setStars] = useState([]);

  useEffect(() => {
    const newStars = [...Array(30)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="ps656-card">
      {/* Starry Background */}
      <div className="ps656-stars">
        {stars.map((star, i) => (
          <div
            key={i}
            className="ps656-star"
            style={{
              top: star.top,
              left: star.left,
              opacity: star.opacity,
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
            <span className="ps656-badge-text">{project.category}</span>
          </div>

          {/* Title */}
          <h2 className="ps656-project-title">{project.title}</h2>

          {/* About */}
          <div className="ps656-info-block">
            <p className="ps656-info-label">About:</p>
            <div style={{ marginTop: "0.5rem" }}>
              {project.about.map((item, idx) => (
                <p
                  key={idx}
                  className="ps656-services-text"
                  style={{ marginBottom: "0.25rem" }}
                >
                  • {item}
                </p>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="ps656-info-block">
            <p className="ps656-info-label">App Performance:</p>
            <div
              style={{
                marginTop: "0.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {project.results.map((result, idx) => (
                <div key={idx}>
                  <p className="ps656-result-text">
                    {result.emoji} {result.value} {result.label}{" "}
                    {result.sublabel}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Images */}
        <div className="ps656-images-section">
          {/* Diagonal Red Accent */}
          <div className="ps656-diagonal-accent" />
          {/* Bottom Right Cut Corner Effect */}
          <div className="ps656-corner-accent"></div>

          {/* Phone Mockups Container */}
          <div
            className={`ps656-phones-container ${
              showMonitor ? "ps656-phones-hide" : ""
            }`}
          >
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
                  src={
                    project.images[
                      (currentImageIndex + 1) % project.images.length
                    ]
                  }
                  alt="App preview"
                  className="ps656-phone-image"
                />
              </div>
            </div>
          </div>

          {/* Monitor Container */}
          <div
            className={`ps656-monitor-container-787 ${
              showMonitor ? "ps656-monitor-show-787" : ""
            }`}
          >
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
                aria-label={`View image ${idx + 1}`}
                className={`ps656-indicator ${
                  idx === currentImageIndex ? "ps656-indicator-active" : ""
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
