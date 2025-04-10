// "use client";

import { useState } from "react";
import { HomePage } from "./home/HomePage";
import { NewsFeed } from "./newsfeed/news-feed";
import { ProductsServices } from "./products/products-services";
import { Gallery } from "./gallery/gallery";
import { LayoutMap } from "./map/layout-map";
import { AboutUs } from "./about/about-us";
import { NavBar } from "./nav-bar";
import { ThemeToggle } from "./theme-toggle";

export default function DetailActive() {
  const [activeSection, setActiveSection] = useState("home");

  const renderActiveComponent = () => {
    switch (activeSection) {
      case "home":
        return <HomePage />;
      case "news-feed":
        return <NewsFeed />;
      case "products-services":
        return <ProductsServices />;
      case "gallery":
        return <Gallery />;
      case "layout-map":
        return <LayoutMap />;
      case "about-us":
        return <AboutUs />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="dark:bg-[#121212] bg-[#F3F3F3] text-[#121212] dark:text-white  py-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <div className="w-[200px] h-24">
              <img
                src="/detail/shangri-la.png"
                alt="Shangri-La Logo"
                className="w-[200px] h-24"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                SHANGRI-LA ULAANBAATAR
              </h1>
              <p className="text-sm">Grand Ballroom</p>
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-yellow-500">
                    ★
                  </span>
                ))}
                <span className="text-gray-400">★</span>
              </div>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Navigation */}
      <NavBar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main content area */}
      <main className="flex flex-col">{renderActiveComponent()}</main>

      {/* Footer */}
      {/* <footer className="bg-black text-white p-4 text-center">
        <p>
          © {new Date().getFullYear()} Shangri-La Ulaanbaatar. All rights
          reserved.
        </p>
      </footer> */}
    </div>
  );
}
