// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface UploadResponse {
  candidateId: string;
  candidate: Candidate;
  message: string;
}

export interface ErrorResponse {
  error: string;
  detail?: string;
  statusCode: number;
}

import { Candidate } from './candidate.types';
