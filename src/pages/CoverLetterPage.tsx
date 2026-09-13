import React, { useState } from "react";
import { ResumeData } from "../types";
import {
  Mail,
  Sparkles,
  Download,
  Copy,
} from "lucide-react";

interface CoverLetterPageProps {
  resume: ResumeData;
  onOpenDownload: () => void;
  onToast: (msg: string) => void;
}

export const CoverLetterPage: React.FC<CoverLetterPageProps> = ({
  resume,
  onOpenDownload,
  onToast,
}) => {
  const [jobTitle, setJobTitle] = useState("Software Engineer");
  const [company, setCompany] = useState("Acme Technologies");
  const [jobDesc, setJobDesc] = useState(
    "Looking for a skilled engineer to build reliable web applications and collaborate across teams."
  );
  const [tone, setTone] = useState<"professional" | "enthusiastic" | "concise">("professional");
  const [isGenerating, setIsGenerating] = useState(false);

  const defaultLetter = `Dear Hiring Team at ${company},\n\nI am writing to express my interest in the ${jobTitle} position at ${company}. With background in engineering scalable solutions and collaborating across teams, I am excited about the opportunity to contribute to your goals.\n\nThroughout my experience as a ${resume.personal.jobTitle || "professional"}, I have prioritized quality execution and reliable delivery. My background aligns closely with the objectives outlined for this role at ${company}.\n\nThank you for your time and consideration. I welcome the opportunity to discuss how my experience fits your team's needs.\n\nSincerely,\n${resume.personal.fullName || "Your Full Name"}\n${resume.personal.email || "your.email@example.com"} • ${resume.personal.phone || ""}`;

  const [letterContent, setLetterContent] = useState(defaultLetter);

  const handleGenerateLetter = async (selectedTone = tone) => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/ai/generate-cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume,
          jobTitle,
          company,
          jobDesc,
          tone: selectedTone,
        }),
      });
      const data = await res.json();
      if (data.result) {
        setLetterContent(data.result);
        onToast("✓ Cover letter crafted with AI");
      }
    } catch {
      setLetterContent(
        `Dear Hiring Manager at ${company},\n\nI am excited to apply for the ${jobTitle} role at ${company}. Given your focus on ${jobDesc.slice(0, 50)}..., my background as a ${resume.personal.jobTitle || "professional"} aligns closely with your needs.\n\nBest regards,\n${resume.personal.fullName || "Your Name"}`
      );
      onToast("Generated cover letter draft");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(letterContent);
    onToast("Cover letter copied to clipboard!");
  };

  const handleDownloadText = () => {
    const element = document.createElement("a");
    const file = new Blob([letterContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `Cover_Letter_${company.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    onToast("✓ Cover letter downloaded as text file");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Cover Letter Generator
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Generate targeted cover letters tailored to your target company and job description.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Inputs (Col-5) */}
        <div className="lg:col-span-5 p-5 rounded-lg bg-white border border-gray-200 shadow-sm space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Target Company
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Acme Corp"
              className="w-full px-3 py-2 rounded-md border border-gray-300 text-xs bg-white text-gray-900 focus:border-blue-600 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Target Job Title
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Senior Frontend Developer"
              className="w-full px-3 py-2 rounded-md border border-gray-300 text-xs bg-white text-gray-900 focus:border-blue-600 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Job Description or Keywords
            </label>
            <textarea
              rows={3}
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="Paste key responsibilities or requirements..."
              className="w-full p-2.5 rounded-md border border-gray-300 text-xs bg-white text-gray-900 focus:border-blue-600 outline-none leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Tone of Voice
            </label>
            <div className="grid grid-cols-3 gap-1 p-1 bg-gray-100 rounded-lg">
              {(["professional", "enthusiastic", "concise"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setTone(t);
                    handleGenerateLetter(t);
                  }}
                  className={`py-1.5 rounded text-xs capitalize font-medium transition-colors ${
                    tone === t
                      ? "bg-white text-blue-600 shadow-xs font-semibold"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleGenerateLetter()}
            disabled={isGenerating}
            className="w-full py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Writing Cover Letter...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate with AI</span>
              </>
            )}
          </button>
        </div>

        {/* Right Output Preview (Col-7) */}
        <div className="lg:col-span-7 p-6 rounded-lg bg-white border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <h3 className="font-bold text-sm text-gray-900">
              Cover Letter Preview
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={copyToClipboard}
                className="px-2.5 py-1.5 rounded border border-gray-200 hover:bg-gray-50 text-xs font-medium text-gray-700 flex items-center gap-1 transition-colors"
                title="Copy text"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </button>
              <button
                onClick={handleDownloadText}
                className="px-2.5 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-xs font-medium text-white flex items-center gap-1 transition-colors"
                title="Download text"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .txt</span>
              </button>
            </div>
          </div>

          <textarea
            rows={15}
            value={letterContent}
            onChange={(e) => setLetterContent(e.target.value)}
            className="w-full p-4 rounded-md border border-gray-200 font-serif text-xs sm:text-sm text-gray-800 leading-relaxed outline-none focus:border-blue-600 bg-gray-50/50"
          />
        </div>
      </div>
    </div>
  );
};
