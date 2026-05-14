import Link from "next/link";
import {
  FiArrowRight,
  FiBarChart2,
  FiBell,
  FiCheckCircle,
  FiLayers,
  FiMessageSquare,
  FiRefreshCw,
  FiSend,
  FiShoppingBag,
  FiSmartphone,
  FiStar,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";
import { generateFAQSchema, generateServiceSchema } from "../../../utils/schemaGenerator";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ecarts.agency";

const faqs = [
  {
    question: "Who is the DTC mobile app service for?",
    answer:
      "This service is built for growing DTC and ecommerce brands with proven demand, repeat purchase potential, and an existing ecommerce store that can benefit from a dedicated iOS and Android app channel.",
  },
  {
    question: "Can Ecarts work with our current ecommerce platform?",
    answer:
      "Yes. Ecarts works with the ecommerce store and tools you already use, including your products, collections, checkout, customer accounts, analytics, loyalty, subscriptions, and campaign tools.",
  },
  {
    question: "Do you handle App Store and Play Store publishing?",
    answer:
      "Yes. Ecarts supports app assets, QA, compliance preparation, App Store submission, Play Store submission, and post-launch maintenance.",
  },
  {
    question: "Can the app send push notifications?",
    answer:
      "Yes. Push notifications can be planned for product drops, cart recovery, back-in-stock campaigns, replenishment reminders, loyalty updates, VIP offers, and win-back campaigns.",
  },
  {
    question: "How long does it take to launch?",
    answer:
      "Timeline depends on your current store, app requirements, and approval process. The free preview is used to review your website and map a practical app launch plan.",
  },
];

const pillars = [
  {
    icon: FiShoppingBag,
    title: "Store-synced shopping",
    text: "Bring products, collections, account flows, checkout, offers, and key ecommerce tools into a dedicated app experience.",
  },
  {
    icon: FiBell,
    title: "Push retention channel",
    text: "Use app notifications for launches, abandoned carts, replenishment, back-in-stock, loyalty, and high-intent repeat purchase campaigns.",
  },
  {
    icon: FiSmartphone,
    title: "Native mobile UX",
    text: "Create a smoother shopping path with app navigation, persistent sessions, fast access to core categories, and branded app store presence.",
  },
  {
    icon: FiRefreshCw,
    title: "Managed launch and updates",
    text: "Get support for app setup, QA, store submission, analytics, post-launch iteration, and ongoing improvements.",
  },
];

const processTimeline = [
  {
    title: "Today",
    items: [
      "Connect your website and book your onboarding call.",
      "Our team reviews your site and configures the first version of your app within 1 business day."
    ]
  },
  {
    title: "Week 1",
    items: [
      "Receive your app preview.",
      "Customize the app's design, navigation, and branding based on your feedback — we make the changes for you.",
      "Align on final details to get your app ready for testing."
    ]
  },
  {
    title: "Week 2",
    items: [
      "Test your app on real devices.",
      "We implement any final updates based on your team's feedback.",
      "Set up smart app banners and QR codes to drive app downloads from day one."
    ]
  },
  {
    title: "Week 3",
    items: [
      "Prepare for launch.",
      "We submit your app to the App Store and Google Play, manage approvals, and provide promotional templates and assets to help you plan your rollout."
    ]
  },
  {
    title: "Week 4",
    items: [
      "Launch your app live to your customers.",
      "We help you set up and activate push notifications: welcome sequences, cart abandonment reminders, and a full month of push campaigns drafted for you.",
      "Start building mobile loyalty, increasing repeat purchases, and boosting retention from day one."
    ]
  }
];

const deliverables = [
  {
    name: "Branded app setup",
    bestFor: "Your DTC store packaged for iOS and Android",
    points: ["App branding and navigation", "Product and collection access", "Customer account flow", "Checkout continuity"],
  },
  {
    name: "Push notification channel",
    bestFor: "A direct retention channel for your best customers",
    points: ["Product drops", "Cart recovery", "Back-in-stock alerts", "VIP and loyalty campaigns"],
  },
  {
    name: "Launch and store approval",
    bestFor: "A guided path through app stores and go-live",
    points: ["App assets", "QA support", "App Store submission", "Play Store submission"],
  },
  {
    name: "Ongoing app growth",
    bestFor: "Continuous improvement after launch",
    points: ["App updates", "Campaign planning", "Analytics review", "Retention optimization"],
  },
];

const featureCards = [
  {
    title: "Get started with a free preview of your app",
    text: "Share your website URL and get a functional preview shaped around your store, branding, checkout, and key shopping journeys.",
    icon: FiSmartphone,
  },
  {
    title: "Keep your website as the source of truth",
    text: "Update your products, collections, campaigns, and content on your site. The app follows the same store experience, without duplicate upkeep.",
    icon: FiRefreshCw,
  },
  {
    title: "Ecarts handles the app work",
    text: "We take care of app configuration, QA, app assets, publishing support, updates, and retention improvements after launch.",
    icon: FiMessageSquare,
  },
];

const primaryIntegrations = [
  {
    name: "Shopify",
    mark: "S",
    text: "Turn your Shopify storefront into a synced mobile app with products, collections, checkout, and campaigns aligned.",
  },
  {
    name: "WooCommerce",
    mark: "W",
    text: "Bring your WordPress commerce experience into an app while keeping your website as the place your team manages.",
  },
  {
    name: "Magento",
    mark: "M",
    text: "Package your Magento store into a mobile app that keeps catalog, account, and checkout flows connected.",
  },
  {
    name: "Headless / Custom",
    mark: "API",
    text: "Work with your existing frontend, backend, content, checkout, and ecommerce services without replacing the stack.",
  },
];

const integrationTools = [
  "Recharge",
  "Klaviyo",
  "Mailchimp",
  "Yotpo",
  "Gorgias",
  "Zendesk",
  "Rebuy",
  "Okendo",
  "Loop",
  "Analytics",
];

export const metadata = {
  title: "DTC Mobile App Development Service | Ecommerce Apps for Growing Brands",
  description:
    "Ecarts helps mid-market DTC brands launch branded iOS and Android ecommerce apps with push notifications, store integrations, app publishing, and ongoing support.",
  alternates: {
    canonical: "/services/dtc-mobile-apps",
  },
  openGraph: {
    title: "DTC Mobile App Development Service | Ecarts",
    description:
      "Turn your ecommerce store into a high-retention mobile app channel for iOS and Android.",
    url: `${siteUrl}/services/dtc-mobile-apps`,
    type: "website",
  },
};

export default function DtcMobileAppsPage() {
  const serviceSchema = generateServiceSchema(
    "DTC Mobile App Development",
    "Mobile app launch, ecommerce integrations, push notification strategy, and ongoing growth support for mid-market DTC brands.",
    {
      serviceOutput: ["iOS Shopping App", "Android Shopping App", "Push Notification Channel", "App Store Launch"],
      audience: "Mid-market DTC ecommerce brands",
      offers: ["DTC Mobile App Launch", "Push Notification Setup", "App Store Publishing Support", "Mobile App Growth Support"],
    }
  );
  const faqSchema = generateFAQSchema(faqs);

  return (
    <div className="bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([serviceSchema, faqSchema]),
        }}
      />

      <section className="relative overflow-hidden pt-32 md:pt-40">
        <div className="absolute inset-0 bg-[#f6fbf8]" />
        <div className="absolute right-0 top-0 h-full w-1/3 bg-[#fad171]" />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-5 pb-20 pt-8 md:grid-cols-[1.05fr_0.95fr] md:pb-24">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00a86b]/20 bg-white px-4 py-2 text-sm font-bold text-[#00784f] shadow-sm">
              <FiTarget />
              Website To App Service For Ecommerce Brands
            </div>
            <h1 className="max-w-[760px] text-4xl font-black leading-tight text-slate-950 md:text-6xl">
              Turn your website into a mobile app in 30 days
            </h1>
            <p className="mt-6 max-w-[680px] text-lg leading-8 text-slate-700 md:text-xl">
              We turn the ecommerce website you already run into a polished iOS and Android app that stays in sync with your store, without rebuilding your storefront, duplicating work, or adding ongoing maintenance for your team.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/services/dtc-mobile-apps/demo"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#00a86b] px-7 py-4 text-base font-black text-white shadow-lg transition hover:bg-[#038257]"
              >
                Get Your Free App Preview
                <FiArrowRight />
              </Link>
              <Link
                href="/services/dtc-mobile-apps/demo"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white px-7 py-4 text-base font-black text-slate-950 transition hover:border-[#00a86b] hover:text-[#00784f]"
              >
                Book a Consultation
              </Link>
            </div>
            <div className="mt-9 grid gap-4 text-sm font-bold text-slate-700 sm:grid-cols-3">
              {[
                "Site and app, always in sync",
                "Push notifications, native UX",
                "Clear pricing, no revenue share",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <FiCheckCircle className="shrink-0 text-[#00a86b]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[430px]">
            <div className="absolute -left-8 top-12 hidden rounded-lg bg-white p-4 shadow-xl md:block">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-[#fad171]">
                  <FiTrendingUp className="text-slate-950" />
                </div>
                <div>
                  <p className="text-sm font-black">Owned retention</p>
                  <p className="text-xs text-slate-500">Push, loyalty, repeat orders</p>
                </div>
              </div>
            </div>
            <div className="rounded-[2.25rem] border-[10px] border-slate-950 bg-slate-950 p-3 shadow-2xl">
              <div className="overflow-hidden rounded-[1.55rem] bg-white">
                <div className="bg-[#021b4b] p-5 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black">DTC Store</span>
                    <FiBell />
                  </div>
                  <p className="mt-10 text-2xl font-black leading-tight">VIP drop is live</p>
                  <p className="mt-2 text-sm text-white/75">Send the launch to app customers first.</p>
                </div>
                <div className="grid grid-cols-2 gap-3 p-4">
                  {["Skincare", "Bundles", "Rewards", "New Arrivals"].map((item, index) => (
                    <div key={item} className={`rounded-lg p-4 ${index === 0 ? "bg-[#e9f8f1]" : index === 1 ? "bg-[#fff4d8]" : "bg-slate-100"}`}>
                      <div className="mb-7 h-14 rounded-md bg-white/80" />
                      <p className="text-sm font-black">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-100 p-4">
                  <div className="rounded-lg bg-slate-950 p-4 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#fad171]">Push campaign</p>
                    <p className="mt-2 font-black">Back in stock: best seller</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-4 rounded-lg bg-white p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-[#e8f8f1]">
                  <FiSend className="text-[#00a86b]" />
                </div>
                <div>
                  <p className="text-sm font-black">App launch handled</p>
                  <p className="text-xs text-slate-500">iOS, Android, QA, updates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-10 text-white">
        <div className="mx-auto grid max-w-[1200px] gap-6 px-5 md:grid-cols-3">
          {[
            ["Retention", "Build a channel beyond ads, email, and SMS."],
            ["Speed", "Launch around the ecommerce stack you already run."],
            ["Simplicity", "Keep your store and app aligned without running a second channel from scratch."],
          ].map(([title, text]) => (
            <div key={title} className="border-l border-white/15 pl-5">
              <p className="text-xl font-black text-[#fad171]">{title}</p>
              <p className="mt-2 text-sm leading-6 text-white/75">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#111827] py-20 text-white md:py-28">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-[#fad171]">
                Website to app
              </p>
              <h2 className="text-4xl font-black leading-tight md:text-6xl">
                Keep your website. Launch the app around it.
              </h2>
            </div>
            <p className="text-lg leading-8 text-white/70 md:text-xl">
              Your current ecommerce site stays the source of truth. Ecarts turns that experience into a polished mobile app, keeps the app aligned with your store, and handles the launch work your team should not have to own.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {featureCards.map(({ title, text, icon: Icon }) => (
              <div key={title} className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#00a86b]/15 text-[#69d8a1]">
                  <Icon size={23} />
                </div>
                <h3 className="text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6 md:p-8">
              <div className="grid gap-6 sm:grid-cols-2">
                {["Website", "Mobile app"].map((label, index) => (
                  <div key={label} className="rounded-lg bg-white p-4 text-slate-950">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">{label}</span>
                      {index === 0 ? <FiLayers /> : <FiSmartphone />}
                    </div>
                    <div className="mt-4 rounded-lg bg-slate-950 p-4 text-white">
                      <p className="text-xs font-black uppercase text-[#fad171]">Spring drop</p>
                      <p className="mt-12 text-2xl font-black leading-tight">New arrivals are live</p>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="h-20 rounded-lg bg-[#ecd8c3]" />
                      <div className="h-20 rounded-lg bg-[#b8c8b8]" />
                    </div>
                    <div className="mt-4 rounded-lg bg-[#e9f8f1] p-3 text-xs font-black text-[#00784f]">
                      {index === 0 ? "Update once on your site" : "App follows automatically"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-[#f7f8fb] p-6 text-slate-950 md:p-8">
              <h3 className="text-3xl font-black leading-tight md:text-5xl">
                Site and app stay in sync, with zero extra work
              </h3>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Products, collections, checkout, customer accounts, offers, content, and campaign pages stay connected to the website you already manage.
              </p>
              <div className="mt-8 grid gap-3">
                {[
                  "No second catalog to manage",
                  "No duplicate checkout flow",
                  "No separate app content workflow",
                  "No revenue share on app sales",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-black">
                    <FiCheckCircle className="shrink-0 text-[#00a86b]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr] md:items-center">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#fad171] text-slate-950">
                  <FiMessageSquare size={24} />
                </div>
                <p className="text-xl font-black">Fully managed from preview to launch, and beyond</p>
              </div>
              <div>
                <p className="leading-7 text-white/70">
                  We take care of configuration, app assets, QA, store publishing support, updates, and post-launch improvements. Your team gets a clear path from free preview to app launch without taking on internal mobile app operations.
                </p>
                <Link
                  href="/services/dtc-mobile-apps/demo"
                  className="mt-5 inline-flex items-center gap-3 text-base font-black text-[#69d8a1] transition hover:text-[#fad171]"
                >
                  Get your free app preview
                  <FiArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="max-w-3xl">
            <p className="mb-3 font-black uppercase tracking-[0.18em] text-[#00a86b]">Why now</p>
            <h2 className="text-3xl font-black leading-tight md:text-5xl">
              Your mobile website sells. A mobile app creates habit.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Mid-market DTC brands already fight crowded inboxes, rising acquisition costs, and expensive SMS. A branded app gives loyal buyers a faster way back to your products and gives your team a direct channel for timely, high-intent campaigns.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {pillars.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-lg bg-[#021b4b] text-white">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="mx-auto max-w-[900px] text-center">
            <p className="mb-3 font-black uppercase tracking-[0.18em] text-[#00a86b]">No stack disruption</p>
            <h2 className="text-4xl font-black leading-tight text-[#174b36] md:text-6xl">
              Works with the tools your store already runs on
            </h2>
            <p className="mx-auto mt-6 max-w-[820px] text-lg leading-8 text-slate-600 md:text-xl">
              Your ecommerce platform, checkout, reviews, subscriptions, support, analytics, and retention tools stay part of the experience. The app is built around the stack you already trust.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {primaryIntegrations.map((item) => (
              <div key={item.name} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-[#f7f8fb] text-lg font-black text-[#174b36]">
                    {item.mark}
                  </div>
                  <h3 className="text-xl font-black text-slate-950">{item.name}</h3>
                </div>
                <p className="min-h-[112px] text-base leading-7 text-slate-600">{item.text}</p>
                <Link
                  href="/services/dtc-mobile-apps/demo"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#00784f] transition hover:text-[#00a86b]"
                >
                  Preview your app
                  <FiArrowRight />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-4 overflow-x-auto pb-3">
            {integrationTools.map((tool) => (
              <div
                key={tool}
                className="flex min-w-max items-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-sm"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e9f8f1] text-sm font-black text-[#00784f]">
                  {tool.slice(0, 1)}
                </div>
                <span className="text-base font-black text-slate-950">{tool}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/services/dtc-mobile-apps/demo"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#174b36] px-7 py-4 text-base font-black text-white shadow-lg transition hover:bg-[#0f3627]"
            >
              Check Your Stack
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section id="app-preview" className="bg-[#f7f8fb] py-20">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 font-black uppercase tracking-[0.18em] text-[#00a86b]">What you get</p>
            <h2 className="text-3xl font-black leading-tight md:text-5xl">
              A managed mobile app channel for your existing DTC store
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              The offer is simple: Ecarts helps you package your current ecommerce experience into a branded iOS and Android app, configure the retention features that matter, and support the launch from preview to app store approval.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {deliverables.map((item) => (
              <div key={item.name} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-black">{item.name}</h3>
                <p className="mt-2 text-sm font-bold text-[#00784f]">{item.bestFor}</p>
                <ul className="mt-6 space-y-3">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-6 text-slate-700">
                      <FiCheckCircle className="mt-1 shrink-0 text-[#00a86b]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="mx-auto max-w-[900px] text-center mb-16">
            <h2 className="mx-auto max-w-[800px] text-4xl font-black leading-tight text-[#174b36] md:text-5xl lg:text-6xl">
              Launch your mobile app faster than you thought possible.
            </h2>
            <p className="mx-auto mt-6 max-w-[700px] text-lg leading-8 text-slate-600">
              Building and launching an app can feel complex. We make it simple.<br className="hidden md:block" /> Here&apos;s what your first 30 days with Ecarts looks like:
            </p>
          </div>

          <div className="mx-auto pb-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 rounded-lg border border-slate-200 bg-white">
              {processTimeline.map((column, index) => (
                <div 
                  key={column.title} 
                  className={`flex flex-col ${index !== processTimeline.length - 1 ? 'border-b lg:border-b-0 lg:border-r border-slate-200' : ''}`}
                >
                  <div className="border-b border-slate-200 bg-[#f7f8fb] px-6 py-4">
                    <h3 className="text-sm font-bold text-slate-900">{column.title}</h3>
                  </div>
                  <div className="flex-grow p-6">
                    <ul className="space-y-6">
                      {column.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex gap-3 text-sm leading-6 text-slate-700">
                          <FiCheckCircle className="mt-1 shrink-0 text-white" fill="#174b36" size={18} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8fb] py-20">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 font-black uppercase tracking-[0.18em] text-[#00a86b]">Why Ecarts</p>
            <h2 className="text-3xl font-black leading-tight md:text-5xl">
              A done-for-you app launch partner for DTC teams
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Your team keeps focusing on products, campaigns, and customers. Ecarts handles the mobile app setup, QA, store launch work, push readiness, and ongoing app improvements.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              [FiSmartphone, "App experience", "A branded app interface built around your current store."],
              [FiRefreshCw, "Store alignment", "Products, offers, checkout, and campaign tools stay connected."],
              [FiBarChart2, "Growth focus", "Retention, repeat orders, push strategy, and analytics."],
            ].map(([Icon, title, text]) => (
              <div key={title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-lg bg-[#fad171] text-slate-950">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black leading-tight md:text-5xl">
              Want to see what your DTC app could look like?
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Share your store URL and we will map the right app launch plan for your ecommerce stack, retention goals, and customer journey.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/services/dtc-mobile-apps/demo"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#00a86b] px-7 py-4 text-base font-black text-white shadow-lg transition hover:bg-[#038257]"
              >
                Book a Free App Strategy Call
                <FiArrowRight />
              </Link>
              <Link
                href="/services/dtc-mobile-apps/demo"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white px-7 py-4 text-base font-black text-slate-950 transition hover:border-[#00a86b] hover:text-[#00784f]"
              >
                Request an App Preview
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-[900px] px-5">
          <h2 className="text-3xl font-black md:text-4xl">Frequently asked questions</h2>
          <div className="mt-8 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
            {faqs.map((faq) => (
              <div key={faq.question} className="p-6">
                <h3 className="text-lg font-black">{faq.question}</h3>
                <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
