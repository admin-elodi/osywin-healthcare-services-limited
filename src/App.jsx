import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import FloatingActions from '@/components/common/FloatingActions';
import Home from '@/pages/Home';
import Programs from '@/pages/Programs';
import Winn from '@/pages/Winn';
import Renewed from '@/pages/Renewed';
import AboutUs from '@/pages/AboutUs';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import SmsTerms from '@/pages/SmsTerms';
import Contact from '@/pages/Contact';

// Per-route <title> and meta description. React Router doesn't touch either
// on navigation by default, so without this every page - Programs, Privacy
// Policy, whatever - shares the same generic homepage title/description in
// the browser tab, bookmarks, and search results.
const PAGE_META = {
  '/': {
    title: 'OSYWIN Healthcare Services Limited | WINN Psychiatry & Renewed Wellness',
    description: 'Compassionate, evidence-based psychiatric care and addiction recovery support in Middletown, DE - WINN Psychiatry & Mental Health Services and Renewed Wellness & Recovery Services.',
  },
  '/programs': {
    title: 'Our Programs | OSYWIN Healthcare Services Limited',
    description: 'Explore our comprehensive psychiatric and recovery programs, from outpatient substance abuse treatment to behavioral health counseling and peer recovery support.',
  },
  '/winn': {
    title: 'WINN Psychiatry & Mental Health Services | OSYWIN Healthcare',
    description: 'Behavioral & mental health counseling, family support & education, adult & adolescent care, and community prevention programs from WINN Psychiatry.',
  },
  '/renewed': {
    title: 'Renewed Wellness & Recovery Services | OSYWIN Healthcare',
    description: 'Holistic recovery and wellness programs empowering individuals to rebuild, heal, and sustain a meaningful life in recovery.',
  },
  '/about-us': {
    title: 'About Us | OSYWIN Healthcare Services Limited',
    description: 'Learn about OSYWIN Healthcare Services Limited and our mission to deliver compassionate, evidence-based mental health and recovery services.',
  },
  '/contact': {
    title: 'Contact Us | OSYWIN Healthcare Services Limited',
    description: 'Get in touch with OSYWIN Healthcare Services Limited - call, email, or send us a message to get started.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | OSYWIN Healthcare Services Limited',
    description: 'Read the OSYWIN Healthcare Services Limited privacy policy.',
  },
  '/sms-terms': {
    title: 'SMS Terms & Conditions | OSYWIN Healthcare Services Limited',
    description: 'Read the OSYWIN Healthcare Services Limited SMS terms and conditions.',
  },
};

function DocumentMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = PAGE_META[pathname] || PAGE_META['/'];
    document.title = meta.title;

    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', meta.description);
  }, [pathname]);

  return null;
}

// Handles:
// 1. Scroll to top on normal route changes
// 2. Scroll to #contact (Footer) when URL has /#contact
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash (e.g., #contact), scroll to it
    if (hash) {
      // Small delay to ensure page content is rendered first
      const timer = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          // Fallback: scroll to bottom if element not found
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
      }, 100);

      return () => clearTimeout(timer);
    } else {
      // Normal route change: scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <Router>
      <Header />

      <DocumentMeta />
      <ScrollManager />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/winn" element={<Winn />} />
        <Route path="/renewed" element={<Renewed />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/sms-terms" element={<SmsTerms />} />
      </Routes>

      <Footer />
      <FloatingActions />
    </Router>
  );
}

export default App;