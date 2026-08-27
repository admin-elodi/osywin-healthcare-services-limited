// src/pages/AboutUs.jsx
import React from "react";
import aboutBg from '@/assets/images/cloud.webp';
import { WINN_SERVICES, RENEWED_SERVICES, ORG } from "@/content/siteContent";

export default function AboutUs() {
  return (
    <main 
      className="w-full min-h-screen pt-28 pb-20 relative overflow-hidden"
      style={{
        backgroundImage: `url(${aboutBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
         // Optional: keeps background stable on scroll
      }}
    >
      {/* Subtle overlay to improve text legibility on varying image brightness */}
      <div className="absolute inset-0" /> {/* Adjust opacity (e.g., /60 or /80) as needed */}

      <div className="max-w-5xl mx-auto px-6 relative z-10 bg-white/60 rounded-sm">
        {/* Page Title */}
        <header className="mb-16">
          <h1 className="text-4xl md:text-2xl font-bold tracking-tight">
            About Us
          </h1>
          <p className="mt-4 text-lg text-black max-w-3xl">
            OSYWIN Healthcare Services Limited is driven by compassionate evidence-based mental health and recovery services
            dedicated to restoring hope and rebuilding lives.
          </p>
        </header>

        {/* WINN Psychiatry Section */}
        <section className="space-y-10 mb-20">
          <h2 className="text-xl font-bold text-blue-600">
            WINN Psychiatry & Mental Health Services
          </h2>

          <div className="space-y-8 text-black leading-relaxed">
            {WINN_SERVICES.map((service) => (
              <div key={service.title}>
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-1 mb-2">
                  {service.title}
                </h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Renewed Wellness Section */}
        <section className="space-y-10">
          <h2 className="text-xl font-bold text-red-500">
            Renewed Wellness & Recovery Services
          </h2>

          <p className="text-gray-700 leading-relaxed">
            Renewed Wellness and Recovery Services is a client-centered behavioral
            health and addiction recovery center dedicated to restoring hope,
            rebuilding lives, and supporting long-term transformation.
          </p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-1 mb-2">
                Mission Statement
              </h3>
              <p>
                To empower individuals to heal, grow, and regain control of
                their lives through holistic, evidence-based recovery services.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-1 mb-2">
                Vision Statement
              </h3>
              <p>
                A stigma-free community where recovery is accessible and every
                person can thrive with dignity and purpose.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-1 mb-2">
                Core Services
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Out Patient (OP) substance abuse counseling</li>
                <li>Mental health therapy</li>
                <li>Peer recovery coaching</li>
                <li>Life skills & wellness support</li>
                <li>Prevention & education programs</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}