import Work from "../components/Work";
import { generateServiceSchema } from "../../utils/schemaGenerator";

export default function Services() {
    const mobileAppSchema = generateServiceSchema("Mobile App Development", "Custom mobile application development services for iOS and Android platforms.", {
        serviceOutput: ["iOS App", "Android App", "Hybrid App"],
        offers: ["iOS Development", "Android Development", "Flutter Development", "React Native Development"],
        audience: "Startups and Enterprises"
    });
    const asoSchema = generateServiceSchema("App Store Optimization (ASO)", "Data-driven App Store Optimization services to improve visibility and conversion rates.", {
        serviceOutput: ["Higher Search Rankings", "Increased Conversion Rate", "More Organic Installs"],
        audience: "Mobile App Owners",
        offers: ["Keyword Optimization", "Visual Optimization", "A/B Testing"]
    });
    const retentionSchema = generateServiceSchema("Mobile Retention Strategy", "Comprehensive strategies to increase user retention and engagement for mobile apps.", {
        serviceType: "Consulting",
        serviceOutput: ["Reduced Churn", "Higher LTV", "Increased Engagement"],
        offers: ["Retention Audit", "Push Notification Strategy", "In-App Messaging Strategy"]
    });

    return (
        <div className="bg-white pt-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([mobileAppSchema, asoSchema, retentionSchema]),
                }}
            />
            <Work />
        </div>
    );
}
