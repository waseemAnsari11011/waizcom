"use client";
import React, { useState, useEffect } from "react";
import "./page.css";

const TableOfContents = ({ headings }) => {
    const [activeId, setActiveId] = useState("");
    const [expandedIds, setExpandedIds] = useState([]);

    // Toggle expansion of a section
    const toggleExpand = (id) => {
        setExpandedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    // Smooth scroll function with offset
    const handleScroll = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 100; // Adjust based on your fixed header height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });

            setActiveId(id);
        }
    };

    // Group headings: H1 is parent, H2 is child
    const nestedHeadings = headings.reduce((acc, heading) => {
        if (heading.level === 1) {
            acc.push({ ...heading, children: [] });
        } else {
            // Check if the last item can be a parent (has lower level number)
            if (acc.length > 0 && acc[acc.length - 1].level < heading.level) {
                acc[acc.length - 1].children.push(heading);
            } else {
                // Treat as root item
                acc.push({ ...heading, children: [] });
            }
        }
        return acc;
    }, []);

    if (headings.length === 0) return null;

    return (
        <div className="sticky top-24 hidden lg:block">
            <h4 className="mb-4 text-lg font-bold uppercase tracking-widest text-gray-900">
                Table of Contents
            </h4>
            <nav className="flex flex-col space-y-3 border-l border-gray-200 pl-4">
                {nestedHeadings.map((heading) => (
                    <div key={heading.id} className="flex flex-col">
                        <div className="flex items-center justify-between">
                            <a
                                href={`#${heading.id}`}
                                onClick={(e) => {
                                    handleScroll(e, heading.id);
                                    if (heading.children.length > 0) {
                                        if (!expandedIds.includes(heading.id)) {
                                            toggleExpand(heading.id);
                                        }
                                    }
                                }}
                                className={`text-base transition-colors hover:text-blue-600 font-medium ${activeId === heading.id ? "text-blue-600" : "text-gray-600"
                                    }`}
                            >
                                {heading.text}
                            </a>
                            {heading.children.length > 0 && (
                                <button
                                    onClick={() => toggleExpand(heading.id)}
                                    className="ml-2 p-1 text-gray-500 hover:text-blue-600"
                                >
                                    {expandedIds.includes(heading.id) ? '−' : '+'}
                                </button>
                            )}
                        </div>

                        {/* Sub-items */}
                        {heading.children.length > 0 && expandedIds.includes(heading.id) && (
                            <div className="mt-2 ml-4 flex flex-col space-y-2 border-l border-gray-100 pl-4">
                                {heading.children.map((child) => (
                                    <a
                                        key={child.id}
                                        href={`#${child.id}`}
                                        onClick={(e) => handleScroll(e, child.id)}
                                        className={`text-sm transition-colors hover:text-blue-600 ${activeId === child.id ? "text-blue-600" : "text-gray-500"
                                            }`}
                                    >
                                        {child.text}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default TableOfContents;
