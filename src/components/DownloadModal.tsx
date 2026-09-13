import React, { useState, useCallback } from "react";
import { ResumeData, SponsorAdConfig } from "../types";
import { SponsorAdSlot, defaultSponsorAdConfig } from "./SponsorAdSlot";
import { downloadResumePDF, printResume } from "../utils/exportPdf";
import { ResumePreview } from "./ResumePreview";
import { UpiPaymentFlow } from "./UpiPaymentFlow";
import {
  X,
  Heart,
  Download,
  ArrowRight,
  Printer,
  FileCheck,
  Smartphone,
} from "lucide-react";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: ResumeData;
  onToast: (msg: string) => void;
  sponsorConfig?: SponsorAdConfig;
}

type ModalStage = "options" | "donate-form" | "sponsor-ad" | "downloading";

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  resume,
  onToast,
  sponsorConfig = defaultSponsorAdConfig,
}) => {
  const [stage, setStage] = useState<ModalStage>("options");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleReset = useCallback(() => {
    setStage("options");
    setIsGeneratingPdf(false);
    onClose();
  }, [onClose]);

  const triggerDownload = useCallback(
    async (donated: boolean) => {
      setStage("downloading");
      setIsGeneratingPdf(true);

      try {
        // Small pause to ensure offscreen A4 container is rendered
        await new Promise((resolve) => setTimeout(resolve, 200));
        const success = await downloadResumePDF(resume);

        if (success) {
          onToast("✓ PDF downloaded successfully (.pdf)");
        } else {
          onToast("✓ Opened print dialog for PDF export");
        }

        if (donated) {
          setTimeout(() => {
            onToast("Thank you for supporting Resume Maker! ❤️");
          }, 800);
        }
      } catch (err) {
        console.error("Download error:", err);
        onToast("Unable to generate PDF directly, opening browser print dialog");
        printResume();
      } finally {
        setIsGeneratingPdf(false);
        handleReset();
      }
    },
    [resume, onToast, handleReset]
  );

  const handleAdComplete = useCallback(() => {
    triggerDownload(false);
  }, [triggerDownload]);

  const handleStartFreeDownload = () => {
    if (!sponsorConfig.enabled) {
      triggerDownload(false);
    } else {
      setStage("sponsor-ad");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="download-modal-backdrop"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs"
    >
      {/* Hidden offscreen container specifically for crisp 1:1 scale PDF export */}
      <div
        className="fixed -left-[9999px] top-0 pointer-events-none opacity-0 z-[-1]"
        aria-hidden="true"
      >
        <ResumePreview
          resume={resume}
          scale={1}
          isPrintMode={true}
          elementId="download-modal-a4-pdf-target"
        />
      </div>

      <div
        id="download-modal-panel"
        className="relative w-full max-w-xl bg-white rounded-t-2xl sm:rounded-xl border border-gray-200 shadow-xl p-6 sm:p-8 space-y-6 max-h-[92vh] sm:max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          id="close-download-modal-btn"
          onClick={handleReset}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1 pr-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold mb-1">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Ready for Export (.PDF Format)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Download Your Resume PDF
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Standard A4 size PDF, 100% free and ATS-parseable.
          </p>
        </div>

        {/* Options Stage */}
        {stage === "options" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: Support via QR / UPI */}
              <div
                id="donate-option-card"
                className="p-5 rounded-xl border border-rose-200 bg-linear-to-b from-rose-50/40 to-white flex flex-col justify-between space-y-4 hover:border-rose-300 hover:shadow-xs transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-wider">
                    <Heart className="w-4 h-4 fill-rose-500" />
                    <span>Support with UPI / QR (₹50)</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Scan ZapPay QR code with GPay, PhonePe, or Paytm to skip ads and download your high-res PDF instantly.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    id="donate-and-download-btn"
                    onClick={() => setStage("donate-form")}
                    className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Scan QR to Pay & Download PDF</span>
                  </button>
                </div>
              </div>

              {/* Card 2: Free Download */}
              <div
                id="free-option-card"
                className="p-5 rounded-xl border border-gray-200 bg-white flex flex-col justify-between space-y-4 hover:border-blue-300 hover:shadow-xs transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider">
                    <Download className="w-4 h-4" />
                    <span>100% Free Download</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Watch a short sponsor message, then your PDF download starts automatically.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    id="continue-free-download-btn"
                    onClick={handleStartFreeDownload}
                    className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span>Download PDF Free</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Browser Print Option */}
            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  handleReset();
                  setTimeout(() => printResume(), 200);
                }}
                className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1.5 transition-colors py-1 px-2 rounded hover:bg-gray-100"
              >
                <Printer className="w-3.5 h-3.5 text-gray-400" />
                <span>Or open browser Print dialog (Save as PDF)</span>
              </button>
            </div>
          </div>
        )}

        {/* Stage: UPI Donate Flow */}
        {stage === "donate-form" && (
          <UpiPaymentFlow
            initialAmount={50}
            onPaymentSuccess={() => triggerDownload(true)}
            onCancel={() => setStage("options")}
            onToast={onToast}
          />
        )}

        {/* Stage: Sponsor Ad */}
        {stage === "sponsor-ad" && (
          <div className="space-y-3">
            <SponsorAdSlot
              config={sponsorConfig}
              onAdComplete={handleAdComplete}
            />
          </div>
        )}

        {/* Stage: Downloading auto-trigger state */}
        {stage === "downloading" && (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto animate-pulse">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">
                Generating your PDF document...
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Your A4 resume is being formatted and exported as a <strong>.pdf</strong> file.
              </p>
            </div>
            <div className="w-36 h-1.5 bg-gray-100 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full animate-pulse w-3/4"></div>
            </div>
          </div>
        )}

        {/* Note on honesty and equality */}
        <div className="pt-3 border-t border-gray-100 text-center text-[11px] text-gray-400">
          Downloads directly as a standard <strong>.pdf</strong> document. No account or email needed.
        </div>
      </div>
    </div>
  );
};
