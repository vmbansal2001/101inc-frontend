import useUserData from "../use-user-data/use-user-data";
import LogoWithName from "../logos/logo-with-name";
import Link from "next/link";
import { auth } from "@/src/firebase.config";
import { Globe, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setLanguage } from "@/src/store/slices/configurations-state-slice/configurations-state-slice";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const MechanicNavbar = () => {
  const { userData } = useUserData();

  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const nextLocale = locale === "en" ? "ne" : "en";

  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setLanguageDropdownOpen(false);
      }
    };

    if (languageDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [languageDropdownOpen]);

  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="common-frame-box py-4 flex justify-between items-center">
        <Link href="/my-tickets">
          <LogoWithName />
        </Link>

        <div className="flex items-center gap-2">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              className="border border-gray-300 cursor-pointer rounded-sm text-gray-500 p-1"
            >
              <Globe className="w-4 h-4" />
            </button>

            {languageDropdownOpen && (
              <div className="absolute overflow-hidden top-8 right-0 text-xs rounded-md bg-white border-gray-300 border">
                <button
                  onClick={() =>
                    router.push(
                      `/${nextLocale}${pathname.replace(/^\/(en|ne)/, "")}`
                    )
                  }
                  className="w-full text-xs cursor-pointer px-3 py-2 hover:bg-gray-100 duration-200"
                >
                  English
                </button>
                <button
                  onClick={() =>
                    router.push(
                      `/${nextLocale}${pathname.replace(/^\/(en|ne)/, "")}`
                    )
                  }
                  className="w-full text-xs cursor-pointer px-3 py-2 hover:bg-gray-100 duration-200"
                >
                  नेपाली
                </button>
              </div>
            )}
          </div>

          <div className="text-sm text-gray-600 font-medium">
            {userData.full_name}
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

export default MechanicNavbar;
