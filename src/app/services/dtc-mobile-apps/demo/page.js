import Link from "next/link";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiSmartphone,
} from "react-icons/fi";
import DemoForm from "./DemoForm";
import { generateServiceSchema } from "../../../../utils/schemaGenerator";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ecarts.agency";

export const metadata = {
  title: "Get a Free Ecommerce App Preview | Ecarts",
  description:
    "Request a free app preview from Ecarts. Share your ecommerce website and see how your store can become a polished iOS and Android app.",
  alternates: {
    canonical: "/services/dtc-mobile-apps/demo",
  },
  openGraph: {
    title: "Get a Free Ecommerce App Preview | Ecarts",
    description:
      "Share your ecommerce website and see how your store can become a polished iOS and Android app.",
    url: `${siteUrl}/services/dtc-mobile-apps/demo`,
    type: "website",
  },
};

const nextSteps = [
  {
    title: "See what your app actually looks like",
    text: "Not a concept, not a generic demo. A working preview shaped around your live store, your products, your branding, and your checkout.",
  },
  {
    title: "Understand how your site stays in sync",
    text: "We show how your existing ecommerce site becomes the source of truth for products, pages, campaigns, and shopping flows.",
  },
  {
    title: "Leave knowing what you would launch",
    text: "After the preview walkthrough, you have a concrete picture of the product and the launch path, so you can make a real decision.",
  },
];

const fitSignals = [
  "DTC brand with repeat purchase potential",
  "Live ecommerce site with products and checkout",
  "Interested in push notifications and app retention",
  "Wants a clear preview before committing",
];

export default function DtcMobileAppsDemoPage() {
  const schema = generateServiceSchema(
    "DTC Mobile App Strategy Call",
    "Free preview request for DTC brands exploring a branded iOS and Android ecommerce app with push notifications and store integrations.",
    {
      serviceOutput: ["Free App Preview", "Store Integration Review", "Launch Roadmap"],
      audience: "Mid-market DTC ecommerce brands",
      offers: ["Free App Preview", "Mobile App Walkthrough", "Launch Roadmap"],
    }
  );

  return (
    <div className="bg-[#021b4b] text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <section className="relative overflow-hidden bg-[#021b4b] pt-32 md:pt-40">
        <div className="relative mx-auto grid max-w-[1200px] gap-10 px-5 pb-20 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="text-white">
            <Link
              href="/services/dtc-mobile-apps"
              className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-white/75 transition hover:text-[#fad171]"
            >
              <FiArrowLeft />
              DTC mobile app service
            </Link>
            <h1 className="max-w-[760px] text-4xl font-black leading-tight md:text-5xl xl:text-6xl">
              See your website as a native mobile app, free
            </h1>
            <p className="mt-6 max-w-[650px] text-lg leading-8 text-white/75">
              We build a live preview using your actual site and present it to you. No cost, no commitment.
            </p>

            <div className="mt-10 rounded-lg border border-white/15 bg-white/10 p-6 backdrop-blur">
              <h2 className="text-xl font-black">What your free preview covers</h2>
              <div className="mt-6 space-y-5">
                {nextSteps.map((step, index) => (
                  <div key={step.title} className="flex gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fad171] font-black text-slate-950">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-black text-white">{step.title}</h3>
                      <p className="mt-2 leading-7 text-white/75">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                [FiSmartphone, "Native iOS + Android preview"],
                [FiCheckCircle, "Built from your live store"],
              ].map(([Icon, label]) => (
                <div key={label} className="rounded-lg bg-white p-4 text-slate-950 shadow-lg">
                  <Icon className="mb-3 text-[#00a86b]" size={24} />
                  <p className="text-sm font-black">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 rounded-lg border border-[#fad171]/40 bg-[#fff7df] p-4">
              <p className="text-sm font-black text-slate-950">Best fit for ecommerce teams ready to make mobile a retention channel</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {fitSignals.map((signal) => (
                  <div key={signal} className="flex gap-2 text-xs font-bold leading-5 text-slate-700">
                    <FiCheckCircle className="mt-1 shrink-0 text-[#00a86b]" />
                    <span>{signal}</span>
                  </div>
                ))}
              </div>
            </div>
            <DemoForm />
            <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm leading-6 text-slate-600">
                “I had a great experience working with Ecarts. Their work quality was outstanding, they delivered on time, and maintained smooth communication with clear progress tracking.”
              </p>
              <p className="mt-4 text-sm font-black text-slate-950">CEO & Founder, Blue Kite</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
