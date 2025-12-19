import { Montserrat } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Header from "./components/Header";
import Footer from "./components/footer/Footer";
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
        <Header />
        <main>{children}</main>
        <Footer />
        {/* VWO SmartCode */}
        <Script
          id="vwo-smartcode"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window._vwo_code=window._vwo_code || (function() {
              var account_id=888362,
              version = 1.5,
              settings_tolerance=2000,
              library_tolerance=2500,
              use_existing_jquery=false,
              is_spa=1,
              hide_element='body',
              hide_element_style = 'opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important',
              /* DO NOT EDIT BELOW THIS LINE */
              f=false,d=document,v=d.querySelector('#vwoCode'),c={use_existing_jquery:function(){return use_existing_jquery},library_tolerance:function(){return library_tolerance},hide_element_style:function(){return '{'+hide_element_style+'}'},finish:function(){if(!f){f=true;var e=d.getElementById('_vis_opt_path_hides');if(e)e.parentNode.removeChild(e)}},finished:function(){return f},load:function(e){var t=d.createElement('script');t.fetchPriority='high';t.src=e;t.type='text/javascript';t.onerror=function(){_vwo_code.finish()};d.getElementsByTagName('head')[0].appendChild(t)},getVersion:function(){return version},getMatchedCookies:function(e){var t=[];if(document.cookie){t=document.cookie.match(e)||[]}return t},getCombinationCookie:function(){var e=c.getMatchedCookies(/(?:^|;)\s?(_vis_opt_exp_\d+_combi=[^;$]*)/gi);e=e.map(function(e){try{var t=decodeURIComponent(e);if(!/_vis_opt_exp_\d+_combi=(?:\&|$)/.test(t))return t}catch(e){}return null});return e.filter(function(e){return e!=null})},init:function(){if(d.URL.indexOf('__vwo_disable__')>-1)return;window.settings_timer=setTimeout(function(){_vwo_code.finish()},settings_tolerance);var e=d.createElement('style'),t=hide_element?hide_element+'{'+hide_element_style+'}':'',i=d.getElementsByTagName('head')[0];e.setAttribute('id','_vis_opt_path_hides');v&&e.setAttribute('nonce',v.nonce);e.setAttribute('type','text/css');if(e.styleSheet)e.styleSheet.cssText=t;else e.appendChild(d.createTextNode(t));i.appendChild(e);var n=this.getCombinationCookie();this.load('https://dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(d.URL)+'&f='+ +is_spa+'&vn='+version+(n.length?'&c='+n.join('&'):''));return settings_timer} };window._vwo_settings_timer = c.init(); return c; }());
            `,
          }}
        />
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
