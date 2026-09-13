import React, { useRef } from "react";
import { ResumeData } from "../types";
import { exportAllDataJSON, importAllDataJSON } from "../utils/exportPdf";
import {
  Download,
  Upload,
  Trash2,
  HardDrive,
  Type,
} from "lucide-react";

interface ResumeSettingsPageProps {
  resume: ResumeData;
  resumes: ResumeData[];
  onChange: (updater: (prev: ResumeData) => ResumeData) => void;
  onRestoreResumes: (newResumes: ResumeData[]) => void;
  onClearAll: () => void;
  onToast: (msg: string) => void;
}

export const ResumeSettingsPage: React.FC<ResumeSettingsPageProps> = ({
  resume,
  resumes,
  onChange,
  onRestoreResumes,
  onClearAll,
  onToast,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportJSON = () => {
    exportAllDataJSON(resumes);
    onToast("✓ Exported all resume drafts to JSON backup");
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imported = await importAllDataJSON(file);
      if (imported && Array.isArray(imported)) {
        onRestoreResumes(imported);
        onToast(`✓ Restored ${imported.length} resume(s) from backup`);
      }
    } catch {
      onToast("Error reading backup JSON file");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Device & Data Settings
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
          Local backup and preference options for your current browser session.
        </p>
      </div>

      <div className="space-y-5">
        {/* Backup & Restore Card */}
        <div className="p-5 rounded-lg bg-white border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-blue-600" />
            <h2 className="font-bold text-sm text-gray-900">
              Data Backup & Migration
            </h2>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            All your resume data is saved privately in your local browser storage. You can download a JSON backup at any time and import it on any device.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={handleExportJSON}
              className="px-3.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Backup (.json)</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-1.5 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium text-xs transition-colors flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import Backup (.json)</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
          </div>
        </div>

        {/* Global Formatting Defaults */}
        <div className="p-5 rounded-lg bg-white border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-blue-600" />
            <h2 className="font-bold text-sm text-gray-900">
              Default Typography & Layout
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Default Font
              </label>
              <select
                value={resume.customization.font}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    customization: { ...prev.customization, font: e.target.value as any },
                  }))
                }
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-xs bg-white text-gray-900 focus:border-blue-600 outline-none"
              >
                <option value="Inter">Inter (Standard Modern Sans)</option>
                <option value="Manrope">Manrope (Clean Geometric)</option>
                <option value="Merriweather">Merriweather (Executive Serif)</option>
                <option value="JetBrains Mono">JetBrains Mono (Technical Monospace)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Default Layout
              </label>
              <select
                value={resume.customization.layout}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    customization: { ...prev.customization, layout: e.target.value as any },
                  }))
                }
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-xs bg-white text-gray-900 focus:border-blue-600 outline-none"
              >
                <option value="single-column">Single Column (ATS-friendly)</option>
                <option value="two-column">Two Column Split</option>
              </select>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="p-5 rounded-lg bg-white border border-red-200 space-y-2">
          <div className="flex items-center gap-1.5 text-red-600 font-bold text-xs">
            <Trash2 className="w-3.5 h-3.5" />
            <span>Danger Zone</span>
          </div>
          <p className="text-xs text-gray-600">
            Clear all resumes stored on this device. This action cannot be undone unless you previously exported a JSON backup.
          </p>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to delete all resumes stored on this device?")) {
                onClearAll();
                onToast("All local resumes deleted");
              }
            }}
            className="px-3.5 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white font-medium text-xs transition-colors"
          >
            Clear All Local Resume Data
          </button>
        </div>
      </div>
    </div>
  );
};
