"use client";

import { cn } from "@/lib/utils";

interface NavBarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function NavBar({ activeSection, setActiveSection }: NavBarProps) {
  // const { theme } = useTheme();

  const navItems = [
    { id: "home", label: "HOME" },
    { id: "news-feed", label: "NEWS FEED" },
    { id: "products-services", label: "PRODUCTS & SERVICES" },
    { id: "gallery", label: "GALLERY" },
    { id: "layout-map", label: "LAYOUT MAP" },
    { id: "about-us", label: "ABOUT US" },
  ];

  return (
    <nav className="sticky top-[62px] z-10 bg-[#121212]/50 backdrop-blur-xl text-[#121212] dark:text-[#F3F3F3]">
      <div className="container mx-auto">
        <ul className="flex flex-wrap">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "px-4 py-4 font-medium transition-colors relative",
                  activeSection === item.id
                    ? "text-yellow-500"
                    : "hover:text-yellow-500",
                  activeSection === item.id &&
                    "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-yellow-500"
                )}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
