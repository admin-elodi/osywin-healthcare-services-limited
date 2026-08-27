// src/content/siteContent.js
//
// Single source of truth for content that previously lived independently in
// multiple components (Winn.jsx, Renewed.jsx, Footer.jsx, AboutUs.jsx) and
// had drifted out of sync with itself — most notably WINN's service list,
// which showed one set of services on the WINN page/Footer and a
// different, conflicting set on the About Us page.
//
// Import from here wherever this content is displayed so a future edit only
// has to happen once. Page-specific framing (headlines, intros, SEO meta
// descriptions) is intentionally NOT centralized here — those are meant to
// vary per page/route and doing so is not a bug.

export const ORG = {
  name: "OSYWIN Healthcare Services Limited",
  tagline:
    "Family-centered psychiatric care, mental wellness, and recovery services designed to support lasting stability and renewal.",
  phone: "302-696-6238",
  phoneHref: "+13026966238",
  email: "osywinhc@gmail.com",
  address: {
    street: "113 Gloucester Blvd, Lower Level Suite",
    cityStateZip: "Middletown, DE 19709, USA",
    mapsQuery:
      "https://www.google.com/maps/search/?api=1&query=113+Gloucester+Blvd+Lower+Level+Suite+Middletown+DE+19709",
  },
  social: {
    x: "https://x.com/",
    linkedin: "https://www.linkedin.com/",
  },
};

// WINN Psychiatry & Mental Health Services — the current accurate list,
// confirmed against the live Winn.jsx / Footer version.
export const WINN_SERVICES = [
  {
    title: "Behavioral & Mental Health Counseling",
    description:
      "Professional services to manage emotional and psychological challenges.",
    features: [
      "Anxiety & stress",
      "Depression",
      "Trauma & PTSD",
      "Anger issues",
      "Emotional instability",
      "Life transitions",
    ],
  },
  {
    title: "Family Support & Education",
    description:
      "Support services for families affected by mental health and substance-related challenges.",
    features: [
      "Family therapy",
      "Educational workshops",
      "Communication rebuilding",
      "Reconciliation and healing support",
      "Tools for supporting a loved one",
    ],
  },
  {
    title: "Adult & Adolescent Care",
    description: "Community-focused Adult & Adolescent Care",
    features: [
      "Mental health awareness seminars",
      "Youth and teen education programs",
      "Workplace mental wellness training",
      "Faith-based mental health education",
    ],
  },
  {
    title: "Prevention & Community Education Programs",
    description:
      "Community-focused mental health education and preventive outreach.",
    features: [
      "Mental health awareness seminars",
      "Youth and teen education programs",
      "Workplace mental wellness training",
      "Faith-based mental health education",
    ],
  },
];

// Renewed Wellness & Recovery Services — matches the live Renewed.jsx.
export const RENEWED_SERVICES = [
  {
    title: "Outpatient Substance Abuse Treatment",
    description:
      "Structured weekly counseling for recovery while maintaining work, school, or family responsibilities.",
    features: [
      "Individual addiction counseling",
      "Recovery planning",
      "Craving and trigger management",
      "Substance-use education",
      "Relapse-prevention strategies",
    ],
  },
  {
    title: "Peer Recovery Support Services",
    description:
      "Certified peer specialists providing guidance through lived recovery experience.",
    features: [
      "Recovery coaching",
      "Encouragement and accountability",
      "Goal-setting and planning",
      "Life-skills support",
      "Connection to community resources",
    ],
  },
];
