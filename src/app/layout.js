import { Montserrat } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Header from "./components/Header";
import Footer from "./components/footer/Footer";
import WhatsAppButton from "./utility/whatsappBtn";
import { generateOrganizationSchema, generateProfessionalServiceSchema } from "../utils/schemaGenerator";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ecarts.agency"),
  title: "Ecarts - The E-commerce Growth Agency",
  description:
    "Partner with Ecarts for expert ecommerce app development. We specialize in creating scalable, high-performance applications that drive growth and success for our clients.",
  alternates: {
    canonical: "./",
  },
  verification: {
    google: "RyFTBWp-tZcN0vs7nuNYgwymOC1oYy3sQz8ePuvXYH8",
    other: {
      "facebook-domain-verification": "zb22go5ehqyp0ivho35zgwnfip2bq0",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* Google Tag Manager */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-T7FT3GS3');`}
      </Script>
      {/* End Google Tag Manager */}

      {/* Google Tag (gtag.js) */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-17813249829"
        strategy="afterInteractive"
      />
      <Script id="google-ads-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'AW-17813249829');
          
          // Conversion event (legacy placement) - REMOVED to prevent auto-trigger on page load
          // gtag('event', 'conversion', {'send_to': 'AW-17813249829/B1xyCILN5NMbEKW-gq5C'});

          function gtag_report_conversion(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') {
                window.location = url;
              }
            };
            gtag('event', 'conversion', {
                'send_to': 'AW-17813249829/B1xyCILN5NMbEKW-gq5C',
                'event_callback': callback
            });
            return false;
          }
          
          // Expose function to window for React components
          window.gtag_report_conversion = gtag_report_conversion;
        `}
      </Script>
      {/* Microsoft Clarity */}
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "uuyhumnre9");
        `}
      </Script>
      {/* Meta Pixel Code */}
     <Script id="meta-pixel" strategy="afterInteractive">
        {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1444023683753772');
fbq('track', 'PageView');
        `}
      </Script>
      {/* End Meta Pixel Code */}
      <body className={montserrat.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T7FT3GS3"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {/* Meta Pixel Code (noscript) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1444023683753772&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code (noscript) */}
        <Header />
        <main>{children}</main>
        <WhatsAppButton phoneNumber={"918882202176"} />
        <Footer />

        {/* Organization Schema */}
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema()),
          }}
        />
        {/* Professional Service Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateProfessionalServiceSchema()),
          }}
        />
      </body>
    </html>
  );
}
