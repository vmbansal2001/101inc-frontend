import useUserData from "../../../components/use-user-data/use-user-data";
import CustomerNavbar from "../../../components/navbar/customer-navbar";
import HowItWorks from "./how-it-works";
import WhyChooseUs from "./why-choose-us";
import AutoServicesContainer from "./services-container/auto-services/auto-services-container";
import HomeServicesContainer from "./services-container/home-services/home-services-container";
import Footer from "../../../components/footer/footer";

const CustomerDashboard = () => {
  const { userData } = useUserData();

  return (
    <main className="min-h-screen flex flex-col">
      <CustomerNavbar />

      <div className="common-frame-box py-10 space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Welcome, <span className="text-blue-600">{userData.full_name}</span>{" "}
            👋
          </h1>
          <p className="text-gray-600 font-medium">
            Please select a service to get started.
          </p>
        </div>

        <div className="space-y-16">
          <AutoServicesContainer />

          <HomeServicesContainer />

          <HowItWorks />

          <WhyChooseUs />
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default CustomerDashboard;
