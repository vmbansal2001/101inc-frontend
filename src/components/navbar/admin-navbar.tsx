import useUserData from "../use-user-data/use-user-data";
import LogoWithName from "../logos/logo-with-name";
import Link from "next/link";
import { auth } from "@/src/firebase.config";
import { LogOut } from "lucide-react";

const AdminNavbar = () => {
  const { userData } = useUserData();

  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="common-frame-box py-4 flex justify-between items-center">
        <Link href="/admin/tickets">
          <LogoWithName />
        </Link>

        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-600 font-medium">
            Hello, {userData.full_name}
          </div>

          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-600 cursor-pointer transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
