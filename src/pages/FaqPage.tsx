import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search, HelpCircle } from "lucide-react";

interface FaqItem {
  category: "Resume Builder" | "Templates" | "PDF Download" | "ATS" | "AI Assistant" | "Account-Free Usage";
  q: string;
  a: string;
}

const CATEGORIES = [
  "All",
  "Resume Builder",
  "Templates",
  "PDF Download",
  "ATS",
  "AI Assistant",
  "Account-Free Usage",
] as const;

const FAQS: FaqItem[] = [
  {
    category: "ATS",
    q: "Are the resumes ATS-friendly?",
    a: "Yes. Every template is intentionally engineered to parse cleanly in Applicant Tracking Systems (Workday, Greenhouse, Lever, iCIMS, Taleo). We avoid nested background tables, embedded graphic icons inside text streams, and complex multi-layer canvases that confuse parsers. Standard headings, sequential dates, and semantic text hierarchy ensure 100% readability.",
  },
  {
    category: "Account-Free Usage",
    q: "Can I create multiple resumes without an account?",
    a: "Absolutely! You can build as many versions of your resume as you want. All your drafts are saved directly in your browser's local storage. You can switch between resumes, duplicate an existing draft to tailor it for a specific job application, or export backups via Settings.",
  },
  {
    category: "PDF Download",
    q: "Why do I see an ad on free download?",
    a: "To keep Resume Maker 100% free with no subscriptions, credit cards, or hidden paywalls, we display a single, non-intrusive 5-second sponsor message right before your PDF downloads. This modest sponsor support covers our server bandwidth and AI API infrastructure.",
  },
  {
    category: "PDF Download",
    q: "Can I skip the ad by donating?",
    a: "Yes! If you choose to support Resume Maker with an optional donation (starting at ₹50), you bypass the sponsor ad entirely and receive an instant, 1-click download immediately. Donations are completely optional and never forced.",
  },
  {
    category: "Account-Free Usage",
    q: "Is my data saved if I close the browser?",
    a: "Yes, your resume content is automatically saved in real-time to your browser's localStorage. When you return to the site, your work is exactly as you left it. To ensure you never lose your data when clearing browser cache or changing computers, you can export your resumes as a JSON file from the Settings page anytime.",
  },
  {
    category: "AI Assistant",
    q: "Does the AI write my resume?",
    a: "The AI Assistant is designed as an intelligent co-pilot rather than a robotic ghostwriter. It helps you rewrite bullet points using active action verbs and quantifiable metrics, polish your professional summary, and suggest relevant industry keywords. You always retain complete control and final approval over every word.",
  },
  {
    category: "Resume Builder",
    q: "Can I customize fonts, colors, and section order?",
    a: "Yes! The builder includes full controls for typography pairing, accent color palettes, margins, and line spacing. You can also easily reorder sections (e.g., putting Skills or Projects above Education) with intuitive drag-and-drop or order arrows.",
  },
  {
    category: "Templates",
    q: "Can I switch templates without losing my entered information?",
    a: "Yes. Your resume data is completely decoupled from visual styling. You can switch between Modern, Minimal, Executive, Academic, and Technical templates with a single click, and all your content will adapt seamlessly.",
  },
  {
    category: "PDF Download",
    q: "Will there be any watermarks on my downloaded resume?",
    a: "Never. All downloaded resumes are high-resolution, unwatermarked, professional PDF documents ready to submit directly to hiring managers and job application portals.",
  },
];

export const FaqPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = FAQS.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Knowledge Base</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Clear, transparent answers about how Resume Maker works, ATS formatting, privacy, and our download model.
        </p>
      </div>

      {/* Search Input */}
      <div className="max-w-md mx-auto relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search question or topic..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-white text-xs sm:text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-2xs"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setOpenIndex(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? "bg-blue-600 text-white shadow-2xs"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion Items */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-gray-200 text-xs text-gray-500">
            No matching questions found. Try searching for another topic.
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-4.5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-500">
                      {faq.category}
                    </span>
                    <span>{faq.q}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4.5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Help Banner */}
      <div className="p-6 rounded-xl bg-blue-50/70 border border-blue-200 text-center space-y-2">
        <h4 className="text-sm font-bold text-gray-900">Still have questions?</h4>
        <p className="text-xs text-gray-600 max-w-md mx-auto">
          We're constantly improving Resume Maker. All features, tools, and PDF downloads remain 100% free with no account necessary.
        </p>
      </div>
    </div>
  );
};
