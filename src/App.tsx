import React, { useState, useEffect } from "react";
import { ActivePage, ResumeData, TemplateDefinition } from "./types";
import { sampleResumeData } from "./data/sampleResume";
import { TEMPLATES } from "./data/templates";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { DownloadModal } from "./components/DownloadModal";
import { ResumePreview } from "./components/ResumePreview";
import { LandingPage } from "./pages/LandingPage";
import { TemplateGalleryPage } from "./pages/TemplateGalleryPage";
import { ResumeBuilderPage } from "./pages/ResumeBuilderPage";
import { MyResumesPage } from "./pages/MyResumesPage";
import { AiAssistantPage } from "./pages/AiAssistantPage";
import { CoverLetterPage } from "./pages/CoverLetterPage";
import { ResumeSettingsPage } from "./pages/ResumeSettingsPage";
import { FaqPage } from "./pages/FaqPage";
import { ContactPage } from "./pages/ContactPage";
import { SupportUsPage } from "./pages/SupportUsPage";
import { PrivacyPolicyPage, TermsPage } from "./pages/LegalPages";
import { X, ArrowRight } from "lucide-react";

const STORAGE_KEY_RESUMES = "resume_maker_resumes_v1";
const STORAGE_KEY_ACTIVE_ID = "resume_maker_active_id_v1";

export default function App() {
  // Resumes list state
  const [resumes, setResumes] = useState<ResumeData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RESUMES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // safe fallback
    }
    return [sampleResumeData];
  });

  // Active Resume ID
  const [activeResumeId, setActiveResumeId] = useState<string>(() => {
    const savedId = localStorage.getItem(STORAGE_KEY_ACTIVE_ID);
    if (savedId) return savedId;
    return sampleResumeData.id;
  });

  // Active Navigation Page
  const [activePage, setActivePage] = useState<ActivePage>("landing");

  // Download Modal State
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);
  const [resumeToDownload, setResumeToDownload] = useState<ResumeData | null>(null);

  // Template Preview Modal State
  const [previewTemplate, setPreviewTemplate] = useState<TemplateDefinition | null>(null);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Enforce single clean light theme
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  // Persist Resumes to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_RESUMES, JSON.stringify(resumes));
    } catch {
      // safe fallback
    }
  }, [resumes]);

  // Persist Active Resume ID
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ACTIVE_ID, activeResumeId);
  }, [activeResumeId]);

  // Find active resume or fallback
  const currentResume: ResumeData =
    resumes.find((r) => r.id === activeResumeId) || resumes[0] || sampleResumeData;

  // Toast Trigger
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3000);
  };

  // Resume Update Handler
  const handleUpdateResume = (updater: (prev: ResumeData) => ResumeData) => {
    setResumes((prevResumes) =>
      prevResumes.map((r) => {
        if (r.id === activeResumeId) {
          const updated = updater(r);
          return { ...updated, updatedAt: new Date().toISOString() };
        }
        return r;
      })
    );
  };

  // Create New Empty Resume
  const handleCreateNewResume = () => {
    const newId = `resume-${Date.now()}`;
    const newResume: ResumeData = {
      id: newId,
      title: "New Professional Resume",
      templateId: "modern-clean",
      updatedAt: new Date().toISOString(),
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
      customization: {
        font: "Inter",
        fontSize: "base",
        headingSize: "base",
        lineSpacing: "normal",
        primaryColor: "#2563EB",
        layout: "single-column",
        showPhoto: false,
        sectionOrder: ["personal", "summary", "experience", "education", "skills", "projects"],
      },
    };

    setResumes((prev) => [newResume, ...prev]);
    setActiveResumeId(newId);
    setActivePage("builder");
    showToast("✓ Created new blank resume draft");
  };

  // Duplicate Resume
  const handleDuplicateResume = (id: string) => {
    const target = resumes.find((r) => r.id === id);
    if (!target) return;
    const duplicated: ResumeData = {
      ...JSON.parse(JSON.stringify(target)),
      id: `resume-${Date.now()}`,
      title: `${target.title} (Copy)`,
      updatedAt: new Date().toISOString(),
    };
    setResumes((prev) => [duplicated, ...prev]);
    setActiveResumeId(duplicated.id);
    showToast(`✓ Duplicated "${target.title}"`);
  };

  // Delete Resume
  const handleDeleteResume = (id: string) => {
    if (resumes.length <= 1) {
      showToast("Cannot delete the only resume. Clear fields instead.");
      return;
    }
    setResumes((prev) => prev.filter((r) => r.id !== id));
    if (activeResumeId === id) {
      const remaining = resumes.filter((r) => r.id !== id);
      setActiveResumeId(remaining[0].id);
    }
    showToast("Resume deleted");
  };

  // Select Template & Open Builder
  const handleSelectTemplate = (templateId: string) => {
    handleUpdateResume((prev) => ({
      ...prev,
      templateId: templateId as any,
      customization: {
        ...prev.customization,
        primaryColor: TEMPLATES.find((t) => t.id === templateId)?.primaryColor || prev.customization.primaryColor,
      },
    }));
    setActivePage("builder");
    setPreviewTemplate(null);
    showToast(`Switched to "${TEMPLATES.find((t) => t.id === templateId)?.name}" template`);
  };

  // Trigger download modal for a specific or current resume
  const handleOpenDownload = (targetResume?: ResumeData) => {
    setResumeToDownload(targetResume || currentResume);
    setIsDownloadModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Global Navbar */}
      <Navbar
        activePage={activePage}
        onNavigate={(p) => {
          setActivePage(p);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onStartResume={() => {
          setActivePage("builder");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activePage === "landing" && (
          <LandingPage
            onNavigate={(p) => {
              setActivePage(p);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onSelectTemplate={handleSelectTemplate}
            onPreviewTemplate={(tpl) => setPreviewTemplate(tpl)}
            onStartBuilder={() => setActivePage("builder")}
            onToast={showToast}
          />
        )}

        {activePage === "templates" && (
          <TemplateGalleryPage
            onSelectTemplate={handleSelectTemplate}
            onPreviewTemplate={(tpl) => setPreviewTemplate(tpl)}
          />
        )}

        {activePage === "builder" && (
          <ResumeBuilderPage
            resume={currentResume}
            onChange={handleUpdateResume}
            onOpenDownload={() => handleOpenDownload(currentResume)}
            onToast={showToast}
            onSaveToLocalStorage={() => showToast("✓ Resume saved")}
          />
        )}

        {activePage === "my-resumes" && (
          <MyResumesPage
            resumes={resumes}
            activeResumeId={activeResumeId}
            onSelectResume={(id) => {
              setActiveResumeId(id);
              setActivePage("builder");
            }}
            onDeleteResume={handleDeleteResume}
            onDuplicateResume={handleDuplicateResume}
            onCreateNew={handleCreateNewResume}
            onDownloadResume={(r) => handleOpenDownload(r)}
          />
        )}

        {activePage === "ai-assistant" && (
          <AiAssistantPage
            resume={currentResume}
            onChange={handleUpdateResume}
            onToast={showToast}
            onNavigateToBuilder={() => setActivePage("builder")}
          />
        )}

        {activePage === "cover-letter" && (
          <CoverLetterPage
            resume={currentResume}
            onOpenDownload={() => handleOpenDownload(currentResume)}
            onToast={showToast}
          />
        )}

        {activePage === "settings" && (
          <ResumeSettingsPage
            resume={currentResume}
            resumes={resumes}
            onChange={handleUpdateResume}
            onRestoreResumes={(restored) => {
              setResumes(restored);
              if (restored.length > 0) setActiveResumeId(restored[0].id);
            }}
            onClearAll={() => {
              setResumes([sampleResumeData]);
              setActiveResumeId(sampleResumeData.id);
            }}
            onToast={showToast}
          />
        )}

        {activePage === "help" && <FaqPage />}
        {activePage === "contact" && <ContactPage onToast={showToast} />}
        {activePage === "support-us" && <SupportUsPage onToast={showToast} />}
        {activePage === "privacy" && <PrivacyPolicyPage />}
        {activePage === "terms" && <TermsPage />}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={(p) => {
          setActivePage(p);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* Download Modal (Donate vs Free Sponsor Ad Flow) */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => {
          setIsDownloadModalOpen(false);
          setResumeToDownload(null);
        }}
        resume={resumeToDownload || currentResume}
        onToast={showToast}
      />

      {/* Template Full-Screen Preview Modal (from Gallery) */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-black/60 p-4 sm:p-8 flex flex-col items-center justify-start overflow-y-auto">
          <div className="w-full max-w-4xl flex items-center justify-between pb-4">
            <div>
              <h3 className="text-white font-bold text-lg">{previewTemplate.name}</h3>
              <p className="text-xs text-gray-300">{previewTemplate.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleSelectTemplate(previewTemplate.id)}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5"
              >
                <span>Use This Template</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="bg-transparent pb-12">
            <ResumePreview
              resume={{
                ...sampleResumeData,
                templateId: previewTemplate.id,
                customization: {
                  ...sampleResumeData.customization,
                  primaryColor: previewTemplate.primaryColor,
                  layout: previewTemplate.layout as any,
                },
              }}
              scale={0.95}
            />
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-2.5 rounded-lg shadow-md border border-gray-800 text-xs font-medium flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
