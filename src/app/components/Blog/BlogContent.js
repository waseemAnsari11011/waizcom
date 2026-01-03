"use client";

import React, { useEffect, useState } from "react";
import { FiCalendar } from "react-icons/fi";

const BlogContent = ({ content }) => {
  const [injectedContent, setInjectedContent] = useState("");

  useEffect(() => {
    if (!content) return;

    // CTA HTML Template
    const ctaHtml = `
      <div class="my-16 p-8 bg-[#021b4b] rounded-xl text-center shadow-xl transform hover:scale-[1.01] transition-all duration-300">
        <h3 class="text-2xl font-black text-white uppercase mb-6">Got a project in mind?</h3>
        
        <div class="flex justify-center mb-6">
          <button 
            onclick="window.handleBlogBookMeeting()"
            class="inline-flex items-center justify-center gap-3 bg-[#fad171] rounded-[50px] px-8 py-4 font-black text-black text-lg hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg animate-pulse cursor-pointer"
          >
            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="text-black text-2xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            BOOK A MEETING
          </button>
        </div>

        <div class="flex items-center gap-4 my-6 w-full max-w-[300px] mx-auto opacity-30">
          <div class="h-[1px] bg-white flex-1"></div>
          <span class="text-white font-bold text-sm">OR</span>
          <div class="h-[1px] bg-white flex-1"></div>
        </div>

        <p class="text-white opacity-90">
          Prefer to write to us? 
          <button onclick="window.scrollToFooter()" class="text-[#fad171] font-bold hover:underline ml-1 cursor-pointer">
            Fill the form below
          </button>
        </p>
      </div>
    `;

    // Global handlers for the HTML strings
    window.handleBlogBookMeeting = () => {
      // Open Calendly
      window.open("https://calendly.com/ecarts-agency-biz/30min", "_blank");
      
      // Trigger Google Ads conversion
      if (typeof window.gtag_report_conversion === 'function') {
        window.gtag_report_conversion();
      } else if (window.gtag) {
        window.gtag("event", "conversion", {
          send_to: "AW-17813249829/B1xyCILN5NMbEKW-gq5C",
        });
      }
    };

    window.scrollToFooter = () => {
      const footer = document.getElementById("Footer");
      if (footer) {
        footer.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Inject CTA before <h2> tags
    // distinct from processContent in page.js which adds IDs.
    // We assume content already has IDs from server or we process raw.
    // Let's inject after the fact.
    
    // Split content by h2 tags
    const sections = content.split(/(?=<h2)/);
    
    // We want to verify we don't inject before the first h2 if it's the very start
    // But usually intro text is before first h2.
    // Let's inject at the end of every section except the last one?
    // Or better: Inject BEFORE every h2 except the first one?
    
    let newContent = sections.map((section, index) => {
        // Don't inject before the first section (intro) + first H2
        if (index === 0) return section;
        
        // Inject CTA before this H2 starts
        return ctaHtml + section;
    }).join("");

    // Also add one at the very end of the article
    newContent += ctaHtml;

    setInjectedContent(newContent);

    // Cleanup
    return () => {
      window.handleBlogBookMeeting = null;
      window.scrollToFooter = null;
    };
  }, [content]);

  if (!injectedContent) return null;

  return (
    <div
      className="prose prose-lg max-w-none text-gray-700 prose-headings:scroll-mt-32 prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-blue-600"
      dangerouslySetInnerHTML={{ __html: injectedContent }}
    />
  );
};

export default BlogContent;
