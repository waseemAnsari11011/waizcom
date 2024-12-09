import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Quality Driven Tech",
  description: "Quality is Priority",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for VWO */}
        <link rel="preconnect" href="https://dev.visualwebsiteoptimizer.com" />
      </head>
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
