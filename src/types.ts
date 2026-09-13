export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  profilePhoto?: string;
  summary: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description: string;
}

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface SkillItem {
  id: string;
  name: string;
  level: SkillLevel;
}

export interface Project {
  id: string;
  name: string;
  role: string;
  technologies: string;
  url: string;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: "Native" | "Fluent" | "Proficient" | "Conversational" | "Basic";
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
}

export type TemplateId =
  | "modern-clean"
  | "ats-classic"
  | "executive-slate"
  | "tech-minimal"
  | "creative-accent"
  | "student-fresh"
  | "compact-split"
  | "metro-bold";

export type ResumeFont = "Inter" | "Manrope" | "Merriweather" | "JetBrains Mono";
export type ResumeLayout = "single-column" | "two-column" | "compact" | "spacious";
export type ResumeColor =
  | "#2563EB" // Modern Blue
  | "#1E293B" // Slate Navy
  | "#059669" // Emerald Green
  | "#7C3AED" // Royal Purple
  | "#000000" // Pure Classic Black
  | "#D97706" // Amber Gold
  | "#E11D48"; // Crimson Red

export interface ResumeSettingsConfig {
  font: ResumeFont;
  fontSize: "sm" | "base" | "lg";
  headingSize: "sm" | "base" | "lg";
  lineSpacing: "tight" | "normal" | "relaxed";
  primaryColor: string;
  layout: ResumeLayout;
  showPhoto: boolean;
  sectionOrder: string[];
}

export interface ResumeData {
  id: string;
  title: string;
  templateId: TemplateId;
  updatedAt: string;
  isFavorite?: boolean;
  personal: PersonalInfo;
  experiences: Experience[];
  educations: Education[];
  skills: SkillItem[];
  projects: Project[];
  certifications: Certification[];
  languages: LanguageItem[];
  awards: AwardItem[];
  interests: string[];
  references: ReferenceItem[];
  customization: ResumeSettingsConfig;
}

export interface CoverLetterData {
  id: string;
  jobTitle: string;
  company: string;
  jobDescription: string;
  tone: "Professional" | "Enthusiastic" | "Concise" | "Executive";
  content: string;
  updatedAt: string;
}

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  category: "Professional" | "Modern" | "Minimal" | "Creative" | "Executive" | "Student" | "ATS Friendly" | "Tech";
  style: "Modern" | "Professional" | "Minimal" | "Creative" | "Executive";
  industry: "Technology" | "Marketing" | "Finance" | "Healthcare" | "Design" | "Education" | "Engineering" | "Business";
  experienceLevel: "Student" | "Fresher" | "Mid-level" | "Senior" | "Executive";
  styleTag: string;
  description: string;
  isATS: boolean;
  popular?: boolean;
  isNew?: boolean;
  primaryColor: string;
}

export interface SponsorAdConfig {
  enabled: boolean;
  durationSeconds: number;
  skipDelaySeconds: number;
  sponsorName: string;
  title: string;
  tagLine: string;
  callToAction: string;
  sponsorUrl: string;
  badgeText: string;
  mediaType: "banner" | "interactive";
}

export type ActivePage =
  | "landing"
  | "templates"
  | "builder"
  | "preview"
  | "my-resumes"
  | "settings"
  | "ai-assistant"
  | "cover-letter"
  | "help"
  | "contact"
  | "privacy"
  | "terms"
  | "support-us";
