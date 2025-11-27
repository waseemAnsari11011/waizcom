import CompanyDetails from "../components/CompanyDetails";

export const metadata = {
  title: "About Us - ecarts.agency",
  description: "Learn more about ecarts.agency, our mission, and our team of expert developers building high-quality ecommerce solutions.",
};

export default function AboutUs() {
  return (
    <div className="bg-white pt-24">
      <CompanyDetails />
    </div>
  );
}
