export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  role: string;
}

export interface SocialLinks {
  linkedin: string;
  github: string;
  whatsapp: string;
}

export interface ProfileHighlight {
  title: string;
  description: string;
}

export interface Experience {
  company: string;
  role: string;
  type: string;
  duration: string;
  description: string[];
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface Certificate {
  name: string;
  issuer: string;
}

export interface Education {
  year: string;
  degree: string;
  institution: string;
  score: string;
}

export const PROJECT_CATEGORIES = [
  'Cloud & AI',
  'Enterprise',
  'Healthcare',
  'Business & SaaS',
  'Social & Education',
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export interface Project {
  name: string;
  tagline: string;
  category: ProjectCategory;
  // Shown first and highlighted in the project designs
  featured?: boolean;
  description: string;
  techStack: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  socialLinks: SocialLinks;
  profileSummary: ProfileHighlight[];
  coreCompetencies: string[];
  careerSummary: Experience[];
  technicalSkills: SkillGroup[];
  academicDetails: Education[];
  certificates: Certificate[];
  projects: Project[];
  languages: string[];
}
