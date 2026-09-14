import React, { useState } from "react";
import { ActivePage } from "../types";
import {
  FileText,
  LayoutGrid,
  Sparkles,
  FolderKanban,
  Settings,
  Mail,
  HelpCircle,
  Heart,
  Menu,
  X,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { SMART_LINK_URL } from "../config/ads";

interface NavbarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  onStartResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onStartResume,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const handleNav = (p: ActivePage) => {
    onNavigate(p);
    setMobileMenuOpen(false);
    setResourcesOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo + "Resume Maker" brand name */}
        <div
          id="brand-logo"
          onClick={() => handleNav("landing")}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg text-gray-900 tracking-tight flex items-center gap-1.5">
            Resume Maker
            <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              Free
            </span>
          </span>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => handleNav("templates")}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              activePage === "templates"
                ? "bg-gray-100 text-blue-600"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            Templates
          </button>

          <button
            onClick={() => handleNav("builder")}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              activePage === "builder"
                ? "bg-gray-100 text-blue-600"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            Resume Builder
          </button>

          <button
            onClick={() => {
              handleNav("landing");
              setTimeout(() => {
                const el = document.getElementById("features-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            Features
          </button>

          <button
            onClick={() => handleNav("my-resumes")}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              activePage === "my-resumes"
                ? "bg-gray-100 text-blue-600"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            My Resumes
          </button>

          {/* Resources Dropdown */}
          <div className="relative">
            <button
              onClick={() => setResourcesOpen(!resourcesOpen)}
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-1"
            >
              <span>Resources</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${resourcesOpen ? "rotate-180" : ""}`} />
            </button>

            {resourcesOpen && (
              <div className="absolute right-0 mt-1 w-48 rounded-lg bg-white border border-gray-200 shadow-sm py-1.5 z-50">
                <button
                  onClick={() => handleNav("ai-assistant")}
                  className="w-full px-4 py-2 text-left text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>AI Writing Assistant</span>
                </button>
                <button
                  onClick={() => handleNav("cover-letter")}
                  className="w-full px-4 py-2 text-left text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>Cover Letter Builder</span>
                </button>
                <button
                  onClick={() => handleNav("help")}
                  className="w-full px-4 py-2 text-left text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                  <span>Help & FAQ</span>
                </button>
                <button
                  onClick={() => handleNav("settings")}
                  className="w-full px-4 py-2 text-left text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Settings className="w-3.5 h-3.5 text-gray-400" />
                  <span>Resume Settings</span>
                </button>
                <div className="border-t border-gray-100 my-1" />
                <button
                  onClick={() => handleNav("support-us")}
                  className="w-full px-4 py-2 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-500" />
                  <span>Support Project (₹50)</span>
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Right: Create Resume CTA + Smart Link Sponsor Button */}
        <div className="flex items-center gap-2.5">
          <a
            href={SMART_LINK_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-smart-link-btn"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-900 bg-linear-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 border border-amber-300 transition-all shadow-2xs group"
            title="Explore Exclusive Partner Perks and Career Deals"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="font-semibold">Special Offers</span>
            <ExternalLink className="w-3 h-3 text-amber-700 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <button
            id="nav-create-resume-cta"
            onClick={onStartResume}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors"
          >
            Create Resume
          </button>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden rounded-lg text-gray-600 hover:bg-gray-100"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-5 space-y-1">
          <button
            onClick={() => handleNav("templates")}
            className={`w-full px-3 py-2 rounded-lg text-sm font-medium text-left flex items-center gap-2 ${
              activePage === "templates" ? "bg-gray-100 text-blue-600" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Templates</span>
          </button>
          <button
            onClick={() => handleNav("builder")}
            className={`w-full px-3 py-2 rounded-lg text-sm font-medium text-left flex items-center gap-2 ${
              activePage === "builder" ? "bg-gray-100 text-blue-600" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Resume Builder</span>
          </button>
          <button
            onClick={() => handleNav("my-resumes")}
            className={`w-full px-3 py-2 rounded-lg text-sm font-medium text-left flex items-center gap-2 ${
              activePage === "my-resumes" ? "bg-gray-100 text-blue-600" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>My Resumes</span>
          </button>
          <button
            onClick={() => handleNav("ai-assistant")}
            className="w-full px-3 py-2 rounded-lg text-sm font-medium text-left flex items-center gap-2 text-gray-700 hover:bg-gray-50"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>AI Assistant</span>
          </button>
          <button
            onClick={() => handleNav("cover-letter")}
            className="w-full px-3 py-2 rounded-lg text-sm font-medium text-left flex items-center gap-2 text-gray-700 hover:bg-gray-50"
          >
            <Mail className="w-4 h-4 text-blue-600" />
            <span>Cover Letter</span>
          </button>
          <button
            onClick={() => handleNav("help")}
            className="w-full px-3 py-2 rounded-lg text-sm font-medium text-left flex items-center gap-2 text-gray-700 hover:bg-gray-50"
          >
            <HelpCircle className="w-4 h-4 text-gray-400" />
            <span>Help & FAQ</span>
          </button>
          <button
            onClick={() => handleNav("settings")}
            className="w-full px-3 py-2 rounded-lg text-sm font-medium text-left flex items-center gap-2 text-gray-700 hover:bg-gray-50"
          >
            <Settings className="w-4 h-4 text-gray-400" />
            <span>Settings</span>
          </button>
          <button
            onClick={() => handleNav("support-us")}
            className="w-full px-3 py-2 rounded-lg text-sm font-medium text-left flex items-center gap-2 text-rose-600 hover:bg-rose-50"
          >
            <Heart className="w-4 h-4 fill-rose-500" />
            <span>Support Us (₹50)</span>
          </button>

          <a
            href={SMART_LINK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-3 py-2.5 rounded-lg text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 flex items-center justify-between hover:bg-amber-100 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Special Offers & Partner Deals</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-700" />
          </a>

          <div className="pt-2">
            <button
              onClick={() => {
                onStartResume();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 text-center"
            >
              Create Resume — Free
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
