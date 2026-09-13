import React from "react";
import { ResumeData, ResumeFont } from "../types";
import { TEMPLATES } from "../data/templates";
import { TemplateThumbnail } from "./TemplateThumbnail";
import { Sliders, Type, Palette, Layout, Sparkles, Check } from "lucide-react";

interface ResumeCustomizerProps {
  resume: ResumeData;
  onChange: (updater: (prev: ResumeData) => ResumeData) => void;
  onClose?: () => void;
}

const COLOR_PALETTES = [
  { name: "Blue", hex: "#2563EB" },
  { name: "Navy", hex: "#1E293B" },
  { name: "Emerald", hex: "#059669" },
  { name: "Purple", hex: "#7C3AED" },
  { name: "Black", hex: "#111827" },
  { name: "Amber", hex: "#D97706" },
  { name: "Rose", hex: "#E11D48" },
];

const FONTS: { id: ResumeFont; label: string; desc: string }[] = [
  { id: "Inter", label: "Inter", desc: "Clean & standard modern sans-serif" },
  { id: "Manrope", label: "Manrope", desc: "Geometric, open, and friendly" },
  { id: "Merriweather", label: "Merriweather", desc: "Classic executive serif" },
  { id: "JetBrains Mono", label: "JetBrains Mono", desc: "Clean monospaced technical" },
];

export const ResumeCustomizer: React.FC<ResumeCustomizerProps> = ({
  resume,
  onChange,
  onClose,
}) => {
  const customization = resume.customization;

  const updateConfig = (field: keyof typeof customization, value: any) => {
    onChange((prev) => ({
      ...prev,
      customization: {
        ...prev.customization,
        [field]: value,
      },
    }));
  };

  return (
    <div id="resume-customizer-panel" className="space-y-6 text-gray-800">
      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
        <div>
          <h3 className="font-bold text-sm text-gray-900">Customization</h3>
          <p className="text-xs text-gray-500">Fine-tune fonts, accent color, and layout</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            Close
          </button>
        )}
      </div>

      {/* 0. TEMPLATE SELECTOR WITH SAMPLE RESUME THUMBNAILS */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-700">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Choose Template ({TEMPLATES.length})</span>
          </label>
          <span className="text-[11px] font-medium text-blue-600">
            Active: {TEMPLATES.find((t) => t.id === resume.templateId)?.name || "Modern Clean"}
          </span>
        </div>
        <p className="text-xs text-gray-500">
          Select a template style to instantly reformat your resume
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          {TEMPLATES.map((tpl) => {
            const isSelected = resume.templateId === tpl.id;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => {
                  onChange((prev) => ({
                    ...prev,
                    templateId: tpl.id as any,
                    customization: {
                      ...prev.customization,
                      primaryColor: tpl.primaryColor || prev.customization.primaryColor,
                    },
                  }));
                }}
                className={`group text-left p-1.5 rounded-lg border transition-all flex flex-col justify-between ${
                  isSelected
                    ? "border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
                }`}
              >
                {/* Miniature Sample Resume Image */}
                <div className="w-full rounded overflow-hidden shadow-2xs border border-gray-200/60 bg-white">
                  <TemplateThumbnail template={tpl} />
                </div>

                <div className="mt-1.5 px-0.5 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-gray-900 truncate">
                    {tpl.name}
                  </span>
                  {isSelected && (
                    <span className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[8px] flex-shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. PALETTE & ACCENT COLOR */}
      <div className="space-y-2 pt-3 border-t border-gray-200">
        <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-600">
          <Palette className="w-3.5 h-3.5" />
          <span>Primary Accent Color</span>
        </label>
        <p className="text-xs text-gray-500">One accent color maximum for clean, ATS-compliant contrast</p>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 pt-1">
          {COLOR_PALETTES.map((color) => {
            const isSelected = customization.primaryColor.toLowerCase() === color.hex.toLowerCase();
            return (
              <button
                key={color.hex}
                type="button"
                onClick={() => updateConfig("primaryColor", color.hex)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-colors ${
                  isSelected
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                title={color.name}
              >
                <span
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-[10px] text-gray-600">
                  {color.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Custom Hex */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-xs text-gray-500">Custom hex:</span>
          <input
            type="color"
            value={customization.primaryColor}
            onChange={(e) => updateConfig("primaryColor", e.target.value)}
            className="w-7 h-7 rounded border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={customization.primaryColor}
            onChange={(e) => updateConfig("primaryColor", e.target.value)}
            className="w-24 px-2 py-1 text-xs border border-gray-300 rounded uppercase font-mono text-gray-800"
          />
        </div>
      </div>

      {/* 2. TYPOGRAPHY */}
      <div className="space-y-2 pt-3 border-t border-gray-200">
        <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-600">
          <Type className="w-3.5 h-3.5" />
          <span>Font Family</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {FONTS.map((font) => (
            <button
              key={font.id}
              type="button"
              onClick={() => updateConfig("font", font.id)}
              className={`p-3 rounded-lg border text-left transition-colors ${
                customization.font === font.id
                  ? "border-blue-600 bg-blue-50 font-semibold"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="text-xs font-semibold text-gray-900">{font.label}</div>
              <div className="text-[11px] text-gray-500">{font.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 3. LAYOUT & SPACING */}
      <div className="space-y-3 pt-3 border-t border-gray-200">
        <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-600">
          <Layout className="w-3.5 h-3.5" />
          <span>Layout Structure</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => updateConfig("layout", "single-column")}
            className={`p-3 rounded-lg border text-left text-xs ${
              customization.layout === "single-column"
                ? "border-blue-600 bg-blue-50 font-semibold"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <div className="font-semibold text-gray-900">Single Column</div>
            <div className="text-gray-500 text-[11px]">Recommended for ATS parsing</div>
          </button>
          <button
            type="button"
            onClick={() => updateConfig("layout", "two-column")}
            className={`p-3 rounded-lg border text-left text-xs ${
              customization.layout === "two-column"
                ? "border-blue-600 bg-blue-50 font-semibold"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <div className="font-semibold text-gray-900">Two Column Split</div>
            <div className="text-gray-500 text-[11px]">Compact layout with sidebar</div>
          </button>
        </div>

        {/* Spacing options */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          {(["tight", "normal", "relaxed"] as const).map((space) => (
            <button
              key={space}
              type="button"
              onClick={() => updateConfig("lineSpacing", space)}
              className={`py-2 px-2.5 rounded-lg border text-xs capitalize ${
                customization.lineSpacing === space
                  ? "border-blue-600 bg-blue-50 font-semibold text-blue-700"
                  : "border-gray-200 hover:bg-gray-50 text-gray-700"
              }`}
            >
              {space} Spacing
            </button>
          ))}
        </div>
      </div>

      {/* 4. PHOTO TOGGLE */}
      <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-700">
          Display Profile Photo
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={customization.showPhoto}
            onChange={(e) => updateConfig("showPhoto", e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );
};
