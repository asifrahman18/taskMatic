import React from "react";
import HeroSection from "./components/hero";
import SignIn from "./components/signIn";

const Landing: React.FC = () => {
  return (
    <div className="">
      <div className="container min-h-screen grid grid-cols-1 justify-between items-center gap-8 pb-8 pt-6 md:grid-cols-2 md:py-10">
        <HeroSection />
        <SignIn />
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#efd6a6_100%)]"></div>
    </div>
  );
};

export default Landing;
