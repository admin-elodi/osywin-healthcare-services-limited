import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-400 py-30 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white py-8 px-8">
          <h1 className="text-xl font-bold md:text-2xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-blue-100">
            Osywin Healthcare Services Ltd – SMS Communications
          </p>
        
        </div>

        {/* Main Content */}
        <div className="p-8 md:p-10 prose bg-gray-300 prose-blue max-w-none">
          <p className="text-lg leading-relaxed mb-6">
            At Osywin Healthcare Services Ltd, we value your privacy and are committed to protecting your personal information, especially in relation to our SMS (text messaging) communications.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">
            SMS Privacy Policy Disclaimer
          </h2>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <p className="text-gray-800 font-medium leading-relaxed">
              SMS Consent, and phone numbers collected for SMS communication purposes will not be shared with any third party or affiliates for marketing purposes.
            </p>
          </div>       
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;