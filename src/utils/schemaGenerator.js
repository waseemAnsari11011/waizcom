export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ecarts.agency",
    alternateName: ["Ecarts", "Ecarts Team"],
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://ecarts.agency",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://ecarts.agency"}/ecarts.png`,
    email: "contact@ecarts.agency",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-88822-02176",
      contactType: "customer service",
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=61584220782402",
      "https://www.instagram.com/ecarts.agency",
      "https://www.linkedin.com/company/ecarts-agency"
    ],
  };
};

export const generateProfessionalServiceSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "ecarts.agency",
    image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://ecarts.agency"}/ecarts.png`,
    "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://ecarts.agency"}#organization`,
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://ecarts.agency",
    email: "contact@ecarts.agency",
    telephone: "+91-88822-02176",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sector 62",
      addressLocality: "Noida",
      addressRegion: "UP",
      postalCode: "201309",
      addressCountry: "IN"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.6280, // Approximate Noida coordinates
      longitude: 77.3649
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      opens: "09:00",
      closes: "18:00"
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=61584220782402",
      "https://www.instagram.com/ecarts.agency",
      "https://www.linkedin.com/company/ecarts-agency"
    ]
  };
};

export const generateServiceSchema = (serviceName, description, options = {}) => {
  const {
    providerName = "ecarts.agency",
    serviceOutput,
    audience,
    offers,
    serviceType
  } = options;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    serviceType: serviceType || serviceName,
    provider: {
      "@type": "ProfessionalService",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://ecarts.agency"}#organization`,
      name: providerName,
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://ecarts.agency"
    },
    areaServed: {
      "@type": "Country",
      name: "Global"
    },
    description: description
  };

  if (serviceOutput) {
    schema.serviceOutput = Array.isArray(serviceOutput) 
      ? serviceOutput.map(output => ({ "@type": "Thing", name: output }))
      : { "@type": "Thing", name: serviceOutput };
  }

  if (audience) {
    schema.audience = {
      "@type": "Audience",
      audienceType: audience
    };
  }

  if (offers) {
    schema.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: `${serviceName} Services`,
      itemListElement: offers.map(offer => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: offer
        }
      }))
    };
  } else {
    // Default offers if none provided
    schema.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: `${serviceName} Services`,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `${serviceName} Consultation`
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `${serviceName} Implementation`
          }
        }
      ]
    };
  }

  return schema;
};

export const generateFAQSchema = (faqs) => {
  // faqs should be an array of { question: string, answer: string }
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
};

export const generateArticleSchema = (article) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    image: article.image ? [article.image] : [],
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: [{
        "@type": "Person",
        name: article.authorName || "ecarts Team",
        url: process.env.NEXT_PUBLIC_SITE_URL || "https://ecarts.agency"
    }],
    publisher: {
        "@type": "Organization",
        name: "ecarts.agency",
        logo: {
            "@type": "ImageObject",
            url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://ecarts.agency"}/ecarts.png`
        }
    },
    description: article.description
  };
};

export const generateProductSchema = (product) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "ecarts.agency"
    },
    aggregateRating: product.rating ? {
      "@type": "AggregateRating",
      ratingValue: product.rating.value,
      reviewCount: product.rating.count,
      bestRating: "5",
      worstRating: "1"
    } : undefined
  };
};

export const generateCaseStudySchema = (caseStudy) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article", // Using Article as recommended for Case Studies
    headline: caseStudy.title,
    image: caseStudy.image,
    datePublished: caseStudy.date,
    author: {
      "@type": "Organization",
      name: "ecarts.agency"
    },
    about: {
      "@type": "Organization",
      name: caseStudy.clientName
    },
    articleBody: caseStudy.description,
    mentions: caseStudy.technologies ? caseStudy.technologies.map(tech => ({
      "@type": "SoftwareApplication",
      name: tech
    })) : []
  };
};
