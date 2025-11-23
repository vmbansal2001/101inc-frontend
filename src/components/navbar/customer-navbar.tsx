import Link from "next/link";
import LogoWithName from "../logos/logo-with-name";
import useUserData from "../use-user-data/use-user-data";

const CustomerNavbar = () => {
  const { userData } = useUserData();

  return (
    <nav className="bg-white shadow-sm">
      <div className="common-frame-box py-4 flex justify-between items-center">
        <div className="flex items-center gap-10">
          <Link href="/">
            <LogoWithName />
          </Link>

          <Link
            href="/my-bookings"
            className="text-sm text-[#545454] font-medium hover:text-gray-900 transition-all duration-200"
          >
            My Bookings
          </Link>
        </div>

        <div className="text-sm text-gray-600 font-medium">
          Hello, {userData.full_name}
        </div>
      </div>
    </nav>
  );
};

export default CustomerNavbar;
