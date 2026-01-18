"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdClose, MdCheck } from "react-icons/md";
import { FaCalculator } from "react-icons/fa";

export default function CalculatorView({ onClose, isModal = false, preloadedConfig = null, preloadedCurrency = null }) {
  const [config, setConfig] = useState(preloadedConfig);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(!preloadedConfig);
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [currency, setCurrency] = useState(preloadedCurrency || "USD");

  useEffect(() => {
    setMounted(true);
    
    if (preloadedCurrency) {
        console.log("CalculatorView: Setting currency from preload:", preloadedCurrency);
        setCurrency(preloadedCurrency);
    } else {
        console.log("CalculatorView: No preload, fetching location...");
        // Fallback fetch if not provided
        axios.get("/api/utility/location")
        .then((res) => {
            const country = res.data.country_code;
            console.log("CalculatorView: Fetched country:", country);
            if (country === "IN") {
            setCurrency("INR");
            } else {
            setCurrency("USD");
            }
        })
        .catch((err) => {
             console.error("Location fetch failed, defaulting to USD");
        });
    }
  }, [preloadedCurrency]);

  useEffect(() => {
    if (!config && !preloadedConfig) {
      fetchConfig();
    } else if (preloadedConfig && !config) {
        setConfig(preloadedConfig);
        setLoading(false);
    }
  }, [preloadedConfig]); // Re-run if preloadedConfig arrives late? mostly it's passed on mount.

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/calculator/config");
      if (res.data.success) {
        setConfig(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch config", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (questionId, value, isMulti = false) => {
    setAnswers((prev) => {
      if (isMulti) {
        const current = prev[questionId] || [];
        if (current.includes(value)) {
          return { ...prev, [questionId]: current.filter((v) => v !== value) };
        } else {
          return { ...prev, [questionId]: [...current, value] };
        }
      } else {
        return { ...prev, [questionId]: value };
      }
    });
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(0, prev - 1));
  };

  const submitLead = async () => {
    if (!email || !phone) {
      alert("Please enter both Email and Phone Number.");
      return;
    }
    setCalculating(true);
    try {
      const res = await axios.post("/api/calculator/lead", {
        email,
        phone,
        answers,
        currency,
      });
      if (res.data.success) {
        setResult(res.data.data);
        setStep((prev) => prev + 1); // Move to Result step
      }
    } catch (error) {
      console.error("Calculation failed", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setCalculating(false);
    }
  };

  const handleBooking = async () => {
    // 1. Track the click
    try {
      await axios.post("/api/calculator/track-booking", {
        dayRate: currency === "INR" ? (config.developerDayRateINR || 15000) : config.developerDayRate,
        currency,
        totalCost: result?.estimate,
        configHash: config?.configHash
      });
    } catch (error) {
      console.error("Tracking failed", error);
    }

    // 2. Open Calendly
    window.open("https://calendly.com/ecarts-agency-biz/30min", "_blank");
  };

  if (!mounted) return null;

  // Render content logic
  const renderContent = () => (
    <div className={`bg-white rounded-2xl w-full ${isModal ? "shadow-2xl max-w-2xl max-h-[90vh] overflow-y-auto" : "relative animate-in fade-in zoom-in duration-300"}`}>
      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <MdClose size={24} />
        </button>
      )}

      <div className="p-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : !config ? (
          <div className="text-center py-20">
            <p className="text-red-500">Failed to load calculator.</p>
          </div>
        ) : (
          <>
            {/* Intro Step */}
            {step === 0 && (
              <div className="text-center py-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <FaCalculator size={40} />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
                  Get Your App Cost Estimate
                </h2>
                <p className="text-gray-600 text-lg max-w-lg mx-auto leading-relaxed">
                  Planning an ecommerce app? Get a detailed cost and timeline estimate in less than a minute.
                </p>
                <div className="pt-6">
                  <button
                    onClick={handleNext}
                    className="px-10 py-4 bg-blue-600 text-white text-lg font-bold rounded-full hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all transform hover:-translate-y-1 hover:shadow-2xl"
                  >
                    Start Calculator
                  </button>
                </div>
                <div className="pt-4 flex justify-center gap-8 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><MdCheck className="text-green-500" /> Instant Quote</span>
                  <span className="flex items-center gap-1"><MdCheck className="text-green-500" /> Ecommerce Specialized</span>
                </div>
              </div>
            )}

            {/* Progress Bar (Visible after intro) */}
            {step > 0 && step <= config.questions.length && (
              <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((step) / (config.questions.length)) * 100}%`,
                  }}
                ></div>
              </div>
            )}

            {/* Question Steps */}
            {step > 0 && step <= config.questions.length ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 text-center">
                  {config.questions[step - 1].label}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  {config.questions[step - 1].options.map((opt, idx) => {
                    const questionId = config.questions[step - 1].id;
                    const isSelected =
                      Array.isArray(answers[questionId])
                        ? answers[questionId].includes(opt.label)
                        : answers[questionId] === opt.label;

                    // Questions 1 (App Size) is single select (step 1).
                    // All subsequent feature questions (step 2 onwards) are multi-select.
                    const isMulti = step > 1;

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelect(questionId, opt.label, isMulti)}
                        className={`p-4 rounded-xl border-2 text-left transition-all hover:bg-blue-50 flex justify-between items-center group ${isSelected
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-gray-200 text-gray-600 hover:border-blue-300"
                          }`}
                      >
                        <span className="font-medium">{opt.label}</span>
                        {isSelected && <MdCheck size={20} className="text-blue-600" />}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between mt-8 pt-4 border-t">
                  <button
                    onClick={handleBack}
                    className="px-6 py-2 text-gray-500 hover:text-gray-700"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={(() => {
                      // Step 1 (App Size) is MANDATORY
                      if (step === 1) {
                        const currentQId = config.questions[step - 1].id;
                        const currentAns = answers[currentQId];
                        return !currentAns;
                      }
                      // All other steps (Features) are OPTIONAL (can skip)
                      return false;
                    })()}
                    className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
                  >
                    {step > 1 && (!answers[config.questions[step - 1].id] || answers[config.questions[step - 1].id].length === 0) ? "Skip" : "Next"}
                  </button>
                </div>
              </div>
            ) : step === config.questions.length + 1 ? (
              // Email Gate
              <div className="text-center py-8 space-y-6 animate-in slide-in-from-right duration-500">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📧</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Your Estimate is Ready!
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  We've calculated the cost and timeline for your Custom Ecommerce App. Enter your email to view the detailed breakdown immediately.
                </p>

                <div className="max-w-sm mx-auto space-y-4 text-left">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <button
                  onClick={submitLead}
                  disabled={!email || !phone || calculating}
                  className="w-full max-w-sm mx-auto block px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 shadow-xl shadow-green-200 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {calculating ? "Calculating..." : "Show My Estimate"}
                </button>
                <p className="text-xs text-gray-400 mt-4">We respect your privacy. No spam.</p>
              </div>
            ) : step > config.questions.length + 1 ? (
              // Result
              <div className="text-center py-8 space-y-8 animate-in zoom-in duration-500">
                <h2 className="text-2xl font-bold text-gray-600">
                  Estimated Project Cost
                </h2>

                <div className="text-6xl font-extrabold text-blue-600 tracking-tight">
                  {currency === "INR" ? "₹" : "$"}{result?.estimate?.toLocaleString()}
                </div>

                <div className="flex justify-center gap-8 mt-4">
                  <div className="bg-gray-50 px-6 py-4 rounded-xl border border-gray-100">
                    <span className="block text-sm text-gray-500 uppercase tracking-wide">Timeline</span>
                    <span className="text-xl font-bold text-gray-800">~{result?.days} Days</span>
                  </div>
                </div>

                <p className="text-gray-500 max-w-md mx-auto">
                  This is a rough estimate based on your inputs. For a precise quote and technical proposal for your ecommerce app, let's connect.
                </p>

                <div className="pt-8 flex justify-center gap-4">
                  {isModal && (
                    <button
                      onClick={onClose}
                      className="px-6 py-2 text-gray-500 hover:text-gray-700"
                    >
                      Close
                    </button>
                  )}
                  <button
                    onClick={handleBooking}
                    className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg"
                  >
                    Book a Consultation
                  </button>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );

  if (isModal) {
    // Return content logic wrapped in padding/layout relative to parent portal
    return renderContent();
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
       {renderContent()}
    </div>
  );
}
