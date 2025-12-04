import ClientSuccess from "../components/ClientSuccess/ClientSuccess.js";
import { generateProductSchema } from "../../utils/schemaGenerator";

export default function Projects() {
    const projects = [
        {
            name: "BLUEKITE",
            image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://ecarts.agency"}/bluekite_Admin.png`, // Using monitor image as main image
            description: "Food delivery app with seamless ordering experience and real-time tracking.",
            rating: { value: "4.8", count: "120" } // Placeholder rating
        },
        {
            name: "COSLOMART",
            image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://ecarts.agency"}/dash.png`,
            description: "India's First Hybrid E-Commerce Platform for Real Estate, Products and Services.",
            rating: { value: "4.9", count: "85" } // Placeholder rating
        }
    ];

    const schemas = projects.map(project => generateProductSchema(project));

    return (
        <div className="bg-white pt-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schemas),
                }}
            />
            <ClientSuccess />
        </div>
    );
}
