import React, { useState } from "react";
import { ActivePage, TemplateDefinition } from "../types";
import { TEMPLATES } from "../data/templates";
import { TemplateThumbnail } from "../components/TemplateThumbnail";
import { AdBanner160x300 } from "../components/AdBanner160x300";
import { SMART_LINK_URL } from "../config/ads";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  FileDown,
  Layout,
  Star,
  FileCheck,
  Check,
  Zap,
  Layers,
  Heart,
  Eye,
  Sliders,
  FileText,
  ExternalLink,
} from "lucide-react";

interface LandingPageProps {
  onNavigate: (page: ActivePage) => void;
  onSelectTemplate: (templateId: string) => void;
  onPreviewTemplate?: (template: TemplateDefinition) => void;
  onStartBuilder: () => void;
  onToast: (msg: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onSelectTemplate,
  onPreviewTemplate,
  onStartBuilder,
  onToast,
}) => {
  // AI Playground demo state
  const [demoRole, setDemoRole] = useState("Software Engineer at ABC Company");
  const [demoType, setDemoType] = useState<"summary" | "bullets" | "skills">("summary");
  const [demoOutput, setDemoOutput] = useState(
    "Full-Stack Software Engineer with 5+ years of experience engineering high-throughput distributed systems and responsive web applications. Increased core application performance by 35% and reduced build times across 12 production microservices."
  );
  const [demoLoading, setDemoLoading] = useState(false);

  const handleDemoGenerate = async () => {
    setDemoLoading(true);
    try {
      if (demoType === "summary") {
        const res = await fetch("/api/ai/improve-summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            summary: `Software engineer experienced in cloud architecture and web apps.`,
            mode: "achievement",
            role: demoRole,
          }),
        });
        const data = await res.json();
        if (data.result) setDemoOutput(data.result);
      } else if (demoType === "bullets") {
        const res = await fetch("/api/ai/suggest-bullets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role: demoRole,
            currentDescription: "Developed features for customer portal and improved performance.",
          }),
        });
        const data = await res.json();
        if (data.bullets) {
          setDemoOutput(data.bullets.map((b: string) => `• ${b}`).join("\n\n"));
        }
      } else {
        const res = await fetch("/api/ai/suggest-skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: demoRole }),
        });
        const data = await res.json();
        if (data.skills) {
          setDemoOutput(data.skills.slice(0, 10).join(", "));
        }
      }
      onToast("Generated content with AI");
    } catch {
      setDemoOutput(
        "Senior Software Engineer specializing in scalable TypeScript microservices, automated CI/CD pipelines, and high-availability database architecture. Accelerated deployment cadence by 40%."
      );
      onToast("Demo output ready");
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-20">
      {/* 3. HERO SECTION */}
      <section className="pt-12 sm:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Copy */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% Free • No Sign-Up Required</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              Build a resume that gets noticed.
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
              Create a professional, ATS-friendly resume in minutes — completely free, no sign-up needed.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                id="hero-create-resume-cta"
                onClick={onStartBuilder}
                className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors flex items-center justify-center gap-2"
              >
                <span>Create My Resume — It's Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate("templates")}
                className="w-full sm:w-auto px-5 py-3 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Explore Templates</span>
              </button>

              <a
                href={SMART_LINK_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-smart-link-btn"
                className="w-full sm:w-auto px-4 py-3 rounded-lg text-sm font-semibold text-amber-950 bg-linear-to-r from-amber-200 via-amber-300 to-orange-300 hover:from-amber-300 hover:to-orange-400 border border-amber-300/80 transition-all flex items-center justify-center gap-2 shadow-2xs"
              >
                <Sparkles className="w-4 h-4 text-amber-800 animate-pulse" />
                <span>Special Offers</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-800" />
              </a>
            </div>

            {/* Trust indicators icon row */}
            <div className="pt-6 border-t border-gray-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-gray-600 font-medium">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>ATS-friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>No account required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>Easy PDF export</span>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Resume Preview inside plain browser frame */}
          <div className="lg:col-span-6">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              {/* Browser Window Header */}
              <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs font-mono text-gray-400 bg-white px-3 py-0.5 rounded border border-gray-200">
                    resume-maker.app/preview
                  </span>
                </div>
              </div>

              {/* Realistic A4-style Static Preview */}
              <div className="p-6 sm:p-8 bg-white space-y-5 text-gray-900 font-sans">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Alex Morgan
                  </h2>
                  <p className="text-xs font-medium text-blue-600 mt-0.5">
                    Senior Full-Stack Engineer
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">
                    alex.morgan@email.com • +1 (555) 234-5678 • San Francisco, CA • linkedin.com/in/alexmorgan
                  </p>
                </div>

                {/* Summary */}
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 border-b border-gray-200 pb-1">
                    Professional Summary
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed pt-1">
                    Results-oriented Senior Software Engineer with 6+ years of experience architecting resilient distributed web applications. Proven expertise in React, TypeScript, and cloud systems, delivering 30%+ performance enhancements.
                  </p>
                </div>

                {/* Experience */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 border-b border-gray-200 pb-1">
                    Work Experience
                  </h3>
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="font-semibold text-gray-900">Senior Full-Stack Engineer • Apex Cloud</span>
                      <span className="text-gray-500 text-[11px]">2023 – Present</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-normal">
                      • Spearheaded migration of legacy monolith to Next.js/Node microservices, reducing load latency by 42%.<br />
                      • Architected real-time analytics pipeline processing 50k events/sec using Kafka and Redis.
                    </p>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 border-b border-gray-200 pb-1">
                    Skills
                  </h3>
                  <p className="text-xs text-gray-600 pt-1">
                    TypeScript, React, Node.js, Next.js, PostgreSQL, Docker, AWS, GraphQL, REST APIs, Jest
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
        <div className="max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Create your resume in 3 simple steps
          </h2>
          <p className="text-sm text-gray-600">
            No registration, no payment details. Straightforward from start to download.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="p-6 rounded-xl border border-gray-200 bg-white text-left space-y-3 hover:shadow-sm transition-shadow">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="font-semibold text-base text-gray-900">Choose a Template</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Pick a professional template designed for your industry.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-xl border border-gray-200 bg-white text-left space-y-3 hover:shadow-sm transition-shadow">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="font-semibold text-base text-gray-900">Add Your Information</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Fill in your experience, education, skills, and achievements.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-xl border border-gray-200 bg-white text-left space-y-3 hover:shadow-sm transition-shadow">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="font-semibold text-base text-gray-900">Download & Apply</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Download your polished resume as a PDF and start applying — completely free.
            </p>
          </div>
        </div>
      </section>

      {/* 5. TEMPLATE SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Choose from 8+ professional templates
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Clean white backgrounds, clear typography, and ATS-friendly single and two-column layouts.
            </p>
          </div>
          <button
            onClick={() => onNavigate("templates")}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Templates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEMPLATES.map((tpl) => (
            <div
              key={tpl.id}
              className="group rounded-xl border border-gray-200 bg-white overflow-hidden flex flex-col justify-between hover:shadow-sm transition-all"
            >
              {/* Card visual mockup with realistic sample resume */}
              <div
                className="p-3 bg-gray-50 border-b border-gray-200 overflow-hidden relative cursor-pointer group/card"
                onClick={() => (onPreviewTemplate ? onPreviewTemplate(tpl) : onNavigate("templates"))}
                title={`Preview ${tpl.name}`}
              >
                {/* Badges in top corner */}
                <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1">
                  {tpl.isATS && (
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                      <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                      <span>ATS-Friendly</span>
                    </span>
                  )}
                  {tpl.popular && (
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs">
                      <Star className="w-2.5 h-2.5 fill-blue-500 stroke-none" />
                      <span>Popular</span>
                    </span>
                  )}
                  {tpl.isNew && !tpl.popular && (
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200 shadow-2xs">
                      <span>New</span>
                    </span>
                  )}
                </div>

                {/* Realistic Sample Resume Sheet */}
                <div className="w-full transform group-hover:scale-[1.03] transition-transform duration-200 shadow-xs hover:shadow-md rounded overflow-hidden">
                  <TemplateThumbnail template={tpl} />
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover/card:opacity-100 pointer-events-none">
                  <span className="px-3 py-1.5 rounded-md bg-white/95 text-gray-900 text-xs font-semibold shadow-md flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-blue-600" />
                    <span>Quick Preview</span>
                  </span>
                </div>
              </div>

              {/* Details & Actions */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-sm text-gray-900">{tpl.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {tpl.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => (onPreviewTemplate ? onPreviewTemplate(tpl) : onNavigate("templates"))}
                    className="py-1.5 px-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors text-center flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3 h-3 text-gray-500" />
                    <span>Preview</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectTemplate(tpl.id)}
                    className="py-1.5 px-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors text-center"
                  >
                    Use Template
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FEATURES SECTION */}
      <section id="features-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Everything you need to create a great resume
          </h2>
          <p className="text-sm text-gray-600">
            All features are completely free — no paywalls or premium lockouts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Professional Templates",
              desc: "Pre-designed, clean layouts crafted for recruiters and hiring managers.",
              icon: Layout,
            },
            {
              title: "ATS Friendly",
              desc: "Standard headings and single/two-column hierarchy that pass applicant tracking systems.",
              icon: FileCheck,
            },
            {
              title: "AI Writing Assistant",
              desc: "Generate professional summaries, achievement bullets, and role-matched keywords.",
              icon: Sparkles,
            },
            {
              title: "Live Preview",
              desc: "See every change update on your A4 document immediately as you type.",
              icon: Eye,
            },
            {
              title: "PDF Export",
              desc: "Download crisp, unwatermarked A4 PDFs ready for instant job applications.",
              icon: FileDown,
            },
            {
              title: "Easy Editing",
              desc: "Guided step-by-step form sections for experience, education, skills, and projects.",
              icon: Sliders,
            },
            {
              title: "Multiple Resumes",
              desc: "Create and maintain tailored drafts for different job applications on your device.",
              icon: Layers,
            },
            {
              title: "Cover Letters",
              desc: "Generate personalized cover letters tailored to your target job posting.",
              icon: FileText,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-xl border border-gray-200 bg-white space-y-2.5 hover:shadow-sm transition-shadow"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm text-gray-900">{item.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. AI RESUME ASSISTANT INTERACTIVE SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Write better resume content with AI
          </h2>
          <p className="text-sm text-gray-600">
            Generate impactful bullet points and summaries tailored to your exact role.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-xl border border-gray-200 bg-white space-y-5 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
            <div className="sm:col-span-8">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Enter your role or company:
              </label>
              <input
                type="text"
                value={demoRole}
                onChange={(e) => setDemoRole(e.target.value)}
                placeholder="e.g. Software Engineer at ABC Company"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs text-gray-900 bg-white outline-none focus:border-blue-600"
              />
            </div>

            <div className="sm:col-span-4">
              <button
                onClick={handleDemoGenerate}
                disabled={demoLoading}
                className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {demoLoading ? (
                  <span>Generating...</span>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Try AI Assistant — Free</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex gap-2 border-b border-gray-200 pb-2">
            {(["summary", "bullets", "skills"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setDemoType(t)}
                className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors ${
                  demoType === t
                    ? "bg-gray-100 text-blue-600"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {t === "summary" ? "Summary" : t === "bullets" ? "Achievement Bullets" : "Skills & Keywords"}
              </button>
            ))}
          </div>

          <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700 whitespace-pre-line leading-relaxed">
            {demoOutput}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Trusted by job seekers
          </h2>
          <p className="text-sm text-gray-600">
            Thousands have downloaded and sent out ATS-ready resumes without paying a penny.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Sarah Jenkins",
              initials: "SJ",
              role: "Marketing Manager",
              text: "I was so tired of resume sites asking for a $24 subscription right when I clicked download. Resume Maker let me download my PDF completely free. Landed 3 interviews within two weeks!",
            },
            {
              name: "David Chen",
              initials: "DC",
              role: "Junior Frontend Developer",
              text: "The ATS formatting check gave me confidence that corporate portals wouldn't reject my resume. The clean single-column layout worked like a charm.",
            },
            {
              name: "Emily Rodriguez",
              initials: "ER",
              role: "Operations Analyst",
              text: "The AI bullet point generator transformed my simple task list into clear, metric-driven achievements. Simple, fast, and no account nonsense.",
            },
          ].map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-gray-200 bg-white space-y-3 hover:shadow-sm transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  "{t.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-700 font-bold text-[11px] flex items-center justify-center flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 leading-none">{t.name}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. SPONSOR & PARTNER OFFERS SECTION */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-xl border border-amber-200 bg-linear-to-b from-amber-50/40 via-white to-white text-center space-y-4 shadow-2xs">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Sponsored Career Deals & Partner Network</span>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto">
            Discover verified career acceleration offers, hiring tools, and remote opportunities provided by our global partners.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <AdBanner160x300 />
          </div>

          <div className="pt-2">
            <a
              href={SMART_LINK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-amber-900 bg-amber-200 hover:bg-amber-300 border border-amber-300 transition-colors shadow-2xs"
            >
              <span>Explore Partner Offers</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-800" />
            </a>
          </div>
        </div>
      </section>

      {/* 10. SUPPORT US SECTION (replaces Pricing) */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-xl border border-gray-200 bg-white text-center space-y-5 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-5 h-5 fill-rose-500" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-gray-900">
              This tool is free — and we'd like to keep it that way.
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Resume Maker is 100% free for everyone. If it helped you land your next job, you can support the project with a small optional donation. Never required.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate("support-us")}
              className="px-6 py-3 rounded-lg text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 transition-colors inline-flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Support with ₹50</span>
            </button>
            <p className="text-[11px] text-gray-400 mt-2">
              Optional. You'll never be asked to pay to use any feature.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
