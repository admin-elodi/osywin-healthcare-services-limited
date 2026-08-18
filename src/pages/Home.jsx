import React from "react";

import Hero from "@/components/sections/Hero";
import CarePathway from "@/components/sections/CarePathway";
import TrustAssurance from "@/components/sections/TrustAssurance";



const Home = () => {
  // ✅ Toggle visibility of sections here
  
  const showHero = true;
  const showCarePathway = false;
  const showTrustAssurance = false;

  

  return (
    <div className="w-full min-h-screen bg-white">
      {showHero && <Hero />}
      {showCarePathway && <CarePathway />}
      {showTrustAssurance && <TrustAssurance />}
    
    </div>
  );
};

export default Home;
