import React from "react";

const HeroSection = () => {
  return (
    <div>
      <p className="text-6xl lg:text-8xl md:text-7xl xl:text-9xl text-primary">Task</p>
      <p className="text-6xl lg:text-8xl md:text-7xl xl:text-9xl text-blue-700">Automatic</p>
      <div className="pt-6">
        <p className="inline text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-primary">Task</p>
        <p className="inline text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-blue-700">Matic</p>
      </div>
    </div>
  );
};

export default HeroSection;
