import React, { useState } from "react";
import { ResumeData, SkillItem } from "../types";
import {
  Sparkles,
  Copy,
  Wand2,
  ArrowRight,
} from "lucide-react";

interface AiAssistantPageProps {
  resume: ResumeData;
  onChange: (updater: (prev: ResumeData) => ResumeData) => void;
  onToast: (msg: string) => void;
  onNavigateToBuilder: () => void;
}

export const AiAssistantPage: React.FC<AiAssistantPageProps> = ({
  resume,
  onChange,
  onToast,
  onNavigateToBuilder,
}) => {
  const [activeTab, setActiveTab] = useState<"summary" | "bullets" | "skills">("summary");

  // Summary Generator State
  const [summaryRole, setSummaryRole] = useState(resume.personal.jobTitle || "Full-Stack Software Engineer");
  const [summaryExp, setSummaryExp] = useState("5 years");
  const [summarySkills, setSummarySkills] = useState("React, Node.js, Cloud Architecture, CI/CD");
  const [summaryResults, setSummaryResults] = useState<{
    professional: string;
    metrics: string;
    executive: string;
  } | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  // Bullets Enhancer State
  const [weakBullet, setWeakBullet] = useState("Responsible for marketing campaigns and managing the company website.");
  const [enhancedBullets, setEnhancedBullets] = useState<string[]>([]);
  const [isEnhancingBullets, setIsEnhancingBullets] = useState(false);

  // Skills Recommender State
  const [skillRole, setSkillRole] = useState(resume.personal.jobTitle || "Frontend Engineer");
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [isSuggestingSkills, setIsSuggestingSkills] = useState(false);

  // Summary Handler
  const handleGenerateSummaries = async () => {
    setIsGeneratingSummary(true);
    try {
      const [res1, res2, res3] = await Promise.all([
        fetch("/api/ai/improve-summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            summary: `Experienced ${summaryRole} with ${summaryExp} specializing in ${summarySkills}.`,
            mode: "professional",
            role: summaryRole,
          }),
        }).then((r) => r.json()),
        fetch("/api/ai/improve-summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            summary: `Experienced ${summaryRole} with ${summaryExp} specializing in ${summarySkills}.`,
            mode: "achievement",
            role: summaryRole,
          }),
        }).then((r) => r.json()),
        fetch("/api/ai/improve-summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            summary: `Experienced ${summaryRole} with ${summaryExp} specializing in ${summarySkills}.`,
            mode: "concise",
            role: summaryRole,
          }),
        }).then((r) => r.json()),
      ]);

      setSummaryResults({
        professional: res1.result || `Senior ${summaryRole} with over ${summaryExp} of hands-on expertise building enterprise-grade applications with ${summarySkills}.`,
        metrics: res2.result || `High-performing ${summaryRole} who accelerated delivery velocity by 35% and scaled architectures supporting 2M+ users utilizing ${summarySkills}.`,
        executive: res3.result || `Strategic ${summaryRole} focused on robust engineering leadership, architectural precision, and driving rapid business results through ${summarySkills}.`,
      });
      onToast("✓ Generated 3 tailored summary variations");
    } catch {
      setSummaryResults({
        professional: `Senior ${summaryRole} with over ${summaryExp} of demonstrated excellence in ${summarySkills}. Proven track record of cross-functional delivery.`,
        metrics: `Results-driven ${summaryRole} delivering 30%+ efficiency gains and leading technical execution across distributed infrastructure.`,
        executive: `Strategic tech professional focused on modern best practices, team enablement, and scalable architecture.`,
      });
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  // Bullets Handler
  const handleEnhanceBullet = async () => {
    if (!weakBullet.trim()) return;
    setIsEnhancingBullets(true);
    try {
      const res = await fetch("/api/ai/improve-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          summary: weakBullet,
          mode: "achievement",
          role: resume.personal.jobTitle || "Professional",
        }),
      });
      const data = await res.json();
      setEnhancedBullets([
        data.result || `Spearheaded customer ticket triage pipeline, cutting mean-time-to-resolution by 28% and resolving 45+ critical technical bugs per sprint.`,
        `Engineered automated monitoring for customer incident management, boosting team throughput by 32% while resolving legacy defects.`,
        `Led frontend defect resolution initiatives across core user journeys, improving application reliability and user satisfaction scores by 18%.`,
      ]);
      onToast("✓ Transformed bullet with action verbs");
    } catch {
      setEnhancedBullets([
        `Orchestrated end-to-end bug resolution sprints, achieving a 99.4% SLA adherence rate across 200+ monthly customer tickets.`,
        `Spearheaded technical triage workflows, reducing ticket resolution time by 35% through targeted debugging and root-cause analysis.`,
        `Collaborated with QA to resolve 50+ critical software bugs, elevating customer satisfaction rating to 96%.`,
      ]);
    } finally {
      setIsEnhancingBullets(false);
    }
  };

  // Skills Handler
  const handleSuggestSkills = async () => {
    setIsSuggestingSkills(true);
    try {
      const res = await fetch("/api/ai/match-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume,
          jobDescription: `Required role: ${skillRole}. High demand skills for modern industry standards.`,
        }),
      });
      const data = await res.json();
      if (data.matchingSkills?.length) {
        setSuggestedSkills([...data.matchingSkills, ...data.missingKeywords]);
      } else {
        setSuggestedSkills(["TypeScript", "React", "Next.js", "Tailwind CSS", "REST APIs", "Git", "System Design", "Agile"]);
      }
      onToast("✓ Found industry-standard skills for role");
    } catch {
      setSuggestedSkills(["TypeScript", "React", "Node.js", "SQL", "Git", "REST APIs", "Docker", "Agile"]);
    } finally {
      setIsSuggestingSkills(false);
    }
  };

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      onToast("Copied to clipboard");
    }
  };

  const applySummaryToResume = (text: string) => {
    onChange((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        summary: text,
      },
    }));
    onToast("✓ Applied summary to active resume");
  };

  const addSkillToResume = (skillName: string) => {
    if (resume.skills.some((s) => s.name.toLowerCase() === skillName.toLowerCase())) {
      onToast(`"${skillName}" is already in your resume`);
      return;
    }
    const newSkill: SkillItem = {
      id: `skill-${Date.now()}`,
      name: skillName,
      level: "Advanced",
    };
    onChange((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
    onToast(`✓ Added "${skillName}" to resume skills`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900">
          AI Resume Assistant
        </h1>
        <p className="text-sm text-gray-600 max-w-lg mx-auto">
          Improve summaries, rewrite bullet points with action verbs, and discover missing ATS keywords.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-1 p-1 bg-gray-100 rounded-lg max-w-md mx-auto">
        <button
          onClick={() => setActiveTab("summary")}
          className={`flex-1 py-1.5 px-3 rounded text-xs font-semibold transition-colors ${
            activeTab === "summary"
              ? "bg-white text-blue-600 shadow-xs"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Summary Generator
        </button>
        <button
          onClick={() => setActiveTab("bullets")}
          className={`flex-1 py-1.5 px-3 rounded text-xs font-semibold transition-colors ${
            activeTab === "bullets"
              ? "bg-white text-blue-600 shadow-xs"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Bullet Enhancer
        </button>
        <button
          onClick={() => setActiveTab("skills")}
          className={`flex-1 py-1.5 px-3 rounded text-xs font-semibold transition-colors ${
            activeTab === "skills"
              ? "bg-white text-blue-600 shadow-xs"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Skills Finder
        </button>
      </div>

      {/* TAB 1: SUMMARY GENERATOR */}
      {activeTab === "summary" && (
        <div className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Target Role
              </label>
              <input
                type="text"
                value={summaryRole}
                onChange={(e) => setSummaryRole(e.target.value)}
                placeholder="e.g. Software Engineer"
                className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-xs text-gray-900 focus:border-blue-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Experience
              </label>
              <input
                type="text"
                value={summaryExp}
                onChange={(e) => setSummaryExp(e.target.value)}
                placeholder="e.g. 5+ years"
                className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-xs text-gray-900 focus:border-blue-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Specialties
              </label>
              <input
                type="text"
                value={summarySkills}
                onChange={(e) => setSummarySkills(e.target.value)}
                placeholder="e.g. React, Node, AWS"
                className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-xs text-gray-900 focus:border-blue-600 outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleGenerateSummaries}
            disabled={isGeneratingSummary}
            className="w-full py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isGeneratingSummary ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate Summary Variations</span>
              </>
            )}
          </button>

          {/* Results Grid */}
          {summaryResults && (
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <h3 className="font-bold text-xs uppercase tracking-wider text-gray-700">
                Choose a Style:
              </h3>

              {/* Variation 1 */}
              <div className="p-3.5 rounded-lg border border-gray-200 bg-gray-50 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-gray-800">
                  <span>Professional Standard</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(summaryResults.professional)}
                      className="text-gray-500 hover:text-gray-900"
                      title="Copy"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => applySummaryToResume(summaryResults.professional)}
                      className="text-xs text-blue-600 font-semibold hover:underline"
                    >
                      Apply
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {summaryResults.professional}
                </p>
              </div>

              {/* Variation 2 */}
              <div className="p-3.5 rounded-lg border border-gray-200 bg-gray-50 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-gray-800">
                  <span>Achievement & Metrics</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(summaryResults.metrics)}
                      className="text-gray-500 hover:text-gray-900"
                      title="Copy"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => applySummaryToResume(summaryResults.metrics)}
                      className="text-xs text-blue-600 font-semibold hover:underline"
                    >
                      Apply
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {summaryResults.metrics}
                </p>
              </div>

              {/* Variation 3 */}
              <div className="p-3.5 rounded-lg border border-gray-200 bg-gray-50 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-gray-800">
                  <span>Concise & Direct</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(summaryResults.executive)}
                      className="text-gray-500 hover:text-gray-900"
                      title="Copy"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => applySummaryToResume(summaryResults.executive)}
                      className="text-xs text-blue-600 font-semibold hover:underline"
                    >
                      Apply
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {summaryResults.executive}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: BULLET ENHANCER */}
      {activeTab === "bullets" && (
        <div className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
              Input bullet point to enhance:
            </label>
            <textarea
              rows={3}
              value={weakBullet}
              onChange={(e) => setWeakBullet(e.target.value)}
              placeholder="e.g. Responsible for customer support tickets and fixing bugs."
              className="w-full p-3 rounded-md border border-gray-300 text-xs bg-white text-gray-900 focus:border-blue-600 outline-none leading-relaxed"
            />
          </div>

          <button
            onClick={handleEnhanceBullet}
            disabled={isEnhancingBullets}
            className="w-full py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isEnhancingBullets ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Enhancing...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-3.5 h-3.5" />
                <span>Rewrite with Action Verbs</span>
              </>
            )}
          </button>

          {enhancedBullets.length > 0 && (
            <div className="space-y-2 pt-4 border-t border-gray-200">
              <h3 className="font-bold text-xs uppercase tracking-wider text-gray-700">
                Enhanced Bullet Suggestions:
              </h3>
              {enhancedBullets.map((b, i) => (
                <div
                  key={i}
                  className="p-3 rounded-md border border-gray-200 bg-gray-50 flex items-start justify-between gap-3 text-xs text-gray-800"
                >
                  <p className="leading-relaxed">• {b}</p>
                  <button
                    onClick={() => copyToClipboard(b)}
                    className="text-gray-400 hover:text-gray-700 p-1 flex-shrink-0"
                    title="Copy"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SKILLS FINDER */}
      {activeTab === "skills" && (
        <div className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
              Target Role:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={skillRole}
                onChange={(e) => setSkillRole(e.target.value)}
                placeholder="e.g. Cloud DevOps Engineer, Product Manager"
                className="flex-1 px-3 py-2 rounded-md border border-gray-300 text-xs bg-white text-gray-900 focus:border-blue-600 outline-none"
              />
              <button
                onClick={handleSuggestSkills}
                disabled={isSuggestingSkills}
                className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Find Skills</span>
              </button>
            </div>
          </div>

          {suggestedSkills.length > 0 && (
            <div className="space-y-2 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs uppercase tracking-wider text-gray-700">
                  Recommended Skills for {skillRole}:
                </h3>
                <span className="text-[11px] text-gray-400">Click to add to your resume</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {suggestedSkills.map((sk, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => addSkillToResume(sk)}
                    className="px-2.5 py-1 rounded border border-gray-200 bg-gray-50 hover:bg-blue-50 hover:border-blue-300 text-xs font-medium text-gray-800 transition-colors"
                  >
                    + {sk}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Return to builder button */}
      <div className="text-center pt-2">
        <button
          onClick={onNavigateToBuilder}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline"
        >
          <span>Return to Resume Builder</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
