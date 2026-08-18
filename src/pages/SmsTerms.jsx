import React from 'react';

const SmsTerms = () => {
  return (
    <div className="min-h-screen bg-gray-400 py-30 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white py-8 px-8">
          <h1 className="text-xl font-bold md:text-2xl">
            SMS Terms & Conditions
          </h1>
          <p className="mt-2 text-blue-100">
            Osywin Healthcare Services Limited
          </p>
     
        </div>

        {/* Main Content */}
        <div className="p-8 bg-gray-300 md:p-10 prose prose-blue max-w-none">
          <p className="text-lg leading-relaxed mb-8 text-gray-700">
            These SMS Terms & Conditions govern your participation in receiving text messages from Osywin Healthcare Services Ltd. By opting in, you agree to receive SMS communications as described below.
          </p>

          <ol className="list-decimal pl-6 space-y-8 text-gray-700">
            <li>
              <strong>SMS Consent Communication:</strong>
              <p className="mt-2">
                Information (Phone Numbers) obtained as part of the SMS consent process will not be shared with third parties for marketing purposes.
              </p>
            </li>

            <li>
              <strong>Types of SMS Communications:</strong>
              <p className="mt-2">
                If consent has been given to receive text messages from Osywin Healthcare Services Ltd, messages may be received related to the following:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                
                <li>Customer Care</li>
              </ul>
            </li>

            <li>
              <strong>Message Frequency:</strong>
              <p className="mt-2">
                Message frequency may vary depending on the type of communication. For example, you may receive up to 2 SMS messages per week related to marketing and customer care etc.
              </p>
            </li>

            <li>
              <strong>Potential Fees for SMS Messaging:</strong>
              <p className="mt-2">
                Standard message and data rates may apply, depending on the carrier's pricing plan. These fees may vary if the message is sent domestically or internationally.
              </p>
            </li>

            <li>
              <strong>Opt-In Method:</strong>
              <p className="mt-2">
                Opt-in to receive SMS messages from Osywin Healthcare Services Ltd can be done in the following ways:
              </p>
              <p className="mt-1 font-medium">
                They will fill out website form
              </p>
            </li>

            <li>
              <strong>Opt-Out Method:</strong>
              <p className="mt-2">
                Opting out of receiving SMS messages can be done at any time by replying "STOP" to any SMS message received. Alternatively, direct contact can be made to request removal from the messaging list.
              </p>
            </li>

            <li>
              <strong>Help:</strong>
              <p className="mt-2">
                For any issues, reply with the keyword HELP.
              </p>
              <p className="mt-2">
                Additional Options: If SMS messages are not desired, the SMS consent box on forms can be left unchecked.
              </p>
            </li>

            <li>
              <strong>Standard Messaging Disclosures:</strong>
              <p className="mt-2">
                Message and data rates may apply.
              </p>
              <p className="mt-1">
                Opt out at any time by texting "STOP."
              </p>
              <p className="mt-1">
                For assistance, text "HELP" or visit our{' '}
                <a href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="/sms-terms" className="text-blue-600 hover:underline">
                  Terms and Conditions
                </a>{' '}
                pages.
              </p>
              <p className="mt-1">
                Message frequency may vary.
              </p>
            </li>
          </ol>

          <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <p className="text-gray-800 font-medium">
              By opting in, you confirm that you are the subscriber or customary user of the mobile number provided and authorize Osywin Healthcare Services Ltd to send SMS messages to that number for the purposes described above.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-700">
            Questions about these SMS Terms & Conditions? Reach us at:
          </p>
          <div className="mt-4 space-y-2 text-gray-700">
            <p><strong>Phone:</strong> 302-696-6238</p>
            <p><strong>Email:</strong> <a href="mailto:osywinhc@gmail.com" className="text-blue-600 hover:underline">osywinhc@gmail.com</a></p>
            <p><strong>Address:</strong> 113 Gloucester Blvd, Lower Level Suite, Middletown, DE 19709, USA</p>
          </div>

          <div className="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-500 text-center">
            <p>© {new Date().getFullYear()} Osywin Healthcare Services Ltd. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmsTerms;