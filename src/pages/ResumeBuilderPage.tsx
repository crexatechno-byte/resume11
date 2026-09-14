import React, { useState } from "react";
import { ResumeData } from "../types";
import { TEMPLATES } from "../data/templates";
import { ResumePreview } from "../components/ResumePreview";
import { ResumeFormSections } from "../components/ResumeFormSections";
import { ResumeCustomizer } from "../components/ResumeCustomizer";
import { AtsOptimizerPanel } from "../components/AtsOptimizerPanel";
import { sampleResumeData } from "../data/sampleResume";
import { AdBanner160x300 } from "../components/AdBanner160x300";
import { SMART_LINK_URL } from "../config/ads";
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Code,
  FolderGit2,
  Award,
  Globe,
  Trophy,
  Heart,
  Users,
  Download,
  Eye,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Trash2,
  RefreshCw,
  CheckCircle2,
  Save,
  Share2,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface ResumeBuilderPageProps {
  resume: ResumeData;
  onChange: (updater: (prev: ResumeData) => ResumeData) => void;
  onOpenDownload: () => void;
  onToast: (msg: string) => void;
  onSaveToLocalStorage: () => void;
}

const SECTIONS = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "summary", label: "Summary", icon: FileText },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Code },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "languages", label: "Languages", icon: Globe },
  { id: "awards", label: "Awards", icon: Trophy },
  { id: "interests", label: "Interests", icon: Heart },
  { id: "references", label: "References", icon: Users },
];

export const ResumeBuilderPage: React.FC<ResumeBuilderPageProps> = ({
  resume,
  onChange,
  onOpenDownload,
  onToast,
  onSaveToLocalStorage,
}) => {
  const [activeTab, setActiveTab] = useState<string>("personal");
  const [builderMode, setBuilderMode] = useState<"sections" | "design" | "ats">("sections");
  const [previewScale, setPreviewScale] = useState<number>(0.85);
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit");
  const [fullScreenPreview, setFullScreenPreview] = useState(false);

  // Calculate completion percentage
  const calculateCompletion = () => {
    let filled = 0;
    if (resume.personal.fullName) filled++;
    if (resume.personal.email) filled++;
    if (resume.personal.summary) filled++;
    if (resume.experiences.length > 0) filled++;
    if (resume.educations.length > 0) filled++;
    if (resume.skills.length > 0) filled++;
    if (resume.projects.length > 0) filled++;
    return Math.round((filled / 7) * 100);
  };

  const completionPercent = calculateCompletion();

  // Section check helper
  const isSectionFilled = (secId: string) => {
    switch (secId) {
      case "personal":
        return Boolean(resume.personal.fullName && resume.personal.email);
      case "summary":
        return Boolean(resume.personal.summary);
      case "experience":
        return resume.experiences.length > 0;
      case "education":
        return resume.educations.length > 0;
      case "skills":
        return resume.skills.length > 0;
      case "projects":
        return resume.projects.length > 0;
      case "certifications":
        return resume.certifications.length > 0;
      case "languages":
        return resume.languages.length > 0;
      case "awards":
        return resume.awards.length > 0;
      case "interests":
        return resume.interests.length > 0;
      case "references":
        return resume.references.length > 0;
      default:
        return false;
    }
  };

  const currentSectionIndex = SECTIONS.findIndex((s) => s.id === activeTab);

  const goToNextSection = () => {
    if (currentSectionIndex < SECTIONS.length - 1) {
      setActiveTab(SECTIONS[currentSectionIndex + 1].id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPrevSection = () => {
    if (currentSectionIndex > 0) {
      setActiveTab(SECTIONS[currentSectionIndex - 1].id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLoadSample = () => {
    if (window.confirm("Load sample resume data? This will overwrite current entries.")) {
      onChange(() => ({
        ...sampleResumeData,
        id: resume.id,
        updatedAt: new Date().toISOString(),
      }));
      onToast("Loaded sample resume data");
    }
  };

  const handleClear = () => {
    if (window.confirm("Clear resume fields to start from a blank canvas?")) {
      onChange((prev) => ({
        ...prev,
        personal: {
          fullName: "",
          jobTitle: "",
          email: "",
          phone: "",
          location: "",
          website: "",
          linkedin: "",
          github: "",
          summary: "",
        },
        experiences: [],
        educations: [],
        skills: [],
        projects: [],
        certifications: [],
        languages: [],
        awards: [],
        interests: [],
        references: [],
      }));
      onToast("Reset form to blank canvas");
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      onToast("✓ Resume link copied to clipboard");
    } else {
      onToast("Link ready to share");
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 py-4 space-y-4">
      {/* Top Bar for Builder: Template dropdown & Top action buttons (Save, Preview, Download, Share) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 sm:p-4 rounded-xl bg-white border border-gray-200">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Mobile Edit / Preview Toggle */}
          <div className="flex md:hidden bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
            <button
              onClick={() => setMobileView("edit")}
              className={`flex-1 py-1.5 px-3 rounded text-xs font-semibold ${
                mobileView === "edit"
                  ? "bg-white text-gray-900 shadow-xs"
                  : "text-gray-500"
              }`}
            >
              Edit Form
            </button>
            <button
              onClick={() => setMobileView("preview")}
              className={`flex-1 py-1.5 px-3 rounded text-xs font-semibold ${
                mobileView === "preview"
                  ? "bg-white text-gray-900 shadow-xs"
                  : "text-gray-500"
              }`}
            >
              Live Preview
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500">Template:</span>
            <select
              value={resume.templateId}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  templateId: e.target.value as any,
                }))
              }
              className="text-xs font-medium px-2.5 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-800"
            >
              {TEMPLATES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Top Buttons: Save, Preview, Download, Share */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
          <button
            type="button"
            onClick={onSaveToLocalStorage}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 flex items-center gap-1.5 transition-colors"
            title="Save draft to device"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save</span>
          </button>

          <button
            type="button"
            onClick={() => setFullScreenPreview(true)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 flex items-center gap-1.5 transition-colors"
            title="Preview full screen"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 flex items-center gap-1.5 transition-colors"
            title="Share resume link"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>

          <button
            type="button"
            onClick={handleLoadSample}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            title="Load sample content"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"
            title="Clear form"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <a
            href={SMART_LINK_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="builder-smart-link-btn"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-amber-900 bg-linear-to-r from-amber-200 to-orange-200 hover:from-amber-300 hover:to-orange-300 border border-amber-300 transition-all shadow-2xs group"
            title="Exclusive Partner Job Deals & Fast-Track Hiring"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-800 animate-pulse" />
            <span>Partner Deals</span>
            <ExternalLink className="w-3 h-3 text-amber-800 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <button
            id="builder-download-resume-btn"
            onClick={onOpenDownload}
            className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* 3-COLUMN MAIN LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        {/* COLUMN 1: SIDEBAR SECTION NAV (Col-3 on Desktop) */}
        <div className="hidden md:block md:col-span-3 space-y-4 sticky top-20">
          <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-4 shadow-sm">
            {/* Completion Meter: flat progress bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
                <span>Resume {completionPercent}% complete</span>
                <span className="text-blue-600 font-bold">{completionPercent}%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
            </div>

            {/* Mode Switcher: Sections vs Design vs ATS */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setBuilderMode("sections")}
                className={`py-1.5 rounded text-xs font-semibold transition-colors ${
                  builderMode === "sections"
                    ? "bg-white text-blue-600 shadow-xs"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Sections
              </button>
              <button
                onClick={() => setBuilderMode("design")}
                className={`py-1.5 rounded text-xs font-semibold transition-colors ${
                  builderMode === "design"
                    ? "bg-white text-blue-600 shadow-xs"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Style
              </button>
              <button
                onClick={() => setBuilderMode("ats")}
                className={`py-1.5 rounded text-xs font-semibold transition-colors ${
                  builderMode === "ats"
                    ? "bg-white text-blue-600 shadow-xs"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                ATS Check
              </button>
            </div>

            {/* List of 11 Sections */}
            {builderMode === "sections" && (
              <div className="space-y-1">
                {SECTIONS.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeTab === sec.id;
                  const isDone = isSectionFilled(sec.id);
                  return (
                    <button
                      key={sec.id}
                      onClick={() => setActiveTab(sec.id)}
                      className={`w-full px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-3.5 h-3.5 text-gray-500" />
                        <span>{sec.label}</span>
                      </div>
                      {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sponsored 160x300 Ad Banner */}
          <div className="pt-2 flex justify-center">
            <AdBanner160x300 />
          </div>
        </div>

        {/* COLUMN 2: FORM CONTENT AREA (Col-4 on Desktop) */}
        <div
          className={`md:col-span-4 ${
            mobileView === "edit" ? "block" : "hidden md:block"
          }`}
        >
          <div className="p-5 sm:p-6 rounded-xl bg-white border border-gray-200 shadow-sm space-y-6">
            {builderMode === "sections" && (
              <>
                <ResumeFormSections
                  resume={resume}
                  onChange={onChange}
                  activeSection={activeTab}
                  onToast={onToast}
                />

                {/* Previous & Next Section Navigation */}
                <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
                  <button
                    type="button"
                    disabled={currentSectionIndex === 0}
                    onClick={goToPrevSection}
                    className="px-3.5 py-2 rounded-lg border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-30 transition-colors flex items-center gap-1.5"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>

                  <span className="text-xs text-gray-400">
                    Step {currentSectionIndex + 1} of {SECTIONS.length}
                  </span>

                  <button
                    type="button"
                    disabled={currentSectionIndex === SECTIONS.length - 1}
                    onClick={goToNextSection}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 disabled:opacity-30 transition-colors flex items-center gap-1.5"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            )}

            {builderMode === "design" && (
              <ResumeCustomizer resume={resume} onChange={onChange} />
            )}

            {builderMode === "ats" && (
              <AtsOptimizerPanel
                resume={resume}
                onChange={onChange}
                onToast={onToast}
              />
            )}
          </div>
        </div>

        {/* COLUMN 3: LIVE RESUME PREVIEW (Col-5 on Desktop) */}
        <div
          className={`md:col-span-5 ${
            mobileView === "preview" ? "block" : "hidden md:block"
          }`}
        >
          <div className="sticky top-20 space-y-3">
            {/* Preview Controls: Zoom In, Zoom Out, Full Screen, Page View */}
            <div className="p-2.5 rounded-lg bg-white border border-gray-200 flex items-center justify-between text-xs text-gray-600">
              <span className="font-semibold text-gray-900 px-2">
                Page View (A4)
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setPreviewScale((s) => Math.max(0.5, s - 0.05))}
                  className="p-1 rounded hover:bg-gray-100 text-gray-500"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono px-1">
                  {Math.round(previewScale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setPreviewScale((s) => Math.min(1.2, s + 0.05))}
                  className="p-1 rounded hover:bg-gray-100 text-gray-500"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewScale(0.85)}
                  className="p-1 rounded hover:bg-gray-100 text-gray-500"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
                <div className="h-4 w-px bg-gray-200 mx-1" />
                <button
                  type="button"
                  onClick={() => setFullScreenPreview(true)}
                  className="p-1 rounded hover:bg-gray-100 text-gray-500"
                  title="Full Screen Preview"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* A4 Canvas */}
            <div className="rounded-xl border border-gray-200 bg-gray-100 p-4 overflow-auto max-h-[80vh] flex justify-center">
              <ResumePreview resume={resume} scale={previewScale} />
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN PREVIEW MODAL */}
      {fullScreenPreview && (
        <div className="fixed inset-0 z-50 bg-black/60 p-4 sm:p-8 flex flex-col items-center justify-start overflow-y-auto">
          <div className="w-full max-w-4xl flex items-center justify-between pb-4">
            <h3 className="text-white font-bold text-lg">Full Screen Resume Preview</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenDownload}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
              <button
                onClick={() => setFullScreenPreview(false)}
                className="px-3 py-1.5 rounded-lg bg-gray-800 text-gray-200 text-xs font-semibold hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
          <div className="bg-transparent pb-12">
            <ResumePreview resume={resume} scale={1} />
          </div>
        </div>
      )}
    </div>
  );
};
