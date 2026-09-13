import React, { useState, useEffect } from "react";
import { TemplateDefinition } from "../types";
import { TEMPLATES } from "../data/templates";
import { TemplateThumbnail } from "../components/TemplateThumbnail";
import {
  Search,
  Check,
  Star,
  ArrowRight,
  Eye,
  Heart,
  Filter,
  RotateCcw,
} from "lucide-react";

interface TemplateGalleryPageProps {
  onSelectTemplate: (templateId: string) => void;
  onPreviewTemplate: (template: TemplateDefinition) => void;
}

const STYLES = ["All", "Modern", "Professional", "Minimal", "Creative", "Executive"] as const;
const INDUSTRIES = [
  "All",
  "Technology",
  "Marketing",
  "Finance",
  "Healthcare",
  "Design",
  "Education",
  "Engineering",
  "Business",
] as const;
const EXPERIENCES = ["All", "Student", "Fresher", "Mid-level", "Senior", "Executive"] as const;

export const TemplateGalleryPage: React.FC<TemplateGalleryPageProps> = ({
  onSelectTemplate,
  onPreviewTemplate,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<string>("All");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");
  const [selectedExperience, setSelectedExperience] = useState<string>("All");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [showOnlyATS, setShowOnlyATS] = useState(false);

  // Favorites stored in local storage
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("resume_maker_fav_templates");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("resume_maker_fav_templates", JSON.stringify(favoriteIds));
    } catch {
      // safe fallback
    }
  }, [favoriteIds]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedStyle("All");
    setSelectedIndustry("All");
    setSelectedExperience("All");
    setShowOnlyFavorites(false);
    setShowOnlyATS(false);
  };

  const filteredTemplates = TEMPLATES.filter((tpl) => {
    const matchesSearch =
      tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStyle = selectedStyle === "All" || tpl.style === selectedStyle;
    const matchesIndustry = selectedIndustry === "All" || tpl.industry === selectedIndustry;
    const matchesExperience = selectedExperience === "All" || tpl.experienceLevel === selectedExperience;
    const matchesFavorite = !showOnlyFavorites || favoriteIds.includes(tpl.id);
    const matchesATS = !showOnlyATS || tpl.isATS;

    return matchesSearch && matchesStyle && matchesIndustry && matchesExperience && matchesFavorite && matchesATS;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900">
          Choose your perfect resume template
        </h1>
        <p className="text-sm text-gray-600">
          Clean, ATS-friendly templates. Free to use with zero sign-up required.
        </p>
      </div>

      {/* Top Search & Filter Bar */}
      <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role, keyword, or template name..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 bg-white text-xs text-gray-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Quick Filter Toggles */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-colors whitespace-nowrap ${
                showOnlyFavorites
                  ? "bg-rose-50 border-rose-200 text-rose-600"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${showOnlyFavorites ? "fill-rose-500 text-rose-500" : "text-gray-400"}`} />
              <span>Favorites ({favoriteIds.length})</span>
            </button>

            <button
              onClick={() => setShowOnlyATS(!showOnlyATS)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-colors whitespace-nowrap ${
                showOnlyATS
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>ATS-Friendly Only</span>
            </button>

            {(selectedStyle !== "All" || selectedIndustry !== "All" || selectedExperience !== "All" || showOnlyFavorites || showOnlyATS || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="px-2.5 py-1.5 rounded-lg text-xs text-gray-500 hover:text-gray-800 hover:bg-gray-100 flex items-center gap-1 transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Badges Row: Style, Industry, Experience */}
        <div className="pt-2 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Style Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Style
            </label>
            <div className="flex flex-wrap gap-1">
              {STYLES.map((style) => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    selectedStyle === style
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Industry Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Industry
            </label>
            <div className="flex flex-wrap gap-1 max-h-18 overflow-y-auto pr-1">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setSelectedIndustry(ind)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    selectedIndustry === ind
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Experience Level
            </label>
            <div className="flex flex-wrap gap-1">
              {EXPERIENCES.map((exp) => (
                <button
                  key={exp}
                  onClick={() => setSelectedExperience(exp)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    selectedExperience === exp
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                  }`}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-xl border border-gray-200 space-y-3">
          <Filter className="w-8 h-8 text-gray-300 mx-auto" />
          <h3 className="font-semibold text-gray-900 text-sm">No templates match your filters</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Try adjusting your search query or reset filters to view all available templates.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTemplates.map((tpl) => {
            const isFav = favoriteIds.includes(tpl.id);
            return (
              <div
                key={tpl.id}
                className="group rounded-xl border border-gray-200 bg-white overflow-hidden flex flex-col justify-between hover:shadow-sm transition-all"
              >
                {/* Miniature Wireframe with Zoom */}
                <div className="relative p-4 bg-gray-50 border-b border-gray-200 overflow-hidden">
                  {/* Badges in top-left */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1 z-10">
                    {tpl.isATS && (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                        <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                        <span>ATS</span>
                      </span>
                    )}
                    {tpl.popular && (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs">
                        <Star className="w-2.5 h-2.5 fill-blue-500 stroke-none" />
                        <span>Popular</span>
                      </span>
                    )}
                    {tpl.isNew && !tpl.popular && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200 shadow-2xs">
                        New
                      </span>
                    )}
                  </div>

                  {/* Favorite button top-right */}
                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(tpl.id, e)}
                    className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-white/90 border border-gray-200 hover:bg-white text-gray-400 hover:text-rose-500 shadow-2xs transition-colors"
                    title={isFav ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${isFav ? "fill-rose-500 text-rose-500" : ""}`}
                    />
                  </button>

                  {/* Realistic Sample Resume Sheet */}
                  <div
                    className="w-full cursor-pointer group/thumb"
                    onClick={() => onPreviewTemplate(tpl)}
                    title={`Click to preview full-size ${tpl.name}`}
                  >
                    <div className="w-full transform group-hover:scale-[1.03] transition-transform duration-200 shadow-xs hover:shadow-md rounded overflow-hidden">
                      <TemplateThumbnail template={tpl} />
                    </div>

                    {/* Hover overlay hint */}
                    <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 pointer-events-none">
                      <span className="px-3 py-1.5 rounded-md bg-white/95 text-gray-900 text-xs font-semibold shadow-md flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-blue-600" />
                        <span>Full Preview</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Template Info & Actions */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-gray-900">
                        {tpl.name}
                      </h3>
                      <span className="text-[10px] font-semibold text-gray-400 uppercase">
                        {tpl.experienceLevel}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                      {tpl.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => onPreviewTemplate(tpl)}
                      className="py-1.5 px-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-gray-500" />
                      <span>Preview</span>
                    </button>
                    <button
                      id={`use-template-${tpl.id}`}
                      onClick={() => onSelectTemplate(tpl.id)}
                      className="py-1.5 px-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Use</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Recommendation Box */}
      <div className="p-5 rounded-xl bg-white border border-gray-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-sm text-gray-900">
            Recommended Starting Template
          </h4>
          <p className="text-xs text-gray-600 mt-0.5">
            <strong>Modern Clean</strong> is our most popular single-column layout, certified for standard ATS parsers.
          </p>
        </div>
        <button
          onClick={() => onSelectTemplate("modern-clean")}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors whitespace-nowrap"
        >
          Select Modern Clean
        </button>
      </div>
    </div>
  );
};
