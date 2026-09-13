import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

interface ContactPageProps {
  onToast: (msg: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onToast }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Feature Suggestion");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      onToast("Please complete all required fields");
      return;
    }
    setSent(true);
    onToast("✓ Thank you! Your message has been sent.");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-6">
      <div className="text-center space-y-1.5 max-w-xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Contact & Feedback
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Have an idea for a template, an ATS suggestion, or feedback? Send us a message.
        </p>
      </div>

      <div className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm">
        {sent ? (
          <div className="py-8 text-center space-y-2.5">
            <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-900">Message Received</h3>
            <p className="text-xs text-gray-600 max-w-sm mx-auto">
              Thank you for reaching out. We review all community feedback to improve Resume Maker for everyone.
            </p>
            <button
              onClick={() => {
                setSent(false);
                setMessage("");
              }}
              className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
            >
              Send another note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jordan Miller"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 text-xs bg-white text-gray-900 focus:border-blue-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jordan@example.com"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 text-xs bg-white text-gray-900 focus:border-blue-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-xs bg-white text-gray-900 focus:border-blue-600 outline-none"
              >
                <option value="Feature Suggestion">Feature Suggestion</option>
                <option value="Template Request">Template Request</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Sponsorship & Partnership">Sponsorship & Partnership</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your feedback or questions..."
                className="w-full p-2.5 rounded-md border border-gray-300 text-xs bg-white text-gray-900 focus:border-blue-600 outline-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
