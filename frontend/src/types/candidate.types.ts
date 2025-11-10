// Candidate data model
export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  skills: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
  summary?: string;
  resumeUrl?: string;
  uploadedAt: string;
  matchScore?: number;
}

export interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  field?: string;
  year: string;
}

export interface CandidateStats {
  total: number;
  thisWeek: number;
  thisMonth: number;
  avgMatchScore: number;
}
