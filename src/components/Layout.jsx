import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <Navbar />
      <main className="flex-1 snap-y snap-mandatory scroll-smooth">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
