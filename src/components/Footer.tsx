import React from "react";
import { ActivePage } from "../types";
import { FileText, Heart } from "lucide-react";

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-gray-200 bg-white text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 space-y-3">
            <div
              onClick={() => onNavigate("landing")}
              className="flex items-center gap-2 cursor-pointer inline-flex"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-gray-900">
                Resume Maker
              </span>
            </div>
            <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
              Create professional, ATS-friendly resumes in minutes — completely free, no sign-up needed. Stored safely on your device.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              Product
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate("builder")}
                  className="hover:text-blue-600 transition-colors"
                >
                  Resume Builder
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("templates")}
                  className="hover:text-blue-600 transition-colors"
                >
                  Templates
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("ai-assistant")}
                  className="hover:text-blue-600 transition-colors"
                >
                  AI Assistant
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("cover-letter")}
                  className="hover:text-blue-600 transition-colors"
                >
                  Cover Letter
                </button>
              </li>
            </ul>
          </div>

          {/* Resources & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate("templates")}
                  className="hover:text-blue-600 transition-colors"
                >
                  Resume Examples
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("help")}
                  className="hover:text-blue-600 transition-colors"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("contact")}
                  className="hover:text-blue-600 transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("support-us")}
                  className="inline-flex items-center gap-1 text-rose-600 font-semibold hover:underline"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-500" />
                  <span>Support Us (₹50)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate("privacy")}
                  className="hover:text-blue-600 transition-colors"
                >
                  Privacy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("terms")}
                  className="hover:text-blue-600 transition-colors"
                >
                  Terms
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("privacy")}
                  className="hover:text-blue-600 transition-colors"
                >
                  Cookie Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("settings")}
                  className="hover:text-blue-600 transition-colors"
                >
                  Device Data Settings
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 Resume Maker. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Free • No Sign-up Required</span>
            <span>•</span>
            <button
              onClick={() => onNavigate("support-us")}
              className="text-rose-600 hover:underline"
            >
              Optional ₹50 Donation
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
