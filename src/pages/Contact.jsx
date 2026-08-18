import React, { useState } from 'react';
import { Link } from "react-router-dom";
import office from '@/assets/images/help.webp'; // adjust path if necessary

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    smsConsent: false,
  });

  const [status, setStatus] = useState(''); // success or error message

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace with real submission logic (EmailJS, API, etc.)
    // Demo success:
    setStatus('Thank you! Your submission has been received.');
    // For error demo: setStatus('Oops! Something went wrong while submitting the form.');
    
    // Reset on success
    if (status.includes('Thank you')) {
      setFormData({ name: '', email: '', phone: '', message: '', smsConsent: false });
    }
  };

  return (
    <div
      className="min-h-screen py-30 sm:py-30 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${office})` }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header – inspired by Grata's simple, welcoming style */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-3xl font-bold text-white uppercase tracking-wide">
            CONTACT US
          </h1>
          <p className="mt-4 text-sm md:text-xl text-white">
            Send us a message! We're happy to help
          </p>
        </div>

        {/* Vertical stack: Info first, then Form */}
        <div className="flex flex-col gap-10 sm:gap-12">
          {/* Contact Info Card */}
          <div className="text-center text-white p-8 sm:p-10 rounded-2xl shadow-lg">
            <div className="space-y-6 text-sm md:text-xl">
              <div>
                <p className="font-bold">Address:</p>
                <p>113 Gloucester Blvd, Lower Level Suite</p>
                <p>Middletown, DE 19709, USA</p>
              </div>

              <div>
                <p className="font-bold">Phone:</p>
                <p className="font-medium">(302) 696-6238</p>
              </div>

              <div>
                <p className="font-bold">Email:</p>
                <a
                  href="mailto:osywinhc@gmail.com"
                  className="hover:underline font-medium"
                >
                  osywinhc@gmail.com
                </a>
              </div>

              <div>
                <p className="font-bold">Hours:</p>
                <p>Monday - Friday: 9am - 5pm</p>
                <p>Saturday & Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="p-8 sm:p-10 rounded-2xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-7 text-center">
              <div>
                <label htmlFor="name" className="block text-base font-medium text-white mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-white block w-full border border-gray-300 rounded-sm py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-base font-medium text-white mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white block w-full border border-gray-300 rounded-sm py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-base font-medium text-white mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-white block w-full border border-gray-300 rounded-sm py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-base font-medium text-white mb-1.5">
                  How Can We Help? *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="bg-white block w-full border border-gray-300 rounded-sm py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-y min-h-[140px]"
                />
              </div>

              {/* SMS Consent */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="smsConsent"
                  name="smsConsent"
                  checked={formData.smsConsent}
                  onChange={handleChange}
                  className="mt-1.5 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="smsConsent" className="text-justify text-sm text-white leading-relaxed">
                  By checking this box, I consent to receive text messages related to customer care from Osywin Healthcare Services Ltd. Reply “STOP” to opt-out at any time. Message & data rates may apply. Message frequency varies. Text HELP to (302) 696-6238 for help. See our{' '}
                  <a href="/privacy-policy" className="text-red-500 font-semibold hover:underline">
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="/sms-terms" className="text-red-500 font-semibold hover:underline">
                    SMS Terms
                  </a>.
                </label>
              </div>

              {/* NEW GREEN POLICY BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/privacy-policy"
                  className="w-full bg-green-600/50 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-200 shadow-md"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/sms-terms"
                  className="w-full bg-green-600/50 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-200 shadow-md"
                >
                  SMS Terms & Conditions
                </Link>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600/40 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200 shadow-md"
                >
                  Submit
                </button>
              </div>

              {/* Status */}
              {status && (
                <div
                  className={`mt-6 p-5 rounded-lg text-center font-medium border ${
                    status.includes('Thank you')
                      ? 'bg-green-50 text-green-800 border-green-200'
                      : 'bg-red-50 text-red-800 border-red-200'
                  }`}
                >
                  {status}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;