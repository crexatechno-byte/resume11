import React from "react";

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-6">
      <div className="space-y-1 border-b border-gray-200 pb-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="text-xs text-gray-500">Last updated: March 2026</p>
      </div>

      <div className="text-xs sm:text-sm text-gray-600 space-y-4 leading-relaxed">
        <p>
          At <strong>Resume Maker</strong>, we believe privacy is essential. Our application is designed to function entirely within your local browser without requiring personal accounts or passwords.
        </p>

        <h3 className="text-sm font-bold text-gray-900 pt-1">1. Local Storage of Information</h3>
        <p>
          When you enter your name, contact details, work history, or education, this data is saved directly in your browser's local storage (via HTML5 localStorage). We do not transmit or store your complete resume documents on central database servers.
        </p>

        <h3 className="text-sm font-bold text-gray-900 pt-1">2. AI Assistance Features</h3>
        <p>
          If you choose to use our "Improve with AI" or "Job Matcher" tools, the specific text snippet you request assistance for is securely sent to Google Gemini via server-side API proxies strictly to generate the response. We do not use your inputs to train public models.
        </p>

        <h3 className="text-sm font-bold text-gray-900 pt-1">3. Analytics & Cookies</h3>
        <p>
          We do not use invasive tracking cookies. Anonymous basic usage telemetry may be recorded solely to understand aggregate template popularity and ensure platform reliability.
        </p>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-6">
      <div className="space-y-1 border-b border-gray-200 pb-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Terms of Service</h1>
        <p className="text-xs text-gray-500">Last updated: March 2026</p>
      </div>

      <div className="text-xs sm:text-sm text-gray-600 space-y-4 leading-relaxed">
        <p>
          By using Resume Maker, you agree to these simple terms of service.
        </p>

        <h3 className="text-sm font-bold text-gray-900 pt-1">1. Free Usage</h3>
        <p>
          Resume Maker is provided free of charge for personal and professional job seeking. You retain 100% intellectual ownership of all content and resumes created through this application.
        </p>

        <h3 className="text-sm font-bold text-gray-900 pt-1">2. Accuracy of AI Output</h3>
        <p>
          While our AI suggestions are powered by state-of-the-art models, you are responsible for reviewing and verifying the accuracy of any generated text, dates, or metrics before submitting your resume to employers.
        </p>

        <h3 className="text-sm font-bold text-gray-900 pt-1">3. Disclaimer</h3>
        <p>
          Resume Maker is provided on an "as is" and "as available" basis without warranties of any kind. We are not liable for any data loss resulting from cleared browser caches. We recommend exporting regular JSON backups from the Settings page.
        </p>
      </div>
    </div>
  );
};
