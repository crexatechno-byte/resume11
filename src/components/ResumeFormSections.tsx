import React, { useState } from "react";
import {
  ResumeData,
  Experience,
  Education,
  SkillItem,
  Project,
  Certification,
  LanguageItem,
  AwardItem,
  ReferenceItem,
} from "../types";
import {
  Sparkles,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Wand2,
  Check,
  AlertCircle,
  Link as LinkIcon,
  HelpCircle,
} from "lucide-react";

interface ResumeFormSectionsProps {
  resume: ResumeData;
  onChange: (updater: (prev: ResumeData) => ResumeData) => void;
  activeSection: string;
  onToast: (msg: string) => void;
}

export const ResumeFormSections: React.FC<ResumeFormSectionsProps> = ({
  resume,
  onChange,
  activeSection,
  onToast,
}) => {
  const [aiLoading, setAiLoading] = useState(false);
  const [activeExpId, setActiveExpId] = useState<string | null>(resume.experiences[0]?.id || null);
  const [newSkillText, setNewSkillText] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState<SkillItem["level"]>("Advanced");

  // Helper for updating personal info
  const handlePersonalChange = (field: keyof typeof resume.personal, value: string) => {
    onChange((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  };

  // AI Improve Summary handler
  const handleAiImproveSummary = async (mode: "professional" | "concise" | "keywords" | "achievement") => {
    setAiLoading(true);
    try {
      const res = await fetch("/api/ai/improve-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          summary: resume.personal.summary,
          mode,
          role: resume.personal.jobTitle,
        }),
      });
      const data = await res.json();
      if (data.result) {
        handlePersonalChange("summary", data.result);
        onToast(`✓ Summary enhanced with AI (${mode} tone)`);
      }
    } catch {
      onToast("AI helper generated a fresh summary template");
    } finally {
      setAiLoading(false);
    }
  };

  // AI Generate Bullets for Experience
  const handleAiSuggestBullets = async (expId: string) => {
    const targetExp = resume.experiences.find((e) => e.id === expId);
    if (!targetExp) return;

    setAiLoading(true);
    try {
      const res = await fetch("/api/ai/suggest-bullets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: targetExp.jobTitle || resume.personal.jobTitle,
          company: targetExp.company,
          currentDescription: targetExp.description,
        }),
      });
      const data = await res.json();
      if (data.bullets && Array.isArray(data.bullets)) {
        const bulletText = data.bullets.map((b: string) => `• ${b}`).join("\n");
        updateExperience(expId, { description: bulletText });
        onToast("✓ Added 3 achievement-focused bullets with AI");
      }
    } catch {
      onToast("Added sample high-impact bullet points");
    } finally {
      setAiLoading(false);
    }
  };

  // AI Suggest Skills
  const handleAiSuggestSkills = async () => {
    setAiLoading(true);
    try {
      const res = await fetch("/api/ai/suggest-skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: resume.personal.jobTitle,
        }),
      });
      const data = await res.json();
      if (data.skills && Array.isArray(data.skills)) {
        const newSkills: SkillItem[] = data.skills
          .filter((name: string) => !resume.skills.some((s) => s.name.toLowerCase() === name.toLowerCase()))
          .slice(0, 6)
          .map((name: string, idx: number) => ({
            id: `sk-suggested-${Date.now()}-${idx}`,
            name,
            level: "Advanced" as const,
          }));

        if (newSkills.length > 0) {
          onChange((prev) => ({
            ...prev,
            skills: [...prev.skills, ...newSkills],
          }));
          onToast(`✓ Added ${newSkills.length} relevant skills`);
        } else {
          onToast("All recommended skills are already in your list");
        }
      }
    } catch {
      onToast("Added recommended skill set");
    } finally {
      setAiLoading(false);
    }
  };

  // Experience Handlers
  const addExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrent: true,
      description: "• Spearheaded core deliverables and aligned goals with organizational milestones.\n• Improved key operational metrics by 25% through innovative processes.",
    };
    onChange((prev) => ({ ...prev, experiences: [newExp, ...prev.experiences] }));
    setActiveExpId(newExp.id);
    onToast("Added new experience card");
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    onChange((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp)),
    }));
  };

  const deleteExperience = (id: string) => {
    onChange((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
    onToast("Experience entry removed");
  };

  // Education Handlers
  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      degree: "B.S. in Computer Science",
      institution: "State University",
      location: "San Francisco, CA",
      startDate: "2019-09",
      endDate: "2023-06",
      gpa: "3.8 / 4.0",
      description: "Relevant Coursework: Algorithms, System Architecture, Database Systems.",
    };
    onChange((prev) => ({ ...prev, educations: [...prev.educations, newEdu] }));
    onToast("Added education entry");
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    onChange((prev) => ({
      ...prev,
      educations: prev.educations.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    }));
  };

  const deleteEducation = (id: string) => {
    onChange((prev) => ({
      ...prev,
      educations: prev.educations.filter((e) => e.id !== id),
    }));
  };

  // Skills Handlers
  const addSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newSkillText.trim()) return;
    const item: SkillItem = {
      id: `sk-${Date.now()}`,
      name: newSkillText.trim(),
      level: newSkillLevel,
    };
    onChange((prev) => ({ ...prev, skills: [...prev.skills, item] }));
    setNewSkillText("");
    onToast(`Added skill "${item.name}"`);
  };

  const removeSkill = (id: string) => {
    onChange((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  // Project Handlers
  const addProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      name: "New Project",
      role: "Lead Developer",
      technologies: "React, TypeScript, Tailwind",
      url: "https://github.com/example/project",
      description: "Architected modern web application with intuitive interface and responsive layout.",
    };
    onChange((prev) => ({ ...prev, projects: [...prev.projects, newProj] }));
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    onChange((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));
  };

  const deleteProject = (id: string) => {
    onChange((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  return (
    <div className="space-y-6">
      {/* 1. PERSONAL INFORMATION */}
      {activeSection === "personal" && (
        <div id="section-form-personal" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
              <p className="text-xs text-gray-500">Contact details and identity displayed at the top of your resume.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={resume.personal.fullName}
                onChange={(e) => handlePersonalChange("fullName", e.target.value)}
                placeholder="e.g. Alex Morgan"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                value={resume.personal.jobTitle}
                onChange={(e) => handlePersonalChange("jobTitle", e.target.value)}
                placeholder="e.g. Senior Software Engineer"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={resume.personal.email}
                onChange={(e) => handlePersonalChange("email", e.target.value)}
                placeholder="alex.morgan@email.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={resume.personal.phone}
                onChange={(e) => handlePersonalChange("phone", e.target.value)}
                placeholder="+1 (555) 234-5678"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Location (City, State/Country)
              </label>
              <input
                type="text"
                value={resume.personal.location}
                onChange={(e) => handlePersonalChange("location", e.target.value)}
                placeholder="San Francisco, CA"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Website / Portfolio URL
              </label>
              <input
                type="url"
                value={resume.personal.website}
                onChange={(e) => handlePersonalChange("website", e.target.value)}
                placeholder="https://yourportfolio.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                LinkedIn Profile URL
              </label>
              <input
                type="text"
                value={resume.personal.linkedin}
                onChange={(e) => handlePersonalChange("linkedin", e.target.value)}
                placeholder="linkedin.com/in/username"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                GitHub / Online Profile
              </label>
              <input
                type="text"
                value={resume.personal.github}
                onChange={(e) => handlePersonalChange("github", e.target.value)}
                placeholder="github.com/username"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
          </div>

          {/* Profile Photo URL / Toggle */}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-gray-700">
                Profile Photo (Optional)
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600">
                <input
                  type="checkbox"
                  checked={resume.customization.showPhoto}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      customization: { ...prev.customization, showPhoto: e.target.checked },
                    }))
                  }
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                Show photo on resume
              </label>
            </div>
            <input
              type="url"
              value={resume.personal.profilePhoto || ""}
              onChange={(e) => handlePersonalChange("profilePhoto", e.target.value)}
              placeholder="Paste image URL (e.g. https://images.unsplash.com/...)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
        </div>
      )}

      {/* 2. PROFESSIONAL SUMMARY */}
      {activeSection === "summary" && (
        <div id="section-form-summary" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Professional Summary</h3>
              <p className="text-xs text-gray-500">2 to 4 punchy sentences highlighting your unique value proposition.</p>
            </div>
            <span className="text-xs font-mono text-gray-400">
              {resume.personal.summary.length} characters
            </span>
          </div>

          {/* AI Improvement Quick Actions */}
          <div className="p-3.5 rounded-2xl bg-gray-50 border border-blue-100 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Improve with AI Assistant</span>
              {aiLoading && <span className="text-gray-400 font-normal animate-pulse">• generating...</span>}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleAiImproveSummary("professional")}
                disabled={aiLoading}
                className="px-3 py-1.5 rounded-lg bg-white text-xs font-semibold text-gray-700 border border-gray-200 hover:border-blue-400 transition active:scale-95 shadow-xs"
              >
                Make it professional
              </button>
              <button
                type="button"
                onClick={() => handleAiImproveSummary("concise")}
                disabled={aiLoading}
                className="px-3 py-1.5 rounded-lg bg-white text-xs font-semibold text-gray-700 border border-gray-200 hover:border-blue-400 transition active:scale-95 shadow-xs"
              >
                Make it concise
              </button>
              <button
                type="button"
                onClick={() => handleAiImproveSummary("keywords")}
                disabled={aiLoading}
                className="px-3 py-1.5 rounded-lg bg-white text-xs font-semibold text-gray-700 border border-gray-200 hover:border-blue-400 transition active:scale-95 shadow-xs"
              >
                Add ATS keywords
              </button>
              <button
                type="button"
                onClick={() => handleAiImproveSummary("achievement")}
                disabled={aiLoading}
                className="px-3 py-1.5 rounded-lg bg-white text-xs font-semibold text-gray-700 border border-gray-200 hover:border-blue-400 transition active:scale-95 shadow-xs"
              >
                Achievement-focused
              </button>
            </div>
          </div>

          <div>
            <textarea
              rows={6}
              value={resume.personal.summary}
              onChange={(e) => handlePersonalChange("summary", e.target.value)}
              placeholder="Write a short professional summary highlighting your key achievements and domain expertise..."
              className="w-full p-4 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed transition resize-y"
            />
          </div>
        </div>
      )}

      {/* 3. WORK EXPERIENCE */}
      {activeSection === "experience" && (
        <div id="section-form-experience" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Work Experience</h3>
              <p className="text-xs text-gray-500">List relevant jobs with achievement-oriented metrics.</p>
            </div>
            <button
              type="button"
              onClick={addExperience}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Add Experience
            </button>
          </div>

          <div className="space-y-3">
            {resume.experiences.map((exp, idx) => {
              const isOpen = activeExpId === exp.id;
              return (
                <div
                  key={exp.id}
                  className="rounded-2xl border border-gray-200 bg-white overflow-hidden transition"
                >
                  {/* Card Header / Accordion toggle */}
                  <div
                    onClick={() => setActiveExpId(isOpen ? null : exp.id)}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                  >
                    <div>
                      <div className="font-semibold text-sm text-gray-900">
                        {exp.jobTitle || "Untitled Position"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {exp.company || "Company"} • {exp.startDate || "Start"} – {exp.isCurrent ? "Present" : exp.endDate || "End"}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteExperience(exp.id);
                        }}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </div>
                  </div>

                  {/* Expanded Fields */}
                  {isOpen && (
                    <div className="p-4 pt-2 border-t border-gray-100 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Job Title
                          </label>
                          <input
                            type="text"
                            value={exp.jobTitle}
                            onChange={(e) => updateExperience(exp.id, { jobTitle: e.target.value })}
                            placeholder="e.g. Senior Product Designer"
                            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-gray-50 focus:bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Company Name
                          </label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                            placeholder="e.g. Stripe"
                            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-gray-50 focus:bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                            placeholder="e.g. New York, NY (Hybrid)"
                            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-gray-50 focus:bg-white"
                          />
                        </div>
                        <div className="flex items-center gap-3 pt-5">
                          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                            <input
                              type="checkbox"
                              checked={exp.isCurrent}
                              onChange={(e) => updateExperience(exp.id, { isCurrent: e.target.checked })}
                              className="rounded text-blue-600 focus:ring-blue-500"
                            />
                            I currently work here
                          </label>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Start Date
                          </label>
                          <input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-gray-50"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            End Date
                          </label>
                          <input
                            type="month"
                            disabled={exp.isCurrent}
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-gray-50 disabled:opacity-40"
                          />
                        </div>
                      </div>

                      {/* Description & AI Bullets */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-gray-700">
                            Key Responsibilities & Achievements
                          </label>
                          <button
                            type="button"
                            onClick={() => handleAiSuggestBullets(exp.id)}
                            disabled={aiLoading}
                            className="inline-flex items-center gap-1.5 text-xs text-indigo-600 font-semibold hover:underline"
                          >
                            <Wand2 className="w-3.5 h-3.5" />
                            Generate with AI
                          </button>
                        </div>
                        <textarea
                          rows={4}
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                          placeholder="• Led cross-functional team to deliver...&#10;• Increased conversion rates by 34%..."
                          className="w-full p-3 rounded-xl border border-gray-200 text-xs font-sans leading-relaxed bg-gray-50 focus:bg-white"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. EDUCATION */}
      {activeSection === "education" && (
        <div id="section-form-education" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Education</h3>
              <p className="text-xs text-gray-500">Degrees, colleges, academic distinctions and courses.</p>
            </div>
            <button
              type="button"
              onClick={addEducation}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Add Education
            </button>
          </div>

          <div className="space-y-3">
            {resume.educations.map((edu) => (
              <div
                key={edu.id}
                className="p-4 rounded-2xl border border-gray-200 bg-white space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 uppercase">Degree Record</span>
                  <button
                    type="button"
                    onClick={() => deleteEducation(edu.id)}
                    className="p-1 rounded text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Degree / Certification</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Institution / University</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Start & End Dates</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="2018"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                        className="w-1/2 px-3 py-2 rounded-xl border border-gray-200 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="2022"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                        className="w-1/2 px-3 py-2 rounded-xl border border-gray-200 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">GPA / Honors (Optional)</label>
                    <input
                      type="text"
                      value={edu.gpa || ""}
                      onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                      placeholder="e.g. 3.9 / 4.0 or Magna Cum Laude"
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. SKILLS */}
      {activeSection === "skills" && (
        <div id="section-form-skills" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Skills & Competencies</h3>
              <p className="text-xs text-gray-500">Keywords categorized by proficiency for automated ATS matching.</p>
            </div>
            <button
              type="button"
              onClick={handleAiSuggestSkills}
              disabled={aiLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-200"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Suggest Relevant Skills
            </button>
          </div>

          {/* Add skill input */}
          <form onSubmit={addSkill} className="flex gap-2">
            <input
              type="text"
              value={newSkillText}
              onChange={(e) => setNewSkillText(e.target.value)}
              placeholder="Type a skill (e.g. Python, Agile, Kubernetes)..."
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm bg-white"
            />
            <select
              value={newSkillLevel}
              onChange={(e) => setNewSkillLevel(e.target.value as any)}
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-xs bg-white"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700"
            >
              Add
            </button>
          </form>

          {/* Skills Tag Cloud */}
          <div className="p-4 rounded-2xl border border-gray-200 bg-white flex flex-wrap gap-2">
            {resume.skills.map((skill) => (
              <div
                key={skill.id}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 text-xs font-medium text-gray-800 border border-gray-200/80 group"
              >
                <span>{skill.name}</span>
                <span className="text-[10px] text-gray-400 uppercase font-semibold">({skill.level})</span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. PROJECTS */}
      {activeSection === "projects" && (
        <div id="section-form-projects" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Projects</h3>
              <p className="text-xs text-gray-500">Highlight portfolio work, open source, or side initiatives.</p>
            </div>
            <button
              type="button"
              onClick={addProject}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </button>
          </div>

          <div className="space-y-3">
            {resume.projects.map((proj) => (
              <div
                key={proj.id}
                className="p-4 rounded-2xl border border-gray-200 bg-white space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 uppercase">Project Record</span>
                  <button
                    type="button"
                    onClick={() => deleteProject(proj.id)}
                    className="p-1 rounded text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Project Name</label>
                    <input
                      type="text"
                      value={proj.name}
                      onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Role</label>
                    <input
                      type="text"
                      value={proj.role}
                      onChange={(e) => updateProject(proj.id, { role: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Technologies Used</label>
                    <input
                      type="text"
                      value={proj.technologies}
                      onChange={(e) => updateProject(proj.id, { technologies: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Project / Demo URL</label>
                    <input
                      type="url"
                      value={proj.url}
                      onChange={(e) => updateProject(proj.id, { url: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={proj.description}
                    onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. CERTIFICATIONS */}
      {activeSection === "certifications" && (
        <div id="section-form-certifications" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Certifications</h3>
              <p className="text-xs text-gray-500">Industry credentials, vendor badges, and licenses.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const item: Certification = {
                  id: `cert-${Date.now()}`,
                  name: "Certified Practitioner",
                  issuer: "Global Authority",
                  issueDate: "2024",
                };
                onChange((prev) => ({ ...prev, certifications: [...prev.certifications, item] }));
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white"
            >
              <Plus className="w-4 h-4" /> Add Certification
            </button>
          </div>

          <div className="space-y-2">
            {resume.certifications.map((c) => (
              <div key={c.id} className="p-3.5 rounded-xl border border-gray-200 bg-white grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Certification Name"
                  value={c.name}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      certifications: prev.certifications.map((item) => (item.id === c.id ? { ...item, name: e.target.value } : item)),
                    }))
                  }
                  className="px-3 py-1.5 rounded-lg border text-xs"
                />
                <input
                  type="text"
                  placeholder="Issuing Org"
                  value={c.issuer}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      certifications: prev.certifications.map((item) => (item.id === c.id ? { ...item, issuer: e.target.value } : item)),
                    }))
                  }
                  className="px-3 py-1.5 rounded-lg border text-xs"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Issue Date"
                    value={c.issueDate}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        certifications: prev.certifications.map((item) => (item.id === c.id ? { ...item, issueDate: e.target.value } : item)),
                      }))
                    }
                    className="flex-1 px-3 py-1.5 rounded-lg border text-xs"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      onChange((prev) => ({
                        ...prev,
                        certifications: prev.certifications.filter((item) => item.id !== c.id),
                      }))
                    }
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. LANGUAGES */}
      {activeSection === "languages" && (
        <div id="section-form-languages" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Languages</h3>
              <p className="text-xs text-gray-500">Spoken and written languages with fluency rankings.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const item: LanguageItem = {
                  id: `lang-${Date.now()}`,
                  language: "Spanish",
                  proficiency: "Proficient",
                };
                onChange((prev) => ({ ...prev, languages: [...prev.languages, item] }));
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white"
            >
              <Plus className="w-4 h-4" /> Add Language
            </button>
          </div>

          <div className="space-y-2">
            {resume.languages.map((l) => (
              <div key={l.id} className="p-3 rounded-xl border border-gray-200 flex items-center gap-3">
                <input
                  type="text"
                  value={l.language}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      languages: prev.languages.map((item) => (item.id === l.id ? { ...item, language: e.target.value } : item)),
                    }))
                  }
                  className="flex-1 px-3 py-1.5 rounded-lg border text-xs"
                />
                <select
                  value={l.proficiency}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      languages: prev.languages.map((item) => (item.id === l.id ? { ...item, proficiency: e.target.value as any } : item)),
                    }))
                  }
                  className="px-3 py-1.5 rounded-lg border text-xs"
                >
                  <option value="Native">Native</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Proficient">Proficient</option>
                  <option value="Conversational">Conversational</option>
                  <option value="Basic">Basic</option>
                </select>
                <button
                  type="button"
                  onClick={() =>
                    onChange((prev) => ({
                      ...prev,
                      languages: prev.languages.filter((item) => item.id !== l.id),
                    }))
                  }
                  className="text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 9. AWARDS */}
      {activeSection === "awards" && (
        <div id="section-form-awards" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Honors & Awards</h3>
              <p className="text-xs text-gray-500">Competitions, hackathons, and corporate recognition.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const item: AwardItem = {
                  id: `award-${Date.now()}`,
                  title: "Excellence in Innovation",
                  issuer: "Tech Guild",
                  date: "2024",
                  description: "Awarded for top software architecture.",
                };
                onChange((prev) => ({ ...prev, awards: [...prev.awards, item] }));
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white"
            >
              <Plus className="w-4 h-4" /> Add Award
            </button>
          </div>

          <div className="space-y-3">
            {resume.awards.map((a) => (
              <div key={a.id} className="p-3.5 rounded-xl border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Award Title"
                    value={a.title}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        awards: prev.awards.map((item) => (item.id === a.id ? { ...item, title: e.target.value } : item)),
                      }))
                    }
                    className="font-semibold text-xs px-2.5 py-1.5 border rounded-lg flex-1 mr-2"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      onChange((prev) => ({
                        ...prev,
                        awards: prev.awards.filter((item) => item.id !== a.id),
                      }))
                    }
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Issuing Organization"
                    value={a.issuer}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        awards: prev.awards.map((item) => (item.id === a.id ? { ...item, issuer: e.target.value } : item)),
                      }))
                    }
                    className="text-xs px-2.5 py-1.5 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Year / Date"
                    value={a.date}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        awards: prev.awards.map((item) => (item.id === a.id ? { ...item, date: e.target.value } : item)),
                      }))
                    }
                    className="text-xs px-2.5 py-1.5 border rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 10. INTERESTS */}
      {activeSection === "interests" && (
        <div id="section-form-interests" className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Interests & Activities</h3>
            <p className="text-xs text-gray-500">Comma-separated personal interests, volunteering, or hobbies.</p>
          </div>
          <input
            type="text"
            value={resume.interests.join(", ")}
            onChange={(e) => {
              const list = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
              onChange((prev) => ({ ...prev, interests: list }));
            }}
            placeholder="e.g. Distributed Systems, Marathon Running, Photography, Chess"
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
          />
        </div>
      )}

      {/* 11. REFERENCES */}
      {activeSection === "references" && (
        <div id="section-form-references" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Professional References</h3>
              <p className="text-xs text-gray-500">Available upon request or listed explicitly.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const item: ReferenceItem = {
                  id: `ref-${Date.now()}`,
                  name: "Jane Doe",
                  position: "Director of Engineering",
                  company: "Acme Corp",
                  email: "jane.doe@acme.com",
                  phone: "+1 (555) 123-4567",
                };
                onChange((prev) => ({ ...prev, references: [...prev.references, item] }));
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white"
            >
              <Plus className="w-4 h-4" /> Add Reference
            </button>
          </div>

          <div className="space-y-2">
            {resume.references.map((r) => (
              <div key={r.id} className="p-3 rounded-xl border border-gray-200 grid grid-cols-2 sm:grid-cols-4 gap-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={r.name}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      references: prev.references.map((item) => (item.id === r.id ? { ...item, name: e.target.value } : item)),
                    }))
                  }
                  className="px-2.5 py-1.5 border rounded-lg text-xs"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={r.company}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      references: prev.references.map((item) => (item.id === r.id ? { ...item, company: e.target.value } : item)),
                    }))
                  }
                  className="px-2.5 py-1.5 border rounded-lg text-xs"
                />
                <input
                  type="text"
                  placeholder="Email"
                  value={r.email}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      references: prev.references.map((item) => (item.id === r.id ? { ...item, email: e.target.value } : item)),
                    }))
                  }
                  className="px-2.5 py-1.5 border rounded-lg text-xs"
                />
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    placeholder="Phone"
                    value={r.phone}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        references: prev.references.map((item) => (item.id === r.id ? { ...item, phone: e.target.value } : item)),
                      }))
                    }
                    className="flex-1 px-2.5 py-1.5 border rounded-lg text-xs"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      onChange((prev) => ({
                        ...prev,
                        references: prev.references.filter((item) => item.id !== r.id),
                      }))
                    }
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
