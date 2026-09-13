import React from "react";
import { ResumeData } from "../types";
import {
  FileText,
  Plus,
  Trash2,
  Copy,
  Download,
  Calendar,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface MyResumesPageProps {
  resumes: ResumeData[];
  activeResumeId: string;
  onSelectResume: (id: string) => void;
  onDeleteResume: (id: string) => void;
  onDuplicateResume: (id: string) => void;
  onCreateNew: () => void;
  onDownloadResume: (resume: ResumeData) => void;
}

export const MyResumesPage: React.FC<MyResumesPageProps> = ({
  resumes,
  activeResumeId,
  onSelectResume,
  onDeleteResume,
  onDuplicateResume,
  onCreateNew,
  onDownloadResume,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            My Saved Resumes
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            Your drafts are automatically saved to your browser local storage.
          </p>
        </div>

        <button
          onClick={onCreateNew}
          className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>New Resume</span>
        </button>
      </div>

      {/* Local Storage Privacy Banner */}
      <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-200 flex items-center gap-3 text-xs text-gray-600">
        <ShieldCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
        <span>
          <strong>Private Device Storage:</strong> No account required. All resume drafts remain strictly within your browser. You can export a JSON backup anytime in Settings.
        </span>
      </div>

      {/* Resume Grid */}
      {resumes.length === 0 ? (
        <div className="p-12 text-center rounded-lg border border-dashed border-gray-300 bg-white space-y-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center mx-auto">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900">No resumes found</h3>
            <p className="text-xs text-gray-500 mt-0.5">Get started by creating your first resume draft.</p>
          </div>
          <button
            onClick={onCreateNew}
            className="px-4 py-1.5 rounded-md bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors"
          >
            Create Resume Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {resumes.map((res) => {
            const isActive = res.id === activeResumeId;
            return (
              <div
                key={res.id}
                className={`rounded-lg border bg-white p-5 flex flex-col justify-between space-y-4 transition-colors ${
                  isActive
                    ? "border-blue-600 ring-1 ring-blue-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-gray-100 text-gray-700">
                      {res.templateId}
                    </span>
                    {isActive && (
                      <span className="text-[11px] font-semibold text-green-700">
                        • Currently Active
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 truncate">
                    {res.title || res.personal.fullName || "Untitled Resume"}
                  </h3>
                  <p className="text-xs text-gray-500 truncate">
                    {res.personal.jobTitle || "No role specified"}
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-gray-400 pt-1">
                    <Calendar className="w-3 h-3" />
                    <span>Updated {new Date(res.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-1.5">
                  <button
                    onClick={() => onSelectResume(res.id)}
                    className="flex-1 py-1.5 px-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Edit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDuplicateResume(res.id)}
                    className="p-1.5 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50"
                    title="Duplicate draft"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDownloadResume(res)}
                    className="p-1.5 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50"
                    title="Download A4 PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteResume(res.id)}
                    className="p-1.5 rounded-md border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-300"
                    title="Delete draft"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
