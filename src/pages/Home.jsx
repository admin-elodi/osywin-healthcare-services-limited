import React from "react";

import Hero from "@/components/sections/Hero";
import CarePathway from "@/components/sections/CarePathway";
import TrustAssurance from "@/components/sections/TrustAssurance";
import Testimonials from "@/components/sections/Testimonials";



const Home = () => {
  // ✅ Toggle visibility of sections here

  const showHero = true;
  const showCarePathway = true;
  const showTrustAssurance = true;
  // Testimonials is a structural placeholder only (no real client quotes
  // yet - see Testimonials.jsx). Flip this on once real testimonials have
  // been added to that file.
  const showTestimonials = false;

  return (
    <div className="w-full min-h-screen bg-white">
      {showHero && <Hero />}
      {showCarePathway && <CarePathway />}
      {showTrustAssurance && <TrustAssurance />}
      {showTestimonials && <Testimonials />}
    </div>
  );
};

export default Home;
