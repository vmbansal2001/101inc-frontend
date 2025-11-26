import useUserData from "../../../components/use-user-data/use-user-data";
import CustomerNavbar from "../../../components/navbar/customer-navbar";
import HowItWorks from "./how-it-works";
import WhyChooseUs from "./why-choose-us";
import ServicesWeOffer from "./services-we-offer";
import Footer from "../../../components/footer/footer";
import MyBookingsNavigation from "./my-bookings-navigation";

const CustomerDashboard = () => {
  const { userData } = useUserData();

  return (
    <main className="min-h-screen flex flex-col">
      <CustomerNavbar />

      <div className="common-frame-box py-10 space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Welcome, <span className="text-blue-600">{userData.full_name}</span>{" "}
            👋
          </h1>
          <p className="text-gray-600 font-medium">
            Welcome to your dashboard. You can view your bookings, book new
            services, and more.
          </p>
        </div>

        <MyBookingsNavigation />

        <div className="space-y-16 mt-10">
          <ServicesWeOffer />

          <HowItWorks />

          <WhyChooseUs />
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default CustomerDashboard;
