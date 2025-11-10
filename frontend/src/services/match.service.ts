import apiService from './api.service';
import { JobDescription, MatchResult, MatchRequest } from '../types/job.types';

/**
 * Match service - handles AI-powered candidate matching
 */
class MatchService {
  private readonly BASE_URL = '/api/match';

  /**
   * Match candidates to a job description
   */
  async matchCandidates(request: MatchRequest): Promise<MatchResult[]> {
    const response = await apiService.post<MatchResult[]>(this.BASE_URL, request);
    return response.data || [];
  }

  /**
   * Analyze resume quality
   */
  async analyzeResume(candidateId: string): Promise<any> {
    const response = await apiService.post(`/api/analyze/${candidateId}`);
    return response.data;
  }

  /**
   * Get match explanation
   */
  async getMatchExplanation(
    candidateId: string,
    jobDescription: JobDescription
  ): Promise<string> {
    const response = await apiService.post<{ explanation: string }>(
      `/api/match/explain`,
      {
        candidateId,
        jobDescription,
      }
    );
    return response.data?.explanation || '';
  }
}

export default new MatchService();
