import React from "react";

export const metadata = {
  title: "Privacy Policy - ecarts.agency",
  description: "Privacy Policy for ecarts.agency and our social media integration tools.",
};

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Privacy Policy
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Last Updated: {new Date().toLocaleDateString()}
      </p>

      <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            1. Introduction
          </h2>
          <p>
            Welcome to ecarts.agency ("we," "our," or "us"). We are committed to
            protecting your privacy and ensuring you have a positive experience
            on our website and with our services. This Privacy Policy explains
            how we collect, use, disclose, and safeguard your information when
            you visit our website or use our internal tools and services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            2. Information We Collect
          </h2>
          <p className="mb-4">
            We may collect information about you in a variety of ways. The
            information we may collect on the Site includes:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Personal Data:</strong> Personally identifiable
              information, such as your name, shipping address, email address,
              and telephone number, that you voluntarily give to us when you
              register with the Site or when you choose to participate in
              various activities related to the Site.
            </li>
            <li>
              <strong>Derivative Data:</strong> Information our servers
              automatically collect when you access the Site, such as your IP
              address, your browser type, your operating system, your access
              times, and the pages you have viewed directly before and after
              accessing the Site.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            3. Social Media Integration
          </h2>
          <p className="mb-4">
            Our services include features that allow for automated posting to
            social media platforms, specifically LinkedIn ("Social Media
            Integration").
          </p>
          <p className="mb-4">
            <strong>LinkedIn Data:</strong> If you use our LinkedIn
            auto-posting feature, we interact with the LinkedIn API on your
            behalf.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              We use your LinkedIn API credentials (Access Token) to
              authenticate requests.
            </li>
            <li>
              We may retrieve your basic profile information (such as your Name
              and Profile ID) solely for the purpose of identifying the account
              and posting content (blogs, images) that you have created on our
              platform.
            </li>
            <li>
              We do not store your LinkedIn password. Your Access Token is
              stored securely in our server environment variables and is used
              strictly for the functionality of posting content you approve.
            </li>
            <li>
              We do not share your LinkedIn data with any third parties other
              than LinkedIn itself as required to perform the posting action.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            4. Use of Your Information
          </h2>
          <p>
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Operate and maintain our website and services.</li>
            <li>Improve your experience on our website.</li>
            <li>
              Facilitate the creation and management of your account and social
              media posts.
            </li>
            <li>Respond to your comments, questions, and customer service requests.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            5. Data Security
          </h2>
          <p>
            We use administrative, technical, and physical security measures to
            help protect your personal information. While we have taken
            reasonable steps to secure the personal information you provide to
            us, please be aware that despite our efforts, no security measures
            are perfect or impenetrable, and no method of data transmission can
            be guaranteed against any interception or other type of misuse.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            6. Contact Us
          </h2>
          <p>
            If you have questions or comments about this Privacy Policy, please
            contact us at:
          </p>
          <p className="mt-2 font-medium">
            Email: contact@ecarts.agency
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
