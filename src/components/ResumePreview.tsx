import React from "react";
import { ResumeData } from "../types";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
} from "lucide-react";

interface ResumePreviewProps {
  resume: ResumeData;
  scale?: number;
  isPrintMode?: boolean;
  elementId?: string;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  resume,
  scale = 1,
  isPrintMode = false,
  elementId = "resume-a4-preview-content",
}) => {
  const {
    personal,
    experiences,
    educations,
    skills,
    projects,
    certifications,
    languages,
    awards,
    customization,
    templateId,
  } = resume;

  const primaryColor = customization?.primaryColor || "#2563EB";
  const font = customization?.font || "Inter";
  const lineSpacing = customization?.lineSpacing || "normal";
  const isTwoColumn = customization?.layout === "two-column" || templateId === "compact-split";

  // Font family helper
  const getFontFamily = () => {
    switch (font) {
      case "Manrope":
        return "'Manrope', sans-serif";
      case "Merriweather":
        return "'Merriweather', Georgia, serif";
      case "JetBrains Mono":
        return "'JetBrains Mono', monospace";
      default:
        return "'Inter', sans-serif";
    }
  };

  const getLineHeightClass = () => {
    switch (lineSpacing) {
      case "tight":
        return "leading-tight space-y-2";
      case "relaxed":
        return "leading-relaxed space-y-4";
      default:
        return "leading-normal space-y-3";
    }
  };

  const isATSClassic = templateId === "ats-classic";
  const isMinimal = templateId === "minimalist-pure";

  return (
    <div
      style={{
        transform: !isPrintMode && scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: "top center",
      }}
      className="transition-transform duration-150"
    >
      <div
        id={elementId}
        className="resume-a4-page bg-white text-gray-900 shadow-sm border border-gray-200 rounded-sm mx-auto overflow-hidden min-h-[1123px] w-[794px] max-w-full print:shadow-none print:w-full print:rounded-none print:border-none"
        style={{
          fontFamily: getFontFamily(),
        }}
      >
        {/* Clean Header */}
        <div className="p-8 pb-4 border-b border-gray-200">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1
                className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900"
                style={{ color: isATSClassic || isMinimal ? "#111827" : primaryColor }}
              >
                {personal.fullName || "Your Full Name"}
              </h1>

              <p className="font-medium text-sm sm:text-base text-gray-600 mt-1">
                {personal.jobTitle || "Your Professional Title"}
              </p>

              {/* Contact Info Row */}
              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-2.5 text-xs text-gray-600">
                {personal.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    <span>{personal.email}</span>
                  </div>
                )}
                {personal.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span>{personal.phone}</span>
                  </div>
                )}
                {personal.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{personal.location}</span>
                  </div>
                )}
                {personal.website && (
                  <div className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-gray-400" />
                    <span>{personal.website}</span>
                  </div>
                )}
                {personal.linkedin && (
                  <div className="flex items-center gap-1">
                    <Linkedin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{personal.linkedin}</span>
                  </div>
                )}
                {personal.github && (
                  <div className="flex items-center gap-1">
                    <Github className="w-3.5 h-3.5 text-gray-400" />
                    <span>{personal.github}</span>
                  </div>
                )}
              </div>
            </div>

            {customization?.showPhoto && personal.profilePhoto && !isATSClassic && (
              <div className="flex-shrink-0">
                <img
                  src={personal.profilePhoto}
                  alt={personal.fullName}
                  className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                />
              </div>
            )}
          </div>
        </div>

        {/* Resume Body */}
        <div className={`p-8 pt-4 ${isTwoColumn ? "grid grid-cols-12 gap-6" : "space-y-5"}`}>
          {/* Main Column */}
          <div className={`${isTwoColumn ? "col-span-8 space-y-5" : "space-y-5"}`}>
            {/* Summary */}
            {personal.summary && (
              <section className="space-y-1.5">
                <h2
                  className="font-bold uppercase tracking-wider text-xs border-b border-gray-200 pb-1"
                  style={{ color: isATSClassic ? "#111827" : primaryColor }}
                >
                  Professional Summary
                </h2>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {personal.summary}
                </p>
              </section>
            )}

            {/* Experience */}
            {experiences.length > 0 && (
              <section className="space-y-3">
                <h2
                  className="font-bold uppercase tracking-wider text-xs border-b border-gray-200 pb-1"
                  style={{ color: isATSClassic ? "#111827" : primaryColor }}
                >
                  Work Experience
                </h2>

                <div className={getLineHeightClass()}>
                  {experiences.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-xs text-gray-900">
                            {exp.jobTitle || "Job Title"}
                          </h3>
                          <p className="text-xs text-gray-600">
                            {exp.company}{exp.location ? ` — ${exp.location}` : ""}
                          </p>
                        </div>
                        <span className="text-[11px] text-gray-500 whitespace-nowrap">
                          {exp.startDate || "Start"} – {exp.isCurrent ? "Present" : exp.endDate || "End"}
                        </span>
                      </div>
                      {exp.description && (
                        <div className="text-xs text-gray-700 whitespace-pre-line leading-relaxed pl-1">
                          {exp.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section className="space-y-3">
                <h2
                  className="font-bold uppercase tracking-wider text-xs border-b border-gray-200 pb-1"
                  style={{ color: isATSClassic ? "#111827" : primaryColor }}
                >
                  Key Projects
                </h2>

                <div className="space-y-2">
                  {projects.map((proj) => (
                    <div key={proj.id} className="space-y-0.5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                          <span>{proj.name}</span>
                          {proj.role && <span className="text-[11px] font-normal text-gray-500">({proj.role})</span>}
                        </h3>
                        {proj.url && (
                          <a
                            href={proj.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] font-medium text-blue-600 hover:underline"
                          >
                            Link
                          </a>
                        )}
                      </div>
                      {proj.technologies && (
                        <p className="text-[11px] text-gray-500">
                          Tech: {proj.technologies}
                        </p>
                      )}
                      {proj.description && (
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {proj.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Single-column trailing sections */}
            {!isTwoColumn && (
              <>
                {/* Education */}
                {educations.length > 0 && (
                  <section className="space-y-2">
                    <h2
                      className="font-bold uppercase tracking-wider text-xs border-b border-gray-200 pb-1"
                      style={{ color: isATSClassic ? "#111827" : primaryColor }}
                    >
                      Education
                    </h2>

                    <div className="space-y-2">
                      {educations.map((edu) => (
                        <div key={edu.id} className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-xs text-gray-900">{edu.degree}</h3>
                            <p className="text-xs text-gray-600">{edu.institution}{edu.location ? `, ${edu.location}` : ""}</p>
                            {edu.description && <p className="text-[11px] text-gray-500 mt-0.5">{edu.description}</p>}
                          </div>
                          <div className="text-right">
                            <span className="text-[11px] text-gray-500">
                              {edu.startDate} – {edu.endDate}
                            </span>
                            {edu.gpa && <p className="text-[11px] text-gray-600">GPA: {edu.gpa}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                  <section className="space-y-2">
                    <h2
                      className="font-bold uppercase tracking-wider text-xs border-b border-gray-200 pb-1"
                      style={{ color: isATSClassic ? "#111827" : primaryColor }}
                    >
                      Skills & Competencies
                    </h2>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {skills.map((skill) => (
                        <span
                          key={skill.id}
                          className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-800 border border-gray-200"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {/* Certifications & Awards */}
                {(certifications.length > 0 || awards.length > 0) && (
                  <div className="grid grid-cols-2 gap-4">
                    {certifications.length > 0 && (
                      <section className="space-y-1.5">
                        <h2
                          className="font-bold uppercase tracking-wider text-xs border-b border-gray-200 pb-1"
                          style={{ color: isATSClassic ? "#111827" : primaryColor }}
                        >
                          Certifications
                        </h2>
                        {certifications.map((c) => (
                          <div key={c.id} className="text-xs">
                            <div className="font-semibold text-gray-900">{c.name}</div>
                            <div className="text-gray-500 text-[11px]">{c.issuer} • {c.issueDate}</div>
                          </div>
                        ))}
                      </section>
                    )}

                    {awards.length > 0 && (
                      <section className="space-y-1.5">
                        <h2
                          className="font-bold uppercase tracking-wider text-xs border-b border-gray-200 pb-1"
                          style={{ color: isATSClassic ? "#111827" : primaryColor }}
                        >
                          Honors & Awards
                        </h2>
                        {awards.map((a) => (
                          <div key={a.id} className="text-xs">
                            <div className="font-semibold text-gray-900">{a.title}</div>
                            <div className="text-gray-500 text-[11px]">{a.issuer} • {a.date}</div>
                          </div>
                        ))}
                      </section>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Two-Column Sidebar */}
          {isTwoColumn && (
            <div className="col-span-4 space-y-5 border-l border-gray-200 pl-5">
              {/* Skills */}
              {skills.length > 0 && (
                <section className="space-y-2">
                  <h2
                    className="font-bold uppercase tracking-wider text-xs border-b border-gray-200 pb-1"
                    style={{ color: primaryColor }}
                  >
                    Skills
                  </h2>
                  <div className="space-y-1">
                    {skills.map((skill) => (
                      <div key={skill.id} className="text-xs flex items-center justify-between">
                        <span className="font-medium text-gray-800">{skill.name}</span>
                        <span className="text-[10px] text-gray-400">{skill.level}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Education */}
              {educations.length > 0 && (
                <section className="space-y-2">
                  <h2
                    className="font-bold uppercase tracking-wider text-xs border-b border-gray-200 pb-1"
                    style={{ color: primaryColor }}
                  >
                    Education
                  </h2>
                  <div className="space-y-2">
                    {educations.map((edu) => (
                      <div key={edu.id} className="text-xs space-y-0.5">
                        <div className="font-bold text-gray-900">{edu.degree}</div>
                        <div className="text-gray-600">{edu.institution}</div>
                        <div className="text-[11px] text-gray-400">{edu.startDate} – {edu.endDate}</div>
                        {edu.gpa && <div className="text-[11px] text-gray-500">GPA: {edu.gpa}</div>}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Certifications */}
              {certifications.length > 0 && (
                <section className="space-y-1.5">
                  <h2
                    className="font-bold uppercase tracking-wider text-xs border-b border-gray-200 pb-1"
                    style={{ color: primaryColor }}
                  >
                    Certifications
                  </h2>
                  {certifications.map((c) => (
                    <div key={c.id} className="text-xs space-y-0.5">
                      <div className="font-semibold text-gray-900">{c.name}</div>
                      <div className="text-[11px] text-gray-500">{c.issuer}</div>
                    </div>
                  ))}
                </section>
              )}

              {/* Languages */}
              {languages.length > 0 && (
                <section className="space-y-1.5">
                  <h2
                    className="font-bold uppercase tracking-wider text-xs border-b border-gray-200 pb-1"
                    style={{ color: primaryColor }}
                  >
                    Languages
                  </h2>
                  <div className="space-y-1">
                    {languages.map((l) => (
                      <div key={l.id} className="text-xs flex justify-between">
                        <span className="font-medium text-gray-800">{l.language}</span>
                        <span className="text-[11px] text-gray-500">{l.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
