// Job description data model
export interface JobDescription {
  id?: string;
  title: string;
  company?: string;
  description: string;
  requirements: string[];
  skills: string[];
  experience: string;
  location?: string;
  salary?: string;
  createdAt?: string;
}

export interface MatchResult {
  candidate: Candidate;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  reasoning: string;
}

export interface MatchRequest {
  jobDescription: JobDescription;
  topN?: number;
}

import { Candidate } from './candidate.types';
