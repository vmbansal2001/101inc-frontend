import Link from "next/link";
import LogoWithName from "../logos/logo-with-name";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="common-frame-box py-4 flex justify-between items-center">
        <div className="flex items-center gap-10">
          <LogoWithName />

          <Link
            href="/"
            className="text-sm text-[#545454] font-medium hover:text-gray-900 transition-all duration-200"
          >
            My Tickets
          </Link>
        </div>

        <div className="text-sm text-gray-600 font-medium">Hello, John Doe</div>
      </div>
    </nav>
  );
};

export default Navbar;
