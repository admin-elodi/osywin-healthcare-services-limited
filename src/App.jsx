import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Home from '@/pages/Home';
import Programs from '@/pages/Programs';
import Winn from '@/pages/Winn';
import Renewed from '@/pages/Renewed';
import AboutUs from '@/pages/AboutUs';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import SmsTerms from '@/pages/SmsTerms';
import Contact from '@/pages/Contact';

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
    </Router>
  );
}

export default App;