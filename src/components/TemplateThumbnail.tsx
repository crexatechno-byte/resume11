import React from "react";
import { TemplateDefinition } from "../types";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Award,
  Briefcase,
  GraduationCap,
  Sparkles,
} from "lucide-react";

interface TemplateThumbnailProps {
  template: TemplateDefinition;
  className?: string;
}

export const TemplateThumbnail: React.FC<TemplateThumbnailProps> = ({
  template,
  className = "",
}) => {
  const { id, primaryColor } = template;

  return (
    <div
      className={`relative w-full aspect-[210/297] bg-white rounded-md shadow-xs border border-gray-200/80 overflow-hidden select-none text-left flex flex-col font-sans transition-all ${className}`}
      style={{ fontSize: "7px", lineHeight: "1.3" }}
    >
      {/* 1. MODERN CLEAN */}
      {id === "modern-clean" && (
        <div className="p-3.5 flex flex-col h-full justify-between bg-white text-gray-800">
          <div>
            {/* Header */}
            <div className="border-b pb-2" style={{ borderColor: `${primaryColor}30` }}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-[11px] tracking-tight text-gray-900 leading-tight">
                    Alex Morgan
                  </h4>
                  <p
                    className="font-bold text-[7.5px] uppercase tracking-wider mt-0.5"
                    style={{ color: primaryColor }}
                  >
                    Senior Full-Stack Engineer
                  </p>
                </div>
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[8px] text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  AM
                </div>
              </div>

              {/* Contact row */}
              <div className="flex items-center gap-2 mt-1.5 text-[6px] text-gray-500">
                <span>alex.morgan@dev.io</span>
                <span>•</span>
                <span>+1 555-0192</span>
                <span>•</span>
                <span>San Francisco, CA</span>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-2 text-[6px] text-gray-600 leading-relaxed">
              Results-driven software engineer with 6+ years designing scalable cloud microservices,
              React frontends, and resilient distributed architectures.
            </div>

            {/* Experience */}
            <div className="mt-2.5">
              <div
                className="font-bold text-[7px] uppercase tracking-wider pb-0.5 border-b"
                style={{ color: primaryColor, borderColor: `${primaryColor}40` }}
              >
                Experience
              </div>

              <div className="mt-1.5 space-y-1">
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[6.5px] text-gray-900">
                      Senior Engineer • Apex Cloud
                    </span>
                    <span className="text-[5.5px] text-gray-400">2021 – Present</span>
                  </div>
                  <div className="text-[5.8px] text-gray-600 pl-1.5 space-y-0.5 mt-0.5">
                    <div>• Architected real-time event pipeline handling 40k req/s</div>
                    <div>• Decreased page latency by 38% via edge SSR caching</div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[6.5px] text-gray-900">
                      Software Engineer • Nexus Labs
                    </span>
                    <span className="text-[5.5px] text-gray-400">2019 – 2021</span>
                  </div>
                  <div className="text-[5.8px] text-gray-600 pl-1.5 mt-0.5">
                    <div>• Shipped 12 web modules with React, Node & TypeScript</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mt-2">
              <div
                className="font-bold text-[7px] uppercase tracking-wider pb-0.5 border-b"
                style={{ color: primaryColor, borderColor: `${primaryColor}40` }}
              >
                Education
              </div>
              <div className="mt-1 flex justify-between items-baseline text-[6px]">
                <span className="font-semibold text-gray-800">B.S. Computer Science</span>
                <span className="text-gray-400">Univ. of Washington</span>
              </div>
            </div>
          </div>

          {/* Skills Pills */}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex flex-wrap gap-1">
              {["React", "TypeScript", "Node.js", "GraphQL", "AWS", "Docker"].map((sk) => (
                <span
                  key={sk}
                  className="px-1.5 py-0.5 rounded text-[5.5px] font-semibold"
                  style={{
                    backgroundColor: `${primaryColor}12`,
                    color: primaryColor,
                  }}
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. ATS CLASSIC */}
      {id === "ats-classic" && (
        <div className="p-3.5 flex flex-col h-full justify-between bg-white text-gray-900 font-sans">
          <div>
            {/* Centered ATS Header */}
            <div className="text-center pb-2 border-b border-gray-800">
              <h4 className="font-black text-[11px] tracking-wider text-gray-950 uppercase">
                Sarah Jenkins
              </h4>
              <p className="font-semibold text-[6.5px] text-gray-700 tracking-wide mt-0.5">
                Senior Marketing Operations Director
              </p>
              <div className="text-[5.8px] text-gray-600 mt-1">
                Chicago, IL | (555) 345-6789 | sarah.jenkins@email.com | linkedin.com/in/sarahj
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mt-2">
              <div className="font-bold text-[6.8px] uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-0.5">
                Professional Summary
              </div>
              <p className="mt-1 text-[5.8px] text-gray-700 leading-relaxed">
                Strategic marketing leader with 8+ years driving omnichannel growth, marketing
                automation, and high-impact revenue campaigns for enterprise organizations.
              </p>
            </div>

            {/* Work Experience */}
            <div className="mt-2.5">
              <div className="font-bold text-[6.8px] uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-0.5">
                Work Experience
              </div>

              <div className="mt-1 space-y-1.5">
                <div>
                  <div className="flex justify-between font-bold text-[6.2px] text-gray-900">
                    <span>Director of Marketing Ops • Omnicom Media</span>
                    <span>2020 – Present</span>
                  </div>
                  <div className="text-[5.5px] text-gray-700 pl-1 space-y-0.5 mt-0.5">
                    <div>• Directed $12M multi-channel marketing budget across North America</div>
                    <div>• Improved conversion rate by 27% through targeted lifecycle flows</div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-[6.2px] text-gray-900">
                    <span>Lead Marketing Manager • Catalyst Digital</span>
                    <span>2017 – 2020</span>
                  </div>
                  <div className="text-[5.5px] text-gray-700 pl-1 mt-0.5">
                    <div>• Scaled inbound lead generation by 45% via automated workflows</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Competencies */}
          <div className="mt-2 pt-1.5 border-t border-gray-800">
            <div className="font-bold text-[6.5px] uppercase tracking-wider text-gray-950">
              Core Competencies & Tools
            </div>
            <div className="text-[5.8px] text-gray-700 mt-0.5">
              HubSpot, Salesforce, Google Analytics 4, Marketo, SQL, A/B Testing, Budget Management
            </div>
          </div>
        </div>
      )}

      {/* 3. EXECUTIVE SLATE */}
      {id === "executive-slate" && (
        <div className="flex flex-col h-full justify-between bg-white text-gray-800">
          <div>
            {/* Top Slate Banner */}
            <div className="bg-[#1E293B] text-white p-3 pt-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[11px] tracking-wide text-white font-serif">
                    Arthur Vance
                  </h4>
                  <p className="text-[6.5px] font-semibold text-slate-300 tracking-wider uppercase mt-0.5">
                    Vice President of Global Operations
                  </p>
                </div>
                <span className="text-[6px] text-slate-300 border border-slate-600 px-1.5 py-0.5 rounded">
                  Executive
                </span>
              </div>
              <div className="flex gap-2 mt-1.5 text-[5.5px] text-slate-300">
                <span>New York, NY</span>
                <span>•</span>
                <span>arthur.vance@corp.com</span>
                <span>•</span>
                <span>(555) 789-0123</span>
              </div>
            </div>

            {/* Metrics Callout */}
            <div className="p-3 pb-1">
              <div className="grid grid-cols-3 gap-1 p-1.5 bg-slate-50 border border-slate-200 rounded text-center">
                <div>
                  <div className="font-bold text-[7.5px] text-slate-900">$45M+</div>
                  <div className="text-[5px] text-slate-500 uppercase">P&L Managed</div>
                </div>
                <div>
                  <div className="font-bold text-[7.5px] text-slate-900">+32%</div>
                  <div className="text-[5px] text-slate-500 uppercase">YoY Efficiency</div>
                </div>
                <div>
                  <div className="font-bold text-[7.5px] text-slate-900">120+</div>
                  <div className="text-[5px] text-slate-500 uppercase">Staff Led</div>
                </div>
              </div>

              {/* Executive Experience */}
              <div className="mt-2.5">
                <div className="font-serif font-bold text-[7px] uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                  Executive Leadership
                </div>
                <div className="mt-1.5 space-y-1">
                  <div>
                    <div className="flex justify-between font-bold text-[6.5px] text-slate-900">
                      <span>VP Global Operations • Sterling Capital</span>
                      <span className="text-[5.5px] text-slate-500">2018 – Present</span>
                    </div>
                    <div className="text-[5.8px] text-slate-600 pl-1 mt-0.5 space-y-0.5">
                      <div>• Headed international supply chain restructuring across 14 hubs</div>
                      <div>• Reduced annual procurement costs by $4.2M through automation</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 pt-0 border-t border-slate-100 flex justify-between items-center text-[5.5px] text-slate-500">
            <span>MBA, Columbia Business School</span>
            <span className="font-semibold text-slate-700">Strategic Leadership • P&L • Mergers</span>
          </div>
        </div>
      )}

      {/* 4. TECH MINIMAL */}
      {id === "tech-minimal" && (
        <div className="p-3.5 flex flex-col h-full justify-between bg-white text-gray-800 font-mono">
          <div>
            {/* Tech Header */}
            <div className="border-b border-gray-200 pb-2">
              <div className="text-[6px] text-emerald-600 font-bold">
                // SYSTEM_RESUME_V2.4
              </div>
              <h4 className="font-bold text-[10.5px] text-gray-900 font-sans tracking-tight">
                Devon Chen
              </h4>
              <p className="text-[6.5px] text-emerald-600 font-semibold font-mono">
                Staff Systems & Distributed Architect
              </p>
              <div className="text-[5.5px] text-gray-500 mt-1 font-mono">
                devon.chen@github • san francisco • go/rust/k8s
              </div>
            </div>

            {/* Skills Matrix */}
            <div className="mt-2">
              <div className="text-[6.5px] font-bold text-gray-900 uppercase">
                &gt; Tech Stack
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {["Go", "Rust", "Kubernetes", "gRPC", "PostgreSQL", "Kafka", "Linux"].map((t) => (
                  <span
                    key={t}
                    className="px-1 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[5px] font-mono border border-emerald-200/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Work */}
            <div className="mt-2.5">
              <div className="text-[6.5px] font-bold text-gray-900 uppercase">
                &gt; Experience
              </div>
              <div className="mt-1 space-y-1">
                <div>
                  <div className="flex justify-between font-bold text-[6px] text-gray-900">
                    <span>Staff Engineer @ CloudScale</span>
                    <span className="text-[5px] text-gray-400">2020-PRESENT</span>
                  </div>
                  <div className="text-[5.5px] text-gray-600 mt-0.5 space-y-0.5">
                    <div>* Built consensus raft engine with 99.999% SLA</div>
                    <div>* Scaled distributed caching across 8 datacenters</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-1.5 border-t border-emerald-100 flex justify-between items-center text-[5.5px] text-gray-400">
            <span>github.com/devonchen</span>
            <span className="text-emerald-700 font-bold">● High Availability Ready</span>
          </div>
        </div>
      )}

      {/* 5. CREATIVE ACCENT */}
      {id === "creative-accent" && (
        <div className="flex h-full bg-white text-gray-800">
          {/* Left Purple Accent Bar */}
          <div className="w-2.5 bg-purple-600 flex-shrink-0" />

          <div className="p-3.5 pl-3 flex flex-col justify-between flex-1">
            <div>
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-extrabold text-[11px] tracking-tight text-gray-900">
                    Maya Patel
                  </h4>
                  <p className="font-bold text-[7px] text-purple-600 uppercase tracking-wide mt-0.5">
                    Lead Product & UI/UX Designer
                  </p>
                  <div className="text-[5.8px] text-gray-500 mt-1">
                    mayapatel.design • New York, NY • maya@design.co
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 font-bold text-[7.5px] flex items-center justify-center">
                  MP
                </div>
              </div>

              {/* Portfolio highlights */}
              <div className="mt-2.5">
                <div className="font-bold text-[7px] text-purple-700 uppercase tracking-wider pb-0.5 border-b border-purple-100">
                  Selected Work
                </div>
                <div className="mt-1 space-y-1">
                  <div>
                    <div className="flex justify-between font-semibold text-[6.2px] text-gray-900">
                      <span>Fintech Mobile Design System</span>
                      <span className="text-[5px] text-gray-400">2022</span>
                    </div>
                    <div className="text-[5.5px] text-gray-600">
                      Designed 60+ accessible components for 1.8M app users.
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-[6.2px] text-gray-900">
                      <span>SaaS Analytics Dashboard</span>
                      <span className="text-[5px] text-gray-400">2021</span>
                    </div>
                    <div className="text-[5.5px] text-gray-600">
                      Redesigned user retention dashboard, boosted daily active use by 22%.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="pt-2 border-t border-purple-50">
              <div className="flex flex-wrap gap-1">
                {["Figma", "Design Systems", "User Testing", "Prototyping", "Design Ops"].map((s) => (
                  <span
                    key={s}
                    className="px-1.5 py-0.5 bg-purple-50 text-purple-700 font-medium text-[5.5px] rounded"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. STUDENT FRESH */}
      {id === "student-fresh" && (
        <div className="p-3.5 flex flex-col h-full justify-between bg-white text-gray-800">
          <div>
            {/* Header */}
            <div className="pb-2 border-b border-blue-100">
              <h4 className="font-bold text-[11px] text-gray-900">Lucas Miller</h4>
              <p className="text-[7px] font-semibold text-blue-600 uppercase tracking-wider mt-0.5">
                Computer Science Graduate
              </p>
              <div className="text-[5.8px] text-gray-500 mt-1">
                lucas.m@college.edu • Austin, TX • (555) 234-9876 • github.com/lucasm
              </div>
            </div>

            {/* Education First */}
            <div className="mt-2">
              <div className="font-bold text-[7px] uppercase tracking-wider text-blue-700 border-b border-blue-200 pb-0.5">
                Education
              </div>
              <div className="mt-1">
                <div className="flex justify-between font-bold text-[6.5px] text-gray-900">
                  <span>B.S. in Computer Science</span>
                  <span className="text-[5.5px] text-gray-500">Grad: May 2024</span>
                </div>
                <div className="text-[5.8px] text-gray-600">
                  University of Texas at Austin • GPA: 3.89 / 4.0 (Dean's List)
                </div>
                <div className="text-[5.3px] text-gray-500 mt-0.5">
                  Coursework: Data Structures, Machine Learning, Web Engineering, Security
                </div>
              </div>
            </div>

            {/* Projects & Internships */}
            <div className="mt-2.5">
              <div className="font-bold text-[7px] uppercase tracking-wider text-blue-700 border-b border-blue-200 pb-0.5">
                Projects & Experience
              </div>
              <div className="mt-1 space-y-1">
                <div>
                  <div className="flex justify-between font-semibold text-[6.2px] text-gray-900">
                    <span>Software Intern • Austin FinTech</span>
                    <span className="text-[5px] text-gray-400">Summer 2023</span>
                  </div>
                  <div className="text-[5.5px] text-gray-600">
                    Built React transaction dashboard with Python REST backend.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-1.5 border-t border-gray-100 flex justify-between items-center text-[5.5px] text-gray-500">
            <span>President, ACM Student Chapter</span>
            <span className="font-semibold text-blue-600">Entry-Level / Fresher Ready</span>
          </div>
        </div>
      )}

      {/* 7. COMPACT SPLIT (Two Column) */}
      {id === "compact-split" && (
        <div className="flex h-full bg-white text-gray-800">
          {/* Left Column (35%) */}
          <div className="w-[34%] bg-slate-100 p-2.5 pt-3 border-r border-slate-200 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-7 h-7 rounded-full bg-slate-800 text-white font-bold text-[9px] flex items-center justify-center mx-auto">
                ER
              </div>
              <div className="text-center">
                <div className="font-bold text-[7px] text-slate-900">Elena Rostova</div>
                <div className="text-[5px] text-slate-500 uppercase">Healthcare Ops</div>
              </div>

              {/* Left Contact */}
              <div className="text-[5px] text-slate-600 space-y-0.5 border-t border-slate-200 pt-1">
                <div>elena@health.org</div>
                <div>+1 555-4321</div>
                <div>Boston, MA</div>
              </div>

              {/* Left Skills */}
              <div className="border-t border-slate-200 pt-1">
                <div className="font-bold text-[5.5px] text-slate-900 uppercase">Skills</div>
                <div className="flex flex-wrap gap-0.5 mt-0.5">
                  {["HIPAA", "EHR Systems", "Epic", "Patient Ops", "Analytics"].map((s) => (
                    <span
                      key={s}
                      className="px-1 py-0.5 bg-white text-slate-700 text-[4.5px] rounded border border-slate-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-[4.8px] text-slate-400">
              Two-Column High Density Layout
            </div>
          </div>

          {/* Right Main Column (66%) */}
          <div className="w-[66%] p-3 flex flex-col justify-between">
            <div>
              <div className="border-b border-gray-200 pb-1">
                <div className="font-bold text-[8px] uppercase tracking-wider text-slate-900">
                  Career Profile
                </div>
                <p className="text-[5.5px] text-gray-600 mt-0.5 leading-relaxed">
                  Detail-oriented healthcare coordinator with 5+ years optimizing hospital workflows,
                  patient scheduling, and compliance.
                </p>
              </div>

              <div className="mt-2">
                <div className="font-bold text-[7px] uppercase tracking-wider text-slate-900 border-b border-gray-200 pb-0.5">
                  Experience
                </div>
                <div className="mt-1 space-y-1">
                  <div>
                    <div className="font-semibold text-[6px] text-gray-900">
                      Operations Specialist • Mass General
                    </div>
                    <div className="text-[5px] text-gray-400">2021 – Present</div>
                    <div className="text-[5.3px] text-gray-600 pl-1 mt-0.5">
                      <div>• Managed intake workflow for 350+ daily clinic visits</div>
                      <div>• Upgraded EHR dispatch with 99.4% accuracy rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-1 border-t border-gray-100 text-[5px] text-gray-400">
              B.S. Healthcare Administration, Boston Univ.
            </div>
          </div>
        </div>
      )}

      {/* 8. MINIMALIST PURE */}
      {id === "minimalist-pure" && (
        <div className="p-4 flex flex-col h-full justify-between bg-white text-gray-800">
          <div>
            {/* Ultra Clean Minimalist Header */}
            <div className="pb-2 border-b border-gray-300">
              <h4 className="font-medium text-[11px] tracking-widest text-gray-900 uppercase">
                Kai Lindberg
              </h4>
              <p className="text-[6.5px] text-gray-500 tracking-wider mt-0.5">
                Brand Strategy & Editorial Direction
              </p>
              <div className="text-[5.5px] text-gray-400 mt-1 tracking-wide">
                Stockholm & Remote • kai@lindberg.studio • +46 8 123 456
              </div>
            </div>

            {/* Experience */}
            <div className="mt-2.5">
              <div className="text-[6.5px] font-semibold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-0.5">
                Selected Roles
              </div>

              <div className="mt-1.5 space-y-1.5">
                <div>
                  <div className="flex justify-between text-[6px] text-gray-900">
                    <span className="font-medium">Studio Director • Nord Form</span>
                    <span className="text-gray-400">2020 – 2024</span>
                  </div>
                  <div className="text-[5.5px] text-gray-600 pl-1 mt-0.5">
                    Led brand relaunch and art direction across European design campaigns.
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[6px] text-gray-900">
                    <span className="font-medium">Senior Strategist • Base Visuals</span>
                    <span className="text-gray-400">2017 – 2020</span>
                  </div>
                  <div className="text-[5.5px] text-gray-600 pl-1 mt-0.5">
                    Developed positioning frameworks for contemporary lifestyle brands.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-200 flex justify-between items-center text-[5.5px] text-gray-400 tracking-wider uppercase">
            <span>Clean Typography</span>
            <span>Uncluttered ATS Read</span>
          </div>
        </div>
      )}

      {/* Fallback for any other template */}
      {!["modern-clean", "ats-classic", "executive-slate", "tech-minimal", "creative-accent", "student-fresh", "compact-split", "minimalist-pure"].includes(id) && (
        <div className="p-3.5 flex flex-col h-full justify-between bg-white text-gray-800">
          <div>
            <div className="pb-2 border-b" style={{ borderColor: `${primaryColor}40` }}>
              <h4 className="font-bold text-[11px] text-gray-900">{template.name}</h4>
              <p className="text-[7px] font-semibold" style={{ color: primaryColor }}>
                {template.category}
              </p>
            </div>
            <div className="mt-2 text-[6px] text-gray-600 leading-relaxed">
              {template.description}
            </div>
          </div>
          <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-[6px] text-gray-400">
            <span>ATS Compliant</span>
            <span style={{ color: primaryColor }}>{template.styleTag}</span>
          </div>
        </div>
      )}
    </div>
  );
};
